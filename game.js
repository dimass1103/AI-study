// ============ UNICORN CATCHER GAME ============

const W = window.innerWidth;
const H = window.innerHeight;
const UNICORN_Y = H - 160;
const UNICORN_W = 100;
const HORN_X = 72;
const HORN_Y = -12;
const RING_COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#FFA07A','#98D8C8','#F7DC6F','#BB8FCE'];
const BALLOON_COLORS = ['#FF69B4','#FF1493','#FFB6C1','#FFC0CB','#DB7093','#C71585'];
const RING_PTS = 5, BALLOON_PTS = 10;
const MAX_MISSED_RINGS = 5, MAX_MISSED_BALLOONS = 3;

let score = 0, missedRings = 0, missedBalloons = 0;
let unicornX = W / 2 - 50;
let rings = [], balloons = [];
let gameRunning = false, paused = false;
let gameLoop = null, ringSpawn = null, balloonSpawn = null;
let nextId = 0;

// Leaderboard
function loadLB() {
  try { return JSON.parse(localStorage.getItem('@players') || '[]'); }
  catch { return []; }
}
function saveLB(name, sc) {
  const lb = loadLB();
  lb.push({ name: name || 'Anonymous', score: sc, date: new Date().toISOString() });
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem('@players', JSON.stringify(lb.slice(0, 10)));
}

// ============ RENDER FUNCTIONS ============

function unicornHTML(x) {
  return `<div class="unicorn unicorn-bounce" style="left:${x}px;top:${UNICORN_Y}px">
    <div class="u-tail1"></div><div class="u-tail2"></div><div class="u-tail3"></div>
    <div class="u-leg u-leg1"></div><div class="u-leg u-leg2"></div>
    <div class="u-leg u-leg3"></div><div class="u-leg u-leg4"></div>
    <div class="u-hoof u-hoof1"></div><div class="u-hoof u-hoof2"></div>
    <div class="u-hoof u-hoof3"></div><div class="u-hoof u-hoof4"></div>
    <div class="u-belly"></div><div class="u-body"></div>
    <div class="u-head"></div>
    <div class="u-snout"></div><div class="u-nostril"></div><div class="u-smile"></div>
    <div class="u-eye-white"></div><div class="u-iris"></div><div class="u-pupil"></div>
    <div class="u-sparkle1"></div><div class="u-sparkle2"></div>
    <div class="u-lash1"></div><div class="u-lash2"></div><div class="u-lash3"></div>
    <div class="u-eyebrow"></div><div class="u-blush1"></div><div class="u-blush2"></div>
    <div class="u-ear"></div><div class="u-ear-inner"></div>
    <div class="u-horn"></div><div class="u-horn-mid"></div><div class="u-horn-tip"></div>
    <div class="u-horn-s1"></div><div class="u-horn-s2"></div>
    <div class="u-mane1"></div><div class="u-mane2"></div><div class="u-mane3"></div>
    <div class="u-mane4"></div><div class="u-mane5"></div><div class="u-mane6"></div>
    <div class="u-mane-h1"></div><div class="u-mane-h2"></div>
    <div class="u-forelock1"></div><div class="u-forelock2"></div><div class="u-forelock3"></div>
  </div>`;
}

function scoreBoardHTML() {
  const ringDots = Array.from({length: MAX_MISSED_RINGS}, (_, i) =>
    `<span class="dot${i < missedRings ? ' missed' : ''}"></span>`).join('');
  const ballDots = Array.from({length: MAX_MISSED_BALLOONS}, (_, i) =>
    `<span class="dot${i < missedBalloons ? ' missed' : ''}"></span>`).join('');
  return `<div class="score-board">
    <span class="score-label">Score</span><br>
    <span class="score-value" id="scoreVal">${score}</span>
    <div class="missed-row">
      <div class="missed-item"><span class="missed-label">Rings</span>${ringDots}</div>
      <div class="missed-item"><span class="missed-label">Balloons</span>${ballDots}</div>
    </div>
  </div>`;
}

function cloudsHTML() {
  return `
    <div class="cloud" style="left:20px;top:15px;width:120px;height:40px"></div>
    <div class="cloud" style="left:${W-150}px;top:20px;width:140px;height:45px"></div>
    <div class="cloud" style="left:${W/2-50}px;top:10px;width:100px;height:35px"></div>`;
}

