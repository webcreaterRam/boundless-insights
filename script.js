document.addEventListener('DOMContentLoaded', () => {
  // Boundless Insights Portfolio JavaScript
  // Clean, robust, and theme-aware
  
  // =====================
  // 1. MOBILE MENU MODULE
  // =====================
const setupHamburger = () => {
  const menuBtn = document.getElementById('menu-btn');
  const menuBtnMobile = document.getElementById('menu-btn-mobile');

  // Remove any previous menu if exists
  let menu = document.getElementById('hamburger-nav-menu');
  if (menu) menu.remove();

  // Create the menu
  menu = document.createElement('div');
  menu.id = 'hamburger-nav-menu';
  menu.style.position = 'fixed';
  menu.style.top = '70px';
  menu.style.right = '0';
  menu.style.background = 'var(--color-navbar)';
  menu.style.borderRadius = '0.75rem 0 0 0.75rem';
  menu.style.boxShadow = '0 4px 24px 0 #0008';
  menu.style.padding = '1.2rem 1.5rem';
  menu.style.display = 'none';
  menu.style.zIndex = '9999';
  menu.style.minWidth = '220px';
  menu.innerHTML = `
    <ul style="display:flex;flex-direction:column;gap:1rem;margin:0;padding:0;list-style:none;align-items:flex-start;">
      <li><a href="#about" class="themed-link">About</a></li>
      <li><a href="#skills" class="themed-link">Skills</a></li>
      <li><a href="#projects" class="themed-link">Projects</a></li>
      <li><a href="#blog" class="themed-link">Blog</a></li>
      <li><a href="#testimonials" class="themed-link">Testimonials</a></li>
      <li><a href="#contact" class="themed-link">Contact</a></li>
      <li><a href="resume.html" class="themed-link">Resume</a></li>
    </ul>
  `;
  document.body.appendChild(menu);

  function toggleMenu(e) {
    e.stopPropagation();
    // Position menu below the correct hamburger button, flush right
    let btn = e.currentTarget;
    let rect = btn.getBoundingClientRect();
    menu.style.top = rect.bottom + 8 + 'px';
    menu.style.right = '0';
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  }
  function hideMenu() {
    menu.style.display = 'none';
  }

  if (menuBtn) {
    menuBtn.onclick = toggleMenu;
  }
  if (menuBtnMobile) {
    menuBtnMobile.onclick = toggleMenu;
  }
  // Hide menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && e.target !== menuBtn && e.target !== menuBtnMobile) {
      hideMenu();
    }
  });
  // Hide menu on nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', hideMenu);
  });
}
  
  // =====================
  // 2. THEME SWITCHER MODULE
  // =====================
  function setupThemeSwitcher() {
    const themes = ['theme-cosmic', 'theme-nebula', 'theme-eclipse'];
    let current = 0;
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-switcher');
    const themeBtnMobile = document.getElementById('theme-switcher-mobile');
  
    function setTheme(idx) {
      themes.forEach(t => html.classList.remove(t));
      html.classList.add(themes[idx]);
      const label = themes[idx].replace('theme-', '').replace(/^[a-z]/, c => c.toUpperCase());
      if (themeBtn) themeBtn.innerText = label;
      if (themeBtnMobile) themeBtnMobile.innerText = label;
      // Dispatch event for background switching and theme-based CSS
      const evt = new Event('themechange');
      html.dispatchEvent(evt);
      if (typeof window.updateCosmicBg === 'function') window.updateCosmicBg();
    }
  
    function switchTheme(e) {
      if (e && e.preventDefault) e.preventDefault();
      current = (current + 1) % themes.length;
      setTheme(current);
      if (window.localStorage) localStorage.setItem('theme', themes[current]);
    }
  
    if (themeBtn) themeBtn.addEventListener('click', switchTheme);
    if (themeBtnMobile) themeBtnMobile.addEventListener('click', switchTheme);
  
    // Restore theme from localStorage
    if (window.localStorage) {
      const saved = localStorage.getItem('theme');
      if (saved && themes.includes(saved)) {
        current = themes.indexOf(saved);
      }
    }
    setTheme(current);
  }
  
  // =====================
  // 3. STAR CANVAS MODULE
  // =====================
  function setupStarCanvas() {
    const canvas = document.getElementById('star-canvas');
    const hero = document.getElementById('hero');
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    hero.style.position = 'relative';
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.right = '0';
    canvas.style.bottom = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
  
    const STAR_COLORS = [
      '#fff8e7', '#ffe9c4', '#ffd1a9', '#cce0ff', '#aabfff',
      '#b5ffd9', '#f7baff', '#ffffff', '#ffd6a5', '#b5ffd9'
    ];
    const cosmicEmissionPalettesRgba = [
  // 1. SODIUM BURST (Na-rich)
  {
    id: 'sodium',
    stops: [
      { at: 0.00, color: 'rgba(255,255,255,1.00)' },     // #FFFFFFFF
      { at: 0.12, color: 'rgba(255,221,  0,0.87)' },   // #FFDD00DD
      { at: 0.30, color: 'rgba(255,187,  0,0.60)' },   // #FFBB0099
      { at: 0.55, color: 'rgba(255,136,  0,0.40)' },   // #FF880066
      { at: 1.00, color: 'rgba(255, 68,  0,0.00)' }    // #FF440000
    ]
  },

  // 2. IRONFLARE (Fe + Na blend)
  {
    id: 'ironflare',
    stops: [
      { at: 0.00, color: 'rgba(255,248,225,1.00)' },     // #FFF8E1FF
      { at: 0.15, color: 'rgba(255,215,  0,0.80)' },   // #FFD700CC
      { at: 0.35, color: 'rgba(255,170,  0,0.67)' },   // #FFAA00AA
      { at: 0.65, color: 'rgba(204,136,  0,0.53)' },   // #CC880088
      { at: 1.00, color: 'rgba(204, 68,  0,0.00)' }    // #CC440000
    ]
  },

  // 3. MAGNESHELIX (Mg-rich teal)
  {
    id: 'magneshelix',
    stops: [
      { at: 0.00, color: 'rgba(204,255,244,1.00)' },     // #CCFFF4FF
      { at: 0.20, color: 'rgba(153,255,238,0.80)' },   // #99FFEECC
      { at: 0.40, color: 'rgba( 51,204,170,0.60)' },   // #33CCAA99
      { at: 0.70, color: 'rgba(  0,153,119,0.40)' },   // #00997766
      { at: 1.00, color: 'rgba(  0,153,119,0.00)' }    // #00997700
    ]
  },

  // 4. CALCIUM VIOLET (Ca spectral)
  {
    id: 'calcium',
    stops: [
      { at: 0.00, color: 'rgba(245,230,255,1.00)' },     // #F5E6FFFF
      { at: 0.10, color: 'rgba(216,176,255,0.80)' },   // #D8B0FFCC
      { at: 0.30, color: 'rgba(178,102,255,0.67)' },   // #B266FFAA
      { at: 0.60, color: 'rgba(138, 51,255,0.53)' },   // #8A33FF88
      { at: 1.00, color: 'rgba(138, 51,255,0.00)' }    // #8A33FF00
    ]
  },

  // 5. NICKEL GLOW (Ni green)
  {
    id: 'nickel',
    stops: [
      { at: 0.00, color: 'rgba(230,255,237,1.00)' },     // #E6FFEDFF
      { at: 0.25, color: 'rgba(170,255,204,0.73)' },   // #AAFFCCBB
      { at: 0.50, color: 'rgba(102,255,153,0.53)' },   // #66FF9988
      { at: 0.75, color: 'rgba( 51,255,102,0.33)' },   // #33FF6655
      { at: 1.00, color: 'rgba( 51,255,102,0.00)' }    // #33FF6600
    ]
  },

  // 6. ATMOSPHERIC SWIRL (O₂/N₂ red→blue)
  {
    id: 'atmosphere',
    stops: [
      { at: 0.00, color: 'rgba(255, 68, 51,1.00)' },     // #FF4433FF
      { at: 0.20, color: 'rgba(255,136, 85,0.87)' },   // #FF8855DD
      { at: 0.45, color: 'rgba(255,221,170,0.80)' },   // #FFDDAACC
      { at: 0.70, color: 'rgba(153,238,255,0.67)' },   // #99EEFFAA
      { at: 1.00, color: 'rgba(153,238,255,0.00)' }    // #99EEFF00
    ]
  },

  // 7. PLASMA RAINBOW (multi-metal cascade)
  {
    id: 'plasma_rainbow',
    stops: [
      { at: 0.00, color: 'rgba(255,255,255,1.00)' },     // #FFFFFFFF
      { at: 0.12, color: 'rgba(255,215,  0,0.80)' },   // #FFD700CC
      { at: 0.25, color: 'rgba(255, 85,  0,0.73)' },   // #FF5500BB
      { at: 0.45, color: 'rgba(204,  0,204,0.67)' },   // #CC00CCAA
      { at: 0.70, color: 'rgba(  0,255,102,0.67)' },   // #00FF66AA
      { at: 1.00, color: 'rgba(  0,255,102,0.00)' }    // #00FF6600
    ]
  },

  // 8. ANTIMATTER SWIRL (inverted spectrum)
  {
    id: 'antimatter',
    stops: [
      { at: 0.00, color: 'rgba(  0, 17, 68,1.00)' },     // #001144FF
      { at: 0.18, color: 'rgba( 34,  0,170,0.93)' },   // #2200AAEE
      { at: 0.38, color: 'rgba( 68,  0,255,0.80)' },   // #4400FFCC
      { at: 0.65, color: 'rgba(102,255, 68,0.60)' },   // #66FF4499
      { at: 1.00, color: 'rgba(102,255, 68,0.00)' }    // #66FF4400
    ]
  }
];

  
    let meteors = [], width = 0, height = 0, staticStarsLayer = null;
    let lastFrameTime = performance.now();
    let lastMeteorTime = 0;
    let MAX_METEORS = window.innerWidth < 600 ? 1 : 2;
    const METEOR_INTERVAL = 3200;
  
    function getStarCount(width) {
      if (width < 600) return 40;
      if (width < 900) return 80;
      return 120;
    }
  
    function renderStaticStarsLayer(w, h) {
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const offctx = off.getContext('2d');
      offctx.clearRect(0, 0, w, h);
      const count = getStarCount(w);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1 + 0.5;
        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        offctx.save();
        offctx.beginPath(); 
        offctx.arc(x, y, r, 0, 2 * Math.PI);
        offctx.fillStyle = color;
        offctx.globalAlpha = 0.85 + Math.random() * 0.15;
        offctx.shadowColor = color;
        offctx.shadowBlur = 4;
        offctx.fill();
        offctx.restore();
      }
      offctx.globalAlpha = 1;
      return off;
    }
  
    class Meteor {
      constructor(w, h) {
        const fromLeft = Math.random() < 0.5;
        const angle = (fromLeft ? 67 : 112) * Math.PI / 180;
        this.x0 = fromLeft ? Math.random() * w * 0.25 : Math.random() * w * 0.25 + w * 0.75;
        this.y0 = Math.random() * h * 0.15;
        const speed = Math.random() * 0.5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.length = Math.random() * 70 + 90;
        this.maxLife = Math.random() * 1.2 + 2.2;
        this.life = 0;
        this.alpha = 1;
        // Pick a a random palette for this meteor 
        this.palette = cosmicEmissionPalettesRgba[Math.floor(Math.random() * cosmicEmissionPalettesRgba.length)];
        this.x = this.x0;
        this.y = this.y0;
      }
      update(dt) {
        this.life += dt;
        this.x += this.vx * dt * 60;
        this.y += this.vy * dt * 60;
        this.alpha = 1 - (this.life / this.maxLife);
      }
      draw(ctx) {
        if (this.alpha <= 0.01) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;

        // Meteor head glow (use first palette stop)
        const headColor = this.palette.stops[0].color;
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 14);
        glow.addColorStop(0, headColor);
        glow.addColorStop(0.5, headColor);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 9, 0, 2 * Math.PI);
        ctx.fill();

        // Meteor head core
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.8, 0, 2 * Math.PI);
        ctx.fillStyle = headColor;
        ctx.shadowColor = headColor;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Meteor tail with palette gradient
        const norm = Math.hypot(this.vx, this.vy);
        const tx = this.x - this.vx / norm * this.length;
        const ty = this.y - this.vy / norm * this.length;
        const grad = ctx.createLinearGradient(this.x, this.y, tx, ty);
        this.palette.stops.forEach((stop => {
          grad.addColorStop(stop.at, stop.color);
        }));
        ctx.globalAlpha *= 0.85;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.restore();
      }
      isAlive(w, h) {
        return this.alpha > 0.01 && this.life < this.maxLife && this.x > -200 && this.x < w + 200 && this.y > -200 && this.y < h + 200;
      }
    }

    function resizeCanvas() {
      let w = hero.clientWidth;
      let h = hero.clientHeight;
      if (!w || !h) {
        let rect = hero.getBoundingClientRect();
        w = Math.round(rect.width) || window.innerWidth;
        h = Math.round(rect.height) || window.innerHeight;
      }
      width = Math.max(1, w);
      height = Math.max(1, h);
      canvas.width = width;
      canvas.height = height;
      staticStarsLayer = renderStaticStarsLayer(width, height);
      meteors = [];
      spawnMeteor();
    }

    function spawnMeteor() {
      if (meteors.length < MAX_METEORS) {
        meteors.push(new Meteor(width, height));
      }
    }

    function drawFrame(now) {
      const dt = Math.min((now - lastFrameTime) / 1000, 0.07);
      lastFrameTime = now;

      // Draw static stars
      ctx.clearRect(0, 0, width, height);
      if (staticStarsLayer) ctx.drawImage(staticStarsLayer, 0, 0);

      // Update and draw meteors
      meteors.forEach(m => m.update(dt));
      meteors = meteors.filter(m => m.isAlive(width, height));
      meteors.forEach(m => m.draw(ctx));

      // Spawn new meteor if needed
      if (now - lastMeteorTime > METEOR_INTERVAL) {
        spawnMeteor();
        lastMeteorTime = now;
      }

      requestAnimationFrame(drawFrame);
    }

    function ensureCanvasReady() {
      resizeCanvas();
      lastFrameTime = performance.now();
      lastMeteorTime = performance.now();
      requestAnimationFrame(drawFrame);
    }

    ensureCanvasReady();
    window.addEventListener('resize', () => {
      MAX_METEORS = window.innerWidth < 600 ? 1 : 2;
      resizeCanvas();
    });
    window.addEventListener('load', ensureCanvasReady);
  }
  
  // =====================
  // 4. CTA SMOOTH SCROLL
  // =====================
   function setupCtaSmoothScroll() {
    const ctaBtn = document.querySelector('.cta[href^="#"]');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  // =====================
  // 5. THEME-BASED SHADOWS/ANIMATIONS UPDATE
  // =====================
  function setupThemeDynamicCss() {
    function updateThemedClasses() {
      // CSS variables update automatically with theme class
      // This is a no-op, but can be used to force repaint if needed
      document.querySelectorAll('.themed-shadow, .themed-border, .themed-btn, .themed-heading').forEach(el => {
        el.style.boxShadow = '';
        el.style.borderColor = '';
        el.style.color = '';
      });
    }
    document.documentElement.addEventListener('themechange', updateThemedClasses);
    document.addEventListener('DOMContentLoaded', updateThemedClasses);
  }
  
  // =====================
  // 6. INITIALIZATION
  // =====================
  function initializePortfolio() {
    setupThemeSwitcher();
    setupStarCanvas();
    setupCtaSmoothScroll();
    setupThemeDynamicCss();
    setupHamburger();

    // Initialize GSAP ScrollSmoother (only once, after DOM is ready)
    if (window.gsap && window.ScrollTrigger && window.ScrollSmoother) {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      ScrollSmoother.create({
        wrapper: "#main-wrapper",
        content: "#main-content",
        smooth: 1.5,
        effects: true,
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
  } else {
    initializePortfolio();
  }
});

// Helper to convert hex to rgba
function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}