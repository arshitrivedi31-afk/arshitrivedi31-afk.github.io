// ================================================
// KISANSETU AI — APPLICATION LOGIC v1.0.1
// Hackathon MVP | IBM Granite Concept
// ================================================

// ================================================
// DEMO DATA
// ================================================
const DEMO_DATA = {
  farmer: { name: 'Ramesh Patel', initials: 'RP', location: 'Rajkot, Gujarat' },
  cotton: {
    prices7d:  [7100,7150,7080,7200,7180,7260,7320],
    prices30d: [6900,6950,6970,7000,7020,7050,7100,7080,7050,7120,7150,7180,7200,7160,7100,7090,7130,7180,7200,7230,7250,7220,7260,7290,7300,7280,7260,7310,7300,7320],
    current: 7250, gondal: 7320, change: 2.4, high7d: 7320, low7d: 7080
  },
  groundnut: {
    prices7d:  [6050,6080,6100,6150,6130,6200,6180],
    prices30d: [5800,5820,5850,5900,5930,5950,5980,6000,5990,6010,6050,6080,6100,6080,6050,6020,6050,6080,6120,6150,6130,6100,6150,6180,6200,6190,6180,6210,6220,6180],
    current: 6180, change: -0.8, high7d: 6200, low7d: 6050
  },
  markets: [
    { name: 'Gondal APMC',    dist:  47, cotton: 7320, groundnut: 6200, best: true,  x: 175, y: 220 },
    { name: 'Rajkot APMC',   dist:   0, cotton: 7250, groundnut: 6180, best: false, x: 195, y: 200 },
    { name: 'Junagadh APMC', dist: 105, cotton: 7100, groundnut: 6250, best: false, x: 165, y: 280 },
    { name: 'Amreli APMC',   dist: 130, cotton: 7050, groundnut: 6150, best: false, x: 230, y: 280 },
    { name: 'Bhavnagar APMC',dist: 155, cotton: 7080, groundnut: 6100, best: false, x: 265, y: 255 },
    { name: 'Surendranagar', dist:  80, cotton: 7200, groundnut: 6050, best: false, x: 230, y: 155 },
    { name: 'Jamnagar APMC', dist:  90, cotton: 7150, groundnut: 6080, best: false, x: 130, y: 170 },
    { name: 'Ahmedabad APMC',dist: 220, cotton: 7280, groundnut: 6220, best: false, x: 285, y: 130 }
  ],
  buyers: [
    { id:1, name:'ABC Cotton Ginners',  type:'Demo Buyer', price:7300, dist:32,  grade:'A', qty:'100–500 qtl', crop:'cotton',    match:92, factors:{Crop:100,Qty:90,Location:95,Quality:90,Price:85} },
    { id:2, name:'Patel Agro Exports',  type:'Demo Buyer', price:7280, dist:58,  grade:'A', qty:'50–200 qtl',  crop:'cotton',    match:87, factors:{Crop:100,Qty:88,Location:80,Quality:90,Price:82} },
    { id:3, name:'Gujarat Groundnut',   type:'Demo Buyer', price:6200, dist:45,  grade:'A', qty:'50–300 qtl',  crop:'groundnut', match:89, factors:{Crop:100,Qty:85,Location:88,Quality:92,Price:80} },
    { id:4, name:'Saurashtra Traders',  type:'Demo Buyer', price:7250, dist:22,  grade:'B', qty:'20–100 qtl',  crop:'cotton',    match:80, factors:{Crop:100,Qty:75,Location:96,Quality:75,Price:78} },
    { id:5, name:'Mehta Oil Mills',     type:'Demo Buyer', price:6180, dist:68,  grade:'B', qty:'100–400 qtl', crop:'groundnut', match:82, factors:{Crop:100,Qty:90,Location:72,Quality:80,Price:82} }
  ],
  listings: [
    { farmer:'Ramesh Patel',   crop:'cotton',    qty:100, grade:'A', price:7250, loc:'Rajkot'   },
    { farmer:'Suresh Shah',    crop:'cotton',    qty:50,  grade:'B', price:7100, loc:'Gondal'   },
    { farmer:'Bhavna Desai',   crop:'groundnut', qty:200, grade:'A', price:6200, loc:'Junagadh' },
    { farmer:'Kantibhai Modi', crop:'groundnut', qty:80,  grade:'B', price:6050, loc:'Rajkot'   },
    { farmer:'Pravin Vasoya',  crop:'cotton',    qty:150, grade:'A', price:7300, loc:'Gondal'   }
  ],
  notifications: [
    { id:1, text:'🔔 Cotton price increased by ₹150/quintal at Gondal APMC.',    time:'10 min ago', unread:true  },
    { id:2, text:'🤝 A buyer is interested in your cotton listing.',               time:'25 min ago', unread:true  },
    { id:3, text:'📈 Groundnut prices trending upward at Junagadh APMC.',         time:'1 hr ago',   unread:true  },
    { id:4, text:'💡 Current cotton prices are above your recent average.',        time:'2 hrs ago',  unread:false }
  ],
  revenue:       [210000,280000,320000,195000,340000,415000,235000],
  revMonths:     ['Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
  adminGrowth:   [820,1240,1890,2600,3800,5200,7100,9200,10240],
  adminMonths:   ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
};

// ================================================
// APPLICATION STATE
// ================================================
const STATE = {
  lang: 'en',
  currentScreen: 'landing',
  prevScreen: 'landing',
  chatOpen: false,
  chatLang: 'en',
  activeMarketCrop: 'cotton',
  chartRange: 7,
  notifOpen: false
};

// ================================================
// TRANSLATIONS
// ================================================
const T = {
  en: {
    heroBadge: 'Powered by IBM Granite + IBM Cloud',
    heroTitle: 'Sell Smarter.<br>Earn Better.',
    heroSub: "AI-powered market intelligence and direct buyer connections for Gujarat's cotton and groundnut farmers.",
    btnFarmer: '🌱 Start as Farmer', btnBuyer: '🤝 Continue as Buyer',
    statF: 'Farmers', statB: 'Buyers', statM: 'Markets',
    greetingText: 'Namaste, Farmer Friend! 👋'
  },
  gu: {
    heroBadge: 'IBM Granite + IBM Cloud દ્વારા સંચાલિત',
    heroTitle: 'સ્માર્ટ વેચો.<br>વધારે કમાઓ.',
    heroSub: 'ગુજરાતના કપાસ અને મગફળી ખેડૂતો માટે AI-સંચાલિત બજાર બુદ્ધિ.',
    btnFarmer: '🌱 ખેડૂત તરીકે શરૂ કરો', btnBuyer: '🤝 ખરીદનાર તરીકે',
    statF: 'ખેડૂતો', statB: 'ખરીદદારો', statM: 'બજારો',
    greetingText: 'નમસ્તે, ખેડૂત મિત્ર! 👋'
  },
  hi: {
    heroBadge: 'IBM Granite + IBM Cloud द्वारा संचालित',
    heroTitle: 'स्मार्ट बेचें।<br>ज़्यादा कमाएं।',
    heroSub: 'गुजरात के कपास और मूंगफली किसानों के लिए AI बाज़ार बुद्धिमत्ता।',
    btnFarmer: '🌱 किसान के रूप में शुरू करें', btnBuyer: '🤝 खरीदार के रूप में',
    statF: 'किसान', statB: 'खरीदार', statM: 'बाज़ार',
    greetingText: 'नमस्ते, किसान मित्र! 👋'
  }
};

const AI_RESPONSES = {
  en: {
    today_price:   "Today's demo cotton price: ₹7,250/qtl at Rajkot APMC. Gondal APMC shows ₹7,320/qtl — the highest demo price nearby.",
    best_mandi:    "Gondal currently shows the highest demo price at ₹7,320/quintal. It is 47 km from Rajkot. Consider transport costs before deciding.",
    find_buyer:    "Based on your demo profile (100 qtl cotton, Grade A, Rajkot), ABC Cotton Ginners shows a 92% match score at ₹7,300/qtl.",
    sell_store:    "Demo AI Advisor: Selling now at ₹7,300/qtl gives ₹7,30,000. Storing 30 days has net potential ~₹7,40,000 after costs. Current prices are near a recent high.",
    check_quality: "Upload a photo of your crop in the Quality Assistant section. Demo AI will estimate grade based on visual analysis.",
    default:       "I can help with prices, best mandi, buyer matching, sell/store decisions, and quality assessment. What would you like to know?"
  },
  gu: {
    today_price:   "આજનો ડેમો કપાસ ભાવ: ₹7,250/ક્વિ (Rajkot APMC). Gondal APMC: ₹7,320/ક્વિ — સૌથી વધારે.",
    best_mandi:    "Gondal APMC ₹7,320/ક્વિ — સૌથી ઊંચો ભાવ. Rajkot થી 47 km. પરિવહન ખર્ચ ધ્યાનમાં રાખો.",
    find_buyer:    "100 ક્વિ Grade A કપાસ માટે ABC Cotton Ginners 92% મેળ — ₹7,300/ક્વિ.",
    sell_store:    "ડેમો AI: અત્યારે ₹7,30,000. 30 દિવસ સ્ટોર: ~₹7,40,000 (ખર્ચ પછી). ભાવ ઊંચા છે.",
    check_quality: "ગુણવત્તા સહાયક ખોલો અને ફોટો અપ-લોડ કરો.",
    default:       "ભાવ, શ્રેષ્ઠ મંડી, ખરીદદાર, વેચવું/સ્ટોર — હું મદદ કરી શકું."
  },
  hi: {
    today_price:   "आज की डेमो कपास कीमत: ₹7,250/क्विं (Rajkot). Gondal APMC: ₹7,320 — सबसे ऊंचा।",
    best_mandi:    "Gondal APMC ₹7,320/क्विं — नज़दीकी सबसे ऊंचा। Rajkot से 47 km दूर।",
    find_buyer:    "100 क्विं Grade A के लिए ABC Cotton Ginners 92% मिलान — ₹7,300/क्विं।",
    sell_store:    "डेमो AI: अभी ₹7,30,000। 30 दिन स्टोर: ~₹7,40,000 (लागत के बाद)।",
    check_quality: "Quality Assistant खोलें और फोटो अपलोड करें।",
    default:       "मैं कीमत, मंडी, खरीदार, बेचें/स्टोर में मदद कर सकता हूं।"
  }
};

// ================================================
// CANVAS POLYFILL — roundRect (not in older browsers)
// ================================================
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this;
  };
}