function starsHTML() {
  let s = '';
  for (let i = 0; i < 8; i++) {
    s += `<div class="star" style="left:${Math.random()*W}px;top:${30+Math.random()*60}px;animation-delay:${Math.random()*2}s">${['✨','⭐','💫'][i%3]}</div>`;
  }
  return s;
}

function renderGame() {
  const g = document.getElementById('game');
  g.innerHTML = `<div class="sky"></div>${starsHTML()}${cloudsHTML()}<div class="grass"></div>
    ${scoreBoardHTML()}
    <button class="pause-btn" id="pauseBtn">${paused ? '▶' : '❚❚'}</button>
    ${rings.map(r => `<div class="ring-item" id="r${r.id}" style="left:${r.x}px;top:${r.y}px;width:${r.size}px;height:${r.size}px;border-color:${r.color}"></div>`).join('')}
    ${balloons.map(b => `<div class="balloon-item" id="b${b.id}" style="left:${b.x}px;top:${b.y}px;width:${b.size}px;height:${b.size*1.1}px;background:${b.color}">
      <div class="balloon-shine"></div><div class="balloon-knot"></div>
    </div>`).join('')}
    ${unicornHTML(unicornX)}
    <div id="scorePops"></div>`;

  document.getElementById('pauseBtn').addEventListener('click', () => {
    paused = !paused;
    renderGame();
  });

  // Touch/mouse drag
  const handler = (x) => {
    if (!gameRunning || paused) return;
    unicornX = Math.max(0, Math.min(W - UNICORN_W, x - UNICORN_W / 2));
    const el = document.querySelector('.unicorn');
    if (el) el.style.left = unicornX + 'px';
  };

  document.addEventListener('mousemove', e => handler(e.clientX));
  document.addEventListener('touchmove', e => {
    e.preventDefault();
    handler(e.touches[0].clientX);
  }, { passive: false });
  document.addEventListener('touchstart', e => {
    if (!gameRunning || paused) return;
    handler(e.touches[0].clientX);
  }, { passive: true });
}

function showScorePop(x, y, pts) {
  const pop = document.createElement('div');
  pop.className = 'score-pop';
  pop.textContent = '+' + pts;
  pop.style.left = x + 'px';
  pop.style.top = y + 'px';
  document.getElementById('scorePops')?.appendChild(pop);
  setTimeout(() => pop.remove(), 800);
}

// ============ GAME LOGIC ============

function spawnRing() {
  const size = 30 + Math.random() * 30;
  rings.push({
    id: nextId++,
    x: Math.random() * (W - size),
    y: -size,
    size,
    color: RING_COLORS[Math.floor(Math.random() * RING_COLORS.length)],
    speed: 2 + Math.random() * 2,
  });
}

function spawnBalloon() {
  const size = 35 + Math.random() * 25;
  balloons.push({
    id: nextId++,
    x: Math.random() * (W - size),
    y: -size,
    size,
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    speed: 1.5 + Math.random() * 2,
  });
}

function checkHit(objX, objY, objSize) {
  const hx = unicornX + HORN_X;
  const hy = UNICORN_Y + HORN_Y;
  const dist = Math.hypot(objX + objSize / 2 - hx, objY + objSize / 2 - hy);
  return dist < objSize + 20;
}

function gameStep() {
  if (paused) return;

  const hornX = unicornX + HORN_X;
  const hornY = UNICORN_Y + HORN_Y;

  // Update rings
  const newRings = [];
  let ringMissed = 0;
  for (const r of rings) {
    r.y += r.speed;
    if (checkHit(r.x, r.y, r.size)) {
      score += RING_PTS;
      showScorePop(r.x, r.y, RING_PTS);
      continue;
    }
    if (r.y > H) { ringMissed++; continue; }
    newRings.push(r);
  }
  rings = newRings;
  if (ringMissed > 0) {
    missedRings += ringMissed;
    if (missedRings >= MAX_MISSED_RINGS) { endGame(); return; }
  }

  // Update balloons
  const newBalloons = [];
  let balMissed = 0;
  for (const b of balloons) {
    b.y += b.speed;
    if (checkHit(b.x, b.y, b.size)) {
      score += BALLOON_PTS;
      showScorePop(b.x, b.y, BALLOON_PTS);
      continue;
    }
    if (b.y > H) { balMissed++; continue; }
    newBalloons.push(b);
  }
  balloons = newBalloons;
  if (balMissed > 0) {
    missedBalloons += balMissed;
    if (missedBalloons >= MAX_MISSED_BALLOONS) { endGame(); return; }
  }

  renderGame();
}

