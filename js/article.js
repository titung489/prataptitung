/* ===================================================
   article.js — Single article reader
   =================================================== */

const ARTICLE_DATA = {
  1: {
    id: 1, category: "Politics", date: "October 19, 2026", readTime: "8 min",
    title: "Democracy Is Not Dying — It Is Being Rebranded",
    intro: "Across the globe, authoritarian impulses are no longer arriving in tanks. They arrive in suits, wielding election results and algorithms. The crisis of democracy in the 21st century is one of legitimacy laundering — and we must name it clearly.",
    bg: "linear-gradient(135deg, #1a120a, #2d1f0e)",
    emoji: "🏛️",
    tags: ["Democracy", "Politics", "Authoritarianism", "Global Affairs"],
    body: `
      <p>There is a seductive comfort in believing that democracy's enemies look like they used to: uniformed men seizing state broadcasts, tanks rolling through city centres, constitutions burned in public squares. It is a comfort because those enemies are visible. Recognisable. We know what to resist.</p>

      <p>But the dominant form of democratic backsliding today is far more sophisticated, and far more corrosive, precisely because it wears the clothes of democracy itself.</p>

      <h2>The Legitimacy Machine</h2>

      <p>Consider the pattern. In Hungary, Viktor Orbán did not abolish elections — he designed them so that his party could not lose without a catastrophic collapse of its own support. In India, the BJP has perfected the art of using democratic enthusiasm as cover for systematic institutional erosion. In Brazil under Bolsonaro, the assault on courts, press, and civil society was conducted in the language of anti-corruption and national renewal.</p>

      <blockquote>"The crisis is not that strongmen are seizing power. It is that they are winning elections first, and then redesigning the rules of the game from the inside."</blockquote>

      <p>This is what political scientists Steven Levitsky and Lucan Way call "competitive authoritarianism" — regimes that maintain the formal architecture of democracy while systematically tilting the playing field. Elections happen. Opposition parties exist. Courts function. But the referees are replaced, the media landscape is captured, the funding structures are weaponised, and the judicial appointments are stacked until the system cannot self-correct.</p>

      <h2>The Algorithm Problem</h2>

      <p>What makes the current moment uniquely dangerous is the addition of digital infrastructure to this playbook. Propaganda is no longer delivered by state broadcasters that citizens can recognise and discount. It is delivered by personalised feeds that feel like mirrors — reflecting back, in amplified form, exactly what the recipient already believes.</p>

      <p>The algorithm does not care about truth. It cares about engagement. And engagement, as the data shows, is maximised by outrage, fear, and tribal solidarity. The authoritarian politician who understands this — who can generate a constant supply of enemies, grievances, and spectacles — can effectively colonise the information environment without ever directly controlling it.</p>

      <h2>What This Means for Resistance</h2>

      <p>If the diagnosis is correct — that contemporary democratic erosion is a legitimacy-laundering operation rather than a straightforward power grab — then the implications for opposition strategy are significant.</p>

      <ul>
        <li>Electoral strategies alone are insufficient when elections are being structurally rigged through redistricting, voter suppression, and institutional capture.</li>
        <li>Media literacy campaigns matter, but cannot substitute for structural media ownership reform.</li>
        <li>Legal challenges are vital, but slow — and courts are the first institution targeted by autocratic governments precisely because they know this.</li>
        <li>International pressure is inconsistently applied and easily dismissed as foreign interference.</li>
      </ul>

      <p>None of this means the situation is hopeless. Poland's democratic restoration after PiS, the repeated failures of AMLO's constitutional ambitions in Mexico, the partial resilience of Brazil's institutions against Bolsonaro's pressure — these demonstrate that democratic systems, when civil society remains engaged and organised, retain significant self-repair capacity.</p>

      <h2>The Naming Problem</h2>

      <p>But the first requirement is naming. As long as we call these regimes "illiberal democracies" or "populist governments" or engage in euphemistic hand-wringing about "democratic backsliding," we are accepting the legitimacy frame that autocrats are working so hard to construct.</p>

      <p>Democracy is not merely a procedure. It is not just elections. It is a system of meaningful accountability — of power genuinely answerable to those it governs. When that accountability is hollowed out while the procedural shell is maintained, the shell should not be mistaken for the substance.</p>

      <p>Calling it democracy when it isn't is not political balance. It is a form of collaboration.</p>
    `
  },
  2: {
    id: 2, category: "Culture", date: "October 18, 2026", readTime: "6 min",
    title: "The Theatre of Outrage: How Social Media Manufactures Moral Panics",
    intro: "Every week a new crisis. Every week a new villain. The machinery of outrage is running 24/7 — and it's not accidental. Tracing who benefits from permanent moral emergency.",
    bg: "linear-gradient(135deg, #1a0a2e, #2d1450)",
    emoji: "📱",
    tags: ["Social Media", "Culture", "Psychology", "Media"],
    body: `
      <p>There is something worth noticing about the rhythm of contemporary outrage. It is too regular. Too reliable. Too perfectly calibrated to the news cycle. A new villain surfaces every Monday. By Thursday, the pile-on reaches its peak. By Sunday, the target is forgotten, and the machine is already scanning for next week's sacrifice.</p>

      <p>This is not organic. It is engineered.</p>

      <h2>The Outrage Algorithm</h2>

      <p>Platform companies discovered early that moral outrage is the highest-engagement emotion available. It triggers sharing, commenting, and sustained attention in ways that joy, curiosity, or admiration simply cannot match. Outrage is, neurologically speaking, addictive — it releases the same reward pathways as other forms of tribal bonding and social validation.</p>

      <blockquote>"The algorithm does not ask whether the outrage is justified. It asks whether it generates clicks. These are not the same question."</blockquote>

      <p>What follows from this architecture is a permanent moral emergency economy. Genuine injustices are real, but they are processed through a machine that cannot distinguish between them and manufactured controversies, personal grievances, or deliberately seeded distractions. Everything is flattened into the same register of urgent crisis.</p>

      <h2>Who Benefits?</h2>

      <p>The question that cuts through the noise is always: who benefits? When a moral panic erupts on social media, it is worth asking who is amplifying it, what structural questions it is displacing, and whose power it leaves untouched.</p>

      <p>The answer is almost always: those who profit from distraction. Corporate platforms harvesting attention data. Political actors who need the public focused on culture war rather than policy. Media organisations whose revenue models depend on maximised engagement. And yes, individuals who build followings and careers by positioning themselves at the centre of moral crisis.</p>

      <p>This is not a conspiracy theory. It does not require coordination. It requires only that the incentive structures of the attention economy reliably reward a certain kind of content over others.</p>

      <h2>The Cost of Permanent Outrage</h2>

      <p>The deepest cost of manufactured moral panic is not that it occasionally targets the wrong people — though it does. It is that it exhausts the capacity for genuine moral attention. A population that has been outraged every day for a decade develops tolerance. The signal degrades. Real injustices, arriving through the same channel as manufactured ones, struggle to register.</p>

      <p>The antidote is not cynicism — that is just outrage turned inward. It is the discipline of proportionality, the habit of asking structural questions, and the willingness to resist the dopamine hit of righteous indignation long enough to ask whether it serves any purpose beyond itself.</p>
    `
  }
};