// ================================================
// NAVIGATION
// ================================================
function goTo(screen) {
  STATE.prevScreen = STATE.currentScreen;
  STATE.currentScreen = screen;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
  updateBottomNav(screen);
  // Give DOM a frame to render before drawing charts
  requestAnimationFrame(() => initScreen(screen));
}

function goBack() {
  goTo(STATE.prevScreen && STATE.prevScreen !== STATE.currentScreen ? STATE.prevScreen : 'farmer');
}

function updateBottomNav(screen) {
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
  const map = {
    landing: 'bn-landing', farmer: 'bn-landing',
    'market-intel': 'bn-market-intel',
    'buyer-match': 'bn-buyer-match',
    sell: 'bn-sell'
  };
  if (map[screen]) {
    const btn = document.getElementById(map[screen]);
    if (btn) btn.classList.add('active');
  }
}

function initScreen(screen) {
  switch(screen) {
    case 'landing':      initLandingScreen();  break;
    case 'farmer':       initFarmerDash();     break;
    case 'market-intel': initMarketIntel();    break;
    case 'forecast':     initForecastChart();  break;
    case 'buyer-match':  initBuyerMatch();     break;
    case 'advisor':      initAdvisor();        break;
    case 'income':       initIncome();         break;
    case 'agents':       initAgentNetwork();   break;
    case 'admin':        initAdmin();          break;
    case 'buyer':        renderBuyerListings(); break;
  }
}

// ================================================
// BACKGROUND PARTICLES
// ================================================
function initParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  const emojis = ['🌱','🌾','🍃','🌿','🥜','✨','🌻'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.cssText = `left:${Math.random()*100}%;animation-duration:${14+Math.random()*18}s;animation-delay:${Math.random()*20}s;font-size:${14+Math.random()*10}px`;
    container.appendChild(p);
  }
}