function startGame() {
  score = 0; missedRings = 0; missedBalloons = 0;
  rings = []; balloons = [];
  gameRunning = true; paused = false;
  unicornX = W / 2 - 50;

  renderGame();

  gameLoop = setInterval(gameStep, 16);
  ringSpawn = setInterval(() => { if (!paused) spawnRing(); }, 1500);
  balloonSpawn = setInterval(() => { if (!paused) spawnBalloon(); }, 3000);
}

function endGame() {
  gameRunning = false;
  clearInterval(gameLoop);
  clearInterval(ringSpawn);
  clearInterval(balloonSpawn);
  showGameOver();
}

function showGameOver() {
  const g = document.getElementById('game');
  g.innerHTML = `<div class="sky"></div><div class="grass"></div>
    <div class="modal-overlay">
      <div class="modal-box">
        <div class="modal-title"> Game Over!</div>
        <div class="modal-score">Score: ${score}</div>
        <input class="modal-input" id="nameInput" placeholder="Your name" maxlength="20" autofocus>
        <button class="modal-btn" id="saveBtn">Save & Continue</button>
      </div>
    </div>`;

  const saveBtn = document.getElementById('saveBtn');
  const nameInput = document.getElementById('nameInput');

  function save() {
    saveLB(nameInput.value.trim(), score);
    showStart();
  }
  saveBtn.addEventListener('click', save);
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') save(); });
}

// ============ START SCREEN ============
function showStart() {
  const g = document.getElementById('game');
  g.innerHTML = `<div class="sky"></div>${starsHTML()}<div class="grass"></div>
    <div class="screen">
      <div class="start-emoji">🦄</div>
      <div class="start-title">Unicorn Catcher</div>
      <div class="start-sub">Catch rings & pop balloons!</div>
      <div class="instructions">
        <div class="instr-item"><span class="instr-emoji">💍</span> Ring = 5 points</div>
        <div class="instr-item"><span class="instr-emoji">🎈</span> Balloon = 10 points</div>
        <div class="instr-item"><span class="instr-emoji">⚠️</span> Don't miss 5 rings or 3 balloons!</div>
      </div>
      <button class="btn-play" id="playBtn">▶ Play</button>
      <button class="btn-lb" id="lbBtn">🏆 Leaderboard</button>
    </div>`;

  document.getElementById('playBtn').addEventListener('click', startGame);
  document.getElementById('lbBtn').addEventListener('click', showLeaderboard);
}

function showLeaderboard() {
  const lb = loadLB();
  const g = document.getElementById('game');
  const medals = ['🥇','','🥉'];

  let listHTML = '';
  if (lb.length === 0) {
    listHTML = `<div class="lb-empty">
      <div class="lb-empty-emoji">🎮</div>
      <div class="lb-empty-text">No scores yet!</div>
    </div>`;
  } else {
    listHTML = lb.map((p, i) => `<div class="lb-item">
      <div class="lb-rank">${medals[i] || '#' + (i+1)}</div>
      <div><div class="lb-name">${p.name}</div><div class="lb-date">${new Date(p.date).toLocaleDateString()}</div></div>
      <div class="lb-score">${p.score}</div>
    </div>`).join('');
  }

  g.innerHTML = `<div class="sky"></div><div class="grass"></div>
    <div class="screen">
      <div class="lb-title">🏆 Leaderboard</div>
      <div class="lb-list">${listHTML}</div>
      <button class="btn-back" id="backBtn">← Back</button>
    </div>`;

  document.getElementById('backBtn').addEventListener('click', showStart);
}

// ============ INIT ============
window.addEventListener('resize', () => {
  // Handled by CSS
});
showStart();
