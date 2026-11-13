#!/usr/bin/env python3
"""Arab Sat web player - tiny server (Python stdlib only).

* Serves the web app from ./public
* /api/servers            -> list of server NAMES (hosts stay hidden here)
* /api/p?s=..&u=..&p=..   -> proxies Xtream player_api.php (JSON, gzip, cached)
* /play/<s>/<type>/<u>/<p>/<id>.<ext> -> 302 redirect to the real stream

Server hosts live in servers.json next to this file (not in git):
  [{"name": "Bella TV", "host": "http://example.com:8080"}, ...]
"""
import gzip
import json
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
UA = "IPTVSmartersPro"
CACHE_TTL = 15 * 60
CACHE_MAX = 120

_cache = {}
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


CACHEABLE = {
    "get_live_categories", "get_vod_categories", "get_series_categories",
    "get_live_streams", "get_vod_streams", "get_series", "get_series_info",
    "get_vod_info",
}


class Handler(SimpleHTTPRequestHandler):
    server_version = "ArabSat/1.0"

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
        servers = load_servers()
        i = int(idx)
        if i < 0 or i >= len(servers):
            raise ValueError("bad server")
        return servers[i]["host"].rstrip("/")

    # ---------- routes ----------
    def do_GET(self):
        url = urllib.parse.urlsplit(self.path)
        try:
            if url.path == "/api/servers":
                return self.send_json([{"id": i, "name": s["name"]} for i, s in enumerate(load_servers())])
            if url.path == "/api/p":
                return self.api_proxy(url.query)
            if url.path.startswith("/play/"):
                return self.play(url.path)
        except ValueError:
            return self.send_json({"error": "bad request"}, 400)
        except Exception as e:  # noqa
            sys.stderr.write("error: %r\n" % e)
            return self.send_json({"error": "server error"}, 502)
        if url.path == "/":
            self.path = "/index.html"
        return super().do_GET()

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
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print("Arab Sat on port %d" % PORT, flush=True)
    httpd.serve_forever()
