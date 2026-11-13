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

/* ---------------- settings: theme + language ---------------- */
function prefs() { return store.get('prefs', { theme: 'dark', lang: 'en' }); }
function setPref(k, v) { const p = prefs(); p[k] = v; store.set('prefs', p); applyPrefs(); if (k === 'lang') { untranslate(); route(); } }
function applyPrefs() {
  const p = prefs();
  document.body.classList.toggle('light', p.theme === 'light');
  document.documentElement.lang = p.lang === 'ar' ? 'ar' : 'en';
  document.body.classList.toggle('ar', p.lang === 'ar');
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = p.theme === 'light' ? '#F6F1EC' : '#17060A';
}
const AR = {
  'Live TV': 'البث المباشر', 'Movies': 'الأفلام', 'Series': 'المسلسلات', 'New Releases': 'الجديد', 'Latest movies & series': 'أحدث الأفلام والمسلسلات',
  'Continue Watching': 'كمّل المشاهدة', 'Categories': 'الأقسام', 'Search in categories': 'دوّر في الأقسام', 'Search': 'بحث', 'NEW': 'جديد',
  'Active until': 'الاشتراك لحد', 'Expiration Date': 'تاريخ انتهاء الاشتراك', 'Customer Service': 'خدمة العملاء', 'Call': 'اتصال', 'WhatsApp': 'واتساب', 'Clear sky': 'السما صافية', 'Clear night': 'ليل صافي', 'Partly cloudy': 'غيوم خفيفة', 'Cloudy': 'غايم', 'Foggy': 'شبورة', 'Rainy': 'مطر', 'Snowy': 'تلج', 'Thunderstorm': 'عاصفة رعدية', 'Weather': 'الطقس', 'Locating…': 'بنحدد مكانك…', 'Unlimited': 'غير محدود', 'My Account': 'حسابي', 'Activation code': 'كود التفعيل', 'Username': 'اليوزرنيم',
  'Server': 'السيرفر', 'Status': 'الحالة', 'Expires': 'ينتهي', 'Connections': 'الأجهزة', 'Settings': 'الإعدادات', 'Appearance': 'الشكل',
  'Language': 'اللغة', '🌙 Dark': '🌙 داكن', '☀️ Light': '☀️ فاتح', 'Clear watch history': 'امسح سجل المشاهدة', 'Call': 'اتصال', 'WhatsApp': 'واتساب',
  'Active': 'شغال', 'Expired': 'منتهي', 'Banned': 'موقوف', 'Disabled': 'متوقف', 'LIVE': 'مباشر', 'Program guide': 'جدول البرامج',
  'No program info': 'مفيش بيانات للبرنامج', 'No program guide for this channel': 'مفيش جدول برامج للقناة دي', 'No channels here': 'مفيش قنوات هنا',
  'Nothing here yet': 'لسه مفيش حاجة هنا', 'No categories': 'مفيش أقسام', '★ Favorites': '★ المفضلة', 'Play': 'تشغيل', 'Watch again': 'شاهد تاني',
  'Start from the beginning': 'ابدأ من الأول', '✓ Watched': '✓ اتشاف', 'Last watched': 'آخر حاجة اتشافت', 'Next episode': 'الحلقة اللي بعدها',
  'Season': 'الموسم', 'Cast:': 'الممثلين:', 'Director:': 'الإخراج:', 'Channels': 'القنوات', 'New Movies': 'أفلام جديدة', 'New Series': 'مسلسلات جديدة',
  'Channels, movies, series...': 'قنوات، أفلام، مسلسلات...', 'Type to search': 'اكتب علشان تدوّر', 'Type at least 2 letters': 'اكتب حرفين على الأقل',
  'No results': 'مفيش نتايج', 'Loading the full list...': 'بيحمّل القايمة كلها...', 'Added to favorites': 'اتضافت للمفضلة', 'Removed from favorites': 'اتشالت من المفضلة',
  'Lists refreshed': 'القوايم اتحدّثت', 'Watch history cleared': 'سجل المشاهدة اتمسح', 'Sorted A to Z': 'مترتبة أبجدياً', 'Original order': 'الترتيب الأصلي',
  'Your activation code': 'كود التفعيل بتاعك', 'Waiting for activation...': 'مستني التفعيل...', 'Get my code · خد الكود': 'خد الكود',
  'Send this code to Arabesk customer service to activate your app.': 'ابعت الكود ده لخدمة عملاء Arabesk علشان يتفعّل التطبيق.',
  'Waiting for Face ID...': 'مستني بصمة الوش...', 'Install the app first': 'نزّل التطبيق الأول', 'Choose a channel': 'اختار قناة',
  'This channel is not available right now.': 'القناة دي مش متاحة دلوقتي.', 'Try another channel.': 'جرّب قناة تانية.',
  'This account is already watching on another device.': 'الحساب ده شغال على جهاز تاني دلوقتي.', 'Tap to play': 'دوس للتشغيل',
  'Please contact customer service.': 'كلّم خدمة العملاء.', 'Cannot reach Arab Sat. Check your internet.': 'مش قادر يوصل لـ Arab Sat. اتأكد من النت.',
  'Movie': 'فيلم', 'Episode': 'حلقة', 'Stopped at': 'وقفت عند', 'of': 'من', 'No episodes yet': 'لسه مفيش حلقات', 'No episodes': 'مفيش حلقات',
};
const AR_RX = [
  [/^Continue watching from (.+)$/, 'كمّل من $1'], [/^Continue · (.+) left$/, 'كمّل · فاضل $1'], [/^Continue S(\d+) E(\d+)$/, 'كمّل م$1 ح$2'],
  [/^Play S(\d+) E(\d+)$/, 'شغّل م$1 ح$2'], [/^Season (\d+)$/, 'الموسم $1'], [/^● In progress · (.+) left$/, '● شغال فيها · فاضل $1'],
  [/^(\d+) seasons?$/, '$1 موسم'], [/^Now: (.+)$/, 'دلوقتي: $1'], [/^Resuming from (.+)$/, 'بيكمّل من $1'], [/^\+(\d+)s$/, '+$1ث'], [/^-(\d+)s$/, '-$1ث'],
];
function trText(t) {
  const k = t.trim(); if (!k) return null;
  if (AR[k]) return t.replace(k, AR[k]);
  for (const [rx, rep] of AR_RX) if (rx.test(k)) return t.replace(k, k.replace(rx, rep));
  return null;
}
const ORIG = new WeakMap();
function translateNode(root) {
  if (prefs().lang !== 'ar' || !root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const list = []; let n; while ((n = w.nextNode())) list.push(n);
  list.forEach(tn => { if (tn.parentElement && tn.parentElement.closest('[data-notr],script,style')) return; const r = trText(tn.nodeValue); if (r != null && r !== tn.nodeValue) { if (!ORIG.has(tn)) ORIG.set(tn, tn.nodeValue); tn.nodeValue = r; } });
  if (root.querySelectorAll) root.querySelectorAll('[placeholder]').forEach(el => { const r = trText(el.getAttribute('placeholder')); if (r) el.setAttribute('placeholder', r); });
}
function untranslate() { /* a fresh render puts the English back */ }
const trObs = new MutationObserver((muts) => { if (prefs().lang !== 'ar') return; trObs.disconnect();
  muts.forEach(m => { if (m.type === 'characterData') translateNode(m.target.parentNode); else m.addedNodes.forEach(nd => { if (nd.nodeType === 1) translateNode(nd); else if (nd.nodeType === 3 && nd.parentNode) translateNode(nd.parentNode); }); });
  trObs.observe(document.body, { childList: true, subtree: true, characterData: true }); });
trObs.observe(document.body, { childList: true, subtree: true, characterData: true });
applyPrefs();

/* ---------------- router ---------------- */
let cleanup = [];
function onLeave(fn) { cleanup.push(fn); }
function route() {
  cleanup.forEach(f => { try { f(); } catch (e) {} }); cleanup = []; S.onPlayerClose = null;
  closePlayer();
  window.scrollTo(0, 0); app.scrollTop = 0;
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
const HI = {
  live: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="14" width="38" height="27" rx="7"/><path d="M17 5l7 9 7-9"/><path class="acc" d="M20 21.5v12l10-6z"/><path d="M15 44h18"/></svg>',
  movies: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="12" r="6.5"/><circle cx="29" cy="11" r="5"/><rect x="6" y="21" width="28" height="19" rx="4.5"/><path class="acc" d="M34 27.5l8-5v16l-8-5z"/><path d="M12 40l-3 6M28 40l3 6"/></svg>',
  series: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="11" y="9" width="32" height="25" rx="6"/><path d="M5 16v20a6 6 0 0 0 6 6h24"/><path class="acc" d="M23 16.5v10l8.5-5z"/></svg>',
  upd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
};
const WX = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="#F3D98B" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" fill="#F3D98B"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="#CBD1D9"><path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9.5 4.3 4.3 0 0 1 17.5 18z"/></svg>',
  part: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4" fill="#F3D98B"/><path fill="#CBD1D9" d="M8 20a4.5 4.5 0 0 1-.5-9A5.5 5.5 0 0 1 18 12a4 4 0 0 1-.5 8z"/></svg>',
  rain: '<svg viewBox="0 0 24 24"><path fill="#CBD1D9" d="M7 15a5 5 0 0 1-.6-10A6 6 0 0 1 18 6.5 4.3 4.3 0 0 1 17.5 15z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" stroke="#7DB7FF" stroke-width="2" stroke-linecap="round"/></svg>',
  snow: '<svg viewBox="0 0 24 24"><path fill="#CBD1D9" d="M7 15a5 5 0 0 1-.6-10A6 6 0 0 1 18 6.5 4.3 4.3 0 0 1 17.5 15z"/><g fill="#fff"><circle cx="8" cy="19" r="1.2"/><circle cx="12" cy="21" r="1.2"/><circle cx="16" cy="19" r="1.2"/></g></svg>',
  storm: '<svg viewBox="0 0 24 24"><path fill="#9AA3AF" d="M7 14a5 5 0 0 1-.6-10A6 6 0 0 1 18 5.5 4.3 4.3 0 0 1 17.5 14z"/><path fill="#F3D98B" d="M12 13l-3 5h3l-1 5 4-7h-3l1-3z"/></svg>',
  fog: '<svg viewBox="0 0 24 24" stroke="#CBD1D9" stroke-width="2" stroke-linecap="round"><path d="M4 9h16M3 13h18M5 17h14"/></svg>',
};
function wxIcon(code) { code = +code;
  if (code === 0) return WX.sun; if (code <= 2) return WX.part; if (code === 3) return WX.cloud; if (code <= 48) return WX.fog;
  if (code <= 67 || (code >= 80 && code <= 82)) return WX.rain; if (code <= 77 || code === 85 || code === 86) return WX.snow; return WX.storm; }
/* ---------------- animated home scenes (seamless loops: first frame == last frame) ---------------- */
const SCN = {
  live: `<svg viewBox="0 0 220 150" class="sc sc-live" aria-hidden="true"><defs>
    <linearGradient id="lvS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E0223A"/><stop offset=".55" stop-color="#6d0d19"/><stop offset="1" stop-color="#D4AF37"/></linearGradient>
    <radialGradient id="lvG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff5468" stop-opacity=".55"/><stop offset="1" stop-color="#ff5468" stop-opacity="0"/></radialGradient>
    <clipPath id="lvC"><rect x="80" y="36" width="104" height="62" rx="6"/></clipPath></defs>
    <g class="lv-tv">
      <ellipse class="lv-glow" cx="132" cy="66" rx="92" ry="64" fill="url(#lvG)"/>
      <path d="M116 14l14 13M150 12l-14 15" stroke="#C9CED6" stroke-width="3" stroke-linecap="round"/>
      <rect x="72" y="28" width="120" height="78" rx="12" fill="#1a0b0e" stroke="#C9CED6" stroke-width="3.5"/>
      <rect x="80" y="36" width="104" height="62" rx="6" fill="#050203"/>
      <g clip-path="url(#lvC)"><g class="lv-scr">
        <rect x="80" y="36" width="104" height="62" rx="6" fill="url(#lvS)"/>
        <rect class="lv-shine" x="60" y="30" width="22" height="80" fill="#fff" opacity=".16" transform="skewX(-18)"/>
        <path d="M124 54l18 13-18 13z" fill="#fff"/>
        <rect x="86" y="42" width="27" height="11" rx="3" fill="#000" opacity=".45"/><circle class="lv-dot" cx="91.5" cy="47.5" r="2.4" fill="#ff3b4e"/>
        <text x="96" y="50.5" font-size="7.5" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">LIVE</text></g></g>
      <rect class="lv-line" x="80" y="66" width="104" height="2" rx="1" fill="#fff"/>
      <path d="M112 106l-8 12M152 106l8 12" stroke="#C9CED6" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    <g fill="none" stroke="#ff6b7a" stroke-width="2.4" stroke-linecap="round"><path class="lv-ir w1" d="M52 84a9 9 0 0 1 9-7"/><path class="lv-ir w2" d="M50 76a17 17 0 0 1 17-13"/><path class="lv-ir w3" d="M48 68a25 25 0 0 1 25-19"/></g>
    <g transform="rotate(-30 36 120)">
      <rect x="26" y="86" width="22" height="58" rx="8" fill="#22262d" stroke="#8a9099" stroke-width="2"/>
      <circle class="lv-btn" cx="37" cy="97" r="4.2" fill="#D32436"/>
      <g fill="#8a9099"><circle cx="32" cy="111" r="2"/><circle cx="42" cy="111" r="2"/><circle cx="32" cy="119" r="2"/><circle cx="42" cy="119" r="2"/></g>
      <path d="M16 132c0-9 5-14 12-14h22c6 0 9 5 9 11v22H16z" fill="#b97f5c"/>
      <rect class="lv-thumb" x="31" y="104" width="12" height="22" rx="6" fill="#d39a74"/>
    </g></svg>`,
  movies: `<svg viewBox="0 0 220 150" class="sc sc-mov" aria-hidden="true"><defs>
    <linearGradient id="mvC" x1="0" x2="1"><stop offset="0" stop-color="#7a0f1a"/><stop offset=".25" stop-color="#D32436"/><stop offset=".5" stop-color="#8E121F"/><stop offset=".75" stop-color="#D32436"/><stop offset="1" stop-color="#7a0f1a"/></linearGradient>
    <linearGradient id="mvB" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff3c4" stop-opacity=".0"/><stop offset="1" stop-color="#fff3c4" stop-opacity=".75"/></linearGradient>
    <radialGradient id="mvS" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#F3D98B"/><stop offset="1" stop-color="#9c7a22"/></radialGradient>
    <clipPath id="mvK"><rect x="42" y="34" width="136" height="70"/></clipPath></defs>
    <rect x="34" y="18" width="152" height="94" rx="8" fill="#14070a" stroke="#D4AF37" stroke-width="3"/>
    <rect x="56" y="6" width="108" height="17" rx="5" fill="#1a0b0e" stroke="#D4AF37" stroke-width="2"/>
    <text x="110" y="18" text-anchor="middle" font-size="9.5" font-weight="900" fill="#F3D98B" letter-spacing="3" font-family="system-ui,sans-serif">CINEMA</text>
    <g class="mv-bulbs">${Array.from({ length: 11 }, (_, i) => `<circle class="mv-b ${i % 2 ? 'o' : 'e'}" cx="${44 + i * 13.2}" cy="27.5" r="2.1"/>`).join('')}</g>
    <rect class="mv-scr" x="42" y="34" width="136" height="70" fill="url(#mvS)"/>
    <g class="mv-film" clip-path="url(#mvK)"><circle cx="92" cy="74" r="9" fill="#9c7a22" opacity=".45"/><circle cx="128" cy="66" r="13" fill="#9c7a22" opacity=".35"/><path d="M42 104l30-22 22 14 28-26 56 34z" fill="#7a5c17" opacity=".45"/></g>
    <g clip-path="url(#mvK)">
      <g class="mv-cl"><rect x="42" y="34" width="68" height="70" fill="url(#mvC)"/></g>
      <g class="mv-cr"><rect x="110" y="34" width="68" height="70" fill="url(#mvC)"/></g>
      <path d="M42 34h136v7c-6 5-11 5-17 0-6 5-11 5-17 0-6 5-11 5-17 0-6 5-11 5-17 0-6 5-11 5-17 0-6 5-11 5-17 0-6 5-11 5-17 0-6 5-11 5-17 0z" fill="#5c0a14"/></g>
    <path class="mv-sp l" d="M14 150L58 30h22z" fill="url(#mvB)"/><path class="mv-sp r" d="M206 150L162 30h-22z" fill="url(#mvB)"/>
    <path class="mv-pj" d="M100 150L50 40h120L120 150z" fill="url(#mvB)" opacity=".35"/>
    <g fill="#0b0507" stroke="#3a1418" stroke-width="1.5">${[22, 52, 82, 112, 142, 172].map(x => `<path d="M${x} 150v-20c0-6 4-9 9-9h8c5 0 9 3 9 9v20z"/>`).join('')}</g>
    <g fill="#8E121F">${[22, 52, 82, 112, 142, 172].map(x => `<rect x="${x + 3}" y="124" width="20" height="4" rx="2"/>`).join('')}</g></svg>`,
  series: `<svg viewBox="0 0 220 150" class="sc sc-ser" aria-hidden="true"><defs>
    <linearGradient id="srL" x1="0" y1="0" x2="0" y2="1"><stop class="sr-st" offset="0" stop-opacity=".55"/><stop class="sr-st" offset="1" stop-opacity="0"/></linearGradient></defs>
    <path class="sr-cone" d="M80 54h60l70 96H10z" fill="url(#srL)"/>
    <rect x="72" y="8" width="76" height="48" rx="5" fill="#1a0b0e" stroke="#C9CED6" stroke-width="3"/>
    <rect class="sr-scr" x="77" y="13" width="66" height="38" rx="2"/>
    <g class="sr-ui"><path d="M105 25l12 7-12 7z" fill="#fff" opacity=".85"/><rect x="82" y="44" width="56" height="3" rx="1.5" fill="#fff" opacity=".25"/><rect class="sr-prog" x="82" y="44" width="56" height="3" rx="1.5" fill="#fff"/></g>
    <rect x="104" y="56" width="12" height="5" fill="#C9CED6"/>
    <g class="sr-fam" fill="#070304" stroke-linejoin="round">
      <g class="sr-dad"><path d="M36 140c0-17 11-27 26-27s26 10 26 27z"/><circle class="sr-rim" cx="62" cy="97" r="12.5"/><path d="M50 92c2-8 8-11 12-11s10 3 12 11c-4-3-8-4-12-4s-8 1-12 4z" fill="#160a0c"/></g>
      <g class="sr-mom"><path d="M78 140c0-15 9-24 21-24s21 9 21 24z"/><path d="M86 104c-3 8-2 14 1 18h24c3-4 4-10 1-18z" fill="#160a0c"/><circle class="sr-rim" cx="99" cy="101" r="10.5"/><circle class="sr-rim" cx="99" cy="88" r="5"/></g>
      <g class="sr-k1"><path d="M118 142c0-12 7-18 15-18s15 6 15 18z"/><circle class="sr-rim" cx="133" cy="111" r="8.5"/></g>
      <g class="sr-k2"><path d="M146 142c0-11 7-16 14-16s14 5 14 16z"/><circle class="sr-rim" cx="160" cy="114" r="8"/><path d="M153 110c2-5 5-6 7-6s6 1 7 6c-2-2-4-2-7-2s-5 0-7 2z" fill="#160a0c"/>
        <g class="sr-arm"><path d="M166 132l12-17" stroke="#070304" stroke-width="5" stroke-linecap="round"/><rect x="174" y="104" width="6" height="12" rx="2" fill="#22262d" stroke="#8a9099" stroke-width="1"/></g></g>
    </g>
    <path d="M10 150v-9c0-5 5-7 11-7h178c6 0 11 2 11 7v9z" fill="#4a161c" stroke="#6b2028" stroke-width="2"/>
    <path d="M24 144h172" stroke="#6b2028" stroke-width="2" stroke-linecap="round"/></svg>`,
};
const MOON = '<svg viewBox="0 0 24 24"><path fill="#F3D98B" d="M15.5 2.5a9.5 9.5 0 1 0 6 16.9A8 8 0 0 1 15.5 2.5z"/></svg>';
const SPARK = '<svg viewBox="0 0 24 24" fill="#F3D98B"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>';
function wxFx(kind, day) {
  const R = (a, b) => (a + Math.random() * (b - a)).toFixed(2);
  const many = (n, f) => Array.from({ length: n }, f).join('');
  const stars = (n) => many(n, () => `<i class="st" style="left:${R(0, 100)}%;top:${R(0, 70)}%;animation-delay:-${R(0, 3)}s;animation-duration:${R(1.8, 3.6)}s"></i>`);
  const clouds = (n) => many(n, (_, i) => `<i class="cl" style="top:${R(-10, 45)}%;animation-duration:${R(18, 30)}s;animation-delay:-${R(0, 30)}s;transform:scale(${R(.7, 1.3)})"></i>`);
  if (kind === 'rain' || kind === 'storm') return many(34, () => `<i class="rd" style="left:${R(-5, 105)}%;animation-delay:-${R(0, 1.2)}s;animation-duration:${R(.55, .95)}s;opacity:${R(.35, .85)}"></i>`) + clouds(2) + (kind === 'storm' ? '<b class="fl"></b>' : '');
  if (kind === 'snow') return many(30, () => `<i class="sn" style="left:${R(0, 100)}%;width:${R(3, 7)}px;height:auto;animation-delay:-${R(0, 8)}s;animation-duration:${R(5, 9)}s"></i>`);
  if (kind === 'fog') return '<i class="fg a"></i><i class="fg b"></i><i class="fg c"></i>';
  if (kind === 'cloud') return (day ? '' : stars(10)) + clouds(4);
  if (kind === 'part') return (day ? '<b class="sg sm"></b><b class="ry sm"></b>' : stars(16) + '<b class="mg"></b>') + clouds(2);
  return day ? '<b class="sg"></b><b class="ry"></b>' : stars(24) + '<b class="mg"></b>';
}
function wxKind(code) { code = +code; if (code === 0) return 'sun'; if (code <= 2) return 'part'; if (code === 3) return 'cloud'; if (code <= 48) return 'fog';
  if (code <= 67 || (code >= 80 && code <= 82)) return 'rain'; if (code <= 77 || code === 85 || code === 86) return 'snow'; return 'storm'; }
function wxName(code) { return { sun: 'Clear sky', part: 'Partly cloudy', cloud: 'Cloudy', fog: 'Foggy', rain: 'Rainy', snow: 'Snowy', storm: 'Thunderstorm' }[wxKind(code)]; }
const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h3v3H8z" fill="currentColor"/></svg>';
async function loadWeather() {
  const box = $('#hwx'); if (!box) return;
  let g = store.get('geo', null);
  try {
    if (!g || Date.now() - g.at > 6 * 3600 * 1000) { g = await (await fetch('/api/geo')).json(); if (g && g.lat != null) { g.at = Date.now(); store.set('geo', g); } }
    if (!g || g.lat == null) return;
    const f = g.cc === 'US' || g.cc === 'LR' || g.cc === 'MM';
    let w = store.get('wx2', null);
    if (!w || Date.now() - w.at > 30 * 60 * 1000) {
      const j = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${g.lat}&longitude=${g.lon}&current=temperature_2m,weather_code,is_day&temperature_unit=${f ? 'fahrenheit' : 'celsius'}`)).json();
      w = { t: Math.round(j.current.temperature_2m), c: j.current.weather_code, d: j.current.is_day, u: f ? 'F' : 'C', at: Date.now() }; store.set('wx2', w);
    }
    if (!$('#hwx')) return;
    const k = wxKind(w.c), hr = new Date().getHours(), day = w.d == null ? (hr >= 6 && hr < 18) : !!+w.d;
    box.dataset.k = k; box.dataset.day = day ? '1' : '0';
    box.innerHTML = `<div class="wxfx">${wxFx(k, day)}</div><div class="wxi">${!day && (k === 'sun' || k === 'part') ? MOON : wxIcon(w.c)}</div><div class="wxt"><b>${w.t}°${w.u}</b><span class="wxs">${(!day && k === 'sun' ? 'Clear night' : wxName(w.c))}</span><span class="wxl">${HI.pin}<em>${esc(g.city || g.region || '')}${g.country ? ', ' + esc(g.country) : ''}</em></span></div>`;
  } catch (e) {}
}
function renderHome() {
  const ui = S.acc.info || {};
  const exp = ui.exp_date ? new Date(ui.exp_date * 1000) : null;
  const cw = continueList();
  const card = (key, title, sub, go, icon) => `<button class="tile hcard hc-${key}" data-go="${go}">
      <span class="hc-tab"></span><span class="hc-t">${title}</span><span class="hc-scene">${icon}</span></button>`;
  app.innerHTML = `<div class="home home2 home3"><div class="hbg" id="hbg"></div>
    <div class="htop"><div class="hlogo"><img src="icon-192.png" alt=""><div><div class="w">ARAB <b>SAT</b></div><div class="ar">عرب سات</div></div></div>
      <div class="hact"><button class="ibtn" data-go="#/search">${I.search}</button><button class="ibtn" id="rf">${I.refresh}</button><button class="ibtn" id="st">${I.gear}</button></div></div>
    <div class="h3wrap"><div class="h3grid">
      ${card('live', 'Live TV', 'Channels', '#/live', SCN.live)}
      ${card('movies', 'Movies', 'Movies', '#/movies', SCN.movies)}
      ${card('series', 'Series', 'Series', '#/series', SCN.series)}
      <div class="h3c h3wx" id="hwx"><div class="wxfx" id="wxfx"></div><div class="wxi">${WX.part}</div><div class="wxt"><b>--°</b><span class="wxs">Weather</span><span class="wxl">${HI.pin}<em>Locating…</em></span></div></div>
      <div class="h3c h3clock"><div class="t"><span id="ckhm"></span><span class="sec" id="cks"></span><span class="ap" id="ckap"></span></div><div class="dw" id="cw"></div><div class="d" id="cd"></div><div class="secbar"><i id="ckbar"></i></div></div>
      <button class="h3c h3new" data-go="#/new"><i class="spk s1">${SPARK}</i><i class="spk s2">${SPARK}</i><i class="spk s3">${SPARK}</i><span class="hn-badge">NEW</span><span class="hn-txt"><b>New Releases</b><span>Latest movies &amp; series</span></span><span class="hn-arr">&#8250;</span></button>
    </div>
    <div class="h3bot"><span class="h3b1"></span>
      <div class="h3info">
        <div class="h3row h3exp"><span class="h3ico">${CAL}</span><span class="h3lab">Expiration Date</span><b>${exp ? exp.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : (ui.username ? 'Unlimited' : '-')}</b></div>
        <div class="h3row h3sup"><span class="h3ico">${I.phone}</span><span class="h3lab">Customer Service<br><b class="hc-num">${SUPPORT.show}</b></span>
          <span class="hcontact"><a class="hc-btn hc-call" href="tel:${SUPPORT.tel}" aria-label="Call">${I.phone}<em>Call</em></a>
          <a class="hc-btn hc-wa" href="https://wa.me/${SUPPORT.wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}<em>WhatsApp</em></a></span></div>
      </div>
      <div class="h3cw2">${cw.length ? `<div class="cwl"><i class="cwdot"></i>Continue Watching</div><div class="cwr">${cw.slice(0, 3).map((c, k) => { const pr = Math.min(1, c.t / c.d); return `
        <button class="cwc${k ? '' : ' big'}" data-cw="${esc(c.id)}" title="${esc(c.title)}" style="--p:${(289 * (1 - pr)).toFixed(1)};--d:${k * 0.15}s">
          <span class="halo"></span><span class="pic" style="background-image:url('${esc(img(c.img))}')"></span>
          <svg class="ring" viewBox="0 0 100 100"><circle class="trk" cx="50" cy="50" r="46"/><circle class="prg" cx="50" cy="50" r="46"/></svg>
          <span class="pl">${I.play}</span><span class="nm" dir="auto">${esc(c.title)}</span></button>`; }).join('')}</div>` : ''}</div>
    </div>
    </div></div>`;
  const tick = () => { const n = new Date(); const t = $('#ckhm'); if (!t) return;
    const pt = {}; new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit', second: '2-digit' }).formatToParts(n).forEach(x => { pt[x.type] = x.value; });
    t.textContent = pt.hour + ':' + pt.minute; $('#cks').textContent = ':' + pt.second; $('#ckap').textContent = pt.dayPeriod ? ' ' + pt.dayPeriod : '';
    const sec = n.getSeconds(), bar = $('#ckbar');
    if (sec === 0) { bar.style.transition = 'none'; bar.style.width = '0%'; void bar.offsetWidth; bar.style.transition = ''; }
    else bar.style.width = (sec / 59 * 100).toFixed(1) + '%';
    $('#cw').textContent = n.toLocaleDateString(undefined, { weekday: 'long' });
    $('#cd').textContent = n.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }); };
  tick(); const iv = setInterval(tick, 1000); onLeave(() => clearInterval(iv));
  $('#st').onclick = openSettings;
  $('#rf').onclick = () => { S.mem = {}; toast('Lists refreshed'); refreshAccount(); renderHome(); };
  $$('[data-cw]').forEach(b => b.onclick = () => resumeItem(cw.find(c => String(c.id) === b.dataset.cw)));
  loadWeather();
  // counts + a blurred movie poster behind everything
  cached('all_v', { action: 'get_vod_streams' }).then(a => {
    const withPic = a.filter(x => img(x.stream_icon)).slice(0, 60); const pick = withPic[Math.floor(Math.random() * withPic.length)];
    if (pick && $('#hbg')) { const im = new Image(); im.onload = () => { const b = $('#hbg'); if (b) { b.style.backgroundImage = `url('${img(pick.stream_icon)}')`; b.classList.add('on'); } }; im.src = img(pick.stream_icon); }
  }).catch(() => {});
  cached('lc', { action: 'get_live_categories' }).catch(() => {});
  if (window.ManagedMediaSource || window.MediaSource) loadMpegts().catch(() => {});
  setTimeout(() => { if (!document.activeElement || document.activeElement === document.body) { const f = $('.hcard'); if (f && document.body.classList.contains('kbd')) f.focus(); } }, 300);
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
    .filter(c => c.d > 60 && c.t > 30 && !c.done && c.t / c.d < 0.93).sort((a, b) => b.ts - a.ts).slice(0, 12);
}
function resumeItem(c) {
  if (!c) return;
  if (c.kind === 'movie') askResume(c.id, c.title, (st) => openPlayer({ title: c.title, url: playUrl('movie', c.sid, c.ext), pid: c.id, img: c.img, kind: 'movie', sid: c.sid, ext: c.ext, start: st }));
  else if (c.kind === 'ep') askResume(c.id, c.title, (st) => openPlayer({ title: c.title, url: playUrl('series', c.sid, c.ext || 'mp4'), pid: c.id, img: c.img, kind: 'ep', sid: c.sid, ext: c.ext, series: c.series, start: st }));
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
    <h3 style="margin-top:20px">Settings</h3>
    <div class="setrow"><span>Appearance</span><div class="seg2" id="segTheme">
      <button data-v="dark" class="${prefs().theme !== 'light' ? 'on' : ''}">🌙 Dark</button><button data-v="light" class="${prefs().theme === 'light' ? 'on' : ''}">☀️ Light</button></div></div>
    <div class="setrow"><span>Language</span><div class="seg2" id="segLang">
      <button data-v="en" class="${prefs().lang !== 'ar' ? 'on' : ''}">English</button><button data-v="ar" class="${prefs().lang === 'ar' ? 'on' : ''}">العربية</button></div></div>
    <div style="height:16px"></div>
    <button class="btn ghost" id="clr">Clear watch history</button>
    ${supportHTML()}</div>`;
  document.body.appendChild(bg);
  bg.onclick = (e) => { if (e.target === bg) bg.remove(); };
  $$('#segTheme button', bg).forEach(b => b.onclick = () => { setPref('theme', b.dataset.v); $$('#segTheme button', bg).forEach(x => x.classList.toggle('on', x === b)); });
  $$('#segLang button', bg).forEach(b => b.onclick = () => { setPref('lang', b.dataset.v); $$('#segLang button', bg).forEach(x => x.classList.toggle('on', x === b)); });
  $('#clr', bg).onclick = () => { store.del('prog_' + acckey()); bg.remove(); toast('Watch history cleared'); route(); };
}

/* ---------------- live ---------------- */
/* ---------------- side menu (categories): sidebar on big screens, drawer on phones ---------------- */
const icoMenu = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>';
function sideLayout(title, extraBar, opts) {
  opts = opts || {};
  return `<div class="bar"><button class="ibtn" data-back>${I.back}</button>
    <div class="ttl"><img src="icon-192.png" alt="" class="ttl-logo"><h1 dir="auto">${esc(title)}</h1></div>
    <div class="barclock"><b id="bck"></b><span id="bcd"></span></div>
    <button class="catbtn" id="catbtn">${icoMenu}<span id="catname" dir="auto"></span></button>
    <button class="ibtn" data-go="#/search">${I.search}</button>${extraBar || ''}</div>
    <div class="sec${opts.cls ? ' ' + opts.cls : ''}"><div class="sideback" id="sideback"></div><aside class="side" id="side">
      <div class="catsearch">${I.search}<input id="catq" placeholder="Search in categories" autocomplete="off" autocapitalize="off" dir="auto"></div>
      <div id="cats"></div></aside>
    <main class="secmain${opts.cls ? ' ' + opts.cls : ''}" id="secmain"></main></div>`;
}
function startBarClock() {
  const tick = () => { const b = $('#bck'); if (!b) return; const n = new Date();
    b.textContent = n.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    $('#bcd').textContent = n.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); };
  tick(); const iv = setInterval(tick, 15000); onLeave(() => clearInterval(iv));
}
function wireSide(cats, current, onPick, counts) {
  const box = $('#cats'), side = $('#side'), back = $('#sideback');
  const open = () => { side.classList.add('open'); back.classList.add('open'); };
  const close = () => { side.classList.remove('open'); back.classList.remove('open'); };
  $('#catbtn').onclick = () => side.classList.contains('open') ? close() : open();
  back.onclick = close;
  let sx = null, sy = 0;
  const ts = (e) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; };
  const te = (e) => { if (sx == null) return; const t = e.changedTouches[0]; const dx = t.clientX - sx, dy = Math.abs(t.clientY - sy);
    if (dy < 60) { if (sx < 28 && dx > 60) open(); else if (dx < -60 && side.classList.contains('open')) close(); } sx = null; };
  document.addEventListener('touchstart', ts, { passive: true }); document.addEventListener('touchend', te, { passive: true });
  onLeave(() => { document.removeEventListener('touchstart', ts); document.removeEventListener('touchend', te); });
  let cur = current, cnt = counts || {}, q = '';
  const draw = (c) => {
    if (c !== undefined) cur = c;
    const ql = q.toLowerCase();
    box.innerHTML = cats.filter(x => !ql || String(x.category_name).toLowerCase().includes(ql)).map(x =>
      `<button class="cat ${String(x.category_id) === String(cur) ? 'on' : ''}" data-c="${esc(x.category_id)}"><span dir="auto">${esc(x.category_name)}</span>${cnt[x.category_id] != null ? `<em>${cnt[x.category_id]}</em>` : ''}</button>`).join('') || '<div class="empty">No categories</div>';
    const f = cats.find(x => String(x.category_id) === String(cur)); $('#catname').textContent = f ? f.category_name : '';
    const on = $('.cat.on', box); if (on && !q) on.scrollIntoView({ block: 'nearest' });
  };
  $('#catq').oninput = (e) => { q = e.target.value.trim(); draw(); };
  box.onclick = (e) => { const b = e.target.closest('.cat'); if (!b) return; draw(b.dataset.c); close(); onPick(b.dataset.c); };
  draw(current);
  return { draw, open, close, setCounts: (c) => { cnt = c; draw(); } };
}

/* ---------------- program guide (EPG) cache ---------------- */
S.epg = {};
async function epgFor(sid, limit) {
  const k = sid + ':' + limit, hit = S.epg[k];
  if (hit && Date.now() - hit.t < 10 * 60 * 1000) return hit.v;
  const j = await api({ action: 'get_short_epg', stream_id: sid, limit });
  const v = ((j && j.epg_listings) || []).map(x => ({ title: b64(x.title), start: +x.start_timestamp || 0, end: +(x.stop_timestamp || x.end_timestamp) || 0 }))
    .filter(x => !x.end || x.end * 1000 > Date.now() - 60000);
  S.epg[k] = { t: Date.now(), v }; return v;
}
const hm = (ts) => new Date(ts * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
function nowProg(list) {
  const n = Date.now() / 1000; const p = list.find(x => x.start <= n && (!x.end || x.end > n)) || list[0];
  if (!p) return null; const pct = p.end > p.start ? Math.max(0, Math.min(100, (n - p.start) / (p.end - p.start) * 100)) : 0;
  return { title: p.title, pct };
}
// fills "now playing" lines for rows as they scroll into view (a few at a time)
function epgRows(container, arr) {
  const queue = [], busy = { n: 0 };
  const pump = () => {
    while (busy.n < 3 && queue.length) {
      const row = queue.shift(); if (!row.isConnected) continue;
      const c = arr[+row.dataset.i]; if (!c) continue; busy.n++;
      epgFor(c.stream_id, 2).then(l => { const p = nowProg(l); const el = row.querySelector('.epn');
        if (el) { el.textContent = p ? p.title : 'No program info'; const bar = row.querySelector('.epb b'); if (bar && p) { bar.style.width = p.pct + '%'; row.querySelector('.epb').classList.add('on'); } } })
        .catch(() => {}).finally(() => { busy.n--; pump(); });
    }
  };
  const io = new IntersectionObserver((en) => { en.forEach(e => { if (e.isIntersecting && !e.target._ep) { e.target._ep = 1; queue.push(e.target); io.unobserve(e.target); } }); pump(); }, { root: null, rootMargin: '200px' });
  const watch = () => $$('.row,.chc', container).forEach(r => { if (!r._ep && !r._w) { r._w = 1; io.observe(r); } });
  onLeave(() => io.disconnect());
  return watch;
}

/* ---------------- live ---------------- */
const isWide = () => window.matchMedia('(min-width: 900px)').matches;
async function renderLive(catId) {
  app.innerHTML = sideLayout('Live TV', `<button class="ibtn" id="sortb" title="Sort"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h10M4 12h7M4 18h4M18 4v16M15 17l3 3 3-3"/></svg></button>`, { cls: 'live3' });
  startBarClock();
  $('#secmain').innerHTML = `
    <div class="chgrid" id="ll">${spinner()}</div>
    <div class="livecol">
    <div class="livebox hidden" id="lbx">
      <div class="vwrap" id="vwrap"><video id="lv" playsinline webkit-playsinline autoplay controls></video>
        <div class="vmsg hidden" id="vm"></div>
        <div class="tvtap" id="tvtap"></div>
        <div class="tvtop"><button class="ibtn" id="tvx">${I.back}</button><div class="tx"><div class="nn" dir="auto"></div><small class="ne" dir="auto"></small></div><span class="live">LIVE</span></div>
        <div class="tvpanel"><div class="tvcats" id="tvcats"></div><div class="tvchs" id="tvchs"></div></div>
        <div class="tvguide" id="tvguide"></div>
      </div>
      <div class="nowbar"><span class="live">LIVE</span><div class="tx"><div class="nn" dir="auto"></div><small class="ne" dir="auto"></small></div>
        <button class="ibtn" id="fs">${I.full}</button><button class="ibtn" id="xc">${I.close}</button></div></div>
    <div class="epglist" id="epgl"></div></div>`;
  let cats;
  try { cats = await cached('lc', { action: 'get_live_categories' }); } catch (e) { $('#ll').innerHTML = empty(e.message); return; }
  const fav = favs('live');
  const allCats = (fav.length ? [{ category_id: 'fav', category_name: '★ Favorites' }] : []).concat(cats);
  if (!catId) catId = store.get('lastLiveCat_' + acckey(), null);
  if (!allCats.some(c => String(c.category_id) === String(catId))) catId = allCats.length ? allCats[0].category_id : null;
  const video = $('#lv'), lbx = $('#lbx');
  let current = null, list = [], playList = [], tvCat = null, hideT = null, tvList = [];
  onLeave(() => { stopVideo(video); document.removeEventListener('keydown', onKey, true); clearTimeout(hideT); document.body.classList.remove('tvon'); });
  const side = wireSide(allCats, catId, (c) => loadCat(c));
  // channel counts per category (from the full list, in the background)
  cached('all_l', { action: 'get_live_streams' }).then(all => {
    const cnt = {}; all.forEach(c => { cnt[c.category_id] = (cnt[c.category_id] || 0) + 1; }); cnt.fav = favs('live').length;
    if ($('#cats')) side.setCounts(cnt);
  }).catch(() => {});

  const getList = async (cid) => cid === 'fav' ? favs('live').map(f => f.raw) : cached('ls_' + cid, { action: 'get_live_streams', category_id: cid });
  async function loadCat(cid) {
    store.set('lastLiveCat_' + acckey(), cid);
    $('#ll').innerHTML = spinner();
    try { list = sortList(await getList(cid)); } catch (e) { $('#ll').innerHTML = empty(e.message); return; }
    if (!list.length) { $('#ll').innerHTML = empty('No channels here'); return; }
    renderRows($('#ll'), list, 0, false);
  }
  const logo = (c) => { const lg = img(c.stream_icon);
    return `<div class="lg">${lg ? `<img loading="lazy" src="${esc(lg)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'TV'}))">` : '<span class="ph">TV</span>'}</div>`; };
  const cardHTML = (c, i) => { const lg = img(c.stream_icon);
    return `<button class="chc ${current && current.stream_id == c.stream_id ? 'on' : ''}" data-i="${i}">
      <span class="chn">${esc(c.num || i + 1)}</span><span class="cfav ${isFav('live', c.stream_id) ? 'on' : ''}" data-f="${i}">${isFav('live', c.stream_id) ? I.star : I.starO}</span>
      <span class="chl">${lg ? `<img loading="lazy" src="${esc(lg)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('b'),{textContent:'TV'}))">` : '<b>TV</b>'}</span>
      <span class="cht" dir="auto">${esc(c.name)}</span><small class="epn" dir="auto"></small><i class="epb"><b></b></i></button>`; };
  const rowHTML = (c, i, withStar) => `<div class="row ${current && current.stream_id == c.stream_id ? 'on' : ''}" data-i="${i}" tabindex="0">
      <span class="no">${esc(c.num || i + 1)}</span>${logo(c)}<div class="nm"><div dir="auto">${esc(c.name)}</div><small class="epn" dir="auto"></small><i class="epb"><b></b></i></div>
      ${withStar ? `<button class="star ${isFav('live', c.stream_id) ? 'on' : ''}" data-f="${i}" tabindex="-1">${isFav('live', c.stream_id) ? I.star : I.starO}</button>` : ''}</div>`;
  function renderRows(el, arr, from, compact) {
    if (from === 0) el.innerHTML = '';
    el.insertAdjacentHTML('beforeend', arr.slice(from, from + 200).map((c, k) => el.id === 'll' && isWide() ? cardHTML(c, from + k) : rowHTML(c, from + k, !compact)).join(''));
    if (el.id === 'll') { epgMain(); } else epgTv();
    if (from + 200 < arr.length) setTimeout(() => { if (el.isConnected) renderRows(el, arr, from + 200, compact); }, 60);
  }
  const epgMainW = epgRows($('#ll'), new Proxy([], { get: (t, k) => k === 'length' ? list.length : list[k] }));
  const epgTvW = epgRows($('#tvchs'), new Proxy([], { get: (t, k) => k === 'length' ? tvList.length : tvList[k] }));
  function epgMain() { epgMainW(); } function epgTv() { epgTvW(); }
  function markOn() { $$('.row,.chc').forEach(r => { const arr = r.closest('#tvchs') ? tvList : list; const c = arr[+r.dataset.i]; r.classList.toggle('on', !!(c && current && c.stream_id == current.stream_id)); }); }
  $('#ll').onclick = (e) => {
    const f = e.target.closest('[data-f]');
    if (f) { const c = list[+f.dataset.f]; const nowOn = toggleFav('live', { id: c.stream_id, raw: c });
      f.classList.toggle('on', nowOn); f.innerHTML = nowOn ? I.star : I.starO; toast(nowOn ? 'Added to favorites' : 'Removed from favorites'); return; }
    const r = e.target.closest('.chc,.row'); if (!r) return;
    const c = list[+r.dataset.i];
    if (current && current.stream_id == c.stream_id) { enterTV(); return; }
    playList = list; play(c);
    if (isWide()) enterTV();   // computer: full screen right away; phone: plays on top of the list (as before)
  };
  // sort: original order or A to Z
  let sortAZ = store.get('liveSort', false);
  const sortList = (arr) => sortAZ ? arr.slice().sort((a, b) => String(a.name).localeCompare(String(b.name))) : arr;
  $('#sortb').classList.toggle('on', sortAZ);
  $('#sortb').onclick = () => { sortAZ = !sortAZ; store.set('liveSort', sortAZ); $('#sortb').classList.toggle('on', sortAZ); toast(sortAZ ? 'Sorted A to Z' : 'Original order'); list = sortList(list); renderRows($('#ll'), list, 0, false); };
  
  async function drawGuide(c) {
    const el = $('#epgl'), tg = $('#tvguide'); if (!el) return;
    const put = (h) => { el.innerHTML = h; if (tg) tg.innerHTML = h; };
    put(`<div class="g-h"><b dir="auto">${esc(c.name)}</b><span>Program guide</span></div><div class="loading"><div class="spin"></div></div>`);
    try {
      const l = await epgFor(c.stream_id, 8); if (current !== c) return;
      const n = Date.now() / 1000;
      put(`<div class="g-h"><b dir="auto">${esc(c.name)}</b><span>Program guide</span></div>` + (l.length ? l.map(p => {
        const live = p.start <= n && (!p.end || p.end > n);
        const pct = live && p.end > p.start ? (n - p.start) / (p.end - p.start) * 100 : 0;
        return `<div class="g-r ${live ? 'now' : ''}"><span class="g-t">${hm(p.start)}${p.end ? ' – ' + hm(p.end) : ''}</span><span class="g-n" dir="auto">${esc(p.title)}</span>${live ? `<i class="epb on"><b style="width:${pct}%"></b></i>` : ''}</div>`; }).join('')
        : '<div class="empty" style="padding:24px">No program guide for this channel</div>'));
    } catch (e) { put(''); }
  }
  function play(c) {
    current = c; markOn();
    lbx.classList.remove('hidden');
    $$('.nn', lbx).forEach(x => x.textContent = c.name); $$('.ne', lbx).forEach(x => x.textContent = '');
    playLive(video, c, $('#vm'));

    drawGuide(c);
    epgFor(c.stream_id, 2).then(l => { if (current !== c) return; const p = nowProg(l); if (p) $$('.ne', lbx).forEach(x => x.textContent = 'Now: ' + p.title); }).catch(() => {});
  }
  // ---- TV mode: full screen video with translucent categories + channels on top ----
  function enterTV() {
    if (!current) return;
    lbx.classList.add('tv'); document.body.classList.add('tvon');
    tvCat = store.get('lastLiveCat_' + acckey(), catId);
    drawTvCats(); loadTvCat(tvCat); showPanel();
    video.play().catch(() => {});
  }
  function exitTV() { lbx.classList.remove('tv', 'panel'); document.body.classList.remove('tvon'); clearTimeout(hideT);
    if (!isWide()) { video.play().catch(() => {}); return; }   // phone: back to the player on top of the list
    stopVideo(video); lbx.classList.add('hidden'); const was = current; current = null; markOn();
    const el = was && $$('#ll .chc').find(x => list[+x.dataset.i] && list[+x.dataset.i].stream_id == was.stream_id); if (el) { el.classList.add('on'); el.focus({ preventScroll: false }); } }
  function drawTvCats() {
    $('#tvcats').innerHTML = allCats.map(c => `<button class="cat ${String(c.category_id) === String(tvCat) ? 'on' : ''}" data-c="${esc(c.category_id)}"><span dir="auto">${esc(c.category_name)}</span></button>`).join('');
    const on = $('#tvcats .cat.on'); if (on) on.scrollIntoView({ block: 'center' });
  }
  async function loadTvCat(cid) {
    tvCat = cid; const el = $('#tvchs'); el.innerHTML = spinner();
    try { tvList = await getList(cid); } catch (e) { el.innerHTML = empty(e.message); return; }
    renderRows(el, tvList, 0, true);
    setTimeout(() => { const on = $('#tvchs .row.on'); if (on) { on.scrollIntoView({ block: 'center' }); on.focus({ preventScroll: true }); } }, 60);
  }
  function showPanel() { lbx.classList.add('panel'); clearTimeout(hideT); hideT = setTimeout(() => lbx.classList.remove('panel'), 5000); }
  $('#tvcats').onclick = (e) => { const b = e.target.closest('.cat'); if (!b) return; showPanel(); $$('#tvcats .cat').forEach(x => x.classList.toggle('on', x === b)); loadTvCat(b.dataset.c); };
  $('#tvchs').onclick = (e) => { const r = e.target.closest('.row'); if (!r) return; showPanel(); playList = tvList; play(tvList[+r.dataset.i]); };
  $('#tvchs').onscroll = $('#tvcats').onscroll = () => showPanel();
  $('#tvtap').onclick = () => { if (lbx.classList.contains('panel')) { lbx.classList.remove('panel'); clearTimeout(hideT); } else showPanel(); };
  $('#tvtap').ondblclick = () => exitTV();
  lbx.addEventListener('mousemove', () => { if (lbx.classList.contains('tv')) showPanel(); });
  $('#tvx').onclick = exitTV;
  $('#fs').onclick = enterTV;
  $('#xc').onclick = () => { stopVideo(video); current = null; markOn(); if (!isWide()) lbx.classList.add('hidden'); };
  function zap(d) { if (!current || !playList.length) return; let i = playList.findIndex(c => c.stream_id == current.stream_id); i = (i + d + playList.length) % playList.length; play(playList[i]); }
  function onKey(e) {
    if (!lbx.classList.contains('tv')) return;
    const panel = lbx.classList.contains('panel');
    if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); e.stopPropagation(); if (panel) lbx.classList.remove('panel'); else exitTV(); return; }
    if (!panel) {
      // any button brings the menus back (up/down still switch channel straight away)
      if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); zap(-1); showPanel(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); zap(1); showPanel(); }
      else { e.preventDefault(); e.stopPropagation(); showPanel(); const on = $('#tvchs .row.on') || $('#tvchs .row'); if (on) on.focus({ preventScroll: true }); }
    } else showPanel();
  }
  document.addEventListener('keydown', onKey, true);
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
// fast engine is tried first on every channel; a failure only falls back for that one play
function tsOk() { return true; }
function tsMark() {}
async function playLive(v, c, msg) {
  const token = (S.playTok = (S.playTok || 0) + 1); S.lastTsErr = '';
  stopVideo(v);
  const show = (html) => { if (!msg) return; msg.innerHTML = html; msg.classList.toggle('hidden', !html); };
  show('<div class="spin"></div>');
  v.onplaying = () => show('');
  const failMsg = (code) => explainFail(show, code);
  const mmsOk = !!(window.ManagedMediaSource || window.MediaSource);
  const direct = location.origin + playUrl('live', c.stream_id, 'ts');
  const viaUs = location.origin + playUrl('live', c.stream_id, 'ts').replace('/play/', '/px/');
  // 1) straight from the IPTV server (fastest)  2) through Arab Sat's server (for phones that can't open it)  3) Safari HLS
  const tries = [];
  if (mmsOk) { if (!S.needProxy) tries.push(['direct', direct]); tries.push(['proxy', viaUs]); }
  const errs = [];
  const next = async () => {
    if (token !== S.playTok) return;
    const t = tries.shift();
    if (!t) { S.lastTsErr = errs.join(' / '); playHls(v, c, msg, token, failMsg); return; }
    try {
      await loadMpegts();
      if (token !== S.playTok) return;
      if (!(window.mpegts && mpegts.getFeatureList().mseLivePlayback)) { errs.push('no-mse'); return playHls(v, c, msg, token, failMsg); }
      stopVideo(v); v.disableRemotePlayback = true;
      const p = mpegts.createPlayer({ type: 'mpegts', isLive: true, url: t[1] }, {
        enableWorker: false, enableStashBuffer: true, stashInitialSize: 384 * 1024, lazyLoad: false,
        liveBufferLatencyChasing: false, liveSync: true, liveSyncMaxLatency: 14, liveSyncTargetLatency: 6, liveSyncPlaybackRate: 1.1,
        autoCleanupSourceBuffer: true, autoCleanupMaxBackwardDuration: 60, autoCleanupMinBackwardDuration: 30 });
      S.ts = p; let started = false, failed = false;
      p.attachMediaElement(v); p.load();
      v.onplaying = () => { started = true; show(''); if (t[0] === 'proxy' && errs.length) S.needProxy = true; };
      v.onwaiting = () => show('<div class="spin"></div>');
      const fail = (why) => { if (failed || token !== S.playTok) return; failed = true; errs.push(t[0] + ':' + why); next(); };
      p.on(mpegts.Events.ERROR, (type, detail, info) => { if (started && type === mpegts.ErrorTypes.MEDIA_ERROR) return; fail(detail + (info && info.code ? ':' + info.code : '')); });
      const pr = v.play(); if (pr && pr.catch) pr.catch((err) => { if (err && err.name === 'NotAllowedError') tapToPlay(v, msg); });
      setTimeout(() => { if (token === S.playTok && !started && S.ts === p) fail('timeout'); }, 7000);
    } catch (e) { errs.push(t[0] + ':load'); next(); }
  };
  next();
}
function diagLine(code) {
  const v = document.createElement('video');
  return [code, 'iOS ' + ((navigator.userAgent.match(/OS (\d+)_(\d+)/) || []).slice(1).join('.') || '-'),
    'MMS ' + (window.ManagedMediaSource ? 'yes' : 'no'), 'MSE ' + (window.MediaSource ? 'yes' : 'no'),
    'HLS ' + (v.canPlayType('application/vnd.apple.mpegurl') || 'no'), standalone ? 'app' : 'browser'].filter(Boolean).join(' · ');
}
async function explainFail(show, code) {
  try { fetch('/api/clientlog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ msg: diagLine(code) + ' · s' + (S.acc && S.acc.s) }) }); } catch (e) {}
  show('This channel is not available right now.<br>Try another channel.' + `<small class="ecode">${esc(diagLine(code))}</small>`);
  try {
    const j = await api({}); const u = (j && j.user_info) || {};
    if (+u.max_connections && +u.active_cons >= +u.max_connections)
      show(`This account is already watching on another device.<br><small class="ecode">Allowed devices at the same time: ${esc(u.max_connections)}. Close it on the other device and try again.</small>`);
    else if (u.status && u.status !== 'Active') show('Your subscription is ' + esc(u.status) + '.<br>Please contact customer service.');
  } catch (e) {}
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
    v.onerror = () => { if (token !== S.playTok) return; if (tries++ < 1) setTimeout(() => { v.src = url + '?r=' + tries; v.play().catch(() => {}); }, 1200); else failMsg((S.lastTsErr ? S.lastTsErr + ' / ' : '') + 'hls:' + ((v.error && v.error.code) || '?')); };
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
  // iPhone/iPad: the IPTV servers send a broken "Accept-Ranges" header that Safari refuses,
  // so movies/episodes go through our server (which fixes it). Other browsers go direct and
  // only fall back to our server if the direct link fails.
  const viaProxy = (u) => u.startsWith('/play/') ? '/px/' + u.slice(6) : u;
  let cur = isIOS ? viaProxy(url) : url, startAt = o.start || 0;
  const go = () => {
    v.src = cur;
    if (startAt) v.addEventListener('loadedmetadata', () => { try { v.currentTime = startAt; } catch (e) {} }, { once: true });
    v.play().catch(() => {});
  };
  v.onerror = () => {
    const alt = viaProxy(cur);
    if (alt !== cur) { startAt = v.currentTime || startAt; cur = alt; go(); return; }
    const err = v.error ? v.error.code : '?';
    try { fetch('/api/clientlog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ msg: 'vod fail ' + err + ' · ' + url.split('/').pop() + ' · ' + (isIOS ? 'ios' : 'other') }) }); } catch (e) {}
    show('This video can\'t play here.<br>The format may not be supported on this device.');
  };
  go();
}
function goFull(v) {
  try {
    if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (v.requestFullscreen) v.requestFullscreen();
  } catch (e) {}
}

/* ---------------- full player (movies / episodes) with pro controls ---------------- */
let fpEl = null;
const I2 = {
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  back10: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><text x="12" y="15.5" fill="currentColor" stroke="none" font-size="7.5" font-weight="800" text-anchor="middle" font-family="sans-serif">10</text></svg>',
  fwd10: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/><text x="12" y="15.5" fill="currentColor" stroke="none" font-size="7.5" font-weight="800" text-anchor="middle" font-family="sans-serif">10</text></svg>',
  vol: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5l9 7-9 7zM16 5h3v14h-3z"/></svg>',
};
const clock = (sec) => { sec = Math.max(0, Math.floor(sec || 0)); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s2 = sec % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s2).padStart(2, '0'); };
function closePlayer() {
  if (!fpEl) return;
  const v = $('video', fpEl); if (fpEl._save) fpEl._save(); stopVideo(v);
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
  fpEl.remove(); fpEl = null;
  if (S.onPlayerClose) { try { S.onPlayerClose(); } catch (e) {} }
}
// progress state of one item: 'done', 'part' (started, not finished) or ''
function progState(pid) { const p = progAll()[pid]; if (!p || !p.d) return ''; if (p.done || p.t / p.d >= 0.93) return 'done'; return p.t > 20 ? 'part' : ''; }
// "Continue watching" or "Start from the beginning" when there is saved progress
function askResume(pid, title, go) {
  const p = progAll()[pid];
  if (!p || !p.d || p.t < 30 || progState(pid) === 'done') { go(0); return; }
  const bg = document.createElement('div'); bg.className = 'sheet-bg';
  bg.innerHTML = `<div class="sheet"><div class="grab"></div><h3 dir="auto">${esc(title)}</h3>
    <div class="resbar"><i style="width:${Math.min(100, p.t / p.d * 100)}%"></i></div>
    <div class="reslbl">Stopped at <b>${clock(p.t)}</b> of ${clock(p.d)}</div>
    <button class="btn red" id="rc">${I.play} Continue watching from ${clock(p.t)}</button>
    <button class="btn ghost" id="r0" style="margin-top:10px">Start from the beginning</button></div>`;
  document.body.appendChild(bg);
  bg.onclick = (e) => { if (e.target === bg) bg.remove(); };
  $('#rc', bg).onclick = () => { bg.remove(); go(p.t); };
  $('#r0', bg).onclick = () => { bg.remove(); go(0); };
  setTimeout(() => $('#rc', bg).focus(), 50);
}
function openPlayer(o) {
  closePlayer();
  const start = o.start || 0;
  fpEl = document.createElement('div'); fpEl.className = 'fp' + (o.live ? ' islive' : '');
  fpEl.innerHTML = `<div class="vw"><video playsinline webkit-playsinline autoplay ${o.live ? 'controls' : ''}></video><div class="vmsg hidden"></div>
    <div class="pctl">
      <div class="ptop"><button class="ibtn" id="fpx">${I.back}</button><h3 dir="auto">${esc(o.title)}</h3><button class="ibtn" id="fpf">${I.full}</button></div>
      ${o.live ? '' : `<div class="pmid"><button class="pbig sm" id="pb10" aria-label="Back 10 seconds">${I2.back10}</button>
        <button class="pbig" id="ppl" aria-label="Play or pause">${I2.pause}</button>
        <button class="pbig sm" id="pf10" aria-label="Forward 10 seconds">${I2.fwd10}</button></div>
      <div class="pbot"><div class="ptime"><span id="pcur">0:00</span><span id="pdur">0:00</span></div>
        <div class="pseek" id="pseek"><div class="pbuf" id="pbuf"></div><div class="pfill" id="pfill"></div><div class="pknob" id="pknob"></div><div class="ptip hidden" id="ptip"></div></div>
        <div class="prow"><button class="ibtn" id="pvol">${I2.vol}</button><span class="ptitle2" dir="auto">${esc(o.title)}</span>
          ${o.next ? `<button class="btn red pnext" id="pnx">${I2.next} Next episode</button>` : ''}</div></div>`}
    </div></div>`;
  document.body.appendChild(fpEl);
  const v = $('video', fpEl), root = fpEl;
  $('#fpx', root).onclick = closePlayer;
  $('#fpf', root).onclick = () => { const el = root; if (el.requestFullscreen && !document.fullscreenElement) el.requestFullscreen().catch(() => goFull(v)); else if (document.fullscreenElement) document.exitFullscreen(); else goFull(v); };
  if (o.live) { playLive(v, o.live, $('.vmsg', root)); return; }
  loadVideo(v, o.url, { msg: $('.vmsg', root), start });
  // ---- controls ----
  let hideT;
  const show = () => { root.classList.add('ui'); clearTimeout(hideT); hideT = setTimeout(() => { if (!v.paused && !dragging) root.classList.remove('ui'); }, 3200); };
  show();
  const ppl = $('#ppl', root), seek = $('#pseek', root), fill = $('#pfill', root), knob = $('#pknob', root), buf = $('#pbuf', root), tip = $('#ptip', root);
  const toggle = () => { if (v.paused) v.play().catch(() => {}); else v.pause(); show(); };
  const jump = (d) => { if (!isFinite(v.duration)) return; v.currentTime = Math.max(0, Math.min(v.duration - 1, v.currentTime + d)); show(); flash(d > 0 ? '+' + d + 's' : d + 's'); };
  const flash = (t) => { const f = document.createElement('div'); f.className = 'pflash'; f.textContent = t; root.appendChild(f); setTimeout(() => f.remove(), 700); };
  ppl.onclick = toggle; $('#pb10', root).onclick = () => jump(-10); $('#pf10', root).onclick = () => jump(10);
  $('#pvol', root).onclick = () => { v.muted = !v.muted; $('#pvol', root).innerHTML = v.muted ? I2.mute : I2.vol; show(); };
  v.addEventListener('play', () => { ppl.innerHTML = I2.pause; show(); });
  v.addEventListener('pause', () => { ppl.innerHTML = I.play; root.classList.add('ui'); });
  const paint = (t) => { const d = v.duration || 0; const pct = d ? Math.min(100, t / d * 100) : 0;
    fill.style.width = pct + '%'; knob.style.left = pct + '%'; $('#pcur', root).textContent = clock(t); $('#pdur', root).textContent = '-' + clock(Math.max(0, d - t)); };
  v.addEventListener('timeupdate', () => { if (!dragging) paint(v.currentTime);
    try { if (v.buffered.length && v.duration) buf.style.width = Math.min(100, v.buffered.end(v.buffered.length - 1) / v.duration * 100) + '%'; } catch (e) {} });
  v.addEventListener('loadedmetadata', () => paint(v.currentTime));
  // big seek bar: drag with mouse or finger
  let dragging = false;
  const posAt = (x) => { const r = seek.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)) * (v.duration || 0); };
  const down = (e) => { if (!isFinite(v.duration)) return; dragging = true; root.classList.add('dragging'); move(e); e.preventDefault(); };
  const move = (e) => { if (!dragging) { if (e.type === 'mousemove' && e.target.closest && e.target.closest('#pseek')) { const t = posAt(e.clientX); tip.textContent = clock(t); tip.style.left = (t / v.duration * 100) + '%'; tip.classList.remove('hidden'); } return; }
    const x = e.touches ? e.touches[0].clientX : e.clientX; const t = posAt(x); paint(t); tip.textContent = clock(t); tip.style.left = (t / v.duration * 100) + '%'; tip.classList.remove('hidden'); show(); };
  const up = (e) => { if (!dragging) return; dragging = false; root.classList.remove('dragging'); const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX; v.currentTime = posAt(x); tip.classList.add('hidden'); show(); };
  seek.addEventListener('mousedown', down); seek.addEventListener('touchstart', down, { passive: false });
  window.addEventListener('mousemove', move); window.addEventListener('touchmove', move, { passive: true });
  window.addEventListener('mouseup', up); window.addEventListener('touchend', up);
  seek.addEventListener('mouseleave', () => { if (!dragging) tip.classList.add('hidden'); });
  root.addEventListener('mousemove', show);
  $('.vw', root).addEventListener('click', (e) => { if (e.target.closest('button,.pseek')) return; if (root.classList.contains('ui')) { if (e.target === v || e.target.classList.contains('pctl')) root.classList.remove('ui'); } else show(); });
  v.addEventListener('dblclick', () => $('#fpf', root).click());
  const key = (e) => {
    if (!fpEl || document.querySelector('.sheet-bg')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); e.stopPropagation(); toggle(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); jump(10); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); jump(-10); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); v.volume = Math.min(1, v.volume + .1); show(); flash(Math.round(v.volume * 100) + '%'); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); v.volume = Math.max(0, v.volume - .1); show(); flash(Math.round(v.volume * 100) + '%'); }
    else if (e.key === 'f') { $('#fpf', root).click(); }
    else if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); e.stopPropagation(); if (document.fullscreenElement) document.exitFullscreen(); else closePlayer(); }
    else if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); toggle(); }
  };
  document.addEventListener('keydown', key, true);
  // ---- progress saving + next episode ----
  const save = (done) => { if (v.duration && isFinite(v.duration) && (v.currentTime > 5 || done))
    progSet(o.pid, { t: done ? v.duration : v.currentTime, d: v.duration, done: done || (v.currentTime / v.duration >= 0.93), title: o.title, img: o.img, kind: o.kind, sid: o.sid, ext: o.ext, series: o.series, ep: o.epLabel }); };
  root._save = () => save(false);
  const iv = setInterval(() => save(false), 5000);
  if (o.next) $('#pnx', root).onclick = () => { save(false); o.next(); };
  v.addEventListener('ended', () => { save(true); if (o.next) { flash('Next episode'); setTimeout(() => o.next && o.next(), 900); } else root.classList.add('ui'); });
  const oldRemove = root.remove.bind(root);
  root.remove = () => { clearInterval(iv); clearTimeout(hideT); document.removeEventListener('keydown', key, true);
    window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', move); window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); oldRemove(); };
}

