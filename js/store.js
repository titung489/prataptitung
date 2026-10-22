/* ===================================================
   store.js — Ebook store page
   =================================================== */

const STORE_BOOKS = [
  { id: 1, emoji: "📖", bg: "linear-gradient(135deg,#1a120a,#c8973a44)", category: "Media Literacy", title: "Reading Between the Lines", subtitle: "Critical Media Literacy for the Digital Age", desc: "A practical, accessible guide to consuming news and propaganda in a world of algorithmic feeds and manufactured narratives. Learn to identify bias, track ownership, and think for yourself.", price: 9.99, original: 14.99, pages: 180, format: "PDF + EPUB", year: 2026 },
  { id: 2, emoji: "⚖️", bg: "linear-gradient(135deg,#0a1020,#c8973a33)", category: "Politics", title: "The Architecture of Power", subtitle: "How Institutions Sustain Inequality", desc: "A deep dive into how political and economic structures reproduce themselves across generations — and what it takes to change them. Essential reading for anyone serious about social change.", price: 12.99, original: 18.99, pages: 240, format: "PDF + EPUB", year: 2026 },
  { id: 3, emoji: "🌍", bg: "linear-gradient(135deg,#0a1a10,#c8973a22)", category: "Environment", title: "After the Flood", subtitle: "Essays on Climate Justice & Transition", desc: "What does climate justice actually look like? This collection of essays moves beyond COP communiqués into the real politics of displacement, extraction, and transformation.", price: 8.99, original: 12.99, pages: 150, format: "PDF + EPUB", year: 2025 },
  { id: 4, emoji: "🤖", bg: "linear-gradient(135deg,#101020,#c8973a22)", category: "Technology", title: "The Human After AI", subtitle: "Identity, Work & Society in the Age of Machines", desc: "What happens to human meaning when machines match our cognitive output? This book refuses the hype and interrogates what AI really changes — and what it doesn't.", price: 11.99, original: 16.99, pages: 210, format: "PDF + EPUB", year: 2026 },
  { id: 5, emoji: "✊", bg: "linear-gradient(135deg,#1a0a0a,#c8973a22)", category: "Activism", title: "Organizing in the Dark", subtitle: "A Handbook for the Disorganized Resistance", desc: "Practical strategies for grassroots organizing, coalition building, and sustaining movements when resources are scarce and the opposition is well-funded.", price: 7.99, original: 11.99, pages: 140, format: "PDF + EPUB", year: 2025 },
  { id: 6, emoji: "💬", bg: "linear-gradient(135deg,#1a1a0a,#c8973a22)", category: "Culture", title: "The Language of Domination", subtitle: "Words, Power, and Who Controls Meaning", desc: "A linguistic analysis of how power shapes language — and how reclaiming words is an act of political resistance. From framing to dog-whistles to the sanitization of violence.", price: 10.99, original: 15.99, pages: 190, format: "PDF + EPUB", year: 2026 },
];

const storeGrid = document.getElementById('storeGrid');

if (storeGrid) {
  storeGrid.innerHTML = STORE_BOOKS.map(b => `
    <div class="store-ebook-card fade-in">
      <div class="store-book-cover" style="background:${b.bg}">
        <div class="store-book-spine"></div>
        <span style="font-size:80px;position:relative;z-index:1">${b.emoji}</span>
      </div>
      <div class="store-ebook-info">
        <p class="category">${b.category}</p>
        <h3>${b.title}</h3>
        <p style="font-style:italic;color:var(--accent);font-size:0.85rem;margin-bottom:10px">${b.subtitle}</p>
        <p>${b.desc}</p>
        <div class="store-ebook-meta">
          <span><i class="fa-solid fa-file-lines"></i> ${b.pages} pages</span>
          <span><i class="fa-solid fa-download"></i> ${b.format}</span>
          <span><i class="fa-regular fa-calendar"></i> ${b.year}</span>
        </div>
        <div class="store-ebook-footer">
          <div class="book-price">
            <span class="original-price">$${b.original}</span>$${b.price}
          </div>
          <button class="btn btn-primary" onclick="openBuyModal(${b.id})">
            <i class="fa-solid fa-shopping-cart"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof observeFadeIns === 'function') observeFadeIns();
}

function openBuyModal(bookId) {
  const book = STORE_BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const modal = document.getElementById('buyModal');
  const content = document.getElementById('buyModalContent');

  content.innerHTML = `
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:64px;margin-bottom:12px">${book.emoji}</div>
      <h3 style="margin-bottom:6px">${book.title}</h3>
      <p style="color:var(--text-muted);font-size:0.9rem">${book.subtitle}</p>
    </div>
    <div style="background:var(--bg-alt);border-radius:var(--radius);padding:20px;margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="color:var(--text-muted)">Price</span>
        <span style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--accent)">$${book.price}</span>
      </div>
      <div style="display:flex;gap:12px;font-size:0.82rem;color:var(--text-muted);flex-wrap:wrap;">
        <span><i class="fa-solid fa-file-lines"></i> ${book.pages} pages</span>
        <span><i class="fa-solid fa-download"></i> ${book.format}</span>
        <span><i class="fa-solid fa-infinity"></i> Lifetime access</span>
      </div>
    </div>
    <div style="margin-bottom:20px;">
      <label style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;display:block">Email address</label>
      <input type="email" id="buyEmail" placeholder="your@email.com" style="width:100%;padding:12px 16px;border:2px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:0.95rem;outline:none;" />
    </div>
    <button class="btn btn-primary full-width" onclick="completePurchase(${book.id})" style="margin-bottom:12px;">
      <i class="fa-solid fa-lock"></i> Secure Purchase — $${book.price}
    </button>
    <p style="text-align:center;font-size:0.78rem;color:var(--text-muted)">
      <i class="fa-solid fa-shield-halved"></i> SSL encrypted · Instant download · 30-day refund guarantee
    </p>
  `;

  modal.classList.add('active');
}

function completePurchase(bookId) {
  const email = document.getElementById('buyEmail')?.value;
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address to receive your download link.');
    return;
  }
  const book = STORE_BOOKS.find(b => b.id === bookId);
  const content = document.getElementById('buyModalContent');
  content.innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:3rem;margin-bottom:16px">✅</div>
      <h3 style="margin-bottom:12px">Purchase Complete!</h3>
      <p style="color:var(--text-muted);margin-bottom:24px;">
        <strong>${book.title}</strong> is on its way to <strong>${email}</strong>. 
        Check your inbox for your download link within the next few minutes.
      </p>
      <button class="btn btn-primary" onclick="document.getElementById('buyModal').classList.remove('active')">Done</button>
    </div>
  `;
}

document.getElementById('buyModalClose')?.addEventListener('click', () => {
  document.getElementById('buyModal')?.classList.remove('active');
});
document.getElementById('buyModal')?.addEventListener('click', function (e) {
  if (e.target === this) this.classList.remove('active');
});
