/* ===================================================
   main.js — Pratap Titung Blog
   =================================================== */

/* ===================== DATA ===================== */
const POSTS = [
  {
    id: 2,
    category: "Culture",
    date: "October 18, 2026",
    readTime: "6 min",
    title: "The Theatre of Outrage: How Social Media Manufactures Moral Panics",
    excerpt: "Every week a new crisis. Every week a new villain. The machinery of outrage is running 24/7 — and it's not accidental. Tracing who benefits from permanent moral emergency.",
    image: "",
    bg: "linear-gradient(135deg, #1a0a2e, #2d1450)"
  },
  {
    id: 3,
    category: "Economy",
    date: "October 17, 2026",
    readTime: "9 min",
    title: "Gig Work and the Illusion of Freedom",
    excerpt: "The platform economy promised liberation from the 9-to-5. What it delivered was precarity without safety nets — and a new vocabulary to disguise it as choice.",
    image: "",
    bg: "linear-gradient(135deg, #0a1a0a, #0e2e14)"
  },
  {
    id: 4,
    category: "Technology",
    date: "October 16, 2026",
    readTime: "12 min",
    title: "Who Owns Your Attention? The Surveillance Capitalism Playbook",
    excerpt: "Your clicks, your scrolls, your pauses — all harvested, quantified, and sold. Understanding the architecture of digital extraction is the first step to resisting it.",
    image: "",
    bg: "linear-gradient(135deg, #0a1020, #0e1a30)"
  },
  {
    id: 5,
    category: "Environment",
    date: "October 15, 2026",
    readTime: "7 min",
    title: "Climate Grief and the Psychology of Inaction",
    excerpt: "The science has been unambiguous for decades. Yet policy moves at a glacial pace. What is the psychological mechanism that converts clear evidence into paralysis?",
    image: "",
    bg: "linear-gradient(135deg, #0a1a10, #1a2e10)"
  },
  {
    id: 6,
    category: "Politics",
    date: "October 14, 2026",
    readTime: "10 min",
    title: "The Nationalist Playbook: A Field Guide to Its Seven Core Moves",
    excerpt: "From Hungary to Brazil to India — nationalist movements share a surprisingly consistent playbook. Naming the moves is the beginning of dismantling them.",
    image: "",
    bg: "linear-gradient(135deg, #1a0a0a, #2e1414)"
  },
  {
    id: 7,
    category: "Society",
    date: "October 13, 2026",
    readTime: "5 min",
    title: "The Loneliness Epidemic Is a Policy Failure, Not a Personal One",
    excerpt: "Western societies are facing record isolation. But blaming individuals for not maintaining connections misses the structural dismantling of community infrastructure.",
    image: "",
    bg: "linear-gradient(135deg, #1a1a0a, #2e2a10)"
  }
];

const EBOOKS = [
  {
    id: 1,
    emoji: "📖",
    bg: "linear-gradient(135deg, #1a120a, #c8973a33)",
    category: "Media Literacy",
    title: "Reading Between the Lines",
    desc: "A practical guide to critically consuming news and propaganda in the digital age.",
    price: 9.99,
    original: 14.99,
    pages: 180,
    format: "PDF + EPUB"
  },
  {
    id: 2,
    emoji: "⚖️",
    bg: "linear-gradient(135deg, #0a1020, #c8973a22)",
    category: "Politics",
    title: "The Architecture of Power",
    desc: "How political structures sustain inequality across generations — and how they can change.",
    price: 12.99,
    original: 18.99,
    pages: 240,
    format: "PDF + EPUB"
  },
  {
    id: 3,
    emoji: "🌍",
    bg: "linear-gradient(135deg, #0a1a10, #c8973a22)",
    category: "Environment",
    title: "After the Flood",
    desc: "Essays on climate justice, displacement, and what a just transition might actually look like.",
    price: 8.99,
    original: 12.99,
    pages: 150,
    format: "PDF + EPUB"
  },
  {
    id: 4,
    emoji: "🤖",
    bg: "linear-gradient(135deg, #101020, #c8973a22)",
    category: "Technology",
    title: "The Human After AI",
    desc: "What happens to work, identity, and society when machines can do almost everything we can?",
    price: 11.99,
    original: 16.99,
    pages: 210,
    format: "PDF + EPUB"
  }
];

/* ===================== NAVBAR ===================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top
  const btt = document.getElementById('backToTop');
  if (btt) {
    btt.classList.toggle('visible', window.scrollY > 400);
  }
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close nav when clicking a link (but not the lang toggle)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('active');
  });
});

/* ===================== BACK TO TOP ===================== */
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================== POST GRID ===================== */
const postGrid = document.getElementById('postGrid');

