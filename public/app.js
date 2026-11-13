/* Arab Sat - web IPTV player (Xtream). Black / red / silver, same identity as the ArabeskTV app. */
(function () {
'use strict';

const SUPPORT = { show: '+1 (818) 813-8151', tel: '+18188138151', wa: '18188138151' };
const PAGE = 60;

/* ---------------- icons ---------------- */
const I = {
  tv: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 13H3V5h18v11z"/><path d="M10 7.5v6l5-3z"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4h-4z"/></svg>',
  lib: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3h-4l-.4 2.7c-.6.3-1.2.6-1.7 1l-2.5-1-2 3.5L6.5 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1L11 21h4l.4-2.7c.6-.3 1.2-.6 1.7-1l2.5 1 2-3.5L19.4 13zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" transform="translate(-1 0)"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3l-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7z"/></svg>',
  starO: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 17.3l-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>',
};

/* ---------------- storage ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('as_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('as_' + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem('as_' + k); } catch (e) {} },
};

const S = { servers: [], acc: store.get('acc', null), mem: {}, hls: null };
const app = document.getElementById('app');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (q, el) => (el || document).querySelector(q);
const $$ = (q, el) => Array.from((el || document).querySelectorAll(q));
const acckey = () => S.acc ? S.acc.s + '_' + S.acc.u : 'x';

function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
}

/* ---------------- api ---------------- */
async function api(params, acc) {
  acc = acc || S.acc;
  const q = new URLSearchParams(Object.assign({ s: acc.s, u: acc.u, p: acc.p }, params || {}));
  const r = await fetch('/api/p?' + q.toString());
  let j = null; try { j = await r.json(); } catch (e) {}
  if (!r.ok) throw new Error((j && j.error) || 'Connection problem');
  return j;
}
async function cached(key, params) {
  const k = acckey() + '|' + key;
  if (S.mem[k]) return S.mem[k];
  const p = api(params).then(v => (Array.isArray(v) ? v : (v && typeof v === 'object' ? v : [])));
  S.mem[k] = p; p.catch(() => delete S.mem[k]);
  return p;
}
const playUrl = (kind, id, ext) =>
  `/play/${S.acc.s}/${kind}/${encodeURIComponent(S.acc.u)}/${encodeURIComponent(S.acc.p)}/${id}.${ext || 'm3u8'}`;

/* ---------------- shared bits ---------------- */
const logoHTML = (sm) => `<div class="logo"><img src="icon-192.png" alt=""><div><div class="w">ARAB <b>SAT</b></div>${sm ? '' : '<div class="ar">عرب سات</div>'}</div></div>`;
function bar(title, opts) {
  opts = opts || {};
  return `<div class="bar"><button class="ibtn" data-back>${I.back}</button><h1 dir="auto">${esc(title)}</h1>
    ${opts.search ? `<button class="ibtn" data-go="#/search">${I.search}</button>` : ''}${opts.extra || ''}</div>`;
}
const spinner = () => '<div class="loading"><div class="spin"></div></div>';
const empty = (t) => `<div class="empty">${esc(t)}</div>`;
const supportHTML = () => `<div class="support"><span class="num">${SUPPORT.show}</span>
  <a class="chip-a" href="tel:${SUPPORT.tel}">${I.phone}Call</a>
  <a class="chip-a" href="https://wa.me/${SUPPORT.wa}" target="_blank" rel="noopener">${I.wa}WhatsApp</a></div>`;

function favs(kind) { return store.get('fav_' + kind + '_' + acckey(), []); }
function isFav(kind, id) { return favs(kind).some(f => String(f.id) === String(id)); }
function toggleFav(kind, item) {
  let f = favs(kind); const on = f.some(x => String(x.id) === String(item.id));
  f = on ? f.filter(x => String(x.id) !== String(item.id)) : [item].concat(f);
  store.set('fav_' + kind + '_' + acckey(), f); return !on;
}
function progAll() { return store.get('prog_' + acckey(), {}); }
function progSet(id, rec) {
  const all = progAll(); all[id] = Object.assign(all[id] || {}, rec, { ts: Date.now() });
  const keys = Object.keys(all).sort((a, b) => all[b].ts - all[a].ts);
  keys.slice(150).forEach(k => delete all[k]);
  store.set('prog_' + acckey(), all);
}
function fmtTime(sec) {
  sec = Math.max(0, Math.floor(sec || 0)); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60);
  return h ? `${h}h ${m}m` : `${m}m`;
}
function b64(s) { try { return decodeURIComponent(escape(atob(s || ''))); } catch (e) { return s || ''; } }
const img = (u) => (u && /^https?:\/\//.test(u)) ? u : '';

/* ---------------- router ---------------- */
let cleanup = [];
function onLeave(fn) { cleanup.push(fn); }
function route() {
  cleanup.forEach(f => { try { f(); } catch (e) {} }); cleanup = [];
  closePlayer();
  window.scrollTo(0, 0);
  if (!S.acc) return renderLogin();
  const h = location.hash.replace(/^#\/?/, '').split('/');
  const [r, a] = h;
  if (r === 'live') return renderLive(a);
  if (r === 'movies') return renderGridSection('vod', a);
  if (r === 'series') return renderGridSection('series', a);
  if (r === 'movie') return renderMovie(a);
  if (r === 'show') return renderShow(a);
  if (r === 'search') return renderSearch();
  if (r === 'new') return renderNew();
  return renderHome();
}
window.addEventListener('hashchange', route);
document.addEventListener('click', (e) => {
  const g = e.target.closest('[data-go]');
  if (g) { e.preventDefault(); location.hash = g.getAttribute('data-go'); return; }
  const b = e.target.closest('[data-back]');
  if (b) { e.preventDefault(); if (history.length > 1 && S.navCount > 0) history.back(); else location.hash = '#/'; }
});
S.navCount = 0; window.addEventListener('hashchange', () => { S.navCount++; });

/* ---------------- device activation (no manual login) ---------------- */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = window.navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
function device() { return store.get('dev', null); }
async function ensureDevice() {
  let d = device();
  if (d && d.code && d.sec) return d;
  const r = await fetch('/api/newcode'); d = await r.json();
  if (!d.code) throw new Error('no code');
  store.set('dev', d); return d;
}
async function checkActivation() {
  const d = device(); if (!d) return null;
  const r = await fetch('/api/code?c=' + encodeURIComponent(d.code) + '&k=' + encodeURIComponent(d.sec));
  const j = await r.json();
  if (j.unknown) { store.del('dev'); return 'unknown'; }
  if (j.pending) return 'pending';
  return j;
}
function applyActivation(j) {
  const changed = !S.acc || S.acc.s !== j.s || S.acc.u !== j.u || S.acc.p !== j.p;
  if (changed) { S.mem = {}; S.acc = { s: j.s, u: j.u, p: j.p, name: j.name, info: (S.acc && !changed) ? S.acc.info : null }; }
  else S.acc.name = j.name;
  store.set('acc', S.acc);
  return changed;
}
const fmtCode = (c) => String(c).replace(/^(\d{3})(\d{3})$/, '$1 $2');
let pollT = null;
async function renderLogin(err) {
  clearTimeout(pollT);
  if (isIOS && !standalone) {
    app.innerHTML = `<div class="login"><div class="card"><div class="big"><img src="icon-512.png" alt=""><div class="w">ARAB <b>SAT</b></div><div class="ar">عرب سات</div></div>
      <div class="howto"><b>Install the app first</b><ol>
        <li>Tap the <b>Share</b> button <span class="shr">⬆︎</span> at the bottom of Safari</li>
        <li>Choose <b>Add to Home Screen</b></li>
        <li>Open <b>Arab Sat</b> from your home screen to get your activation code</li></ol>
        <div class="ar2" dir="rtl">نزّل التطبيق الأول: دوس على زرار المشاركة ⬆︎ تحت في Safari، واختار <b>Add to Home Screen</b>، وافتح Arab Sat من الشاشة الرئيسية علشان يظهرلك كود التفعيل.</div></div>
    </div>${supportHTML()}</div>`;
    return;
  }
  if (!device()) return renderGetCode(err);
  app.innerHTML = `<div class="login"><div class="card"><div class="big"><img src="icon-512.png" alt=""><div class="w">ARAB <b>SAT</b></div><div class="ar">عرب سات</div></div>
    <div class="codebox"><div class="lbl">Your activation code</div><div class="code" id="dc">${spinner()}</div>
      <div class="hint">Send this code to Arabesk customer service to activate your app.</div>
      <div class="hint" dir="rtl">ابعت الكود ده لخدمة عملاء Arabesk علشان يتفعّل التطبيق.</div>
      <div class="wait"><div class="spin" style="width:20px;height:20px;border-width:2px"></div><span id="ws">Waiting for activation...</span></div></div>
    <div class="err" id="le">${esc(err || '')}</div>
  </div>${supportHTML()}</div>`;
  const d = device();
  $('#dc').textContent = fmtCode(d.code);
  const wa = $('.support a[href^="https://wa.me"]');
  if (wa) wa.href = `https://wa.me/${SUPPORT.wa}?text=${encodeURIComponent('Arab Sat activation code: ' + d.code)}`;
  const poll = async () => {
    if (!$('#dc')) return;
    try {
      const j = await checkActivation();
      if (j === 'unknown') { renderGetCode(); return; }
      if (j && j !== 'pending') {
        const res = await tryLogin(j);
        if (res === true) { location.hash = '#/'; route(); return; }
        $('#le').textContent = res;
      }
    } catch (e) {}
    pollT = setTimeout(poll, 4000);
  };
  poll();
  onLeave(() => clearTimeout(pollT));
}
// first launch: get a code tied to a Face ID / passcode key, so it never changes
async function renderGetCode(err) {
  clearTimeout(pollT);
  app.innerHTML = `<div class="login"><div class="card"><div class="big"><img src="icon-512.png" alt=""><div class="w">ARAB <b>SAT</b></div><div class="ar">عرب سات</div></div>
    <div class="codebox">
      <div class="hint" style="font-size:15px;color:var(--text)">Tap the button and confirm with <b>Face ID</b> or your <b>phone passcode</b> to get your activation code.</div>
      <div class="hint" dir="rtl" style="font-size:15px">دوس على الزرار وأكّد ببصمة الوش أو الرقم السري بتاع الموبايل علشان تاخد كود التفعيل.</div>
      <button class="btn red" id="gk" style="margin-top:16px">Get my code · خد الكود</button>
      <div class="wait hidden" id="gw"><div class="spin" style="width:20px;height:20px;border-width:2px"></div><span>Waiting for Face ID...</span></div></div>
    <div class="err" id="le">${esc(err || '')}</div></div>${supportHTML()}</div>`;
  let cfg = {}, sid = null;
  const btn = $('#gk'); btn.disabled = true;
  try {
    cfg = await (await fetch('/api/config')).json();
    if (cfg.rp) sid = (await (await fetch('/api/sess/new')).json()).s;
  } catch (e) { $('#le').textContent = 'Cannot reach Arab Sat. Check your internet.'; pollT = setTimeout(() => renderGetCode(), 5000); return; }
  btn.disabled = false;
  const poll = async () => {
    if (!$('#gk')) return;
    try {
      const j = await (await fetch('/api/sess?s=' + encodeURIComponent(sid))).json();
      if (j.unknown) { renderGetCode('Time ran out. Tap the button again.'); return; }
      if (j.code) { store.set('dev', { code: j.code, sec: j.sec }); renderLogin(); return; }
    } catch (e) {}
    pollT = setTimeout(poll, 2000);
  };
  btn.onclick = async () => {
    $('#le').textContent = '';
    if (!cfg.rp) { try { await ensureDevice(); renderLogin(); } catch (e) { $('#le').textContent = 'Cannot reach Arab Sat. Check your internet.'; } return; }
    // opened straight from the tap so the phone allows it
    const url = 'https://' + cfg.rp + '/key.html?s=' + encodeURIComponent(sid);
    const w = window.open(url, '_blank');
    if (!w) location.href = url;
    $('#gw').classList.remove('hidden');
    clearTimeout(pollT); poll();
  };
  document.addEventListener('visibilitychange', function vis() { if (!$('#gk')) { document.removeEventListener('visibilitychange', vis); return; } if (!document.hidden && sid) { clearTimeout(pollT); poll(); } });
  onLeave(() => clearTimeout(pollT));
}
async function tryLogin(j) {
  const acc = { s: j.s, u: j.u, p: j.p, name: j.name };
  try {
    const r = await api({}, acc);
    const ui = r && r.user_info;
    if (!ui || String(ui.auth) !== '1') return 'Your subscription is not active. Please contact customer service.';
    if (ui.status && ui.status !== 'Active') return 'Your subscription is ' + ui.status + '. Please contact customer service.';
    acc.info = ui; S.acc = acc; S.mem = {}; store.set('acc', acc);
    return true;
  } catch (e) { return 'Connection problem, trying again...'; }
}
// every launch: the activation on our side is the source of truth
async function syncActivation() {
  if (!device()) { if (S.acc) { S.acc = null; store.del('acc'); route(); } return; }
  try {
    const j = await checkActivation();
    if (j === 'unknown' || j === 'pending') { S.acc = null; store.del('acc'); route(); return; }
    if (j && applyActivation(j)) route();
  } catch (e) {}
}

/* ---------------- home ---------------- */
function renderHome() {
  const ui = S.acc.info || {};
  const exp = ui.exp_date ? new Date(ui.exp_date * 1000) : null;
  const cw = continueList();
  app.innerHTML = `<div class="home">
    <div class="bar"><button class="ibtn" id="rf">${I.refresh}</button><div class="center">${logoHTML()}</div>
      <button class="ibtn" data-go="#/search">${I.search}</button><button class="ibtn" id="st">${I.gear}</button></div>
    <div class="tiles">
      <button class="tile t-live" data-go="#/live">${I.tv}<span>Live TV</span></button>
      <button class="tile t-mov" data-go="#/movies">${I.film}<span>Movies</span></button>
      <button class="tile t-ser" data-go="#/series">${I.lib}<span>Series</span></button>
    </div>
    ${cw.length ? `<div class="section-t">Continue Watching</div><div class="hrow">${cw.map(c => `
      <button class="cw" data-cw="${esc(c.id)}"><div class="im" style="background-image:url('${esc(img(c.img))}')"><div class="prog" style="width:${Math.min(100, c.t / c.d * 100)}%"></div></div>
      <div class="n" dir="auto">${esc(c.title)}</div></button>`).join('')}</div>` : ''}
    <div class="expiry">${exp ? `Subscription active until <b>${exp.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</b>` : (ui.username ? 'Subscription: <b>Unlimited</b>' : '')}</div>
    <div class="foot"><a class="chip-a" href="tel:${SUPPORT.tel}">${I.phone}${SUPPORT.show}</a>
      <div class="clock"><div class="t" id="ck"></div><div class="d" id="cd"></div></div>
      <button class="newbtn" data-go="#/new">NEW</button></div>
  </div>`;
  const tick = () => { const n = new Date(); const t = $('#ck'); if (!t) return;
    t.textContent = n.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    $('#cd').textContent = n.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }); };
  tick(); const iv = setInterval(tick, 10000); onLeave(() => clearInterval(iv));
  $('#st').onclick = openSettings;
  $('#rf').onclick = () => { S.mem = {}; toast('Lists refreshed'); refreshAccount(); };
  $$('[data-cw]').forEach(b => b.onclick = () => resumeItem(cw.find(c => String(c.id) === b.dataset.cw)));
  // warm the catalogs in the background
  cached('lc', { action: 'get_live_categories' }).catch(() => {});
  if (window.ManagedMediaSource || window.MediaSource) loadMpegts().catch(() => {});
  cached('vc', { action: 'get_vod_categories' }).catch(() => {});
  cached('sc', { action: 'get_series_categories' }).catch(() => {});
  refreshAccount();
}
async function refreshAccount() {
  try {
    const j = await api({});
    if (j && j.user_info && String(j.user_info.auth) === '1' && (!j.user_info.status || j.user_info.status === 'Active')) { S.acc.info = j.user_info; store.set('acc', S.acc); }
    else if (j && j.user_info) { const st = j.user_info.status; S.acc = null; store.del('acc'); renderLogin(st && st !== 'Active' ? 'Your subscription is ' + st + '. Please contact customer service.' : 'Your subscription is not active. Please contact customer service.'); }
  } catch (e) {}
}
function continueList() {
  const all = progAll();
  return Object.keys(all).map(k => Object.assign({ id: k }, all[k]))
    .filter(c => c.d > 60 && c.t > 30 && c.t / c.d < 0.95).sort((a, b) => b.ts - a.ts).slice(0, 12);
}
function resumeItem(c) {
  if (!c) return;
  if (c.kind === 'movie') openPlayer({ title: c.title, url: playUrl('movie', c.sid, c.ext), pid: c.id, img: c.img, kind: 'movie', sid: c.sid, ext: c.ext });
  else if (c.kind === 'ep') location.hash = '#/show/' + c.series;
}

function openSettings() {
  const ui = S.acc.info || {};
  const exp = ui.exp_date ? new Date(ui.exp_date * 1000).toLocaleDateString() : 'Unlimited';
  const bg = document.createElement('div'); bg.className = 'sheet-bg';
  bg.innerHTML = `<div class="sheet"><div class="grab"></div><h3>My Account</h3>
    <div class="kv"><span>Activation code</span><b>${esc(fmtCode((device() || {}).code || '-'))}</b></div>
    <div class="kv"><span>Username</span><b>${esc(S.acc.u)}</b></div>
    <div class="kv"><span>Server</span><b>${esc(S.acc.name)}</b></div>
    <div class="kv"><span>Status</span><b class="${ui.status === 'Active' ? 'ok' : ''}">${esc(ui.status || '-')}</b></div>
    <div class="kv"><span>Expires</span><b>${esc(exp)}</b></div>
    <div class="kv"><span>Connections</span><b>${esc((ui.active_cons || 0) + ' / ' + (ui.max_connections || '-'))}</b></div>
    <div style="height:16px"></div>
    <button class="btn ghost" id="clr">Clear watch history</button>
    ${supportHTML()}</div>`;
  document.body.appendChild(bg);
  bg.onclick = (e) => { if (e.target === bg) bg.remove(); };
  $('#clr', bg).onclick = () => { store.del('prog_' + acckey()); bg.remove(); toast('Watch history cleared'); route(); };
}

/* ---------------- live ---------------- */
/* ---------------- side menu (categories): sidebar on big screens, drawer on phones ---------------- */
const icoMenu = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>';
function sideLayout(title, extraBar) {
  return `<div class="bar"><button class="ibtn" data-back>${I.back}</button><h1 dir="auto">${esc(title)}</h1>
    <button class="catbtn" id="catbtn">${icoMenu}<span id="catname" dir="auto"></span></button>
    <button class="ibtn" data-go="#/search">${I.search}</button>${extraBar || ''}</div>
    <div class="sec"><div class="sideback" id="sideback"></div><aside class="side" id="side"><div class="side-h">Categories</div><div id="cats"></div></aside>
    <main class="secmain" id="secmain"></main></div>`;
}
function wireSide(cats, current, onPick) {
  const box = $('#cats'), side = $('#side'), back = $('#sideback');
  const open = () => { side.classList.add('open'); back.classList.add('open'); };
  const close = () => { side.classList.remove('open'); back.classList.remove('open'); };
  $('#catbtn').onclick = () => side.classList.contains('open') ? close() : open();
  back.onclick = close;
  // swipe from the left edge opens the menu, swipe left closes it
  let sx = null, sy = 0;
  const ts = (e) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; };
  const te = (e) => { if (sx == null) return; const t = e.changedTouches[0]; const dx = t.clientX - sx, dy = Math.abs(t.clientY - sy);
    if (dy < 60) { if (sx < 28 && dx > 60) open(); else if (dx < -60 && side.classList.contains('open')) close(); } sx = null; };
  document.addEventListener('touchstart', ts, { passive: true }); document.addEventListener('touchend', te, { passive: true });
  onLeave(() => { document.removeEventListener('touchstart', ts); document.removeEventListener('touchend', te); });
  const draw = (cur) => {
    box.innerHTML = cats.map(c => `<button class="cat ${String(c.category_id) === String(cur) ? 'on' : ''}" data-c="${esc(c.category_id)}" dir="auto">${esc(c.category_name)}</button>`).join('');
    const c = cats.find(x => String(x.category_id) === String(cur)); $('#catname').textContent = c ? c.category_name : '';
    const on = $('.cat.on', box); if (on) on.scrollIntoView({ block: 'nearest' });
  };
  box.onclick = (e) => { const b = e.target.closest('.cat'); if (!b) return; draw(b.dataset.c); close(); onPick(b.dataset.c); };
  draw(current);
  return { draw, open, close };
}

/* ---------------- live ---------------- */
const isWide = () => window.matchMedia('(min-width: 900px)').matches;
async function renderLive(catId) {
  app.innerHTML = sideLayout('Live TV');
  $('#secmain').innerHTML = `
    <div class="livebox hidden" id="lbx">
      <div class="vwrap" id="vwrap"><video id="lv" playsinline webkit-playsinline autoplay controls></video><div class="vmsg hidden" id="vm"></div>
        <div class="tvtap" id="tvtap"></div>
        <div class="tvtop"><button class="ibtn" id="tvx">${I.back}</button><div class="tx"><div class="nn" dir="auto"></div><small class="ne" dir="auto"></small></div><span class="live">LIVE</span></div>
        <div class="tvpanel"><div class="tvcats" id="tvcats"></div><div class="tvchs" id="tvchs"></div></div>
      </div>
      <div class="nowbar"><span class="live">LIVE</span><div class="tx"><div class="nn" dir="auto"></div><small class="ne" dir="auto"></small></div>
        <button class="ibtn" id="fs">${I.full}</button><button class="ibtn" id="xc">${I.close}</button></div></div>
    <div class="list" id="ll">${spinner()}</div>`;
  let cats;
  try { cats = await cached('lc', { action: 'get_live_categories' }); } catch (e) { $('#ll').innerHTML = empty(e.message); return; }
  const fav = favs('live');
  const allCats = (fav.length ? [{ category_id: 'fav', category_name: '★ Favorites' }] : []).concat(cats);
  if (!catId) catId = store.get('lastLiveCat_' + acckey(), null);
  if (!allCats.some(c => String(c.category_id) === String(catId))) catId = allCats.length ? allCats[0].category_id : null;
  const video = $('#lv'), lbx = $('#lbx');
  let current = null, list = [], playList = [], tvCat = null, hideT = null;
  onLeave(() => { stopVideo(video); document.removeEventListener('keydown', onKey); clearTimeout(hideT); document.body.classList.remove('tvon'); });
  const side = wireSide(allCats, catId, (c) => loadCat(c));

  const getList = async (cid) => cid === 'fav' ? favs('live').map(f => f.raw) : cached('ls_' + cid, { action: 'get_live_streams', category_id: cid });
  async function loadCat(cid) {
    store.set('lastLiveCat_' + acckey(), cid);
    $('#ll').innerHTML = spinner();
    try { list = await getList(cid); } catch (e) { $('#ll').innerHTML = empty(e.message); return; }
    if (!list.length) { $('#ll').innerHTML = empty('No channels here'); return; }
    renderRows($('#ll'), list, 0);
  }
  const logo = (c) => { const lg = img(c.stream_icon);
    return `<div class="lg">${lg ? `<img loading="lazy" src="${esc(lg)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'TV'}))">` : '<span class="ph">TV</span>'}</div>`; };
  const rowHTML = (c, i, withStar) => `<div class="row ${current && current.stream_id == c.stream_id ? 'on' : ''}" data-i="${i}">
      <span class="no">${esc(c.num || i + 1)}</span>${logo(c)}<div class="nm"><div dir="auto">${esc(c.name)}</div></div>
      ${withStar ? `<button class="star ${isFav('live', c.stream_id) ? 'on' : ''}" data-f="${i}">${isFav('live', c.stream_id) ? I.star : I.starO}</button>` : ''}</div>`;
  function renderRows(el, arr, from, compact) {
    if (from === 0) el.innerHTML = '';
    el.insertAdjacentHTML('beforeend', arr.slice(from, from + 200).map((c, k) => rowHTML(c, from + k, !compact)).join(''));
    if (from + 200 < arr.length) setTimeout(() => { if (el.isConnected) renderRows(el, arr, from + 200, compact); }, 60);
  }
  function markOn() { $$('.row').forEach(r => { const arr = r.closest('#tvchs') ? tvList : list; const c = arr[+r.dataset.i]; r.classList.toggle('on', !!(c && current && c.stream_id == current.stream_id)); }); }
  $('#ll').onclick = (e) => {
    const f = e.target.closest('[data-f]');
    if (f) { const c = list[+f.dataset.f]; const nowOn = toggleFav('live', { id: c.stream_id, raw: c });
      f.classList.toggle('on', nowOn); f.innerHTML = nowOn ? I.star : I.starO; toast(nowOn ? 'Added to favorites' : 'Removed from favorites'); return; }
    const r = e.target.closest('.row'); if (!r) return;
    const c = list[+r.dataset.i];
    if (current && current.stream_id == c.stream_id) { enterTV(); return; }
    playList = list; play(c);
    if (isWide()) enterTV();
  };
  function play(c) {
    current = c; markOn();
    lbx.classList.remove('hidden');
    $$('.nn', lbx).forEach(x => x.textContent = c.name); $$('.ne', lbx).forEach(x => x.textContent = '');
    playLive(video, c, $('#vm'));
    if (!lbx.classList.contains('tv')) window.scrollTo({ top: 0, behavior: 'smooth' });
    api({ action: 'get_short_epg', stream_id: c.stream_id, limit: 2 }).then(j => {
      if (current !== c) return;
      const L = (j && j.epg_listings) || []; if (!L.length) return;
      const t = (x) => new Date((x.start_timestamp || 0) * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      $$('.ne', lbx).forEach(x => x.textContent = 'Now: ' + b64(L[0].title) + (L[1] ? '  ·  ' + t(L[1]) + ' ' + b64(L[1].title) : ''));
    }).catch(() => {});
  }
  // ---- TV mode: full screen video with translucent categories + channels on top ----
  let tvList = [];
  function enterTV() {
    lbx.classList.add('tv'); document.body.classList.add('tvon');
    tvCat = store.get('lastLiveCat_' + acckey(), catId);
    drawTvCats(); loadTvCat(tvCat); showPanel();
    video.play().catch(() => {});
  }
  function exitTV() {
    lbx.classList.remove('tv', 'panel'); document.body.classList.remove('tvon'); clearTimeout(hideT);
    if (isWide()) { stopVideo(video); lbx.classList.add('hidden'); current = null; markOn(); }
  }
  function drawTvCats() {
    $('#tvcats').innerHTML = allCats.map(c => `<button class="cat ${String(c.category_id) === String(tvCat) ? 'on' : ''}" data-c="${esc(c.category_id)}" dir="auto">${esc(c.category_name)}</button>`).join('');
    const on = $('#tvcats .cat.on'); if (on) on.scrollIntoView({ block: 'center' });
  }
  async function loadTvCat(cid) {
    tvCat = cid; const el = $('#tvchs'); el.innerHTML = spinner();
    try { tvList = await getList(cid); } catch (e) { el.innerHTML = empty(e.message); return; }
    renderRows(el, tvList, 0, true);
    setTimeout(() => { const on = $('#tvchs .row.on'); if (on) on.scrollIntoView({ block: 'center' }); }, 50);
  }
  function showPanel() { lbx.classList.add('panel'); clearTimeout(hideT); hideT = setTimeout(() => lbx.classList.remove('panel'), 6000); }
  $('#tvcats').onclick = (e) => { const b = e.target.closest('.cat'); if (!b) return; showPanel(); $$('#tvcats .cat').forEach(x => x.classList.toggle('on', x === b)); loadTvCat(b.dataset.c); };
  $('#tvchs').onclick = (e) => { const r = e.target.closest('.row'); if (!r) return; showPanel(); playList = tvList; play(tvList[+r.dataset.i]); };
  $('#tvchs').onscroll = $('#tvcats').onscroll = () => showPanel();
  $('#tvtap').onclick = () => { if (lbx.classList.contains('panel')) { lbx.classList.remove('panel'); clearTimeout(hideT); } else showPanel(); };
  lbx.addEventListener('mousemove', () => { if (lbx.classList.contains('tv')) showPanel(); });
  $('#tvx').onclick = exitTV;
  $('#fs').onclick = enterTV;
  $('#xc').onclick = () => { stopVideo(video); lbx.classList.add('hidden'); current = null; markOn(); };
  function zap(d) { if (!current || !playList.length) return; let i = playList.findIndex(c => c.stream_id == current.stream_id); i = (i + d + playList.length) % playList.length; play(playList[i]); showPanel(); }
  function onKey(e) {
    if (!lbx.classList.contains('tv')) return;
    if (e.key === 'Escape') { if (lbx.classList.contains('panel')) lbx.classList.remove('panel'); else exitTV(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); zap(-1); } else if (e.key === 'ArrowDown') { e.preventDefault(); zap(1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPanel(); }
  }
  document.addEventListener('keydown', onKey);
  if (catId != null) loadCat(String(catId));
}

/* ---------------- video engine: direct MPEG-TS (instant start, like ExoPlayer) with HLS fallback ---------------- */
const canNativeHls = () => !!document.createElement('video').canPlayType('application/vnd.apple.mpegurl');
function loadScript(src, test) {
  if (test()) return Promise.resolve();
  return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
}
const loadMpegts = () => loadScript('vendor/mpegts.js?v=1', () => window.mpegts);
const loadHlsJs = () => loadScript('https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js', () => window.Hls);
function stopVideo(v) {
  if (S.ts) { try { S.ts.pause(); S.ts.unload(); S.ts.detachMediaElement(); S.ts.destroy(); } catch (e) {} S.ts = null; }
  if (S.hls) { try { S.hls.destroy(); } catch (e) {} S.hls = null; }
  if (v) { v.onerror = v.oncanplay = v.onplaying = v.onwaiting = null; try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) {} }
}
// remembers per server whether the fast engine works (blocked servers go straight to HLS next time)
function tsOk(s) { const m = store.get('tsok', {}); return m[s] !== false; }
function tsMark(s, ok) { const m = store.get('tsok', {}); m[s] = ok; store.set('tsok', m); }
async function playLive(v, c, msg) {
  const token = (S.playTok = (S.playTok || 0) + 1);
  stopVideo(v);
  const show = (html) => { if (!msg) return; msg.innerHTML = html; msg.classList.toggle('hidden', !html); };
  show('<div class="spin"></div>');
  v.onplaying = () => show('');
  const failMsg = () => show('This channel is not available right now.<br>Try another channel.');
  const mmsOk = !!(window.ManagedMediaSource || window.MediaSource);
  if (mmsOk && tsOk(S.acc.s)) {
    try {
      await loadMpegts();
      if (token !== S.playTok) return;
      if (window.mpegts && mpegts.getFeatureList().mseLivePlayback) {
        v.disableRemotePlayback = true;
        const p = mpegts.createPlayer({ type: 'mpegts', isLive: true, url: location.origin + playUrl('live', c.stream_id, 'ts') }, {
          enableWorker: false, enableStashBuffer: false, stashInitialSize: 128 * 1024, lazyLoad: false,
          liveBufferLatencyChasing: true, liveBufferLatencyMaxLatency: 4, liveBufferLatencyMinRemain: 0.5,
          autoCleanupSourceBuffer: true });
        S.ts = p; let started = false;
        p.attachMediaElement(v); p.load();
        v.onplaying = () => { started = true; show(''); tsMark(S.acc.s, true); };
        v.onwaiting = () => show('<div class="spin"></div>');
        const fallback = () => { if (token !== S.playTok) return; if (!started) tsMark(S.acc.s, false); playHls(v, c, msg, token, failMsg); };
        p.on(mpegts.Events.ERROR, (type, detail) => { if (token !== S.playTok) return; if (started && type === mpegts.ErrorTypes.MEDIA_ERROR) return; fallback(); });
        const pr = v.play(); if (pr && pr.catch) pr.catch((err) => { if (err && err.name === 'NotAllowedError') tapToPlay(v, msg); });
        setTimeout(() => { if (token === S.playTok && !started && S.ts === p) fallback(); }, 9000);
        return;
      }
    } catch (e) {}
  }
  playHls(v, c, msg, token, failMsg);
}
function tapToPlay(v, msg) {
  if (!msg) return;
  msg.innerHTML = `<button class="btn red tapplay">${I.play} Tap to play</button>`; msg.classList.remove('hidden');
  const b = msg.querySelector('button'); b.onclick = () => { v.play().catch(() => {}); msg.classList.add('hidden'); };
}
async function playHls(v, c, msg, token, failMsg) {
  stopVideo(v); if (token !== S.playTok) return;
  const url = playUrl('live', c.stream_id, 'm3u8');
  if (msg) { msg.innerHTML = '<div class="spin"></div>'; msg.classList.remove('hidden'); }
  v.onplaying = () => { if (msg) msg.classList.add('hidden'); };
  if (canNativeHls()) {
    let tries = 0;
    v.onerror = () => { if (token !== S.playTok) return; if (tries++ < 1) setTimeout(() => { v.src = url + '?r=' + tries; v.play().catch(() => {}); }, 1200); else failMsg(); };
    v.src = url; v.play().catch((err) => { if (err && err.name === 'NotAllowedError') tapToPlay(v, msg); }); return;
  }
  try { await loadHlsJs(); } catch (e) { failMsg(); return; }
  if (token !== S.playTok) return;
  if (!window.Hls || !Hls.isSupported()) { failMsg(); return; }
  const h = new Hls({ liveSyncDurationCount: 2, maxBufferLength: 20, startFragPrefetch: true }); S.hls = h; let tries = 0;
  h.on(Hls.Events.ERROR, (_, d) => { if (d.fatal) { if (tries++ < 1) { h.loadSource(url); h.startLoad(); } else failMsg(); } });
  h.loadSource(url); h.attachMedia(v); h.on(Hls.Events.MANIFEST_PARSED, () => v.play().catch(() => {}));
}
// VOD (movies / episodes): plain file playback
async function loadVideo(v, url, o) {
  o = o || {}; stopVideo(v);
  const msg = o.msg;
  const show = (html) => { if (!msg) return; msg.innerHTML = html; msg.classList.toggle('hidden', !html); };
  show('<div class="spin"></div>');
  v.oncanplay = v.onplaying = () => show('');
  v.onwaiting = () => show('<div class="spin"></div>');
  v.onerror = () => show('This video can\'t play here.<br>The format may not be supported on this device.');
  v.src = url;
  if (o.start) v.addEventListener('loadedmetadata', () => { try { v.currentTime = o.start; } catch (e) {} }, { once: true });
  v.play().catch(() => {});
}
function goFull(v) {
  try {
    if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (v.requestFullscreen) v.requestFullscreen();
  } catch (e) {}
}

/* ---------------- full player (movies / episodes) ---------------- */
let fpEl = null;
function closePlayer() {
  if (!fpEl) return;
  const v = $('video', fpEl); if (fpEl._save) fpEl._save(); stopVideo(v);
  fpEl.remove(); fpEl = null;
}
function openPlayer(o) {
  closePlayer();
  const prev = progAll()[o.pid];
  const start = prev && prev.t > 30 && prev.t / prev.d < 0.95 ? prev.t : 0;
  fpEl = document.createElement('div'); fpEl.className = 'fp';
  fpEl.innerHTML = `<div class="top"><button class="ibtn" id="fpx">${I.back}</button><h3 dir="auto">${esc(o.title)}</h3>
    <button class="ibtn" id="fpf">${I.full}</button></div>
    <div class="vw"><video playsinline webkit-playsinline controls autoplay></video><div class="vmsg hidden"></div>
    <div class="nextb hidden"><button class="btn red">${I.play} Next episode</button></div></div>`;
  document.body.appendChild(fpEl);
  const v = $('video', fpEl);
  $('#fpx', fpEl).onclick = closePlayer;
  $('#fpf', fpEl).onclick = () => goFull(v);
  if (o.live) playLive(v, o.live, $('.vmsg', fpEl)); else loadVideo(v, o.url, { msg: $('.vmsg', fpEl), start });
  if (start) toast('Resuming from ' + fmtTime(start));
  const save = () => { if (v.duration && isFinite(v.duration) && v.currentTime > 5)
    progSet(o.pid, { t: v.currentTime, d: v.duration, title: o.title, img: o.img, kind: o.kind, sid: o.sid, ext: o.ext, series: o.series }); };
  fpEl._save = save;
  const iv = setInterval(save, 5000);
  v.addEventListener('emptied', () => {}, { once: true });
  const nb = $('.nextb', fpEl);
  if (o.next) {
    v.addEventListener('timeupdate', () => { if (v.duration && v.duration - v.currentTime < 40) nb.classList.remove('hidden'); });
    $('button', nb).onclick = () => { save(); clearInterval(iv); o.next(); };
    v.addEventListener('ended', () => { save(); clearInterval(iv); setTimeout(() => o.next && o.next(), 800); });
  }
  const oldRemove = fpEl.remove.bind(fpEl);
  fpEl.remove = () => { clearInterval(iv); oldRemove(); };
}

/* ---------------- movies / series grids ---------------- */
async function renderGridSection(kind, catId) {
  const isV = kind === 'vod';
  app.innerHTML = sideLayout(isV ? 'Movies' : 'Series');
  const main = $('#secmain'); main.innerHTML = `<div id="gw">${spinner()}</div>`;
  let cats;
  try { cats = await cached(isV ? 'vc' : 'sc', { action: isV ? 'get_vod_categories' : 'get_series_categories' }); }
  catch (e) { $('#gw').innerHTML = empty(e.message); return; }
  const fkind = isV ? 'movie' : 'series';
  const fav = favs(fkind);
  const allCats = (fav.length ? [{ category_id: 'fav', category_name: '★ Favorites' }] : []).concat(cats);
  const ck = 'lastCat_' + kind + '_' + acckey();
  if (!catId) catId = store.get(ck, null);
  if (!allCats.some(c => String(c.category_id) === String(catId))) catId = allCats.length ? allCats[0].category_id : null;
  wireSide(allCats, catId, (c) => load(c));
  async function load(cid) {
    store.set(ck, cid);
    $('#gw').innerHTML = spinner();
    let items;
    try {
      if (cid === 'fav') items = favs(fkind).map(f => f.raw);
      else items = await cached((isV ? 'vs_' : 'ss_') + cid, { action: isV ? 'get_vod_streams' : 'get_series', category_id: cid });
    } catch (e) { $('#gw').innerHTML = empty(e.message); return; }
    posterGrid($('#gw'), items, isV);
    window.scrollTo(0, 0);
  }
  if (catId != null) load(String(catId));
}
function posterCard(it, isV) {
  const id = isV ? it.stream_id : it.series_id;
  const pic = img(isV ? it.stream_icon : it.cover);
  const r = parseFloat(it.rating_5based || 0) ? (parseFloat(it.rating_5based) * 2).toFixed(1) : (parseFloat(it.rating) ? parseFloat(it.rating).toFixed(1) : '');
  return `<button class="pc" data-go="${isV ? '#/movie/' : '#/show/'}${esc(id)}">
    <div class="po" ${pic ? `style="background-image:url('${esc(pic)}')"` : ''}>${pic ? '' : `<div class="ph" dir="auto">${esc(it.name)}</div>`}${r && r !== '0.0' ? `<span class="rt">★ ${r}</span>` : ''}</div>
    <div class="t" dir="auto">${esc(it.name)}</div></button>`;
}
function posterGrid(el, items, isV) {
  if (!items || !items.length) { el.innerHTML = empty('Nothing here yet'); return; }
  el.innerHTML = '<div class="grid"></div><div class="sent" style="height:40px"></div>';
  const g = $('.grid', el); let n = 0;
  const more = () => { g.insertAdjacentHTML('beforeend', items.slice(n, n + PAGE).map(i => posterCard(i, isV)).join('')); n += PAGE; if (n >= items.length) io.disconnect(); };
  const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) more(); }, { rootMargin: '600px' });
  more(); io.observe($('.sent', el)); onLeave(() => io.disconnect());
}

