/* Arab Sat - web IPTV player (Xtream). Black / red / silver, same identity as the ArabeskTV app. */
(function () {
'use strict';

const SUPPORT = { show: '+1 (682) 597-5255', tel: '+16825975255', wa: '16825975255' };
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

/* ---------------- login ---------------- */
async function renderLogin(err) {
  let sel = store.get('lastServer', 0);
  app.innerHTML = `<div class="login"><div class="card">
    <div class="big"><img src="icon-512.png" alt=""><div class="w">ARAB <b>SAT</b></div><div class="ar">عرب سات</div></div>
    <form id="lf" autocomplete="on">
      <div class="field"><label>Server</label><div class="servers" id="srvs">${spinner()}</div></div>
      <div class="field"><label>Username</label><input class="input" id="lu" autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="username" value="${esc(store.get('lastUser', ''))}"></div>
      <div class="field"><label>Password</label><div class="pw"><input class="input" id="lp" type="password" autocapitalize="off" autocorrect="off" autocomplete="current-password"><button type="button" class="eye" id="eye">${I.eye}</button></div></div>
      <button class="btn red" id="lb" type="submit">Login</button>
      <div class="err" id="le">${esc(err || '')}</div>
    </form></div>${supportHTML()}</div>`;
  $('#eye').onclick = () => { const p = $('#lp'); p.type = p.type === 'password' ? 'text' : 'password'; };
  try {
    if (!S.servers.length) S.servers = await (await fetch('/api/servers')).json();
  } catch (e) { $('#le').textContent = 'Cannot reach Arab Sat. Check your internet.'; }
  if (sel >= S.servers.length) sel = 0;
  const box = $('#srvs');
  box.innerHTML = S.servers.map(s => `<button type="button" class="srv ${s.id === sel ? 'on' : ''}" data-s="${s.id}">${esc(s.name)}</button>`).join('');
  $$('.srv', box).forEach(b => b.onclick = () => { sel = +b.dataset.s; $$('.srv', box).forEach(x => x.classList.toggle('on', x === b)); });
  $('#lf').onsubmit = async (e) => {
    e.preventDefault();
    const u = $('#lu').value.trim(), p = $('#lp').value.trim();
    if (!u || !p) { $('#le').textContent = 'Enter username and password'; return; }
    const btn = $('#lb'); btn.disabled = true; btn.innerHTML = '<div class="spin" style="width:24px;height:24px"></div>'; $('#le').textContent = '';
    const acc = { s: sel, u, p, name: (S.servers[sel] || {}).name || '' };
    try {
      const j = await api({}, acc);
      const ui = j && j.user_info;
      if (!ui || String(ui.auth) !== '1') throw new Error('Wrong username or password');
      if (ui.status && ui.status !== 'Active') throw new Error('This account is ' + ui.status);
      acc.info = ui;
      S.acc = acc; store.set('acc', acc); store.set('lastServer', sel); store.set('lastUser', u);
      location.hash = '#/'; route();
    } catch (er) {
      $('#le').textContent = er.message || 'Login failed';
      btn.disabled = false; btn.textContent = 'Login';
    }
  };
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
  cached('vc', { action: 'get_vod_categories' }).catch(() => {});
  cached('sc', { action: 'get_series_categories' }).catch(() => {});
  refreshAccount();
}
async function refreshAccount() {
  try { const j = await api({}); if (j && j.user_info && String(j.user_info.auth) === '1') { S.acc.info = j.user_info; store.set('acc', S.acc); } } catch (e) {}
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
    <div class="kv"><span>Username</span><b>${esc(S.acc.u)}</b></div>
    <div class="kv"><span>Server</span><b>${esc(S.acc.name)}</b></div>
    <div class="kv"><span>Status</span><b class="${ui.status === 'Active' ? 'ok' : ''}">${esc(ui.status || '-')}</b></div>
    <div class="kv"><span>Expires</span><b>${esc(exp)}</b></div>
    <div class="kv"><span>Connections</span><b>${esc((ui.active_cons || 0) + ' / ' + (ui.max_connections || '-'))}</b></div>
    <div style="height:16px"></div>
    <button class="btn ghost" id="clr">Clear watch history</button>
    <button class="btn red" id="lo" style="margin-top:10px">Log out</button>
    ${supportHTML()}</div>`;
  document.body.appendChild(bg);
  bg.onclick = (e) => { if (e.target === bg) bg.remove(); };
  $('#lo', bg).onclick = () => { store.del('acc'); S.acc = null; S.mem = {}; bg.remove(); location.hash = '#/'; route(); };
  $('#clr', bg).onclick = () => { store.del('prog_' + acckey()); bg.remove(); toast('Watch history cleared'); route(); };
}

/* ---------------- live ---------------- */
async function renderLive(catId) {
  app.innerHTML = bar('Live TV', { search: true }) + `<div class="chips" id="chips"></div><div class="liveLayout">
    <div class="livebox hidden" id="lbx"><div class="vwrap"><video id="lv" playsinline webkit-playsinline controls autoplay></video>
      <div class="vmsg hidden" id="vm"></div></div>
      <div class="nowbar"><span class="live">LIVE</span><div class="tx"><div id="nn" dir="auto"></div><small id="ne" dir="auto"></small></div>
      <button class="ibtn" id="fs">${I.full}</button><button class="ibtn" id="xc">${I.close}</button></div></div>
    <div class="list" id="ll">${spinner()}</div></div>`;
  let cats;
  try { cats = await cached('lc', { action: 'get_live_categories' }); } catch (e) { $('#ll').innerHTML = empty(e.message); return; }
  const fav = favs('live');
  const allCats = (fav.length ? [{ category_id: 'fav', category_name: '★ Favorites' }] : []).concat(cats);
  if (!catId) catId = store.get('lastLiveCat_' + acckey(), null);
  if (!allCats.some(c => String(c.category_id) === String(catId))) catId = allCats.length ? allCats[0].category_id : null;
  $('#chips').innerHTML = allCats.map(c => `<button class="chip ${String(c.category_id) === String(catId) ? 'on' : ''}" data-c="${esc(c.category_id)}" dir="auto">${esc(c.category_name)}</button>`).join('');
  const on = $('#chips .chip.on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
  $$('#chips .chip').forEach(b => b.onclick = () => { $$('#chips .chip').forEach(x => x.classList.toggle('on', x === b)); loadCat(b.dataset.c); });
  let current = null, list = [];
  const video = $('#lv');
  onLeave(() => stopVideo(video));
  $('#xc').onclick = () => { stopVideo(video); $('#lbx').classList.add('hidden'); current = null; $$('.row.on').forEach(r => r.classList.remove('on')); };
  $('#fs').onclick = () => goFull(video);

  async function loadCat(cid) {
    store.set('lastLiveCat_' + acckey(), cid);
    $('#ll').innerHTML = spinner();
    try {
      if (cid === 'fav') list = favs('live').map(f => f.raw);
      else list = await cached('ls_' + cid, { action: 'get_live_streams', category_id: cid });
    } catch (e) { $('#ll').innerHTML = empty(e.message); return; }
    if (!list.length) { $('#ll').innerHTML = empty('No channels here'); return; }
    renderRows(0);
  }
  function rowHTML(c, i) {
    const lg = img(c.stream_icon);
    return `<div class="row ${current && current.stream_id == c.stream_id ? 'on' : ''}" data-i="${i}">
      <span class="no">${esc(c.num || i + 1)}</span>
      <div class="lg">${lg ? `<img loading="lazy" src="${esc(lg)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'TV'}))">` : '<span class="ph">TV</span>'}</div>
      <div class="nm"><div dir="auto">${esc(c.name)}</div></div>
      <button class="star ${isFav('live', c.stream_id) ? 'on' : ''}" data-f="${i}">${isFav('live', c.stream_id) ? I.star : I.starO}</button></div>`;
  }
  function renderRows(from) {
    const el = $('#ll'); if (from === 0) el.innerHTML = '';
    const part = list.slice(from, from + 200);
    el.insertAdjacentHTML('beforeend', part.map((c, k) => rowHTML(c, from + k)).join(''));
    if (from + 200 < list.length) setTimeout(() => renderRows(from + 200), 60);
  }
  $('#ll').onclick = (e) => {
    const f = e.target.closest('[data-f]');
    if (f) { const c = list[+f.dataset.f]; const nowOn = toggleFav('live', { id: c.stream_id, raw: c });
      f.classList.toggle('on', nowOn); f.innerHTML = nowOn ? I.star : I.starO; toast(nowOn ? 'Added to favorites' : 'Removed from favorites'); return; }
    const r = e.target.closest('.row'); if (!r) return;
    const c = list[+r.dataset.i];
    if (current && current.stream_id == c.stream_id) { goFull(video); return; }
    $$('.row.on').forEach(x => x.classList.remove('on')); r.classList.add('on');
    current = c; playLive(c);
  };
  function playLive(c) {
    $('#lbx').classList.remove('hidden');
    $('#nn').textContent = c.name; $('#ne').textContent = '';
    loadVideo(video, playUrl('live', c.stream_id, 'm3u8'), { live: true, msg: $('#vm') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    api({ action: 'get_short_epg', stream_id: c.stream_id, limit: 2 }).then(j => {
      if (current !== c) return;
      const L = (j && j.epg_listings) || [];
      if (!L.length) return;
      const t = (x) => { const d = new Date((x.start_timestamp || 0) * 1000); return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); };
      $('#ne').textContent = 'Now: ' + b64(L[0].title) + (L[1] ? '  ·  ' + t(L[1]) + ' ' + b64(L[1].title) : '');
    }).catch(() => {});
  }
  if (catId != null) loadCat(String(catId));
}

/* ---------------- video engine ---------------- */
const canNativeHls = () => !!document.createElement('video').canPlayType('application/vnd.apple.mpegurl');
function loadHlsJs() {
  if (window.Hls) return Promise.resolve();
  return new Promise((res, rej) => { const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
}
function stopVideo(v) {
  if (S.hls) { try { S.hls.destroy(); } catch (e) {} S.hls = null; }
  if (v) { try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) {} }
}
async function loadVideo(v, url, o) {
  o = o || {}; stopVideo(v);
  const msg = o.msg; let tries = 0;
  const show = (html) => { if (!msg) return; msg.innerHTML = html; msg.classList.toggle('hidden', !html); };
  show('<div class="spin"></div>');
  v.oncanplay = v.onplaying = () => show('');
  v.onwaiting = () => show('<div class="spin"></div>');
  const fail = () => show(o.live ? 'This channel is not available right now.<br>Try another channel.' :
    'This video can\'t play here.<br>The format may not be supported on this device.');
  const isHls = /\.m3u8(\?|$)/.test(url);
  if (!isHls || canNativeHls()) {
    v.onerror = () => { if (o.live && tries < 2) { tries++; setTimeout(() => { v.src = url + (url.includes('?') ? '&' : '?') + 'r=' + tries; v.play().catch(() => {}); }, 1500); } else fail(); };
    v.src = url;
    if (o.start) v.addEventListener('loadedmetadata', () => { try { v.currentTime = o.start; } catch (e) {} }, { once: true });
    v.play().catch(() => {});
    return;
  }
  try { await loadHlsJs(); } catch (e) { fail(); return; }
  if (!window.Hls || !Hls.isSupported()) { v.src = url; v.play().catch(fail); return; }
  const h = new Hls({ lowLatencyMode: false, maxBufferLength: 30 }); S.hls = h;
  h.on(Hls.Events.ERROR, (_, d) => { if (d.fatal) { if (tries++ < 2) { h.loadSource(url); h.startLoad(); } else fail(); } });
  h.loadSource(url); h.attachMedia(v);
  h.on(Hls.Events.MANIFEST_PARSED, () => v.play().catch(() => {}));
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
  loadVideo(v, o.url, { msg: $('.vmsg', fpEl), start });
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
  const title = isV ? 'Movies' : 'Series';
  app.innerHTML = bar(title, { search: true }) + `<div class="chips" id="chips"></div><div id="gw">${spinner()}</div>`;
  let cats;
  try { cats = await cached(isV ? 'vc' : 'sc', { action: isV ? 'get_vod_categories' : 'get_series_categories' }); }
  catch (e) { $('#gw').innerHTML = empty(e.message); return; }
  const fkind = isV ? 'movie' : 'series';
  const fav = favs(fkind);
  const allCats = (fav.length ? [{ category_id: 'fav', category_name: '★ Favorites' }] : []).concat(cats);
  const ck = 'lastCat_' + kind + '_' + acckey();
  if (!catId) catId = store.get(ck, null);
  if (!allCats.some(c => String(c.category_id) === String(catId))) catId = allCats.length ? allCats[0].category_id : null;
  $('#chips').innerHTML = allCats.map(c => `<button class="chip ${String(c.category_id) === String(catId) ? 'on' : ''}" data-c="${esc(c.category_id)}" dir="auto">${esc(c.category_name)}</button>`).join('');
  const on = $('#chips .chip.on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
  $$('#chips .chip').forEach(b => b.onclick = () => { $$('#chips .chip').forEach(x => x.classList.toggle('on', x === b)); load(b.dataset.c); });
  async function load(cid) {
    store.set(ck, cid);
    $('#gw').innerHTML = spinner();
    let items;
    try {
      if (cid === 'fav') items = favs(fkind).map(f => f.raw);
      else items = await cached((isV ? 'vs_' : 'ss_') + cid, { action: isV ? 'get_vod_streams' : 'get_series', category_id: cid });
    } catch (e) { $('#gw').innerHTML = empty(e.message); return; }
    posterGrid($('#gw'), items, isV);
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
      openPlayer({ title: c.name, url: playUrl('live', c.stream_id, 'm3u8'), pid: 'l' + c.stream_id, kind: 'live' }); });
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
})();