// Reading progress
window.addEventListener('scroll', () => {
  const article = document.getElementById('articleMain');
  const bar = document.getElementById('readingProgress');
  if (article && bar) {
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const scrolled = window.scrollY - articleTop;
    const progress = Math.max(0, Math.min(100, (scrolled / (articleHeight - window.innerHeight)) * 100));
    bar.style.width = progress + '%';
  }
});

// Load article
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id')) || 1;
const article = ARTICLE_DATA[articleId] || ARTICLE_DATA[1];

document.title = `${article.title} — Pratap Titung`;

const main = document.getElementById('articleMain');
if (main && article) {
  main.innerHTML = `
    <div class="article-header fade-in">
      <span class="post-category">${article.category}</span>
      <div class="post-meta">
        <span><i class="fa-regular fa-calendar"></i> ${article.date}</span>
        <span><i class="fa-regular fa-clock"></i> ${article.readTime} read</span>
      </div>
      <h1 class="article-title">${article.title}</h1>
      <p class="article-intro">${article.intro}</p>
      <div class="article-author-bar">
        <div class="author-avatar">PT</div>
        <div class="author-info">
          <strong>Pratap Titung</strong>
          <span>Writer & Commentator</span>
        </div>
      </div>
    </div>

    <div class="article-hero-img">
      <div class="img-placeholder" style="background:${article.bg}">${article.emoji}</div>
    </div>

    <div class="article-translate-bar">
      <button class="article-translate-btn" id="articleTranslateBtn" onclick="toggleArticleTranslate(this)">
        <i class="fa-solid fa-language"></i>
        <span id="articleTranslateBtnLabel">Read in Nepali (नेपालीमा पढ्नुहोस्)</span>
      </button>
    </div>

    <div class="article-body fade-in" id="articleBody">
      ${article.body}
    </div>

    <div class="article-tags">
      ${article.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>

    <div class="article-share">
      <p>Found this valuable? Share it:</p>
      <div class="share-buttons">
        <button class="share-btn" onclick="shareArticle('twitter')"><i class="fa-brands fa-x-twitter"></i> Tweet</button>
        <button class="share-btn" onclick="shareArticle('linkedin')"><i class="fa-brands fa-linkedin-in"></i> LinkedIn</button>
        <button class="share-btn" onclick="shareArticle('copy')"><i class="fa-solid fa-link"></i> Copy Link</button>
      </div>
    </div>

    <div class="article-donate-cta">
      <div class="donate-cta-box">
        <h3>Support Independent Writing</h3>
        <p>If this article made you think, consider supporting the work that makes it possible. Every contribution keeps this blog ad-free and independent.</p>
        <div class="cta-buttons">
          <a href="index.html#donate" class="btn btn-primary"><i class="fa-solid fa-heart"></i> Donate</a>
          <a href="index.html#premium" class="btn btn-ghost">Subscribe for More</a>
        </div>
      </div>
    </div>
  `;

  if (typeof observeFadeIns === 'function') observeFadeIns();
}

