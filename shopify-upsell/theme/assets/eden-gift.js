/**
 * EDEN BEAUTY CLUB – gift with purchase in the cart drawer (snippets/eden-gift-cart.liquid).
 * - choose one option; options with a collection (KOYO) open a picker of in-stock shades (N = option quantity)
 * - choosing again replaces the previous gift (lines with the hidden property _eden_gift)
 * - guard: removes gift lines when the cart stops qualifying (not a member / below the threshold after discounts /
 *   gift turned off), so a gift is never charged by surprise
 * The 0 ₪ price itself comes from the automatic discount "EDEN CLUB – מתנה בקנייה מ־1,000 ₪" (checked by Shopify).
 */
import { CartAddEvent, ThemeEvents } from '@theme/events';

const ROOT = (window.Shopify && Shopify.routes && Shopify.routes.root) || '/';
const PROP = '_eden_gift';
let busy = false;
let chooser = null; // { title, qty, picked: Map(id -> {id,title}) }

const api = async (path, body) => {
  const r = await fetch(ROOT + path, body
    ? { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) }
    : { headers: { Accept: 'application/json' } });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.description || d.message || 'error');
  return d;
};
const giftLines = (cart) => cart.items.filter((i) => i.properties && i.properties[PROP]);
const $ = (sel, el = document) => el.querySelector(sel);
const showErr = (msg) => { const e = $('[data-gift-err]'); if (e) { e.textContent = msg; e.hidden = !msg; } };

async function refresh() {
  const cart = await api('cart.js');
  document.dispatchEvent(new CartAddEvent(cart, 'eden-gift', { source: 'eden-gift', itemCount: cart.item_count }));
}

async function removeLines(lines) {
  if (!lines.length) return;
  const updates = {};
  lines.forEach((l) => { updates[l.key] = 0; });
  await api('cart/update.js', { updates });
}

async function setGift(title, items) {
  if (busy) return;
  busy = true;
  showErr('');
  document.querySelectorAll('[data-gift-pick],[data-gift-confirm]').forEach((b) => { b.disabled = true; });
  try {
    const cart = await api('cart.js');
    await removeLines(giftLines(cart));
    await api('cart/add.js', { items: items.map((i) => ({ id: Number(i.id), quantity: i.quantity || 1, properties: { [PROP]: title } })) });
    try { Shopify.analytics.publish('eden_gift_chosen', { gift: title }); } catch (_) {}
    chooser = null;
    await refresh();
  } catch (e) {
    console.warn('[eden-gift]', e);
    showErr('לא הצלחנו להוסיף את המתנה – אולי אזלה מהמלאי. נסי אפשרות אחרת.');
    document.querySelectorAll('[data-gift-pick],[data-gift-confirm]').forEach((b) => { b.disabled = false; });
  }
  busy = false;
}

/* remove the gift when the cart no longer qualifies */
async function guard() {
  if (busy) return;
  const cfg = $('[data-eden-gift-config]');
  let cart;
  try { cart = await api('cart.js'); } catch (_) { return; }
  const gifts = giftLines(cart);
  if (!gifts.length) return;
  const threshold = Number(cfg?.dataset.threshold || 100000);
  const member = cfg?.dataset.member === 'true';
  const enabled = cfg ? cfg.dataset.enabled === 'true' : false;
  const giftTotal = gifts.reduce((s, l) => s + l.final_line_price, 0);
  const total = cart.total_price - giftTotal;
  const titles = new Set(gifts.map((l) => l.properties[PROP]));
  const ok = enabled && member && total >= threshold && titles.size === 1;
  if (ok) return;
  busy = true;
  try {
    // more than one option in the cart: keep only the last one added
    const keep = titles.size > 1 && enabled && member && total >= threshold ? gifts[0].properties[PROP] : null;
    await removeLines(keep ? gifts.filter((l) => l.properties[PROP] !== keep) : gifts);
  } catch (e) { console.warn('[eden-gift] guard', e); }
  busy = false;
  await refresh();
}

