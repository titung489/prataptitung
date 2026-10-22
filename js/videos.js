/* ===================================================
   videos.js — YouTube Video Section
   =================================================== */

const VIDEO_DATA = [
  {
    id: 'vid1',
    youtubeId: 'dQw4w9WgXcQ',   // ← Replace with your real YouTube video IDs
    title: 'Media Literacy in the Age of AI — Public Lecture',
    desc: 'A public lecture on navigating misinformation, AI-generated content, and algorithmic bias in the modern media landscape.',
    date: 'October 10, 2026',
    duration: '38:14',
    views: '9.4K',
    bg: 'linear-gradient(135deg,#0a1020,#1a2040)'
  },
  {
    id: 'vid2',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Q&A: Economy, Gig Work & the Future of Labour in Nepal',
    desc: 'Answering subscriber questions on gig economy challenges, youth unemployment, and what policy reforms would actually help.',
    date: 'September 30, 2026',
    duration: '52:07',
    views: '11.8K',
    bg: 'linear-gradient(135deg,#0a1a10,#10301a)'
  },
  {
    id: 'vid3',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Interview: The State of Press Freedom in South Asia',
    desc: 'A candid conversation with two fellow journalists about shrinking press freedoms, self-censorship, and the cost of speaking truth.',
    date: 'September 22, 2026',
    duration: '1:12:44',
    views: '7.1K',
    bg: 'linear-gradient(135deg,#1a0a0a,#301010)'
  },
  {
    id: 'vid4',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Book Reading: Excerpts from "Reading Between the Lines"',
    desc: 'Author reads and discusses key excerpts from the media literacy ebook, with live Q&A from the audience.',
    date: 'September 15, 2026',
    duration: '29:55',
    views: '5.2K',
    bg: 'linear-gradient(135deg,#1a1020,#2a1a30)'
  },
  {
    id: 'vid5',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'The Nationalist Playbook — Breaking Down the 7 Moves',
    desc: 'A whiteboard-style breakdown of the common tactics used by nationalist political movements across different countries.',
    date: 'September 5, 2026',
    duration: '24:38',
    views: '18.5K',
    bg: 'linear-gradient(135deg,#1a1000,#2a2000)'
  },
  {
    id: 'vid6',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Nepali Youth & Political Apathy: Why It\'s Not Laziness',
    desc: 'Exploring the structural reasons behind political disengagement among young Nepalis, and what can actually reignite civic participation.',
    date: 'August 28, 2026',
    duration: '41:20',
    views: '22.1K',
    bg: 'linear-gradient(135deg,#100a1a,#200a30)'
  }
];

function loadVideo(wrapId, videoId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
      title="YouTube video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="width:100%;height:100%;border-radius:var(--radius-lg)">
    </iframe>`;
}

// Expose globally for inline onclick handlers
window.loadVideo = loadVideo;

const videoGrid = document.getElementById('videoGrid');

if (videoGrid) {
  videoGrid.innerHTML = VIDEO_DATA.map(v => `
    <div class="video-card fade-in">
      <div class="video-card-thumb" id="vc-${v.id}" style="background:${v.bg}">
        <span class="vc-emoji">▶</span>
        <div class="vc-overlay">
          <button class="play-btn" onclick="loadVideo('vc-${v.id}','${v.youtubeId}')">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
        <span class="vc-duration">${v.duration}</span>
      </div>
      <div class="video-card-body">
        <h4 class="video-card-title">${v.title}</h4>
        <p class="video-card-desc">${v.desc}</p>
        <div class="vc-meta">
          <span><i class="fa-regular fa-calendar"></i> ${v.date}</span>
          <span><i class="fa-solid fa-eye"></i> ${v.views} views</span>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof observeFadeIns === 'function') observeFadeIns();
}