// ================================================
// ANIMATED COUNTER
// ================================================
function animateCounter(el, target, duration, prefix, suffix) {
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * ease);
    el.textContent = (prefix || '') + current.toLocaleString('en-IN') + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = (prefix || '') + target.toLocaleString('en-IN') + (suffix || '');
  }
  requestAnimationFrame(step);
}

// ================================================
// LANDING SCREEN INIT
// ================================================
function initLandingScreen() {
  // Counters
  animateCounter(document.getElementById('stat0'), 10240, 1800);
  animateCounter(document.getElementById('stat1'), 328,   1500);
  animateCounter(document.getElementById('stat2'), 8,     1200);
  animateCounter(document.getElementById('stat3'), 24,    1000);
  // Hero sparkline — wait for element to have width
  setTimeout(drawHeroSparkline, 100);
}

// ================================================
// HERO SPARKLINE
// ================================================
function drawHeroSparkline() {
  const el = document.getElementById('heroSparkline');
  if (!el) return;
  el.innerHTML = '';
  const w = el.offsetWidth || 240;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = 36;
  el.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const data = DEMO_DATA.cotton.prices7d;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * (w - 4) + 2,
    y: 30 - ((v - min) / range) * 26
  }));
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.lineTo(pts[pts.length-1].x, 36); ctx.lineTo(pts[0].x, 36); ctx.closePath();
  ctx.fillStyle = 'rgba(34,197,94,0.15)'; ctx.fill();
}

// ================================================
// SPARKLINE (for price cards)
// ================================================
function drawSparkline(id, data, color) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = '';
  const w = container.offsetWidth || 130, h = 32;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * (w - 4) + 2,
    y: (h - 4) - ((v - min) / range) * (h - 8) + 2
  }));
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.lineTo(pts[pts.length-1].x, h); ctx.lineTo(pts[0].x, h); ctx.closePath();
  ctx.fillStyle = color + '22'; ctx.fill();
}

// ================================================
// FARMER DASHBOARD
// ================================================
function initFarmerDash() {
  requestAnimationFrame(() => {
    drawSparkline('cottonSpark', DEMO_DATA.cotton.prices7d, '#22c55e');
    drawSparkline('groundnutSpark', DEMO_DATA.groundnut.prices7d, '#f59e0b');
    drawMiniMap();
  });
}

function drawMiniMap() {
  const el = document.getElementById('miniMap');
  if (!el) return;
  el.innerHTML = `<svg viewBox="0 0 100 90" width="100" height="90">
    <ellipse cx="50" cy="45" rx="42" ry="38" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="5" fill="#ef4444"/>
    <circle cx="44" cy="56" r="4.5" fill="#22c55e">
      <animate attributeName="r" values="4.5;7;4.5" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
    </circle>
    <line x1="50" y1="50" x2="44" y2="56" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="2 1"/>
    <text x="50" y="48" text-anchor="middle" font-size="5" fill="#1a2e1a" font-weight="bold">Rajkot</text>
    <text x="44" y="67" text-anchor="middle" font-size="4.5" fill="#166534" font-weight="bold">Gondal</text>
    <text x="44" y="74" text-anchor="middle" font-size="4" fill="#166534">₹7,320 ✦</text>
  </svg>`;
}

// ================================================
// MARKET INTELLIGENCE
// ================================================
function initMarketIntel() {
  updatePriceRange();
  renderMarketComp();
  requestAnimationFrame(() => {
    drawPriceChart(STATE.chartRange);
    drawGujaratMap();
  });
  setTimeout(() => {
    const fill = document.getElementById('prFill');
    if (fill) { fill.style.transition = 'width 1s ease'; fill.style.width = '72%'; }
  }, 300);
}

function updatePriceRange() {
  const data = STATE.activeMarketCrop === 'cotton' ? DEMO_DATA.cotton : DEMO_DATA.groundnut;
  const lo = document.getElementById('prLow');
  const hi = document.getElementById('prHigh');
  if (lo) lo.innerHTML = '₹' + data.low7d.toLocaleString('en-IN') + ' <small>Low</small>';
  if (hi) hi.innerHTML = '₹' + data.high7d.toLocaleString('en-IN') + ' <small>High</small>';
}

function switchCropTab(crop, btn) {
  STATE.activeMarketCrop = crop;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  updatePriceRange();
  renderMarketComp();
  drawPriceChart(STATE.chartRange);
  drawGujaratMap();
}

function setChartRange(days, btn) {
  STATE.chartRange = days;
  document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  drawPriceChart(days);
}

function renderMarketComp() {
  const list = document.getElementById('marketCompList');
  if (!list) return;
  const crop = STATE.activeMarketCrop;
  const sorted = [...DEMO_DATA.markets].sort((a, b) => b[crop] - a[crop]);
  list.innerHTML = sorted.map((m, i) => `
    <div class="market-comp-row">
      <div>
        <div class="mc-name">${m.name}</div>
        <div class="mc-dist">${m.dist > 0 ? m.dist + ' km away' : 'Your location'}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="mc-price">₹${m[crop].toLocaleString('en-IN')}</div>
        ${i === 0 ? '<span class="mc-best">BEST</span>' : ''}
      </div>
    </div>`).join('');
}

// ================================================
// PRICE CHART (Canvas)
// ================================================
function getCanvasSize(canvas) {
  const parent = canvas.parentElement;
  const w = parent ? parent.offsetWidth - 36 : 500;
  canvas.width = Math.max(w, 280);
  return { w: canvas.width, h: canvas.height };
}

function drawPriceChart(days) {
  const canvas = document.getElementById('priceChart');
  if (!canvas) return;
  const crop = STATE.activeMarketCrop === 'cotton' ? DEMO_DATA.cotton : DEMO_DATA.groundnut;
  const data = days === 7 ? crop.prices7d : crop.prices30d;
  const labels = days === 7
    ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    : Array.from({length:30}, (_, i) => i % 5 === 0 ? 'D'+(i+1) : '');
  const { w } = getCanvasSize(canvas);
  drawLineChart(canvas.getContext('2d'), canvas.width, canvas.height, data, labels, '#22c55e');
}

