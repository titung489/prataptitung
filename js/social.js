/* ===================================================
   social.js — Social Contribution section filter
   =================================================== */

// Filter tabs
const tabs = document.querySelectorAll('.s-tab');
const socialCards = document.querySelectorAll('.social-card');

tabs.forEach(tab => {
  tab.addEventListener('click', function () {
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.tab;

    socialCards.forEach(card => {
      const type = card.dataset.type;
      if (filter === 'all' || type === filter) {
        card.style.display = '';
        // Re-trigger animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Photo lightbox (click to expand)
document.querySelectorAll('.photo-card .social-card-media').forEach(media => {
  media.style.cursor = 'pointer';
  media.addEventListener('click', function () {
    const title = this.closest('.social-card').querySelector('h4')?.textContent || '';
    const img = this.querySelector('img');
    const bg = this.style.background || 'linear-gradient(135deg,#1a120a,#3d2b0e)';

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const imgContent = img
      ? `<img src="${img.src}" alt="${title}" style="width:100%;height:100%;object-fit:contain;border-radius:var(--radius-lg);" />`
      : `<div style="font-size:80px;display:flex;align-items:center;justify-content:center;height:100%;background:${bg};border-radius:var(--radius-lg);">${this.querySelector('.social-card-emoji')?.textContent || '📷'}</div>`;

    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
        <div class="lightbox-img" style="background:${bg}">${imgContent}</div>
        <p class="lightbox-caption">${title}</p>
      </div>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    overlay.querySelector('.lightbox-close').addEventListener('click', () => closeLightbox(overlay));
    overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(overlay); });
  });
});

function closeLightbox(overlay) {
  overlay.classList.remove('active');
  setTimeout(() => overlay.remove(), 300);
}
