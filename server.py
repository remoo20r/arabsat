#!/usr/bin/env python3
"""Arabesk TV web player - tiny server (Python stdlib only).

* Serves the web app from ./public
* /api/servers            -> list of server NAMES (hosts stay hidden here)
* /api/p?s=..&u=..&p=..   -> proxies Xtream player_api.php (JSON, gzip, cached)
* /play/<s>/<type>/<u>/<p>/<id>.<ext> -> 302 redirect to the real stream

Server hosts live in servers.json next to this file (not in git):
  [{"name": "Bella TV", "host": "http://example.com:8080"}, ...]
"""
import re
import mimetypes
mimetypes.add_type("application/vnd.android.package-archive", ".apk")
import base64
import gzip
import hashlib
import hmac
import json
import secrets
import os
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(ROOT, "public")
PORT = int(os.environ.get("PORT", "80"))
BIND = os.environ.get("BIND", "0.0.0.0")
ACT_FILE = os.path.join(ROOT, "activations.json")
KEY_FILE = os.path.join(ROOT, "activate.key")
PK_FILE = os.path.join(ROOT, "passkeys.json")
RP_ID = os.environ.get("RP_ID", "")  # https host used for the Face ID / passcode key
RP_ORIGIN = os.environ.get("RP_ORIGIN", "https://" + RP_ID)
UA = "IPTVSmartersPro"
CACHE_TTL = 15 * 60
CACHE_MAX = 120

_cache = {}
REVIEW_TRIES = {}
_lock = threading.Lock()


def load_servers():
    with open(os.path.join(ROOT, "servers.json"), encoding="utf-8") as f:
        return json.load(f)


def cache_get(key):
    with _lock:
        hit = _cache.get(key)
        if hit and time.time() - hit[0] < CACHE_TTL:
            return hit[1]
    return None