function drawLineChart(ctx, W, H, data, labels, color) {
  const pad = { top: 24, right: 20, bottom: 38, left: 58 };
  const w = W - pad.left - pad.right;
  const h = H - pad.top - pad.bottom;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

  const min = Math.min(...data) * 0.998;
  const max = Math.max(...data) * 1.002;
  const range = max - min || 1;
  const sx = i => pad.left + (i / (data.length - 1)) * w;
  const sy = v => pad.top + h - ((v - min) / range) * h;

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (i / 4) * h;
    ctx.strokeStyle = '#f0f4f0'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    const val = Math.round(max - (i / 4) * range);
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('₹' + val.toLocaleString('en-IN'), pad.left - 4, y + 4);
  }

  const pts = data.map((v, i) => [sx(i), sy(v)]);

  // Area fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + h);
  grad.addColorStop(0, color + '44'); grad.addColorStop(1, color + '06');
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  pts.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(pts[pts.length-1][0], pad.top + h);
  ctx.lineTo(pts[0][0], pad.top + h);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  // Line
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  pts.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
  ctx.lineCap = 'round'; ctx.stroke();

  // X-axis labels + highlight dots
  const maxIdx = data.indexOf(Math.max(...data));
  data.forEach((v, i) => {
    ctx.textAlign = 'center';
    if (labels[i]) {
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif';
      ctx.fillText(labels[i], pts[i][0], H - 8);
    }
    if (i === data.length - 1 || i === maxIdx) {
      ctx.beginPath(); ctx.arc(pts[i][0], pts[i][1], 4, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.fillStyle = color; ctx.font = 'bold 10px sans-serif';
      ctx.fillText('₹' + v.toLocaleString('en-IN'), pts[i][0], pts[i][1] - 9);
    }
  });
  ctx.textAlign = 'left';
}

// ================================================
// BAR CHART (Canvas) — no roundRect needed
// ================================================
function drawBarChart(ctx, W, H, data, labels, color) {
  const pad = { top: 24, right: 16, bottom: 38, left: 58 };
  const w = W - pad.left - pad.right;
  const h = H - pad.top - pad.bottom;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

  const max = Math.max(...data) * 1.15 || 1;
  const barSlot = w / data.length;
  const barW = barSlot * 0.6;

  // Grid
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (i / 4) * h;
    ctx.strokeStyle = '#f0f4f0'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
    const val = Math.round((max * (1 - i/4)) / 1000);
    ctx.fillText(val + 'K', pad.left - 4, y + 4);
  }

  const maxIdx = data.indexOf(Math.max(...data));
  data.forEach((v, i) => {
    const x = pad.left + i * barSlot + (barSlot - barW) / 2;
    const barH = (v / max) * h;
    const y = pad.top + h - barH;

    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + 'aa');
    ctx.fillStyle = grad;
    // Simple rect (no roundRect needed)
    ctx.beginPath();
    ctx.rect(x, y + 3, barW, barH - 3);
    ctx.fill();

    ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barW / 2, H - 8);

    if (i === maxIdx) {
      ctx.fillStyle = color; ctx.font = 'bold 10px sans-serif';
      ctx.fillText((v / 100000).toFixed(1) + 'L', x + barW / 2, y - 5);
    }
  });
  ctx.textAlign = 'left';
}

// ================================================
// GUJARAT MAP (SVG)
// ================================================
function drawGujaratMap() {
  const svg = document.getElementById('gujaratMap');
  if (!svg) return;
  const outline = "60,60 80,40 120,30 160,25 200,30 240,20 290,30 330,40 360,50 390,80 410,110 420,140 410,170 390,200 370,230 340,260 300,280 270,290 240,310 200,320 170,310 140,290 110,270 80,240 55,210 40,180 38,150 45,110 60,60";

  let html = `<defs>
    <radialGradient id="mgr" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#dcfce7"/><stop offset="100%" stop-color="#bbf7d0"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <polygon points="${outline}" fill="url(#mgr)" stroke="#16a34a" stroke-width="1.8" stroke-linejoin="round"/>
  <text x="200" y="368" text-anchor="middle" font-size="12" fill="#64748b" font-weight="600" font-family="sans-serif">Gujarat, India — DEMO DATA</text>`;

  // Connecting line: Rajkot → Gondal
  const rkt = DEMO_DATA.markets.find(m => m.name.includes('Rajkot'));
  const gdl = DEMO_DATA.markets.find(m => m.best);
  if (rkt && gdl) {
    html += `<line x1="${rkt.x}" y1="${rkt.y}" x2="${gdl.x}" y2="${gdl.y}"
      stroke="#22c55e" stroke-width="2" stroke-dasharray="5 3" opacity="0.7"/>`;
  }

  DEMO_DATA.markets.forEach((m, i) => {
    const isHome = m.name.includes('Rajkot');
    const isBest = m.best;
    const c = isHome ? '#ef4444' : isBest ? '#16a34a' : '#1d4ed8';
    const r = isHome ? 9 : isBest ? 8 : 6;
    const cropPrice = STATE.activeMarketCrop === 'cotton' ? m.cotton : m.groundnut;
    const shortName = m.name.replace(' APMC','');

    html += `<g>
      <circle cx="${m.x}" cy="${m.y}" r="${r+5}" fill="${c}" opacity="0.12">
        <animate attributeName="r" values="${r+5};${r+9};${r+5}" dur="${2.2+i*0.25}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${m.x}" cy="${m.y}" r="${r}" fill="${c}" filter="url(#glow)"/>
      <text x="${m.x}" y="${m.y-r-5}" text-anchor="middle" font-size="8.5" fill="${c}" font-weight="700" font-family="sans-serif">${shortName}</text>
      <text x="${m.x}" y="${m.y+r+13}" text-anchor="middle" font-size="8" fill="#1a2e1a" font-weight="800" font-family="sans-serif">₹${cropPrice.toLocaleString('en-IN')}</text>
    </g>`;
  });

  svg.innerHTML = html;
}