/* picker for options that need a choice (shades / shapes) */
function renderChooser(box) {
  const panel = $('[data-gift-chooser]', box);
  if (!panel || !chooser) return;
  panel.hidden = false;
  $('[data-gift-chooser-title]', panel).textContent = chooser.qty > 1
    ? `${chooser.title} – בחרי ${chooser.qty} (${chooser.picked.size}/${chooser.qty})`
    : `${chooser.title} – בחרי אחת`;
  const wrap = $('[data-gift-swatches]', panel);
  wrap.innerHTML = '';
  if (!chooser.items) { wrap.innerHTML = '<p class="egc__loading">טוענת את האפשרויות מהמלאי…</p>'; return; }
  if (!chooser.items.length) { wrap.innerHTML = '<p class="egc__loading">כרגע אין במלאי – בחרי מתנה אחרת.</p>'; return; }
  chooser.items.forEach((it) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'egc__sw' + (chooser.picked.has(String(it.id)) ? ' is-on' : '');
    b.setAttribute('aria-pressed', chooser.picked.has(String(it.id)));
    b.dataset.giftSw = it.id;
    b.innerHTML = (it.img ? `<img src="${it.img}" alt="" loading="lazy" width="64" height="64">` : '') + `<span></span>`;
    b.querySelector('span').textContent = it.title.replace(/^לק ג'ל KOYO\s*/, '');
    wrap.appendChild(b);
  });
  $('[data-gift-confirm]', panel).disabled = chooser.picked.size !== Math.min(chooser.qty, chooser.items.length);
}

async function loadCollection(handle) {
  const out = [];
  for (let page = 1; page <= 3; page++) {
    const d = await api(`collections/${encodeURIComponent(handle)}/products.json?limit=250&page=${page}`);
    (d.products || []).forEach((p) => {
      const v = (p.variants || []).find((x) => x.available);
      if (v) out.push({ id: v.id, title: p.title, img: p.images?.[0]?.src ? p.images[0].src.replace(/(\.[a-z]+)(\?|$)/i, '_160x$1$2') : '' });
    });
    if (!d.products || d.products.length < 250) break;
  }
  return out.sort((a, b) => a.title.localeCompare(b.title, 'he', { numeric: true }));
}

document.addEventListener('click', async (e) => {
  const pick = e.target.closest?.('[data-gift-pick]');
  const sw = e.target.closest?.('[data-gift-sw]');
  const confirm = e.target.closest?.('[data-gift-confirm]');
  const cancel = e.target.closest?.('[data-gift-cancel]');
  if (!pick && !sw && !confirm && !cancel) return;
  const box = e.target.closest('[data-eden-gift]');
  if (!box) return;
  e.preventDefault();

  if (pick) {
    const opt = pick.closest('[data-gift-opt]');
    const title = opt.dataset.title;
    const qty = Number(opt.dataset.qty || 1);
    let items = [];
    try { items = JSON.parse($('[data-gift-items]', opt)?.textContent || '[]'); } catch (_) {}
    if (!opt.dataset.collection && items.length === 1) {
      return setGift(title, [{ id: items[0].id, quantity: qty }]);
    }
    box.querySelectorAll('[data-gift-opt]').forEach((o) => o.classList.toggle('is-active', o === opt));
    chooser = { title, qty, picked: new Map(), items: opt.dataset.collection ? null : items };
    renderChooser(box);
    $('[data-gift-chooser]', box)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (opt.dataset.collection) {
      try { chooser.items = await loadCollection(opt.dataset.collection); } catch (err) { chooser.items = []; console.warn(err); }
      renderChooser(document.querySelector('[data-eden-gift]'));
    }
    return;
  }
  if (sw && chooser) {
    const id = String(sw.dataset.giftSw);
    if (chooser.picked.has(id)) chooser.picked.delete(id);
    else {
      if (chooser.picked.size >= chooser.qty) chooser.picked.delete(chooser.picked.keys().next().value);
      chooser.picked.set(id, true);
    }
    return renderChooser(box);
  }
  if (confirm && chooser) {
    const ids = [...chooser.picked.keys()];
    const items = ids.length >= chooser.qty ? ids.map((id) => ({ id, quantity: 1 })) : [{ id: ids[0], quantity: chooser.qty }];
    return setGift(chooser.title, items);
  }
  if (cancel) {
    chooser = null;
    box.querySelectorAll('[data-gift-opt]').forEach((o) => o.classList.remove('is-active'));
    const panel = $('[data-gift-chooser]', box);
    if (panel) panel.hidden = true;
  }
});

document.addEventListener(ThemeEvents.cartUpdate, (e) => {
  const src = e.detail?.data?.source;
  if (src === 'eden-gift') return;
  setTimeout(guard, 400);
});
if (document.readyState === 'complete') guard();
else window.addEventListener('load', guard, { once: true });
