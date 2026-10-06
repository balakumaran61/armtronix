/* ==========================================================================
   ARMtronix · Wireframe kit behaviour (ARM-01)
   Contract: tasks/CONVENTIONS.md §4. Loaded with `defer` after manifest.js.

   - Resolves [data-asset] images and [data-video] embeds from window.ASSETS
   - Numbers .wf-anno notes and renders their data-ids chips
   - Injects the toolbar: Desktop 1440 / Mobile 390 (D, M), annotations (A),
     section jump list; state is remembered in localStorage
   - window.WF.refresh(root) re-runs the resolvers on content added later
   ========================================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'armtronix-wf-state';
  var ASSETS = window.ASSETS || { images: {}, videos: {} };
  var root = document.documentElement;
  var state = { vp: 'desktop', anno: true, dark: false };

  /* ---- State --------------------------------------------------------- */
  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      if (saved.vp === 'mobile' || saved.vp === 'desktop') state.vp = saved.vp;
      if (typeof saved.anno === 'boolean') state.anno = saved.anno;
      if (typeof saved.dark === 'boolean') state.dark = saved.dark;
    } catch (e) { /* storage unavailable: use defaults */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function currentSection() {
    var sections = document.querySelectorAll('.wf-section');
    var offset = window.innerHeight * 0.3;
    var found = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= offset) found = sections[i];
    }
    return found;
  }

  function setViewport(vp, opts) {
    var keep = opts && opts.keepPosition ? currentSection() : null;
    state.vp = vp === 'mobile' ? 'mobile' : 'desktop';
    root.classList.toggle('wf-vp-mobile', state.vp === 'mobile');
    root.dataset.wfViewport = state.vp;
    syncToolbar();
    save();
    if (keep) {
      keep.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    document.dispatchEvent(new CustomEvent('wf:viewport', { detail: { viewport: state.vp } }));
  }

  function setAnno(on) {
    state.anno = !!on;
    root.classList.toggle('wf-hide-anno', !state.anno);
    syncToolbar();
    save();
  }

  function setDark(on) {
    state.dark = !!on;
    root.classList.toggle('wf-dark', state.dark);
    syncToolbar();
    save();
  }

  /* ---- Helpers ------------------------------------------------------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function ratio(node) {
    var r = node.getAttribute('data-ratio');
    return r ? r.replace(/\s/g, '').replace('/', ' / ') : '';
  }
  function errorBox(node, kind, id) {
    var msg = 'Unknown ' + kind + ' ID: ' + (id || '(empty)');
    node.innerHTML = '';
    node.appendChild(el('div', { 'class': 'wf-error', role: 'img', 'aria-label': msg, text: msg }));
    node.dataset.wfResolved = 'error';
    // warn, not error: a deliberate bad ID in KITTEST must not fail the "zero console errors" check
    console.warn('[wf-kit] ' + msg, node);
  }

  /* ---- Images -------------------------------------------------------- */
  function resolveImage(fig) {
    if (fig.dataset.wfResolved) return;
    var id = (fig.getAttribute('data-asset') || '').trim();
    var a = ASSETS.images && ASSETS.images[id];
    if (!a) return errorBox(fig, 'asset', id);

    var media = el('div', { 'class': 'wf-img__media' });
    var r = ratio(fig);
    if (r) media.style.aspectRatio = r;
    var img = el('img', {
      src: a.src,
      alt: fig.getAttribute('data-alt') || a.alt,
      loading: fig.hasAttribute('data-eager') ? 'eager' : 'lazy',
      decoding: 'async'
    });
    if (fig.getAttribute('data-position')) img.style.objectPosition = fig.getAttribute('data-position');
    img.addEventListener('error', function () {
      if (a.remoteSrc && img.src !== a.remoteSrc) { img.src = a.remoteSrc; return; }
      media.innerHTML = '';
      media.appendChild(el('div', { 'class': 'wf-error', text: id + ' failed to load' }));
    });
    media.appendChild(img);

    var parts = [fig.getAttribute('data-caption-text') || a.alt, a.credit];
    if (a.archive) parts.push(a.archive);
    parts.push(a.license);
    var cap = el('figcaption', null, [el('b', { text: id }), document.createTextNode(parts.filter(Boolean).join(' · '))]);

    // Keep any author-supplied children (overlays, labels) on top of the image
    var extras = Array.prototype.slice.call(fig.childNodes);
    fig.innerHTML = '';
    fig.appendChild(media);
    extras.forEach(function (n) { media.appendChild(n); });
    fig.appendChild(cap);
    fig.dataset.wfResolved = 'ok';
  }

  /* ---- Placeholders --------------------------------------------------- */
  function resolvePlaceholder(ph) {
    var r = ratio(ph);
    if (r && !ph.style.aspectRatio) ph.style.aspectRatio = r;
    if (!ph.hasAttribute('role')) {
      ph.setAttribute('role', 'img');
      ph.setAttribute('aria-label', 'Placeholder: ' + (ph.getAttribute('data-label') || ''));
    }
  }

  /* ---- Videos (click to load) --------------------------------------- */
  function resolveVideo(box) {
    if (box.dataset.wfResolved) return;
    var id = (box.getAttribute('data-video') || '').trim();
    var v = ASSETS.videos && ASSETS.videos[id];
    if (!v) return errorBox(box, 'video', id);
    var r = ratio(box);
    if (r) box.style.aspectRatio = r;

    var btn = el('button', { type: 'button', 'class': 'wf-video__poster', 'aria-label': 'Play video: ' + v.title + ' (' + v.channel + ')' }, [
      el('img', { src: v.poster, alt: '', loading: 'lazy', decoding: 'async' }),
      el('span', { 'class': 'wf-video__play', 'aria-hidden': 'true' }),
      el('span', { 'class': 'wf-video__title', text: id + ' · ' + v.title + ' · ' + v.channel })
    ]);
    btn.addEventListener('click', function () {
      var frame = el('iframe', {
        src: v.embed + '?autoplay=1&rel=0',
        title: v.title,
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        allowfullscreen: '',
        loading: 'eager'
      });
      box.innerHTML = '';
      box.appendChild(frame);
      frame.focus();
    });
    box.innerHTML = '';
    box.appendChild(btn);
    box.dataset.wfResolved = 'ok';
  }

  /* ---- Annotations --------------------------------------------------- */
  function numberAnnotations() {
    var notes = document.querySelectorAll('.wf-anno');
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var pin = n.querySelector(':scope > .wf-anno__pin');
      if (!pin) {
        pin = el('span', { 'class': 'wf-anno__pin', 'aria-hidden': 'true' });
        n.insertBefore(pin, n.firstChild);
        var ids = (n.getAttribute('data-ids') || '').trim();
        if (ids) {
          var chips = el('span', { 'class': 'wf-anno__ids' });
          ids.split(/\s+/).forEach(function (id) { chips.appendChild(el('span', { 'class': 'wf-anno__id', text: id })); });
          n.insertBefore(chips, pin.nextSibling);
        }
        if (!n.hasAttribute('aria-label')) n.setAttribute('aria-label', 'Design annotation');
      }
      pin.textContent = String(i + 1);
      n.dataset.n = String(i + 1);
    }
  }

  /* ---- Toolbar ------------------------------------------------------- */
  var tb = {};
  function buildToolbar() {
    if (document.querySelector('.wf-toolbar')) return;
    var here = (location.pathname.split('/').pop() || 'index.html');
    var pages = el('nav', { 'class': 'wf-toolbar__group wf-toolbar__pages', 'aria-label': 'Wireframe pages' });
    [['index.html', 'Home'], ['products.html', 'Products'], ['product.html', 'Product'], ['rfq.html', 'RFQ'], ['flow.html', 'Flow'], ['credits.html', 'Credits']].forEach(function (p) {
      var a = el('a', { href: p[0], text: p[1] });
      if (p[0] === here) a.setAttribute('aria-current', 'page');
      pages.appendChild(a);
    });

    tb.desktop = el('button', { type: 'button', title: 'Desktop frame, 1440 (key D)', html: 'Desktop 1440<kbd>D</kbd>' });
    tb.mobile = el('button', { type: 'button', title: 'Mobile frame, 390 (key M)', html: 'Mobile 390<kbd>M</kbd>' });
    tb.desktop.addEventListener('click', function () { setViewport('desktop', { keepPosition: true }); });
    tb.mobile.addEventListener('click', function () { setViewport('mobile', { keepPosition: true }); });
    var vpGroup = el('div', { 'class': 'wf-toolbar__group', role: 'group', 'aria-label': 'Viewport' }, [tb.desktop, tb.mobile]);

    tb.anno = el('button', { type: 'button', title: 'Show or hide annotations (key A)', html: 'Annotations<kbd>A</kbd>' });
    tb.anno.addEventListener('click', function () { setAnno(!state.anno); });
    tb.dark = el('button', { type: 'button', title: 'Dark wireframe (key T)', html: 'Dark<kbd>T</kbd>' });
    tb.dark.addEventListener('click', function () { setDark(!state.dark); });
    var annoGroup = el('div', { 'class': 'wf-toolbar__group' }, [tb.anno, tb.dark]);

    tb.jump = el('select', { 'aria-label': 'Jump to section' });
    tb.jump.appendChild(el('option', { value: '', text: 'Jump to section…' }));
    var sections = document.querySelectorAll('.wf-section[id][data-section]:not([data-nojump])');
    Array.prototype.forEach.call(sections, function (s) {
      tb.jump.appendChild(el('option', { value: s.id, text: s.getAttribute('data-section') + ' · ' + (s.getAttribute('data-title') || '') }));
    });
    tb.jump.addEventListener('change', function () {
      var target = tb.jump.value && document.getElementById(tb.jump.value);
      if (target) {
        target.scrollIntoView({ block: 'start' });
        if (history.replaceState) history.replaceState(null, '', '#' + target.id);
      }
      tb.jump.value = '';
    });

    var bar = el('div', { 'class': 'wf-toolbar', role: 'toolbar', 'aria-label': 'Wireframe review tools' }, [
      el('span', { 'class': 'wf-toolbar__brand', text: 'ARMTRONIX · WF' }),
      pages, vpGroup, annoGroup, tb.jump,
      el('span', { 'class': 'wf-toolbar__spacer' })
    ]);
    document.body.insertBefore(bar, document.body.firstChild);
  }
  function syncToolbar() {
    if (!tb.desktop) return;
    tb.desktop.setAttribute('aria-pressed', String(state.vp === 'desktop'));
    tb.mobile.setAttribute('aria-pressed', String(state.vp === 'mobile'));
    tb.anno.setAttribute('aria-pressed', String(state.anno));
    tb.dark.setAttribute('aria-pressed', String(state.dark));
  }

  /* ---- Keyboard shortcuts ------------------------------------------- */
  function onKey(e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var k = (e.key || '').toLowerCase();
    if (k === 'd') setViewport('desktop', { keepPosition: true });
    else if (k === 'm') setViewport('mobile', { keepPosition: true });
    else if (k === 'a') setAnno(!state.anno);
    else if (k === 't') setDark(!state.dark);
  }

  /* ---- Init ---------------------------------------------------------- */
  function refresh(scope) {
    var s = scope || document;
    Array.prototype.forEach.call(s.querySelectorAll('.wf-img[data-asset]'), resolveImage);
    Array.prototype.forEach.call(s.querySelectorAll('.wf-ph'), resolvePlaceholder);
    Array.prototype.forEach.call(s.querySelectorAll('.wf-video[data-video]'), resolveVideo);
    numberAnnotations();
  }

  load();
  buildToolbar();
  setViewport(state.vp);
  setAnno(state.anno);
  setDark(state.dark);
  refresh(document);
  document.addEventListener('keydown', onKey);

  // Honour an initial #hash after the toolbar shifts the layout
  if (location.hash) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 50);
  }

  window.WF = { refresh: refresh, setViewport: setViewport, setAnno: setAnno, setDark: setDark, state: function () { return { vp: state.vp, anno: state.anno, dark: state.dark }; } };
  document.dispatchEvent(new CustomEvent('wf:ready'));
})();