// ================================================
// FORECAST CHART
// ================================================
function initForecastChart() {
  const canvas = document.getElementById('forecastChart');
  if (!canvas) return;
  getCanvasSize(canvas);
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const data = [7200,7220,7250,7210,7280,7320,7350];
  const labels = ['Today','D2','D3','D4','D5','D6','D7'];
  const pad = { top: 24, right: 20, bottom: 38, left: 58 };
  const w = W - pad.left - pad.right, h = H - pad.top - pad.bottom;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);

  const min = 7150, max = 7400, range = max - min;
  const sx = i => pad.left + (i / (data.length-1)) * w;
  const sy = v => pad.top + h - ((v - min) / range) * h;

  // Grid
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (i / 4) * h;
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('₹' + Math.round(max - (i/4)*range).toLocaleString('en-IN'), pad.left - 4, y + 4);
  }

  const pts = data.map((v, i) => [sx(i), sy(v)]);

  // Confidence band
  ctx.beginPath();
  pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y - 14) : ctx.lineTo(x, y - 14));
  pts.slice().reverse().forEach(([x, y]) => ctx.lineTo(x, y + 14));
  ctx.closePath(); ctx.fillStyle = 'rgba(74,222,128,0.08)'; ctx.fill();

  // Area
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + h);
  grad.addColorStop(0, 'rgba(74,222,128,0.3)'); grad.addColorStop(1, 'rgba(74,222,128,0.02)');
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  pts.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(pts[pts.length-1][0], pad.top + h);
  ctx.lineTo(pts[0][0], pad.top + h);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  // Dashed line
  ctx.beginPath(); ctx.setLineDash([6,3]);
  ctx.moveTo(pts[0][0], pts[0][1]);
  pts.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round'; ctx.stroke(); ctx.setLineDash([]);

  // Dots and labels
  data.forEach((v, i) => {
    ctx.beginPath(); ctx.arc(pts[i][0], pts[i][1], 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4ade80'; ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], pts[i][0], H - 8);
  });
  ctx.fillStyle = '#4ade80'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('₹' + data[data.length-1].toLocaleString('en-IN'), pts[pts.length-1][0], pts[pts.length-1][1] - 10);
  ctx.textAlign = 'left';
}

// ================================================
// BUYER MATCHING AGENT
// ================================================
function initBuyerMatch() {
  document.getElementById('aiParseCard').style.display = 'none';
  document.getElementById('buyerResultsSection').style.display = 'none';
}

function runBuyerSearch() {
  const parseCard = document.getElementById('aiParseCard');
  const resultsSection = document.getElementById('buyerResultsSection');
  parseCard.style.display = 'block';
  resultsSection.style.display = 'none';

  const parsed = [
    { key: 'Crop', val: 'Cotton' },
    { key: 'Quantity', val: '50 qtl' },
    { key: 'Quality', val: 'Grade A' },
    { key: 'Distance', val: '50 km' }
  ];
  const tagsEl = document.getElementById('parseTags');
  tagsEl.innerHTML = '';
  parsed.forEach((p, i) => {
    setTimeout(() => {
      const tag = document.createElement('div');
      tag.className = 'parse-tag';
      tag.innerHTML = `<span class="pt-key">${p.key}</span><span class="pt-val">${p.val}</span>`;
      tagsEl.appendChild(tag);
    }, i * 300);
  });

  setTimeout(() => {
    resultsSection.style.display = 'block';
    renderBuyerCards(DEMO_DATA.buyers.filter(b => b.crop === 'cotton'));
  }, 1600);
}