def cache_put(key, body):
    with _lock:
        if len(_cache) >= CACHE_MAX:
            oldest = sorted(_cache, key=lambda k: _cache[k][0])[: CACHE_MAX // 4]
            for k in oldest:
                _cache.pop(k, None)
        _cache[key] = (time.time(), body)


_act_lock = threading.Lock()


def act_load():
    try:
        with open(ACT_FILE, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def act_save(d):
    tmp = ACT_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(d, f)
    os.replace(tmp, ACT_FILE)


def activate_key():
    try:
        return open(KEY_FILE).read().strip()
    except Exception:
        return ""


def xtream_login(host, user, pw):
    q = urllib.parse.urlencode({"username": user, "password": pw})
    req = urllib.request.Request(host + "/player_api.php?" + q, headers={"User-Agent": UA})
    try:
        r = urllib.request.urlopen(req, timeout=30)
    except urllib.error.HTTPError as e:
        if e.code in (401, 403, 404):
            return False, {}
        raise
    with r:
        data = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            data = gzip.decompress(data)
    j = json.loads(data or b"null") or {}
    ui = j.get("user_info") or {}
    return str(ui.get("auth")) == "1", ui


def b64u_dec(x):
    x = str(x or "")
    return base64.urlsafe_b64decode(x + "=" * (-len(x) % 4))


def b64u(b):
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()


def pk_load():
    try:
        with open(PK_FILE, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def pk_save(d):
    tmp = PK_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(d, f)
    os.replace(tmp, PK_FILE)


# short-lived handshake sessions between the app (http) and the key page (https)
SESS = {}
SESS_TTL = 15 * 60
GEO = {}
import collections
LOGS = collections.deque(maxlen=300)


def logline(**kw):
    kw['t'] = time.strftime('%H:%M:%S')
    LOGS.append(kw)


def sess_get(sid):
    rec = SESS.get(str(sid or ""))
    if rec and time.time() - rec["ts"] < SESS_TTL:
        return rec
    SESS.pop(str(sid or ""), None)
    return None


USED_FILE = os.path.join(ROOT, "codes_used.json")


def used_codes(d=None):
    """Every code ever handed out — a code is never given to a second device."""
    try:
        with open(USED_FILE, encoding="utf-8") as f:
            used = set(json.load(f))
    except Exception:
        used = set()
    if d:
        used.update(d.keys())
    return used


def make_code(d, extra=None):
    """Create a new device code inside activations dict d (caller holds _act_lock).
    The code is unique forever: not in use now and never used before."""
    used = used_codes(d)
    while True:
        code = "%06d" % secrets.randbelow(1000000)
        if code[0] != "0" and code not in used:
            break
    used.add(code)
    tmp = USED_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(sorted(used), f)
    os.replace(tmp, USED_FILE)
    rec = {"sec": secrets.token_urlsafe(18), "ts": int(time.time())}
    rec.update(extra or {})
    d[code] = rec
    old = [k for k, v in d.items() if not v.get("u") and not v.get("pk") and not v.get("aid") and time.time() - v.get("ts", 0) > 30 * 86400]
    for k in old:
        d.pop(k, None)
    return code, rec


def verify_client_data(cdj_b64, kind, challenge):
    cd = json.loads(b64u_dec(cdj_b64))
    if cd.get("type") != kind:
        raise ValueError("type")
    if cd.get("challenge") != challenge:
        raise ValueError("challenge")
    if cd.get("origin") != RP_ORIGIN:
        raise ValueError("origin")
    return cd


def verify_assertion(pub_b64, alg, auth_b64, cdj_b64, sig_b64):
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import ec, padding
    auth = b64u_dec(auth_b64)
    if auth[:32] != hashlib.sha256(RP_ID.encode()).digest():
        raise ValueError("rp")
    if not (auth[32] & 0x01):
        raise ValueError("user not present")
    signed = auth + hashlib.sha256(b64u_dec(cdj_b64)).digest()
    key = serialization.load_der_public_key(b64u_dec(pub_b64))
    if int(alg) == -7:
        key.verify(b64u_dec(sig_b64), signed, ec.ECDSA(hashes.SHA256()))
    elif int(alg) == -257:
        key.verify(b64u_dec(sig_b64), signed, padding.PKCS1v15(), hashes.SHA256())
    else:
        raise ValueError("alg")


CACHEABLE = {
    "get_live_categories", "get_vod_categories", "get_series_categories",
    "get_live_streams", "get_vod_streams", "get_series", "get_series_info",
    "get_vod_info",
}


class Handler(SimpleHTTPRequestHandler):
    server_version = "ArabeskTV/1.0"

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=PUBLIC, **kw)

    def log_message(self, fmt, *args):
        # keep logs short and never print passwords
        sys.stderr.write("%s %s\n" % (self.command, self.path.split("?")[0]))

    def end_headers(self):
        if self.path.endswith((".html", "/")) or self.path == "/":
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    # ---------- helpers ----------
    def send_json(self, obj, status=200, raw=None):
        body = raw if raw is not None else json.dumps(obj).encode()
        gz = "gzip" in self.headers.get("Accept-Encoding", "") and len(body) > 1024
        if gz:
            body = gzip.compress(body, 6)
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        if gz:
            self.send_header("Content-Encoding", "gzip")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def server_host(self, idx):
        idx = str(idx)
        if idx.startswith("c"):  # custom server saved with one activation code
            rec = act_load().get(idx[1:]) or {}
            if not rec.get("host"):
                raise ValueError("bad server")
            return rec["host"]
        servers = load_servers()
        i = int(idx)
        if i < 0 or i >= len(servers):
            raise ValueError("bad server")
        return servers[i]["host"].rstrip("/")

    # ---------- routes ----------
    def do_HEAD(self):
        if urllib.parse.urlparse(self.path).path in ("/apk", "/android", "/app"):
            self.send_response(302)
            self.send_header("Location", "/ArabeskTV.apk")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        return super().do_HEAD()

    def do_GET(self):
        url = urllib.parse.urlsplit(self.path)
        try:
            if url.path == "/api/servers":
                return self.send_json([{"id": i, "name": s["name"]} for i, s in enumerate(load_servers())])
            if url.path == "/api/p":
                return self.api_proxy(url.query)
            if url.path == "/api/geo":
                return self.geo()
            if url.path == "/api/config":
                return self.send_json({"rp": RP_ID})
            if url.path == "/api/sess/new":
                sid = secrets.token_urlsafe(16)
                SESS[sid] = {"ts": time.time()}
                for k in [k for k, v in SESS.items() if time.time() - v["ts"] > SESS_TTL]:
                    SESS.pop(k, None)
                return self.send_json({"s": sid})
            if url.path == "/api/sess":
                q = dict(urllib.parse.parse_qsl(url.query))
                rec = sess_get(q.get("s"))
                if not rec:
                    return self.send_json({"unknown": True})
                if not rec.get("code"):
                    return self.send_json({"pending": True})
                SESS.pop(q.get("s"), None)
                return self.send_json({"code": rec["code"], "sec": rec["sec"], "restored": rec.get("restored", False)})
            if url.path == "/api/pk/options":
                q = dict(urllib.parse.parse_qsl(url.query))
                rec = sess_get(q.get("s"))
                if not rec or not RP_ID:
                    return self.send_json({"error": "expired"}, 400)
                rec["ch"] = b64u(secrets.token_bytes(32))
                rec["uid"] = b64u(secrets.token_bytes(16))
                return self.send_json({"challenge": rec["ch"], "uid": rec["uid"], "rp": RP_ID})
            if url.path == "/api/newcode":
                return self.new_code()
            if url.path == "/api/aid":
                return self.aid_code(url.query)
            if url.path == "/api/code":
                return self.check_code(url.query)
            if url.path == "/api/review":
                return self.review(url.query)
            if url.path.startswith("/play/"):
                return self.play(url.path)
            if url.path.startswith("/px/"):
                return self.proxy_stream(url.path)
            if url.path.startswith("/x/"):
                return self.xtream_gateway(url)
        except ValueError:
            return self.send_json({"error": "bad request"}, 400)
        except Exception as e:  # noqa
            sys.stderr.write("error: %r\n" % e)
            return self.send_json({"error": "server error"}, 502)
        if url.path in ("/apk", "/android", "/app"):   # short link for the Android app download
            self.send_response(302)
            self.send_header("Location", "/ArabeskTV.apk")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        if url.path == "/":
            self.path = "/index.html"
        return super().do_GET()

    # ---------- city + coordinates for the home screen weather ----------
    def geo(self):
        ip = (self.headers.get("X-Forwarded-For") or self.client_address[0]).split(",")[0].strip()
        hit = GEO.get(ip)
        if hit and time.time() - hit[0] < 6 * 3600:
            return self.send_json(hit[1])
        out = {}
        try:
            with urllib.request.urlopen("http://ip-api.com/json/%s?fields=status,country,countryCode,regionName,city,lat,lon" % urllib.parse.quote(ip), timeout=8) as r:
                j = json.loads(r.read())
            if j.get("status") == "success":
                out = {"city": j.get("city"), "region": j.get("regionName"), "country": j.get("country"), "cc": j.get("countryCode"),
                       "lat": j.get("lat"), "lon": j.get("lon")}
        except Exception:
            pass
        if not out:
            try:   # backup service
                with urllib.request.urlopen("https://ipwho.is/%s" % urllib.parse.quote(ip), timeout=8) as r:
                    j = json.loads(r.read())
                if j.get("success"):
                    out = {"city": j.get("city"), "region": j.get("region"), "country": j.get("country"), "cc": j.get("country_code"),
                           "lat": j.get("latitude"), "lon": j.get("longitude")}
            except Exception:
                pass
        if len(GEO) > 2000:
            GEO.clear()
        # a failed lookup is only remembered for 2 minutes, so it is retried soon
        GEO[ip] = (time.time() - (6 * 3600 - 120 if not out else 0), out)
        return self.send_json(out)

    # ---------- device activation ----------
    def new_code(self):
        with _act_lock:
            d = act_load()
            code, rec = make_code(d)
            act_save(d)
        return self.send_json({"code": code, "sec": rec["sec"]})

    def aid_code(self, query):
        """Android app: one fixed code per device (hashed Android ID), so reinstalling never changes it."""
        aid = dict(urllib.parse.parse_qsl(query)).get("id", "")
        if not re.fullmatch(r"[0-9a-f]{32,128}", aid):
            raise ValueError("bad id")
        with _act_lock:
            d = act_load()
            for code, rec in d.items():
                if rec.get("aid") == aid:
                    return self.send_json({"code": code, "sec": rec["sec"]})
            code, rec = make_code(d, {"aid": aid})
            act_save(d)
        return self.send_json({"code": code, "sec": rec["sec"]})

    def check_code(self, query):
        q = dict(urllib.parse.parse_qsl(query))
        rec = act_load().get(q.get("c", ""))
        if not rec or not hmac.compare_digest(rec.get("sec", ""), q.get("k", "")):
            return self.send_json({"unknown": True})
        if not rec.get("u"):
            return self.send_json({"pending": True})
        s = rec["s"]
        if str(s).startswith("c"):
            name = rec.get("name") or "Arabesk TV"
        else:
            servers = load_servers()
            s = int(s)
            name = servers[s]["name"] if s < len(servers) else ""
        return self.send_json({"s": s, "u": rec["u"], "p": rec["p"], "name": name, "v": rec.get("at", 0)})

    def review(self, query):
        """App-store review access: a review PIN gives this device the same activation as the review code (review.json)."""
        q = dict(urllib.parse.parse_qsl(query))
        ip = (self.headers.get("X-Forwarded-For") or self.client_address[0]).split(",")[0].strip()
        now = time.time()
        with _lock:
            tries = [t for t in REVIEW_TRIES.get(ip, []) if now - t < 3600]
            if len(tries) >= 10:
                return self.send_json({"ok": False, "error": "wait"}, 429)
            tries.append(now)
            REVIEW_TRIES[ip] = tries
        try:
            with open(os.path.join(ROOT, "review.json"), encoding="utf-8") as f:
                cfg = json.load(f)
        except Exception:
            return self.send_json({"ok": False, "error": "off"})
        pin = re.sub(r"\D", "", q.get("pin", ""))
        if not pin or not hmac.compare_digest(hashlib.sha256(pin.encode()).hexdigest(), str(cfg.get("pin_sha256", ""))):
            logline(ev="review-bad", ip=ip)
            return self.send_json({"ok": False, "error": "pin"})
        with _act_lock:
            d = act_load()
            rec, src = d.get(q.get("c", "")), d.get(str(cfg.get("from", "")))
            if not rec or not hmac.compare_digest(rec.get("sec", ""), q.get("k", "")):
                return self.send_json({"ok": False, "error": "code"})
            if not src or not src.get("u"):
                return self.send_json({"ok": False, "error": "inactive"})
            for k in ("s", "u", "p", "host", "name"):
                if k in src:
                    rec[k] = src[k]
                else:
                    rec.pop(k, None)
            rec.update({"at": int(now), "review": True})
            act_save(d)
        logline(ev="review-ok", ip=ip, code=q.get("c", ""))
        return self.send_json({"ok": True})

    def read_body(self):
        n = int(self.headers.get("Content-Length", "0") or 0)
        if n > 20000:
            raise ValueError("too big")
        return json.loads(self.rfile.read(n) or b"{}")

    def pk_post(self, path):
        try:
            body = self.read_body()
        except Exception:
            return self.send_json({"ok": False, "error": "bad request"}, 400)
        sess = sess_get(body.get("s"))
        if not sess:
            return self.send_json({"ok": False, "error": "expired"})
        try:
            if path == "/api/pk/none":  # this browser has no Face ID / passcode keys: plain code
                with _act_lock:
                    d = act_load()
                    code, rec = make_code(d)
                    act_save(d)
            elif path == "/api/pk/create":
                verify_client_data(body.get("clientDataJSON"), "webauthn.create", sess.get("ch"))
                cid, pub, alg = str(body.get("id", "")), str(body.get("pub", "")), int(body.get("alg", -7))
                if not cid or not pub or alg not in (-7, -257):
                    raise ValueError("key")
                with _act_lock:
                    pks = pk_load()
                    d = act_load()
                    code, rec = make_code(d, {"pk": cid})
                    pks[cid] = {"pub": pub, "alg": alg, "code": code, "uid": sess.get("uid"), "ts": int(time.time())}
                    pk_save(pks)
                    act_save(d)
            elif path == "/api/pk/get":
                cid = str(body.get("id", ""))
                verify_client_data(body.get("clientDataJSON"), "webauthn.get", sess.get("ch"))
                pks = pk_load()
                key = pks.get(cid)
                if not key:
                    return self.send_json({"ok": False, "error": "nokey"})
                verify_assertion(key["pub"], key["alg"], body.get("authenticatorData"), body.get("clientDataJSON"), body.get("signature"))
                with _act_lock:
                    d = act_load()
                    code = key["code"]
                    rec = d.get(code)
                    if not rec:  # very old unused code was cleaned up: give this key a fresh one
                        code, rec = make_code(d, {"pk": cid})
                        pks = pk_load()
                        pks[cid]["code"] = code
                        pk_save(pks)
                        act_save(d)
                sess["restored"] = True
            else:
                return self.send_json({"ok": False, "error": "not found"}, 404)
        except Exception as e:
            sys.stderr.write("passkey error: %r\n" % e)
            return self.send_json({"ok": False, "error": "verify"})
        sess["ch"] = None
        sess["code"], sess["sec"] = code, rec["sec"]
        return self.send_json({"ok": True, "code": code})

    def diag(self):
        """Owner-only check of stream access from this server (needs the activation key)."""
        key = activate_key()
        if not key or not hmac.compare_digest(self.headers.get("X-Key", ""), key):
            return self.send_json({"error": "not found"}, 404)
        try:
            body = self.read_body()
        except Exception:
            return self.send_json({"error": "bad request"}, 400)
        out = []
        for t in body.get("tests", [])[:12]:
            host = self.server_host(t["s"])
            url = "%s/%s/%s/%s/%s" % (host, t.get("kind", "live"), t["u"], t["p"], t["file"])
            req = urllib.request.Request(url, headers={"User-Agent": t.get("ua", "AppleCoreMedia/1.0.0.21A329 (iPhone; U; CPU OS 17_0 like Mac OS X)"),
                                                       "Origin": "http://arabsat.example", "Range": "bytes=0-300000"})
            t0 = time.time()
            rec = {"file": t["file"], "s": t["s"]}
            try:
                with urllib.request.urlopen(req, timeout=15) as r:
                    first = r.read(1)
                    rec["ttfb"] = round(time.time() - t0, 2)
                    data = first + r.read(300000)
                    rec.update({"status": r.status, "type": r.headers.get("Content-Type"), "cors": r.headers.get("Access-Control-Allow-Origin"),
                                "final": r.geturl().split("/")[2], "bytes": len(data), "secs": round(time.time() - t0, 2),
                                "head": data[:300].decode("latin-1") if b"#EXT" in data[:20] else ""})
            except urllib.error.HTTPError as e:
                rec.update({"status": e.code, "cors": e.headers.get("Access-Control-Allow-Origin")})
            except Exception as e:
                rec["error"] = repr(e)[:200]
            out.append(rec)
        return self.send_json({"results": out})

    def do_POST(self):
        url = urllib.parse.urlsplit(self.path)
        if url.path == "/api/diag":
            return self.diag()
        if url.path == "/api/clientlog":
            try:
                body = self.read_body()
            except Exception:
                body = {}
            ip = (self.headers.get("X-Forwarded-For") or self.client_address[0]).split(",")[0].strip()
            logline(ev="client", msg=str(body.get("msg", ""))[:300], ip=ip, ua=(self.headers.get("User-Agent") or "")[:120])
            return self.send_json({"ok": True})
        if url.path == "/api/logs":
            key = activate_key()
            if not key or not hmac.compare_digest(self.headers.get("X-Key", ""), key):
                return self.send_json({"error": "not found"}, 404)
            return self.send_json({"logs": list(LOGS)})
        if url.path == "/api/codeinfo":   # owner (Telegram mini app): look a device code up
            key = activate_key()
            if not key or not hmac.compare_digest(self.headers.get("X-Key", ""), key):
                return self.send_json({"error": "not found"}, 404)
            try:
                body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", "0") or 0)) or b"{}")
            except Exception:
                body = {}
            code = re.sub(r"\D", "", str(body.get("code", "")))
            rec = act_load().get(code)
            if not rec:
                return self.send_json({"found": False, "code": code})
            s = rec.get("s")
            name = ""
            if s is not None:
                if str(s).startswith("c"):
                    name = rec.get("name") or "Custom server"
                else:
                    sv = load_servers()
                    name = sv[int(s)]["name"] if int(s) < len(sv) else ""
            return self.send_json({"found": True, "code": code, "activated": bool(rec.get("u")),
                                   "username": rec.get("u") or "", "server": name,
                                   "device": "Android app" if rec.get("aid") else ("iPhone / web (Face ID)" if rec.get("pk") else "web"),
                                   "created": rec.get("ts", 0), "activated_at": rec.get("at", 0)})
        if url.path.startswith("/api/pk/"):
            return self.pk_post(url.path)
        if url.path != "/api/activate":
            return self.send_json({"error": "not found"}, 404)
        key = activate_key()
        if not key or not hmac.compare_digest(self.headers.get("X-Key", ""), key):
            return self.send_json({"error": "not found"}, 404)
        try:
            body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", "0") or 0)) or b"{}")
            code = str(body.get("code", "")).replace(" ", "").strip()
            user, pw = str(body.get("u", "")).strip(), str(body.get("p", "")).strip()
            custom = str(body.get("host") or "").strip()
            if custom:
                if not custom.lower().startswith(("http://", "https://")):
                    custom = "http://" + custom
                pu = urllib.parse.urlsplit(custom)
                if not pu.hostname:
                    return self.send_json({"ok": False, "error": "url"})
                host = "%s://%s" % (pu.scheme, pu.netloc)
                s = "c" + code
                sname = str(body.get("name") or "").strip()[:40] or "Arabesk TV"
            else:
                s = int(body.get("s", -1))
                host = self.server_host(s)
                sname = load_servers()[s]["name"]
        except Exception:
            return self.send_json({"ok": False, "error": "bad request"}, 400)
        with _act_lock:
            if code not in act_load():
                return self.send_json({"ok": False, "error": "code"})
        if not user or not pw:
            return self.send_json({"ok": False, "error": "login"})
        try:
            good, ui = xtream_login(host, user, pw)
        except Exception:
            return self.send_json({"ok": False, "error": "server"})
        if not good:
            return self.send_json({"ok": False, "error": "login"})
        with _act_lock:
            d = act_load()
            rec = d.get(code)
            if not rec:
                return self.send_json({"ok": False, "error": "code"})
            rec.update({"s": s, "u": user, "p": pw, "at": int(time.time())})
            if custom:
                rec.update({"host": host, "name": sname})
            else:
                rec.pop("host", None)
                rec.pop("name", None)
            act_save(d)
        return self.send_json({"ok": True, "server": sname, "status": ui.get("status"),
                               "exp_date": ui.get("exp_date")})

    def api_proxy(self, query):
        q = dict(urllib.parse.parse_qsl(query, keep_blank_values=True))
        host = self.server_host(q.pop("s", "x"))
        user, pw = q.pop("u", ""), q.pop("p", "")
        if not user or not pw:
            raise ValueError("missing login")
        action = q.get("action", "")
        params = {"username": user, "password": pw}
        params.update(q)
        target = host + "/player_api.php?" + urllib.parse.urlencode(params)
        key = target if action in CACHEABLE else None
        if key:
            hit = cache_get(key)
            if hit is not None:
                return self.send_json(None, raw=hit)
        req = urllib.request.Request(target, headers={"User-Agent": UA, "Accept-Encoding": "gzip"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read()
                if r.headers.get("Content-Encoding") == "gzip":
                    data = gzip.decompress(data)
        except urllib.error.HTTPError as e:
            if not action and e.code in (401, 403, 404):  # some panels answer a wrong login this way
                return self.send_json({"user_info": {"auth": 0}})
            return self.send_json({"error": "upstream %d" % e.code}, 502)
        except Exception:
            return self.send_json({"error": "Server not reachable"}, 504)
        data = data.strip() or b"null"
        try:
            json.loads(data)
        except Exception:
            return self.send_json({"error": "Bad answer from server"}, 502)
        if key and len(data) > 2:
            cache_put(key, data)
        return self.send_json(None, raw=data)

    def xtream_gateway(self, url):
        """Xtream-compatible gateway for the Android app: /x/<s>/player_api.php etc.
        API / EPG calls are fetched here (the panel address stays hidden); streams
        (/live, /movie, /series, /timeshift ...) are redirected straight to the panel."""
        parts = url.path.split("/", 3)
        if len(parts) < 4 or not parts[3]:
            raise ValueError("bad gateway path")
        s, rest = parts[2], parts[3]
        host = self.server_host(s)
        target = host + "/" + rest + ("?" + url.query if url.query else "")
        if rest not in ("player_api.php", "xmltv.php", "get.php", "panel_api.php"):
            self.send_response(302)
            self.send_header("Location", target)
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        req = urllib.request.Request(target, headers={"User-Agent": self.headers.get("User-Agent") or UA})
        try:
            r = urllib.request.urlopen(req, timeout=90)
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        except Exception:
            return self.send_json({"error": "Server not reachable"}, 504)
        q = dict(urllib.parse.parse_qsl(url.query))
        if rest == "player_api.php" and not q.get("action"):
            # login answer: hide the panel address it carries in server_info
            try:
                raw = r.read()
                if r.headers.get("Content-Encoding") == "gzip":
                    raw = gzip.decompress(raw)
                j = json.loads(raw)
                if isinstance(j, dict) and isinstance(j.get("server_info"), dict):
                    me = (self.headers.get("Host") or "").split(":")[0]
                    j["server_info"].update({"url": me, "port": "80", "https_port": "443", "server_protocol": "http"})
                return self.send_json(j)
            except Exception:
                return self.send_json({"error": "Bad answer from server"}, 502)
            finally:
                r.close()
        self.send_response(r.status)
        for h in ("Content-Type", "Content-Length", "Content-Encoding"):
            if r.headers.get(h):
                self.send_header(h, r.headers[h])
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        try:
            while True:
                chunk = r.read(64 * 1024)
                if not chunk:
                    break
                self.wfile.write(chunk)
        except Exception:
            pass
        finally:
            r.close()

    def proxy_stream(self, path):
        """Streams a live channel through this server (used when a phone can't open the stream directly)."""
        parts = path.split("/")
        if len(parts) != 7 or parts[3] not in ("live", "movie", "series"):
            raise ValueError("bad path")
        _, _, s, kind, u, p, fname = parts
        host = self.server_host(s)
        target = "%s/%s/%s/%s/%s" % (host, kind, u, p, fname)
        ua = self.headers.get("User-Agent") or UA
        hdr = {"User-Agent": ua}
        if self.headers.get("Range"):
            hdr["Range"] = self.headers["Range"]
        ip = (self.headers.get("X-Forwarded-For") or self.client_address[0]).split(",")[0].strip()
        try:
            r = urllib.request.urlopen(urllib.request.Request(target, headers=hdr), timeout=20)
        except urllib.error.HTTPError as e:
            logline(ev="proxy", s=s, f=fname, status=e.code, ip=ip, ua=ua[:80])
            return self.send_json({"error": "upstream %d" % e.code}, e.code if e.code in (401, 403, 404, 429, 509) else 502)
        except Exception as e:
            logline(ev="proxy", s=s, f=fname, status="ERR " + repr(e)[:80], ip=ip, ua=ua[:80])
            return self.send_json({"error": "Server not reachable"}, 504)
        if kind == "live" or not self.headers.get("Range") or self.headers.get("Range", "").startswith("bytes=0-"):
            logline(ev="proxy", s=s, f=fname, status=r.status, ip=ip, ua=ua[:80])
        self.send_response(r.status)
        for h in ("Content-Type", "Content-Length", "Content-Range"):
            if r.headers.get(h):
                self.send_header(h, r.headers[h])
        # many IPTV panels send "Accept-Ranges: 0-<size>" which iPhone Safari rejects; always send the standard value
        if kind != "live" and (r.status == 206 or r.headers.get("Accept-Ranges") or r.headers.get("Content-Length")):
            self.send_header("Accept-Ranges", "bytes")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        try:
            while True:
                chunk = r.read(64 * 1024)
                if not chunk:
                    break
                self.wfile.write(chunk)
        except Exception:
            pass
        finally:
            r.close()

    def play(self, path):
        # /play/<s>/<type>/<u>/<p>/<file>
        parts = path.split("/")
        if len(parts) != 7:
            raise ValueError("bad play path")
        _, _, s, kind, u, p, fname = parts
        if kind not in ("live", "movie", "series"):
            raise ValueError("bad type")
        host = self.server_host(s)
        target = "%s/%s/%s/%s/%s" % (host, kind, u, p, fname)
        self.send_response(302)
        self.send_header("Location", target)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", "0")
        self.end_headers()


if __name__ == "__main__":
    ThreadingHTTPServer.daemon_threads = True
    httpd = ThreadingHTTPServer((BIND, PORT), Handler)
    print("Arabesk TV on port %d" % PORT, flush=True)
    httpd.serve_forever()