/* ---------------- movie details ---------------- */
async function renderMovie(id) {
  app.innerHTML = bar('Movie') + spinner();
  let j;
  try { j = await cached('vi_' + id, { action: 'get_vod_info', vod_id: id }); } catch (e) { app.innerHTML = bar('Movie') + empty(e.message); return; }
  const info = (j && j.info) || {}, md = (j && j.movie_data) || {};
  const name = md.name || info.name || 'Movie';
  const poster = img(info.movie_image || info.cover_big);
  const bd = img(Array.isArray(info.backdrop_path) ? info.backdrop_path[0] : info.backdrop_path) || poster;
  const year = (info.releasedate || info.release_date || '').slice(0, 4);
  const rating = parseFloat(info.rating) ? parseFloat(info.rating).toFixed(1) : '';
  const pid = 'm' + md.stream_id;
  const pr = progAll()[pid];
  const resume = pr && pr.t > 30 && pr.t / pr.d < 0.95;
  app.innerHTML = bar(name) + `<div class="hero" style="background-image:url('${esc(bd)}')"><div class="in">
      <div class="pst" style="background-image:url('${esc(poster)}')"></div>
      <div><h2 dir="auto">${esc(name)}</h2><div class="meta">${year ? `<span>${esc(year)}</span>` : ''}${rating ? `<span class="g">★ ${rating}</span>` : ''}
      ${info.duration ? `<span>${esc(info.duration)}</span>` : ''}${info.genre ? `<span>${esc(info.genre)}</span>` : ''}</div></div></div></div>
    <div class="dbody"><div class="acts"><button class="btn red" id="pl">${I.play} ${resume ? 'Resume ' + fmtTime(pr.t) : 'Play'}</button>
      <button class="ibtn ${isFav('movie', md.stream_id) ? 'on' : ''}" id="fv">${isFav('movie', md.stream_id) ? I.star : I.starO}</button></div>
      ${resume ? '<button class="btn ghost" id="pl0">Play from beginning</button>' : ''}
      <p dir="auto">${esc(info.plot || info.description || '')}</p>
      ${info.cast ? `<p dir="auto"><b style="color:var(--silver)">Cast:</b> ${esc(info.cast)}</p>` : ''}
      ${info.director ? `<p dir="auto"><b style="color:var(--silver)">Director:</b> ${esc(info.director)}</p>` : ''}</div>`;
  const go = () => openPlayer({ title: name, url: playUrl('movie', md.stream_id, md.container_extension || 'mp4'), pid, img: bd || poster, kind: 'movie', sid: md.stream_id, ext: md.container_extension || 'mp4' });
  $('#pl').onclick = go;
  if ($('#pl0')) $('#pl0').onclick = () => { progSet(pid, { t: 0 }); go(); };
  $('#fv').onclick = (e) => { const b = e.currentTarget;
    const raw = { stream_id: md.stream_id, name, stream_icon: poster, rating: info.rating };
    const on = toggleFav('movie', { id: md.stream_id, raw }); b.classList.toggle('on', on); b.innerHTML = on ? I.star : I.starO; toast(on ? 'Added to favorites' : 'Removed from favorites'); };
}