function renderBuyerCards(buyers) {
  const list = document.getElementById('buyerCardsList');
  if (!list) return;
  list.innerHTML = buyers.map((b, idx) => `
    <div class="buyer-card" style="animation-delay:${idx*0.1}s">
      <div class="bc-header">
        <div>
          <div class="bc-name">${b.name}</div>
          <div class="bc-price">₹${b.price.toLocaleString('en-IN')}/qtl</div>
        </div>
        <span class="bc-tag">${b.type}</span>
      </div>
      <div class="bc-meta">
        <span class="bc-chip">📍 ${b.dist} km</span>
        <span class="bc-chip">⭐ Grade ${b.grade}</span>
        <span class="bc-chip">📦 ${b.qty}</span>
      </div>
      <div class="bc-match">
        <div class="match-ring-wrap">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="28" fill="none" stroke="#e2e8f0" stroke-width="6"/>
            <circle cx="35" cy="35" r="28" fill="none"
              stroke="${b.match>=90?'#22c55e':b.match>=80?'#f59e0b':'#3b82f6'}"
              stroke-width="6" stroke-linecap="round"
              stroke-dasharray="175.9"
              stroke-dashoffset="${175.9 - (b.match/100)*175.9}"
              transform="rotate(-90 35 35)"
              style="transition:stroke-dashoffset 1.5s ease"/>
          </svg>
          <div class="ring-label">
            <span class="ring-pct" style="color:${b.match>=90?'#16a34a':b.match>=80?'#d97706':'#2563eb'}">${b.match}%</span>
            <span class="ring-sub">Match</span>
          </div>
        </div>
        <div class="match-factors">
          ${Object.entries(b.factors).map(([k,v]) => `
            <div class="mf-row">
              <span class="mf-name">${k}</span>
              <div class="mf-bar"><div class="mf-fill" style="width:${v}%"></div></div>
              <span class="mf-pct">${v}%</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="bc-actions">
        <button class="bc-offer-btn" onclick="showToast('Offer sent to ${b.name.replace(/'/g,'`')}! They will respond within 24 hrs.','success')">Make Offer</button>
        <button class="bc-view-btn" onclick="showToast('Viewing ${b.name.replace(/'/g,'`')} profile (demo)','info')">View Farmer</button>
      </div>
    </div>`).join('');
}

// ================================================
// SELL FORM
// ================================================
function submitSellForm(e) {
  e.preventDefault();
  const form = document.getElementById('sellForm');
  const success = document.getElementById('sellSuccess');
  const crop = document.getElementById('sellCrop').value;
  const qty  = document.getElementById('sellQty').value;
  form.style.display = 'none';
  document.getElementById('sellSuccessMsg').textContent =
    `Your ${qty} qtl ${crop} listing has been matched with 4 potential buyers.`;
  success.style.display = 'block';
  showToast('🎉 Listing created! AI matching in progress…', 'success');
  setTimeout(() => showToast('🤝 2 buyers found matching your requirements!', 'info'), 2200);
}

// ================================================
// SELL/STORE ADVISOR
// ================================================
function initAdvisor() {
  document.getElementById('advisorReasons').innerHTML = [
    'Current cotton prices are near a recent high — selling now locks in gains.',
    'Storage facility cost (₹8,000/month) reduces net gain significantly.',
    'Demo forecast shows moderate confidence in further price increase.'
  ].map((r, i) => `
    <div class="reason-item">
      <div class="reason-num">${i+1}</div>
      <span>${r}</span>
    </div>`).join('');

  setTimeout(() => {
    const fill = document.getElementById('dmFill');
    const ind  = document.getElementById('dmIndicator');
    if (fill) { fill.style.transition = 'width 1.4s ease'; fill.style.width = '68%'; }
    if (ind)  { ind.style.transition  = 'left 1.4s ease';  ind.style.left = 'calc(68% - 10px)'; }
  }, 300);
}

// ================================================
// QUALITY AGENT
// ================================================
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('cropPreviewImg').src = e.target.result;
    document.getElementById('uploadZone').style.display = 'none';
    document.getElementById('qualityResult').style.display = 'block';
    document.getElementById('qrCard').style.display = 'none';
    document.getElementById('scanOverlay').style.display = 'flex';
    setTimeout(() => {
      document.getElementById('scanOverlay').style.display = 'none';
      document.getElementById('qrCard').style.display = 'block';
      showToast('✅ AI Quality analysis complete: Grade A detected', 'success');
    }, 3200);
  };
  reader.readAsDataURL(file);
}

// ================================================
// INCOME AGENT
// ================================================
function initIncome() {
  animateCounter(document.getElementById('icQty'), 250, 1200);
  animateCounter(document.getElementById('icAvg'), 7180, 1400);
  requestAnimationFrame(drawRevenueChart);
}

function drawRevenueChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas) return;
  const { w } = getCanvasSize(canvas);
  drawBarChart(canvas.getContext('2d'), canvas.width, canvas.height, DEMO_DATA.revenue, DEMO_DATA.revMonths, '#22c55e');
}

// ================================================
// AI AGENT NETWORK
// ================================================
function initAgentNetwork() {
  const svg = document.getElementById('agentNetworkSVG');
  if (!svg) return;

  const agents = [
    { name: 'Mandi Price\nAgent', x:250, y: 60, c:'#22c55e', icon:'📊' },
    { name: 'Forecast\nAgent',    x:395, y:140, c:'#3b82f6', icon:'🔮' },
    { name: 'Buyer Match\nAgent', x:395, y:265, c:'#7c3aed', icon:'🤝' },
    { name: 'Sell/Store\nAdvisor',x:250, y:345, c:'#f59e0b', icon:'🧠' },
    { name: 'Quality\nAgent',     x:105, y:265, c:'#ec4899', icon:'✅' },
    { name: 'Income\nAgent',      x:105, y:140, c:'#14b8a6', icon:'💰' },
    { name: 'Kisan AI\nMitra',    x:250, y:200, c:'#ff6b35', icon:'🤖' }
  ];
  const cx = 250, cy = 200;

  let html = `
  <rect width="500" height="480" fill="#0f172a" rx="16"/>
  <text x="250" y="28" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.5)" font-family="sans-serif" font-weight="600">KisanSetu AI — Agent Network</text>
  <rect x="195" y="418" width="110" height="22" rx="11" fill="#1e3a5f"/>
  <text x="250" y="433" text-anchor="middle" font-size="10" fill="#60a5fa" font-weight="700" font-family="sans-serif">IBM GRANITE ENGINE</text>
  <text x="250" y="458" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.35)" font-family="sans-serif">Reasoning · Explanation · Decisions</text>`;

  // Lines from outer to center
  agents.slice(0,6).forEach((a, i) => {
    html += `<line x1="${a.x}" y1="${a.y}" x2="${cx}" y2="${cy}"
      stroke="${a.c}" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.45">
      <animate attributeName="stroke-dashoffset" from="0" to="32" dur="${1.6+i*0.18}s" repeatCount="indefinite"/>
    </line>`;
    // Animated dot along line
    html += `<circle r="3.5" fill="${a.c}" opacity="0.85">
      <animateMotion dur="${2+i*0.3}s" repeatCount="indefinite"
        path="M${a.x},${a.y} L${cx},${cy}"/>
    </circle>`;
  });

  // Center → IBM line
  html += `<line x1="${cx}" y1="${cy+38}" x2="${cx}" y2="415"
    stroke="#60a5fa" stroke-width="2" stroke-dasharray="6 3" opacity="0.4">
    <animate attributeName="stroke-dashoffset" from="0" to="36" dur="1.6s" repeatCount="indefinite"/>
  </line>
  <circle r="3.5" fill="#60a5fa" opacity="0.9">
    <animateMotion dur="1.6s" repeatCount="indefinite" path="M${cx},${cy+38} L${cx},412"/>
  </circle>`;

  // Nodes
  agents.forEach((a, i) => {
    const isCenter = i === 6;
    const r = isCenter ? 34 : 28;
    const lines = a.name.split('\n');
    html += `<g>
      <circle cx="${a.x}" cy="${a.y}" r="${r+5}" fill="${a.c}" opacity="0.1">
        <animate attributeName="r" values="${r+5};${r+9};${r+5}" dur="${2.4+i*0.35}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${a.x}" cy="${a.y}" r="${r}" fill="#1e293b" stroke="${a.c}" stroke-width="${isCenter?3:2}"/>
      <text x="${a.x}" y="${a.y+2}" text-anchor="middle" font-size="${isCenter?18:15}">${a.icon}</text>
      ${lines.map((ln,li)=>`<text x="${a.x}" y="${a.y+r+12+li*11}" text-anchor="middle" font-size="8" fill="${a.c}" font-weight="700" font-family="sans-serif">${ln}</text>`).join('')}
    </g>`;
  });

  svg.innerHTML = html;
}

// ================================================
// ADMIN
// ================================================
function initAdmin() {
  animateCounter(document.getElementById('asFarmers'), 10240, 1500);
  animateCounter(document.getElementById('asBuyers'),  328,   1200);
  animateCounter(document.getElementById('asListings'),1245,  1300);
  requestAnimationFrame(() => {
    drawAdminGrowthChart();
    drawAdminCropChart();
  });
}

