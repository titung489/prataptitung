/* ===================================================
   blog.js — Blog listing page
   =================================================== */

const ALL_POSTS = [
  { id: 1, category: "Politics", date: "Oct 19, 2026", readTime: "8 min", title: "Democracy Is Not Dying — It Is Being Rebranded", excerpt: "Authoritarian impulses arrive in suits wielding election results. The crisis of democracy is one of legitimacy laundering — and we must name it.", bg: "linear-gradient(135deg,#1a120a,#2d1f0e)" },
  { id: 2, category: "Culture", date: "Oct 18, 2026", readTime: "6 min", title: "The Theatre of Outrage: How Social Media Manufactures Moral Panics", excerpt: "Every week a new crisis. The machinery of outrage is running 24/7 — and it's not accidental. Tracing who benefits from permanent moral emergency.", bg: "linear-gradient(135deg,#1a0a2e,#2d1450)" },
  { id: 3, category: "Economy", date: "Oct 17, 2026", readTime: "9 min", title: "Gig Work and the Illusion of Freedom", excerpt: "The platform economy promised liberation from the 9-to-5. What it delivered was precarity without safety nets — and new vocabulary to disguise it as choice.", bg: "linear-gradient(135deg,#0a1a0a,#0e2e14)" },
  { id: 4, category: "Technology", date: "Oct 16, 2026", readTime: "12 min", title: "Who Owns Your Attention? The Surveillance Capitalism Playbook", excerpt: "Your clicks, scrolls, pauses — all harvested, quantified, and sold. Understanding digital extraction is the first step to resisting it.", bg: "linear-gradient(135deg,#0a1020,#0e1a30)" },
  { id: 5, category: "Environment", date: "Oct 15, 2026", readTime: "7 min", title: "Climate Grief and the Psychology of Inaction", excerpt: "The science has been unambiguous for decades. Yet policy moves glacially. What converts clear evidence into paralysis?", bg: "linear-gradient(135deg,#0a1a10,#1a2e10)" },
  { id: 6, category: "Politics", date: "Oct 14, 2026", readTime: "10 min", title: "The Nationalist Playbook: A Field Guide to Its Seven Core Moves", excerpt: "From Hungary to Brazil to India — nationalist movements share a consistent playbook. Naming the moves is the beginning of dismantling them.", bg: "linear-gradient(135deg,#1a0a0a,#2e1414)" },
  { id: 7, category: "Society", date: "Oct 13, 2026", readTime: "5 min", title: "The Loneliness Epidemic Is a Policy Failure, Not a Personal One", excerpt: "Western societies face record isolation. Blaming individuals misses the structural dismantling of community infrastructure.", bg: "linear-gradient(135deg,#1a1a0a,#2e2a10)" },
  { id: 8, category: "Society", date: "Oct 12, 2026", readTime: "7 min", title: "The Myth of Meritocracy in Late Capitalism", excerpt: "Meritocracy is the most persuasive legitimising ideology of our time. It is also, demonstrably, fiction.", bg: "linear-gradient(135deg,#1a1020,#2a1a30)" },
  { id: 9, category: "Culture", date: "Oct 11, 2026", readTime: "8 min", title: "Art Under Censorship: How Repression Shapes Form", excerpt: "When direct speech is forbidden, allegory and metaphor become weapons of survival. History's greatest literature was often born from constraint.", bg: "linear-gradient(135deg,#0a1020,#101830)" },
  { id: 10, category: "Politics", date: "Oct 10, 2026", readTime: "11 min", title: "The Electoral College Is Not a Bug — It's a Feature", excerpt: "The sustained resistance to electoral reform reveals whose interests the current structure serves. Following the incentives tells you everything.", bg: "linear-gradient(135deg,#1a0a0a,#301020)" },
  { id: 11, category: "Economy", date: "Oct 9, 2026", readTime: "8 min", title: "Debt as Control: The Political Economy of Borrowing", excerpt: "Individual debt, national debt — both function as instruments of governance. Understanding this changes how you read economic policy entirely.", bg: "linear-gradient(135deg,#0a1010,#0e2020)" },
  { id: 12, category: "Technology", date: "Oct 8, 2026", readTime: "9 min", title: "The Open Source Illusion: Who Really Controls the Commons?", excerpt: "Free and open source software was supposed to democratize technology. Then came Big Tech's embrace — and subtle capture of the commons.", bg: "linear-gradient(135deg,#101020,#1a1a30)" },
];

const grid = document.getElementById('blogGrid');
let currentFilter = 'all';
let searchQuery = '';
let displayedCount = 9;

function getFilteredPosts() {
  return ALL_POSTS.filter(p => {
    const matchCat = currentFilter === 'all' || p.category.toLowerCase() === currentFilter;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery) || p.excerpt.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function renderBlogGrid() {
  const filtered = getFilteredPosts();
  const toShow = filtered.slice(0, displayedCount);

  if (grid) {
    grid.innerHTML = toShow.map(post => `
      <article class="post-card fade-in" onclick="location.href='article.html?id=${post.id}'">
        <div class="post-card-img" style="background:${post.bg}">
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
    `).join('') || '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:48px 0;">No articles found.</p>';

    // Re-observe fade-ins
    if (typeof observeFadeIns === 'function') observeFadeIns();
  }

  const loadMoreBtn = document.getElementById('blogLoadMore');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = filtered.length > displayedCount ? 'inline-flex' : 'none';
  }
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.cat;
    displayedCount = 9;
    renderBlogGrid();
  });
});

// Search
document.getElementById('searchInput')?.addEventListener('input', function () {
  searchQuery = this.value.toLowerCase().trim();
  displayedCount = 9;
  renderBlogGrid();
});

// Load more
document.getElementById('blogLoadMore')?.addEventListener('click', function () {
  displayedCount += 6;
  renderBlogGrid();
});

// URL param filter
const urlParams = new URLSearchParams(window.location.search);
const urlCat = urlParams.get('cat');
if (urlCat) {
  const matchBtn = document.querySelector(`.filter-btn[data-cat="${urlCat}"]`);
  if (matchBtn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    matchBtn.classList.add('active');
    currentFilter = urlCat;
  }
}

renderBlogGrid();
