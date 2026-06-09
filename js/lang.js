/* ─── Language toggle engine ─────────────────────────────────────────────────
   Usage:
   1. Add data-en="English text" to any element (PT text stays as innerHTML)
   2. Include this file at the end of every page
   3. PT·EN button in nav triggers the toggle
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  const STORAGE_KEY = 'meliuz-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'pt';
  }

  function applyLang(lang) {
    // Swap data-en / data-pt on all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el.dataset.pt) el.dataset.pt = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.pt;
    });

    // Update PT·EN button — active language in bold
    document.querySelectorAll('.nav-lang').forEach(btn => {
      btn.innerHTML = lang === 'en'
        ? 'PT · <strong>EN</strong>'
        : '<strong>PT</strong> · EN';
    });

    // Store active lang on <html>
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  }

  // Wire up PT·EN button
  function wireToggle() {
    document.querySelectorAll('.nav-lang').forEach(btn => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => {
        const next = getLang() === 'pt' ? 'en' : 'pt';
        localStorage.setItem(STORAGE_KEY, next);
        applyLang(next);
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { wireToggle(); applyLang(getLang()); });
  } else {
    wireToggle();
    applyLang(getLang());
  }
})();