function drawAdminGrowthChart() {
  const canvas = document.getElementById('adminGrowthChart');
  if (!canvas) return;
  getCanvasSize(canvas);
  drawLineChart(canvas.getContext('2d'), canvas.width, canvas.height, DEMO_DATA.adminGrowth, DEMO_DATA.adminMonths, '#22c55e');
}

function drawAdminCropChart() {
  const canvas = document.getElementById('adminCropChart');
  if (!canvas) return;
  getCanvasSize(canvas);
  const data   = [620,510,430,380,580,690,720];
  const labels = ['Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  drawBarChart(canvas.getContext('2d'), canvas.width, canvas.height, data, labels, '#3b82f6');
}

// ================================================
// BUYER PORTAL
// ================================================
function renderBuyerListings() {
  const list = document.getElementById('buyerListingCards');
  if (!list) return;
  const cf = document.getElementById('bfCrop')?.value || '';
  const qf = document.getElementById('bfQuality')?.value || '';
  const lf = document.getElementById('bfLocation')?.value || '';
  let data = DEMO_DATA.listings;
  if (cf) data = data.filter(d => d.crop === cf);
  if (qf) data = data.filter(d => d.grade === qf);
  if (lf) data = data.filter(d => d.loc === lf);
  list.innerHTML = data.length ? data.map(l => `
    <div class="listing-card">
      <div class="lc-header">
        <div class="lc-farmer">👨‍🌾 ${l.farmer}</div>
        <span class="lc-crop">${l.crop==='cotton'?'🌱 Cotton':'🥜 Groundnut'}</span>
      </div>
      <div class="lc-price">₹${l.price.toLocaleString('en-IN')}/qtl</div>
      <div class="lc-meta">
        <span class="lc-chip">📦 ${l.qty} qtl</span>
        <span class="lc-chip">⭐ Grade ${l.grade}</span>
        <span class="lc-chip">📍 ${l.loc}</span>
      </div>
      <div class="lc-actions">
        <button class="lc-offer" onclick="showToast('Offer sent to ${l.farmer.replace(/'/g,'`')}! (Demo)','success')">Make Offer</button>
        <button class="lc-view"  onclick="showToast('Viewing farmer profile (demo)','info')">View Farmer</button>
      </div>
    </div>`).join('') : '<p style="text-align:center;color:#94a3b8;padding:24px">No listings match your filters.</p>';
}

// ================================================
// KISAN AI MITRA CHAT
// ================================================
function openChat() {
  STATE.chatOpen = true;
  const win = document.getElementById('chatWindow');
  win.classList.add('open');
  if (document.getElementById('cwMessages').children.length === 0) {
    const greetings = {
      en: "Namaste! 👋 I'm Kisan AI Mitra, powered by IBM Granite. Ask me about prices, best mandi, buyers, or sell/store decisions!",
      gu: "નમસ્તે! 👋 હું Kisan AI Mitra, IBM Granite દ્વારા. ભાવ, મ��ી, ખ��ીદ��ર — ગ��ે ત્��ારે ��ૂ���ો!",
      hi: "नमस्ते! 👋 मैं Kisan AI Mitra, IBM Granite द्वारा। कीमत, मंडी, खरीदार — कुछ भी पूछें!"
    };
    addAIMsg(greetings[STATE.chatLang] || greetings.en);
  }
}

function closeChat() {
  STATE.chatOpen = false;
  document.getElementById('chatWindow').classList.remove('open');
}

function addUserMsg(text) {
  const msgs = document.getElementById('cwMessages');
  const div = document.createElement('div');
  div.className = 'msg-bubble user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addAIMsg(text) {
  const msgs = document.getElementById('cwMessages');
  const typing = document.createElement('div');
  typing.className = 'msg-bubble ai typing-indicator';
  typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    if (typing.parentNode) msgs.removeChild(typing);
    const div = document.createElement('div');
    div.className = 'msg-bubble ai';
    div.innerHTML = text +
      `<div class="msg-ai-tag">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#0f62fe"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#fff" stroke-width="2"/></svg>
        IBM GRANITE · Demo Response
      </div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1100);
}

function chatQuick(key) {
  const labels = {
    today_price: "What's today's price?",
    best_mandi:  "Where's the best mandi?",
    find_buyer:  "Find a buyer for my cotton.",
    sell_store:  "Should I sell or store?",
    check_quality: "How to check crop quality?"
  };
  addUserMsg(labels[key] || key);
  addAIMsg((AI_RESPONSES[STATE.chatLang] || AI_RESPONSES.en)[key] || AI_RESPONSES.en.default);
}

function sendChat() {
  const input = document.getElementById('cwInput');
  const text  = (input.value || '').trim();
  if (!text) return;
  input.value = '';
  addUserMsg(text);
  const lower = text.toLowerCase();
  const resp  = AI_RESPONSES[STATE.chatLang] || AI_RESPONSES.en;
  let reply   = resp.default;
  if (/price|ભાવ|कीमत/.test(lower))        reply = resp.today_price;
  else if (/mandi|apmc|market|баз/.test(lower)) reply = resp.best_mandi;
  else if (/buyer|sell|vendor/.test(lower))     reply = resp.find_buyer;
  else if (/store|stor|storе/.test(lower))      reply = resp.sell_store;
  else if (/quality|grade|grading/.test(lower)) reply = resp.check_quality;
  addAIMsg(reply);
}

// ================================================
// NOTIFICATIONS
// ================================================
function toggleNotifications() {
  STATE.notifOpen = !STATE.notifOpen;
  document.getElementById('notifDrawer').classList.toggle('open', STATE.notifOpen);
  document.getElementById('drawerOverlay').classList.toggle('active', STATE.notifOpen);
  if (STATE.notifOpen) renderNotifications();
}

function renderNotifications() {
  document.getElementById('notifList').innerHTML = DEMO_DATA.notifications.map(n => `
    <div class="notif-item ${n.unread?'unread':''}" onclick="markRead(${n.id})">
      <div class="notif-text">${n.text}</div>
      <div class="notif-time">⏱️ ${n.time} · DEMO</div>
    </div>`).join('');
}

