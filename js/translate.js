/* ===================================================
   translate.js — EN ↔ Nepali live translation
   Uses MyMemory free API (no API key required)
   Caches translations in sessionStorage
   =================================================== */

(function () {
  'use strict';

  /* -------- State -------- */
  let currentLang = 'en';           // 'en' | 'ne'
  const CACHE_KEY = 'pt_translations_ne';
  let translationCache = {};

  try {
    const stored = sessionStorage.getItem(CACHE_KEY);
    if (stored) translationCache = JSON.parse(stored);
  } catch (e) {}

  /* -------- Selectors for translatable nodes -------- */
  const TRANSLATABLE_SELECTORS = [
    'h1', 'h2', 'h3', 'h4', 'h5',
    'p:not(.no-translate)',
    '.post-excerpt', '.post-title', '.hero-sub', '.hero-eyebrow',
    '.section-eyebrow', '.about-tagline',
    '.ticker-content span', '.post-tag',
    'button.amount-btn', '.freq-btn',
    '.donate-note', '.donate-badges span',
    'li:not(.nav-links li)',
    '.testimonial-card p', '.testi-author',
    '.social-card-body h4', '.social-card-body p:not(.social-card-date)',
    '.video-featured-info h3', '.video-featured-info p',
    '.video-card-title', '.video-card-desc',
    'label', '.section-title', '.nl-text h3', '.nl-text p',
  ].join(', ');

  /* -------- Snapshot of original English text -------- */
  let originalTexts = null;

  function snapshotOriginal() {
    if (originalTexts) return;
    originalTexts = new Map();
    const nodes = document.querySelectorAll(TRANSLATABLE_SELECTORS);
    nodes.forEach(node => {
      // Only capture direct text (not deeply nested)
      if (node.children.length === 0 || hasDirectText(node)) {
        originalTexts.set(node, node.innerHTML);
      }
    });
  }

  function hasDirectText(node) {
    for (const child of node.childNodes) {
      if (child.nodeType === 3 && child.textContent.trim()) return true;
    }
    return false;
  }

  /* -------- MyMemory Translation API -------- */
  async function translateBatch(texts, targetLang) {
    const results = [];
    // MyMemory supports up to ~500 chars per request — batch wisely
    for (const text of texts) {
      const trimmed = text.trim();
      if (!trimmed || trimmed.length < 2) { results.push(text); continue; }

      const cacheK = targetLang + ':' + trimmed;
      if (translationCache[cacheK]) { results.push(translationCache[cacheK]); continue; }

      try {
        const resp = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed.substring(0, 500))}&langpair=en|ne&de=prataptitung@blog.com`
        );
        const data = await resp.json();
        const translated = (data.responseStatus === 200)
          ? data.responseData.translatedText
          : trimmed;

        translationCache[cacheK] = translated;
        results.push(translated);
      } catch (_) {
        results.push(trimmed);
      }

      // Small delay between requests to respect rate limits
      await sleep(120);
    }
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(translationCache)); } catch (_) {}
    return results;
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  /* -------- Extract plain text from HTML (preserving tags) -------- */
  function extractText(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  /* -------- Apply translation to DOM -------- */
  async function translatePage(toLang) {
    snapshotOriginal();
    showOverlay(true);

    const btn = document.getElementById('langToggle');
    const label = document.getElementById('langLabel');

    try {
      if (toLang === 'en') {
        // Restore originals
        originalTexts.forEach((html, node) => { node.innerHTML = html; });
        currentLang = 'en';
        if (label) label.textContent = 'EN';
        document.documentElement.lang = 'en';
        if (btn) btn.title = 'Switch to Nepali';
        // Update lang-alt span
        const altSpan = btn?.querySelector('.lang-alt');
        if (altSpan) altSpan.textContent = 'नेपाली';
      } else {
        // Translate to Nepali
        const nodes = [];
        const plainTexts = [];

        originalTexts.forEach((html, node) => {
          const plain = extractText(html);
          if (plain && plain.trim().length > 1) {
            nodes.push(node);
            plainTexts.push(plain);
          }
        });

        updateStatus(`अनुवाद हुँदैछ... (0/${nodes.length})`);

        const translated = [];
        for (let i = 0; i < plainTexts.length; i++) {
          const txt = plainTexts[i];
          const cacheK = 'ne:' + txt.trim().substring(0, 500);

          if (translationCache[cacheK]) {
            translated.push(translationCache[cacheK]);
          } else {
            try {
              const resp = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(txt.substring(0, 500))}&langpair=en|ne&de=prataptitung@blog.com`
              );
              const data = await resp.json();
              const result = (data.responseStatus === 200)
                ? data.responseData.translatedText
                : txt;
              translationCache[cacheK] = result;
              translated.push(result);
            } catch (_) {
              translated.push(txt);
            }
            await sleep(100);
          }

          if (i % 5 === 0) updateStatus(`अनुवाद हुँदैछ... (${i + 1}/${nodes.length})`);
        }

        // Apply translations
        nodes.forEach((node, i) => {
          if (translated[i]) {
            // Preserve any child elements (like <i> icons), only replace text nodes
            replaceTextNodes(node, translated[i]);
          }
        });

        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(translationCache)); } catch (_) {}

        currentLang = 'ne';
        if (label) label.textContent = 'नेपाली';
        document.documentElement.lang = 'ne';
        if (btn) btn.title = 'Switch to English';
        const altSpan = btn?.querySelector('.lang-alt');
        if (altSpan) altSpan.textContent = 'EN';
      }
    } catch (err) {
      console.error('Translation error:', err);
    }

    showOverlay(false);
  }

  function replaceTextNodes(node, newText) {
    // If leaf node (no child elements), just set textContent
    const hasChildElements = Array.from(node.childNodes).some(c => c.nodeType === 1);
    if (!hasChildElements) {
      node.textContent = newText;
    } else {
      // Replace only direct text nodes, preserve child elements
      node.childNodes.forEach(child => {
        if (child.nodeType === 3 && child.textContent.trim()) {
          child.textContent = ' ' + newText + ' ';
        }
      });
    }
  }

  /* -------- UI Helpers -------- */
  function showOverlay(show) {
    const overlay = document.getElementById('translateOverlay');
    if (overlay) overlay.classList.toggle('active', show);
  }

  function updateStatus(msg) {
    const el = document.getElementById('translateStatus');
    if (el) el.textContent = msg;
  }

  /* -------- Wire up the toggle button -------- */
  function init() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const next = currentLang === 'en' ? 'ne' : 'en';
      btn.disabled = true;
      await translatePage(next);
      btn.disabled = false;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* -------- Expose for article.html -------- */
  window.PT_translate = { translatePage, getCurrentLang: () => currentLang };

})();
