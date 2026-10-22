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
    const emoji = this.querySelector('.social-card-emoji')?.textContent || '';
    const bg = this.style.background;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
        <div class="lightbox-img" style="background:${bg}">
          <span style="font-size:120px">${emoji}</span>
        </div>
        <p class="lightbox-caption">${title}</p>
        <p class="lightbox-note" style="color:rgba(255,255,255,0.4);font-size:0.82rem;margin-top:8px">
          Replace placeholder with your actual photos in the /images folder.
        </p>
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
