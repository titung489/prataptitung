/* ===================================================
   slideshow.js — Photo carousel for homepage
   =================================================== */

const SLIDES = [
  {
    img: 'images/community-training.jpg',
    tag: 'Community Work',
    title: 'एक दिने सचेतना मूलक तालिम — Manhari-1',
    desc: 'Leading a one-day community-based awareness training on land rights and rehabilitation.',
    bg: 'linear-gradient(135deg,#1a2e1a,#2d4e20)'
  },
  {
    img: 'images/street-rally.jpg',
    tag: 'On the Ground',
    title: 'प्रभातफेरी कार्यक्रम — Women\'s Rights March',
    desc: 'Reporting from the frontlines at a women\'s rights awareness morning march.',
    bg: 'linear-gradient(135deg,#0a1020,#1a2040)'
  },
  {
    img: 'images/festival-greeting-wide.jpg',
    tag: 'Festival & Community',
    title: 'दशैँ, तिहार तथा छठ पर्बको शुभकामना',
    desc: 'Celebrating Nepal\'s greatest festivals with all readers, supporters, and fellow citizens.',
    bg: 'linear-gradient(135deg,#2a1a0a,#4a2a0a)'
  },
  {
    img: 'images/festival-greeting-square.jpg',
    tag: 'Greetings',
    title: 'Festive Greetings from Pratap Titung',
    desc: 'Wishing peace, prosperity, and success to every family during the festive season.',
    bg: 'linear-gradient(135deg,#1a0a0a,#3a1a0a)'
  },
  {
    img: 'images/pratap-portrait.jpg',
    tag: 'About the Author',
    title: 'Pratap Titung — Writer, Activist, Witness',
    desc: 'Independent journalist and conflict-victim advocate writing at the intersection of peace, disability, and human dignity.',
    bg: 'linear-gradient(135deg,#0a0a1a,#1a1a2a)'
  },
  {
    img: 'images/community-training.jpg',
    tag: 'Advocacy',
    title: 'समुदाय आधारित पुर्नस्थापना कार्यक्रम',
    desc: 'Community-based rehabilitation programmes for conflict-affected families in rural Nepal.',
    bg: 'linear-gradient(135deg,#1a1020,#2d1450)'
  }
];

let currentSlide = 0;
let slideTimer = null;
const AUTO_PLAY_DELAY = 5000;

function buildSlideshow() {
  const section = document.getElementById('photoSlideshow');
  if (!section) return;

  const track = section.querySelector('.slideshow-track');
  const dotsContainer = section.querySelector('.slide-dots');
  const thumbsContainer = section.querySelector('.slide-thumbs');
  const counter = section.querySelector('.slide-counter');

  // Build slides
  track.innerHTML = SLIDES.map((s, i) => `
    <div class="slide ${i === 0 ? 'active' : ''}" data-index="${i}">
      <img src="${s.img}" alt="${s.title}"
        onerror="this.style.display='none';this.parentElement.style.background='${s.bg}'"
        loading="${i === 0 ? 'eager' : 'lazy'}" />
      <div class="slide-overlay"></div>
      <div class="slide-caption">
        <span class="slide-tag">${s.tag}</span>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');

  // Build dots
  dotsContainer.innerHTML = SLIDES.map((_, i) =>
    `<button class="slide-dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`
  ).join('');

  // Build thumbnails
  thumbsContainer.innerHTML = SLIDES.map((s, i) => `
    <div class="slide-thumb ${i === 0 ? 'active' : ''}" data-thumb="${i}">
      <img src="${s.img}" alt=""
        onerror="this.style.display='none';this.parentElement.style.background='${s.bg}'"
        loading="lazy" />
    </div>
  `).join('');

  updateCounter(counter);

  // Dot clicks
  dotsContainer.addEventListener('click', e => {
    const dot = e.target.closest('[data-dot]');
    if (dot) goToSlide(parseInt(dot.dataset.dot));
  });

  // Thumb clicks
  thumbsContainer.addEventListener('click', e => {
    const thumb = e.target.closest('[data-thumb]');
    if (thumb) goToSlide(parseInt(thumb.dataset.thumb));
  });

  // Arrow buttons
  section.querySelector('[data-dir="prev"]')?.addEventListener('click', () => {
    goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  });
  section.querySelector('[data-dir="next"]')?.addEventListener('click', () => {
    goToSlide((currentSlide + 1) % SLIDES.length);
  });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
    if (e.key === 'ArrowRight') goToSlide((currentSlide + 1) % SLIDES.length);
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0
        ? (currentSlide + 1) % SLIDES.length
        : (currentSlide - 1 + SLIDES.length) % SLIDES.length);
    }
  });

  startAutoPlay();
}

function goToSlide(index) {
  const section = document.getElementById('photoSlideshow');
  if (!section) return;

  const slides = section.querySelectorAll('.slide');
  const dots = section.querySelectorAll('.slide-dot');
  const thumbs = section.querySelectorAll('.slide-thumb');
  const track = section.querySelector('.slideshow-track');
  const counter = section.querySelector('.slide-counter');

  // Remove active from current
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  thumbs[currentSlide]?.classList.remove('active');

  currentSlide = index;

  // Apply to new
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
  thumbs[currentSlide]?.classList.add('active');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Scroll thumb into view
  thumbs[currentSlide]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  updateCounter(counter);
  resetAutoPlay();
}

function updateCounter(el) {
  if (el) el.textContent = `${currentSlide + 1} / ${SLIDES.length}`;
}

function startAutoPlay() {
  slideTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % SLIDES.length);
  }, AUTO_PLAY_DELAY);
}

function resetAutoPlay() {
  clearInterval(slideTimer);
  startAutoPlay();
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildSlideshow);
} else {
  buildSlideshow();
}