function markRead(id) {
  const n = DEMO_DATA.notifications.find(x => x.id === id);
  if (n) n.unread = false;
  updateNotifBadge();
  renderNotifications();
}

function updateNotifBadge() {
  const count = DEMO_DATA.notifications.filter(n => n.unread).length;
  const badge = document.getElementById('notifBadge');
  if (badge) { badge.textContent = count; badge.style.display = count ? 'flex' : 'none'; }
}

// ================================================
// TOAST
// ================================================
function showToast(message, type) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOutRight 0.3s ease forwards';
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 320);
  }, 3500);
}

// ================================================
// LANGUAGE SWITCH
// ================================================
function switchLang(lang) {
  STATE.lang = lang;
  STATE.chatLang = lang;
  // Update active button
  ['en','gu','hi'].forEach(l => {
    const btn = document.getElementById('lb' + l.charAt(0).toUpperCase() + l.slice(1));
    if (btn) btn.classList.toggle('active', l === lang);
  });
  // Apply translations
  const tr = T[lang] || T.en;
  Object.entries(tr).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  });
  const langNames = { en: 'English', gu: 'ગુજરાતી', hi: 'हिन्दी' };
  showToast('Language: ' + (langNames[lang] || lang), 'info');
}

// ================================================
// DEMO MODE
// ================================================
function runDemoMode() {
  const steps = [
    'Show market price for cotton',
    'Find best mandi — Gondal APMC',
    'Run AI price forecast',
    'Check sell/store advice',
    'Match buyers — ABC Cotton Ginners',
    'Receive buyer offer',
    'Compare income vs best price',
    'Chat with Kisan AI Mitra'
  ];
  document.getElementById('demoSteps').innerHTML = steps.map((s, i) =>
    `<div class="demo-step"><div class="ds-num">${i+1}</div><span>${s}</span></div>`
  ).join('');
  document.getElementById('demoModal').classList.add('open');
}

function closeDemoModal() {
  document.getElementById('demoModal').classList.remove('open');
}

function startDemoFlow() {
  closeDemoModal();
  goTo('farmer');
  showToast('🎯 Demo started — Ramesh Patel, 100 qtl Cotton, Rajkot', 'success');
  const steps = [
    { d:1500, fn: ()=> showToast('📊 Cotton: ₹7,250 Rajkot | ₹7,320 Gondal (+₹220)', 'info') },
    { d:3200, fn: ()=> goTo('market-intel') },
    { d:5500, fn: ()=> showToast('🔮 AI Forecast: ₹7,350 expected in 7 days (MEDIUM)', 'info') },
    { d:6500, fn: ()=> goTo('forecast') },
    { d:9000, fn: ()=> { goTo('buyer-match'); setTimeout(runBuyerSearch, 500); } },
    { d:11500,fn: ()=> showToast('🤝 ABC Cotton Ginners: 92% match at ₹7,300/qtl!', 'success') },
    { d:13000,fn: ()=> goTo('advisor') },
    { d:15000,fn: ()=> showToast('🟢 AI Advisor: Consider selling now — ₹7,30,000', 'success') },
    { d:17000,fn: ()=> { openChat(); setTimeout(()=>{ addUserMsg("Where should I sell my cotton?"); addAIMsg(AI_RESPONSES.en.best_mandi); }, 700); } },
    { d:20500,fn: ()=> showToast('🎯 Demo complete! Full workflow shown.', 'success') }
  ];
  steps.forEach(({ d, fn }) => setTimeout(fn, d));
}

// ================================================
// LOCAL STORAGE
// ================================================
function loadSavedState() {
  try {
    const lang = localStorage.getItem('ks_lang');
    if (lang && T[lang]) { STATE.lang = lang; }
  } catch(e) {}
}
function saveState() {
  try { localStorage.setItem('ks_lang', STATE.lang); } catch(e) {}
}

// ================================================
// SELL DATE DEFAULT
// ================================================
function setDefaultDate() {
  const el = document.getElementById('sellDate');
  if (el) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    el.value = d.toISOString().split('T')[0];
  }
}

// ================================================
// FUTURE IBM GRANITE API INTEGRATION
// POST /api/granite/reason
// { query, context: { crop, price, market, history } }
// → { recommendation, confidence, reasoning, actions }
// ================================================

// ================================================
// FUTURE IBM CLOUD INTEGRATION
// IBM Cloud Functions (serverless agents)
// IBM Event Streams (Kafka) for real-time price feeds
// ================================================

// ================================================
// FUTURE LIVE MANDI API
// Source: Agmarknet / eNAM API
// GET /api/agmarknet/prices?commodity=cotton&state=gujarat
// Refresh every 30 min on market days
// ================================================

// ================================================
// INIT — DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  loadSavedState();
  setDefaultDate();
  initParticles();
  updateNotifBadge();

  // Navigate to landing — this triggers initLandingScreen via initScreen
  goTo('landing');

  // Apply saved language without toast
  if (STATE.lang !== 'en') {
    const tr = T[STATE.lang] || T.en;
    Object.entries(tr).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = val;
    });
  }

  // Welcome toasts
  setTimeout(() => showToast('🌱 KisanSetu AI loaded — DEMO MODE', 'success'), 800);
  setTimeout(() => showToast('🔔 Cotton at Gondal: ₹7,320 (+₹220 opportunity)', 'info'), 2800);

  // Periodic cotton card pulse (farmer screen)
  setInterval(() => {
    if (STATE.currentScreen === 'farmer') {
      document.querySelectorAll('.pc-price').forEach(el => {
        el.style.transition = 'transform 0.3s';
        el.style.transform  = 'scale(1.04)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
      });
    }
  }, 9000);

  // Re-draw hero sparkline on window resize
  window.addEventListener('resize', () => {
    if (STATE.currentScreen === 'landing') drawHeroSparkline();
    if (STATE.currentScreen === 'farmer')  initFarmerDash();
  });

  console.log('%c🌱 KisanSetu AI v1.0.1', 'color:#22c55e;font-weight:900;font-size:16px');
  console.log('%cDemo Mode | IBM Granite Concept | Hackathon MVP', 'color:#64748b;font-size:12px');
});