/* ---------------- movies / series grids ---------------- */
async function renderGridSection(kind, catId) {
  const isV = kind === 'vod';
  app.innerHTML = sideLayout(isV ? 'Movies' : 'Series');
  startBarClock();
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
    ${isV ? (() => { const st = progState('m' + id); if (st === 'done') return '<span class="pmark done">✓</span>'; const pr = progAll()['m' + id]; return st === 'part' ? `<i class="pprog"><b style="width:${Math.min(100, pr.t / pr.d * 100)}%"></b></i>` : ''; })() : ''}
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
    <div class="dbody"><div class="acts"><button class="btn red" id="pl">${I.play} ${resume ? 'Continue · ' + fmtTime(pr.d - pr.t) + ' left' : (progState(pid) === 'done' ? 'Watch again' : 'Play')}</button>
      <button class="ibtn ${isFav('movie', md.stream_id) ? 'on' : ''}" id="fv">${isFav('movie', md.stream_id) ? I.star : I.starO}</button></div>
      ${progState(pid) === 'done' ? '<div class="wbadge done">✓ Watched</div>' : (resume ? `<div class="resbar big"><i style="width:${Math.min(100, pr.t / pr.d * 100)}%"></i></div>` : '')}
      <p dir="auto">${esc(info.plot || info.description || '')}</p>
      ${info.cast ? `<p dir="auto"><b style="color:var(--silver)">Cast:</b> ${esc(info.cast)}</p>` : ''}
      ${info.director ? `<p dir="auto"><b style="color:var(--silver)">Director:</b> ${esc(info.director)}</p>` : ''}</div>`;
  const go = (st) => openPlayer({ title: name, url: playUrl('movie', md.stream_id, md.container_extension || 'mp4'), pid, img: bd || poster, kind: 'movie', sid: md.stream_id, ext: md.container_extension || 'mp4', start: st });
  $('#pl').onclick = () => askResume(pid, name, go);
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
  function playEp(e, ask) {
    const idx = flat.indexOf(e);
    const nx = flat[idx + 1];
    const i = e.info || {};
    const go = (st) => { openPlayer({ title: name + ' - ' + epTitle(e), url: playUrl('series', e.id, e.container_extension || 'mp4'), pid: 'e' + e.id,
      img: img(i.movie_image) || bd || cover, kind: 'ep', series: id, sid: e.id, ext: e.container_extension, start: st,
      next: nx ? () => { playEp(nx, false); } : null });
};
    if (ask === false) go(0); else askResume('e' + e.id, name + ' - ' + epTitle(e), go);
  }
  function drawSeason() {
    store.set('lastSeason_' + id, season);
    $('#ssn').innerHTML = seasons.map(s => `<button class="chip ${s === String(season) ? 'on' : ''}" data-s="${esc(s)}">Season ${esc(s)}</button>`).join('');
    $$('#ssn .chip').forEach(b => b.onclick = () => { season = b.dataset.s; drawSeason(); });
    const pa = progAll();
    const list = flat.filter(e => String(e._s) === String(season));
    let lastId = null, lastTs = 0; flat.forEach(e => { const p = pa['e' + e.id]; if (p && p.ts > lastTs) { lastTs = p.ts; lastId = e.id; } });
    $('#eps').innerHTML = list.map(e => { const i = e.info || {}; const p = pa['e' + e.id]; const st = progState('e' + e.id);
      const badge = st === 'done' ? '<span class="wbadge done">✓ Watched</span>' : (st === 'part' ? `<span class="wbadge part">● In progress · ${fmtTime(p.d - p.t)} left</span>` : '');
      return `<button class="ep ${st} ${e.id === lastId ? 'last' : ''}" data-e="${flat.indexOf(e)}"><div class="th" style="background-image:url('${esc(img(i.movie_image) || cover)}')"><div class="pl">${st === 'done' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>' : I.play}</div>
        ${p && p.d ? `<div class="prog" style="width:${st === 'done' ? 100 : Math.min(100, p.t / p.d * 100)}%"></div>` : ''}</div>
        <div class="i"><b dir="auto">${esc(e.episode_num + '. ' + (e.title || 'Episode ' + e.episode_num))}</b>${e.id === lastId ? '<span class="wbadge last">Last watched</span>' : ''}${badge}
        <small dir="auto">${esc([i.duration, i.plot].filter(Boolean).join(' · '))}</small></div></button>`; }).join('') || empty('No episodes');
    $$('#eps .ep').forEach(b => b.onclick = () => playEp(flat[+b.dataset.e]));
  }
  if (seasons.length) drawSeason();
  const label = () => { const pa = progAll(); let best = null; flat.forEach(e => { const p = pa['e' + e.id]; if (p && (!best || p.ts > best.p.ts)) best = { e, p }; });
    if (best && $('#pl')) { const done = progState('e' + best.e.id) === 'done'; const k = flat.indexOf(best.e); const tgt = done && flat[k + 1] ? flat[k + 1] : best.e;
      $('#pl').innerHTML = `${I.play} ${done ? 'Play' : 'Continue'} S${tgt._s} E${tgt.episode_num}`; } };
  label();
  S.onPlayerClose = () => { if ($('#eps')) { drawSeason(); label(); } };
  $('#pl').onclick = () => {
    if (!flat.length) return;
    const pa = progAll();
    // continue the last watched episode, else the first one
    let best = null; flat.forEach(e => { const p = pa['e' + e.id]; if (p && (!best || p.ts > best.p.ts)) best = { e, p }; });
    if (best) { const done = progState('e' + best.e.id) === 'done'; const k = flat.indexOf(best.e); playEp(done && flat[k + 1] ? flat[k + 1] : best.e); }
    else playEp(flat[0], false);
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

/* ---------------- keyboard / remote navigation (arrows move the focus, Enter opens) ---------------- */
const NAV_SEL = '.chc,.pbig,.tile,.cat,.row,.pc,.ep,.cw,.ibtn,.catbtn,.newbtn,.chip,.btn,.srv,.input,.star.on';
function navCandidates() {
  let scope = document;
  const tv = document.querySelector('.livebox.tv'); if (tv) scope = tv;
  const sheet = document.querySelector('.sheet-bg'); if (sheet) scope = sheet;
  const fp = document.querySelector('.fp'); if (fp) scope = fp;
  return Array.from(scope.querySelectorAll(NAV_SEL)).filter(el => {
    if (el.disabled || el.closest('.hidden')) return false;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) return false;
    const st = getComputedStyle(el); if (st.visibility === 'hidden' || +st.opacity === 0) return false;
    if (el.closest('.side') && !el.closest('.side.open') && !isWide()) return false;
    return r.bottom > -200 && r.top < innerHeight + 200;
  });
}
function navMove(dir) {
  const cands = navCandidates(); if (!cands.length) return;
  const cur = document.activeElement && cands.includes(document.activeElement) ? document.activeElement : null;
  if (!cur) { (cands.find(el => el.classList.contains('on')) || cands[0]).focus(); return; }
  const a = cur.getBoundingClientRect(), ax = a.left + a.width / 2, ay = a.top + a.height / 2;
  let best = null, bs = Infinity;
  for (const el of cands) {
    if (el === cur) continue;
    const b = el.getBoundingClientRect(), bx = b.left + b.width / 2, by = b.top + b.height / 2;
    const dx = bx - ax, dy = by - ay;
    let main, cross;
    if (dir === 'ArrowRight') { if (b.left < a.right - 4 && dx <= 4) continue; main = Math.max(0, b.left - a.right); cross = Math.abs(dy); }
    else if (dir === 'ArrowLeft') { if (b.right > a.left + 4 && dx >= -4) continue; main = Math.max(0, a.left - b.right); cross = Math.abs(dy); }
    else if (dir === 'ArrowDown') { if (b.top < a.bottom - 4 && dy <= 4) continue; main = Math.max(0, b.top - a.bottom); cross = Math.abs(dx); }
    else { if (b.bottom > a.top + 4 && dy >= -4) continue; main = Math.max(0, a.top - b.bottom); cross = Math.abs(dx); }
    const sc = main + cross * 2.2 + (el.parentElement === cur.parentElement ? -6 : 0);
    if (sc < bs) { bs = sc; best = el; }
  }
  if (best) { best.focus({ preventScroll: true }); best.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
}
document.addEventListener('keydown', (e) => {
  if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
  const t = e.target;
  const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA');
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    if (typing && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    if (t && t.tagName === 'VIDEO') return;
    e.preventDefault(); navMove(e.key); document.body.classList.add('kbd');
  } else if (e.key === 'Enter' && t && !typing && t.matches && t.matches('.row,.cw,.pc,.ep,.tile,.chc') && t.tagName !== 'BUTTON') { e.preventDefault(); t.click(); }
  else if ((e.key === 'Escape' || e.key === 'Backspace') && !typing && !document.querySelector('.livebox.tv')) {
    const sh = document.querySelector('.sheet-bg'); if (sh) { sh.remove(); return; }
    if (fpEl) { closePlayer(); return; }
    if (location.hash && location.hash !== '#/') { e.preventDefault(); history.back(); }
  }
});
document.addEventListener('mousedown', () => document.body.classList.remove('kbd'));

route();
translateNode(document.body);
syncActivation();
document.addEventListener('visibilitychange', () => { if (!document.hidden) syncActivation(); });
})();