/* ---------------- series details ---------------- */
async function renderShow(id) {
  app.innerHTML = bar('Series') + spinner();
  let j;
  try { j = await cached('si_' + id, { action: 'get_series_info', series_id: id }); } catch (e) { app.innerHTML = bar('Series') + empty(e.message); return; }
  const info = (j && j.info) || {};
  let eps = (j && j.episodes) || {};
  if (Array.isArray(eps)) { const o = {}; eps.forEach((arr, i) => { if (arr && arr.length) o[arr[0].season || i + 1] = arr; }); eps = o; }
  const seasons = Object.keys(eps).sort((a, b) => +a - +b);
  const name = info.name || 'Series';
  const cover = img(info.cover);
  const bd = img(Array.isArray(info.backdrop_path) ? info.backdrop_path[0] : info.backdrop_path) || cover;
  const year = (info.releaseDate || info.release_date || '').slice(0, 4);
  const rating = parseFloat(info.rating) ? parseFloat(info.rating).toFixed(1) : '';
  let season = store.get('lastSeason_' + id, seasons[0]);
  if (!seasons.includes(String(season))) season = seasons[0];
  app.innerHTML = bar(name) + `<div class="hero" style="background-image:url('${esc(bd)}')"><div class="in">
      <div class="pst" style="background-image:url('${esc(cover)}')"></div>
      <div><h2 dir="auto">${esc(name)}</h2><div class="meta">${year ? `<span>${esc(year)}</span>` : ''}${rating ? `<span class="g">★ ${rating}</span>` : ''}
      ${info.genre ? `<span>${esc(info.genre)}</span>` : ''}<span>${seasons.length} season${seasons.length === 1 ? '' : 's'}</span></div></div></div></div>
    <div class="dbody"><div class="acts"><button class="btn red" id="pl">${I.play} Play</button>
      <button class="ibtn ${isFav('series', id) ? 'on' : ''}" id="fv">${isFav('series', id) ? I.star : I.starO}</button></div>
      <p dir="auto">${esc(info.plot || '')}</p>
      <div class="seasons" id="ssn"></div><div id="eps"></div></div>`;
  if (!seasons.length) { $('#eps').innerHTML = empty('No episodes yet'); $('#pl').disabled = true; }
  const flat = []; seasons.forEach(s => (eps[s] || []).forEach(e => flat.push(Object.assign({ _s: s }, e))));
  const epTitle = (e) => `S${e._s || e.season} E${e.episode_num} · ${e.title || ''}`.replace(/ · $/, '');
  function playEp(e) {
    const idx = flat.indexOf(e);
    const nx = flat[idx + 1];
    const i = e.info || {};
    openPlayer({ title: name + ' - ' + epTitle(e), url: playUrl('series', e.id, e.container_extension || 'mp4'), pid: 'e' + e.id,
      img: img(i.movie_image) || bd || cover, kind: 'ep', series: id, sid: e.id, ext: e.container_extension,
      next: nx ? () => playEp(nx) : null });
  }
  function drawSeason() {
    store.set('lastSeason_' + id, season);
    $('#ssn').innerHTML = seasons.map(s => `<button class="chip ${s === String(season) ? 'on' : ''}" data-s="${esc(s)}">Season ${esc(s)}</button>`).join('');
    $$('#ssn .chip').forEach(b => b.onclick = () => { season = b.dataset.s; drawSeason(); });
    const pa = progAll();
    const list = flat.filter(e => String(e._s) === String(season));
    $('#eps').innerHTML = list.map(e => { const i = e.info || {}; const p = pa['e' + e.id];
      return `<button class="ep" data-e="${flat.indexOf(e)}"><div class="th" style="background-image:url('${esc(img(i.movie_image) || cover)}')"><div class="pl">${I.play}</div>
        ${p && p.d ? `<div class="prog" style="width:${Math.min(100, p.t / p.d * 100)}%"></div>` : ''}</div>
        <div class="i"><b dir="auto">${esc(e.episode_num + '. ' + (e.title || 'Episode ' + e.episode_num))}</b>
        <small dir="auto">${esc([i.duration, i.plot].filter(Boolean).join(' · '))}</small></div></button>`; }).join('') || empty('No episodes');
    $$('#eps .ep').forEach(b => b.onclick = () => playEp(flat[+b.dataset.e]));
  }
  if (seasons.length) drawSeason();
  $('#pl').onclick = () => {
    if (!flat.length) return;
    const pa = progAll();
    // continue the last watched episode, else the first one
    let best = null; flat.forEach(e => { const p = pa['e' + e.id]; if (p && (!best || p.ts > best.p.ts)) best = { e, p }; });
    if (best) { const done = best.p.d && best.p.t / best.p.d >= 0.95; const k = flat.indexOf(best.e); playEp(done && flat[k + 1] ? flat[k + 1] : best.e); }
    else playEp(flat[0]);
  };
  $('#fv').onclick = (e) => { const b = e.currentTarget;
    const on = toggleFav('series', { id, raw: { series_id: id, name, cover, rating: info.rating } });
    b.classList.toggle('on', on); b.innerHTML = on ? I.star : I.starO; toast(on ? 'Added to favorites' : 'Removed from favorites'); };
}