function renderPosts(posts) {
  return posts.map(post => `
    <article class="post-card fade-in" onclick="location.href='article.html?id=${post.id}'">
      <div class="post-card-img" style="background:${post.bg}">
        ${post.image ? `<img src="${post.image}" alt="${post.title}" />` : ''}
        <span class="post-category" style="position:absolute;top:16px;left:16px;">${post.category}</span>
      </div>
      <div class="post-card-body">
        <div class="post-meta">
          <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
          <span><i class="fa-regular fa-clock"></i> ${post.readTime} read</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <a class="read-link" href="article.html?id=${post.id}">Read more <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>
  `).join('');
}

if (postGrid) {
  postGrid.innerHTML = renderPosts(POSTS.slice(0, 6));
  observeFadeIns();
}

let loadedCount = 6;
document.getElementById('loadMoreBtn')?.addEventListener('click', function () {
  const morePosts = [
    { id: 8, category: "Society", date: "Oct 12, 2026", readTime: "7 min", title: "The Myth of Meritocracy in Late Capitalism", excerpt: "Meritocracy is the most persuasive legitimising ideology of our time. It is also, demonstrably, fiction.", bg: "linear-gradient(135deg, #1a1020, #2a1a30)" },
    { id: 9, category: "Culture", date: "Oct 11, 2026", readTime: "8 min", title: "Art Under Censorship: How Repression Shapes Form", excerpt: "When direct speech is forbidden, allegory, metaphor, and symbol become weapons of survival. History's greatest literature was often born from constraint.", bg: "linear-gradient(135deg, #0a1020, #101830)" },
    { id: 10, category: "Politics", date: "Oct 10, 2026", readTime: "11 min", title: "The Electoral College Is Not a Bug — It's a Feature", excerpt: "The sustained resistance to electoral reform reveals whose interests the current structure serves. Following the incentives tells you everything.", bg: "linear-gradient(135deg, #1a0a0a, #301020)" },
  ];
  if (postGrid) {
    postGrid.innerHTML += renderPosts(morePosts);
    observeFadeIns();
    loadedCount += 3;
    if (loadedCount >= 9) this.style.display = 'none';
  }
});

/* ===================== EBOOK GRID ===================== */
const ebookGrid = document.getElementById('ebookGrid');

function renderEbooks(books) {
  return books.map(b => `
    <div class="ebook-card fade-in" onclick="location.href='store.html?id=${b.id}'">
      <div class="ebook-cover" style="background:${b.bg}">
        <span style="font-size:64px">${b.emoji}</span>
      </div>
      <div class="ebook-info">
        <p class="category">${b.category}</p>
        <h4>${b.title}</h4>
        <p class="desc">${b.desc}</p>
        <div class="ebook-footer">
          <div class="ebook-price">
            <span class="original">$${b.original}</span>$${b.price}
          </div>
          <a href="store.html?id=${b.id}" class="btn-sm-primary">Buy Now</a>
        </div>
      </div>
    </div>
  `).join('');
}

if (ebookGrid) {
  ebookGrid.innerHTML = renderEbooks(EBOOKS);
  observeFadeIns();
}

/* ===================== NEWSLETTER ===================== */
document.getElementById('newsletterForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ Subscribed!';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = 'Subscribe Free'; btn.disabled = false; this.reset(); }, 3000);
});

/* ===================== DONATION ===================== */
// Amount buttons
document.querySelectorAll('.amount-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const customInput = document.getElementById('customAmount');
    if (customInput) customInput.value = '';
  });
});

// Frequency buttons
document.querySelectorAll('.freq-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Custom amount clears active
document.getElementById('customAmount')?.addEventListener('input', function () {
  if (this.value) {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
  }
});

// Donate button
document.getElementById('donateBtn')?.addEventListener('click', function () {
  const activeAmt = document.querySelector('.amount-btn.active');
  const customAmt = document.getElementById('customAmount')?.value;
  const amount = customAmt ? parseFloat(customAmt) : (activeAmt ? parseFloat(activeAmt.dataset.amount) : 10);
  const freq = document.querySelector('.freq-btn.active')?.dataset.freq;

  if (!amount || amount < 1) {
    alert('Please enter a valid donation amount.');
    return;
  }

  const modal = document.getElementById('donateModal');
  const msg = document.getElementById('modalMsg');
  if (msg) {
    msg.textContent = `Your ${freq === 'monthly' ? 'monthly' : 'one-time'} donation of $${amount.toFixed(2)} is deeply appreciated. You're keeping independent journalism alive. Thank you!`;
  }
  if (modal) modal.classList.add('active');
});

// Close modal
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
document.getElementById('donateModal')?.addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
function closeModal() {
  document.getElementById('donateModal')?.classList.remove('active');
}

/* ===================== INTERSECTION OBSERVER ===================== */
function observeFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  observeFadeIns();
});
