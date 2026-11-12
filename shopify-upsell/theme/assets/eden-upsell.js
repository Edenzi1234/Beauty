/**
 * EDEN upsell & cross-sell – front end.
 * - "+" quick add (only on an explicit click) with the chosen variant; tags the line with the hidden property _eden_rec
 *   (cart / product) so revenue from recommendations can be measured from the orders.
 * - after the add, fires the theme's own CartAddEvent, so the drawer, the cart bubble and these recommendations re-render
 *   exactly like a normal add-to-cart.
 * - opens the cart drawer after a normal product add (the theme's auto-open setting is off).
 * - product pages: loads "מומלץ לשלב עם" after the page is ready (sections/eden-pairs.liquid), so it never slows the page.
 */
import { CartAddEvent, ThemeEvents } from '@theme/events';

const money = (el, opt) => {
  const box = el.closest('[data-eu-card]')?.querySelector('[data-eu-price]');
  if (!box || !opt) return;
  box.innerHTML = (opt.dataset.compare ? `<s>${opt.dataset.compare}</s>` : '') + `<span>${opt.dataset.price}</span>`;
};

document.addEventListener('change', (e) => {
  const sel = e.target.closest?.('[data-eu-variant]');
  if (!sel) return;
  const opt = sel.selectedOptions[0];
  const btn = sel.closest('[data-eu-card]')?.querySelector('[data-eu-add]');
  if (btn) btn.dataset.variant = sel.value;
  money(sel, opt);
});

document.addEventListener('click', async (e) => {
  const btn = e.target.closest?.('[data-eu-add]');
  if (!btn || btn.disabled) return;
  e.preventDefault();
  const origin = btn.dataset.origin || 'cart';
  const id = Number(btn.dataset.variant);
  btn.disabled = true;
  btn.classList.add('is-loading');
  try {
    const res = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items: [{ id, quantity: 1, properties: { _eden_rec: origin } }] }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.description || data.message || 'error');
    const cart = await (await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`)).json();
    btn.classList.remove('is-loading');
    btn.classList.add('is-added');
    try {
      window.Shopify?.analytics?.publish?.('eden_upsell_add', { origin, variantId: id, product: btn.dataset.product, price: data.items?.[0]?.final_price });
    } catch (_) {}
    document.dispatchEvent(new CartAddEvent(cart, 'eden-upsell', { source: 'eden-upsell', itemCount: cart.item_count, variantId: String(id) }));
  } catch (err) {
    btn.classList.remove('is-loading');
    btn.disabled = false;
    const card = btn.closest('[data-eu-card]');
    let msg = card?.querySelector('.eu-card__err');
    if (card && !msg) {
      msg = document.createElement('p');
      msg.className = 'eu-card__err';
      msg.setAttribute('role', 'alert');
      card.append(msg);
    }
    if (msg) msg.textContent = 'לא ניתן להוסיף כרגע';
    console.warn('[eden-upsell]', err);
  }
});

/* open the drawer after a normal add-to-cart (product page, quick add of the theme) */
document.addEventListener(ThemeEvents.cartUpdate, (e) => {
  const d = e.detail?.data || {};
  if (d.didError || d.source === 'cart-items-component' || d.source === 'eden-upsell') return;
  if (!(e instanceof CartAddEvent)) return;
  const drawer = document.querySelector('cart-drawer-component');
  const dialog = drawer?.querySelector('dialog');
  if (drawer && dialog && !dialog.open && !drawer.hasAttribute('auto-open')) drawer.open?.();
});

/* product page: "מומלץ לשלב עם" */
async function loadPairs() {
  if (!/\/products\/[^/]+\/?$/.test(location.pathname) || document.querySelector('.eu-pairs')) return;
  try {
    const url = `${location.pathname}?section_id=eden-pairs`;
    const html = await (await fetch(url, { credentials: 'same-origin' })).text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const block = doc.querySelector('.eu-pairs');
    if (!block) return;
    const main = document.querySelector('main') || document.body;
    const productSection = main.querySelector('.shopify-section:has(product-form-component), .shopify-section:has(.product-information), .shopify-section');
    const wrap = document.createElement('div');
    wrap.className = 'shopify-section eden-pairs-section';
    wrap.append(document.adoptNode(block));
    (productSection || main.firstElementChild)?.after(wrap);
  } catch (err) {
    console.warn('[eden-upsell] pairs', err);
  }
}
if (document.readyState === 'complete') loadPairs();
else window.addEventListener('load', loadPairs, { once: true });