/* ---------------- search ---------------- */
async function loadAll() {
  const [l, v, s] = await Promise.all([
    cached('all_l', { action: 'get_live_streams' }).catch(() => []),
    cached('all_v', { action: 'get_vod_streams' }).catch(() => []),
    cached('all_s', { action: 'get_series' }).catch(() => []),
  ]);
  return { l, v, s };
}
function renderSearch() {
  app.innerHTML = bar('Search') + `<div class="sbox"><input class="input" id="q" placeholder="Channels, movies, series..." autocapitalize="off" autocorrect="off" dir="auto" enterkeyhint="search"></div><div class="sres" id="sr">${empty('Loading the full list...')}</div>`;
  const q = $('#q'); setTimeout(() => q.focus(), 50);
  let data = null;
  loadAll().then(d => { data = d; $('#sr').innerHTML = empty('Type to search'); if (q.value) go(); });
  let t; q.oninput = () => { clearTimeout(t); t = setTimeout(go, 250); };
  q.onkeydown = (e) => { if (e.key === 'Enter') q.blur(); };
  function go() {
    if (!data) return;
    const s = q.value.trim().toLowerCase(); const el = $('#sr');
    if (s.length < 2) { el.innerHTML = empty('Type at least 2 letters'); return; }
    const m = (x) => String(x.name || '').toLowerCase().includes(s);
    const L = data.l.filter(m).slice(0, 40), V = data.v.filter(m).slice(0, 60), Sr = data.s.filter(m).slice(0, 60);
    if (!L.length && !V.length && !Sr.length) { el.innerHTML = empty('No results'); return; }
    el.innerHTML = (L.length ? `<h4>Channels</h4><div class="list">${L.map((c, i) => `<div class="row" data-li="${i}"><div class="lg">${img(c.stream_icon) ? `<img loading="lazy" src="${esc(img(c.stream_icon))}">` : '<span class="ph">TV</span>'}</div><div class="nm"><div dir="auto">${esc(c.name)}</div></div></div>`).join('')}</div>` : '')
      + (V.length ? `<h4>Movies</h4><div class="grid">${V.map(i => posterCard(i, true)).join('')}</div>` : '')
      + (Sr.length ? `<h4>Series</h4><div class="grid">${Sr.map(i => posterCard(i, false)).join('')}</div>` : '');
    $$('[data-li]', el).forEach(r => r.onclick = () => { const c = L[+r.dataset.li];
      openPlayer({ title: c.name, live: c, pid: 'l' + c.stream_id, kind: 'live' }); });
  }
}

/* ---------------- new ---------------- */
async function renderNew() {
  app.innerHTML = bar('New', { search: true }) + `<div class="chips"><button class="chip on" data-k="v">New Movies</button><button class="chip" data-k="s">New Series</button></div><div id="nw">${spinner()}</div>`;
  const d = await loadAll();
  const nv = d.v.slice().sort((a, b) => (+b.added || 0) - (+a.added || 0)).slice(0, 120);
  const ns = d.s.slice().sort((a, b) => (+b.last_modified || 0) - (+a.last_modified || 0)).slice(0, 120);
  const show = (k) => posterGrid($('#nw'), k === 'v' ? nv : ns, k === 'v');
  $$('.chips .chip').forEach(b => b.onclick = () => { $$('.chips .chip').forEach(x => x.classList.toggle('on', x === b)); show(b.dataset.k); });
  show('v');
}

route();
syncActivation();
document.addEventListener('visibilitychange', () => { if (!document.hidden) syncActivation(); });
})();