// Related posts
const relatedGrid = document.getElementById('relatedPosts');
const related = [
  { id: 2, category: "Culture", date: "Oct 18, 2026", readTime: "6 min", title: "The Theatre of Outrage", excerpt: "Every week a new crisis. The machinery of outrage is running 24/7 — and it's not accidental.", bg: "linear-gradient(135deg,#1a0a2e,#2d1450)" },
  { id: 3, category: "Economy", date: "Oct 17, 2026", readTime: "9 min", title: "Gig Work and the Illusion of Freedom", excerpt: "The platform economy promised liberation from the 9-to-5. What it delivered was precarity.", bg: "linear-gradient(135deg,#0a1a0a,#0e2e14)" },
  { id: 4, category: "Technology", date: "Oct 16, 2026", readTime: "12 min", title: "Who Owns Your Attention?", excerpt: "Your clicks, scrolls, pauses — all harvested, quantified, and sold. Understanding digital extraction.", bg: "linear-gradient(135deg,#0a1020,#0e1a30)" }
].filter(p => p.id !== articleId);

if (relatedGrid) {
  relatedGrid.innerHTML = related.slice(0, 3).map(p => `
    <article class="post-card fade-in" onclick="location.href='article.html?id=${p.id}'">
      <div class="post-card-img" style="background:${p.bg}">
        <span class="post-category" style="position:absolute;top:16px;left:16px">${p.category}</span>
      </div>
      <div class="post-card-body">
        <div class="post-meta">
          <span><i class="fa-regular fa-calendar"></i> ${p.date}</span>
          <span><i class="fa-regular fa-clock"></i> ${p.readTime} read</span>
        </div>
        <h3 class="post-title">${p.title}</h3>
        <p class="post-excerpt">${p.excerpt}</p>
        <a class="read-link" href="article.html?id=${p.id}">Read more <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>
  `).join('');
  if (typeof observeFadeIns === 'function') observeFadeIns();
}

function shareArticle(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.title);
  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
  } else if (platform === 'linkedin') {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  } else if (platform === 'copy') {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.querySelector('.share-btn:last-child');
      if (btn) { btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!'; setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-link"></i> Copy Link'; }, 2000); }
    });
  }
}

/* -------- Article-level translate button -------- */
async function toggleArticleTranslate(btn) {
  if (!window.PT_translate) return;
  const labelSpan = document.getElementById('articleTranslateBtnLabel');
  const isNepali = btn.dataset.translated === 'true';

  btn.disabled = true;
  btn.classList.add('translating');

  if (isNepali) {
    await window.PT_translate.translatePage('en');
    btn.dataset.translated = 'false';
    if (labelSpan) labelSpan.textContent = 'Read in Nepali (नेपालीमा पढ्नुहोस्)';
  } else {
    await window.PT_translate.translatePage('ne');
    btn.dataset.translated = 'true';
    if (labelSpan) labelSpan.textContent = 'Read in English (अंग्रेजीमा पढ्नुहोस्)';
  }

  btn.disabled = false;
  btn.classList.remove('translating');
}

window.toggleArticleTranslate = toggleArticleTranslate;
