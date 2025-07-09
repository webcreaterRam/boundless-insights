document.addEventListener('DOMContentLoaded', () => {
  // Boundless Insights Portfolio JavaScript

  // 1. MOBILE MENU MODULE
  const setupHamburger = () => {
    const menuBtn = document.getElementById('menu-btn');
    const menuBtnMobile = document.getElementById('menu-btn-mobile');
    let menu = document.getElementById('hamburger-nav-menu');
    if (menu) menu.remove();
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
      let btn = e.currentTarget;
      let rect = btn.getBoundingClientRect();
      menu.style.top = rect.bottom + 8 + 'px';
      menu.style.right = '0';
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
    function hideMenu() {
      menu.style.display = 'none';
    }

    if (menuBtn) menuBtn.onclick = toggleMenu;
    if (menuBtnMobile) menuBtnMobile.onclick = toggleMenu;
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== menuBtn && e.target !== menuBtnMobile) {
        hideMenu();
      }
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', hideMenu);
    });
  };

  // 2. THEME SWITCHER MODULE
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

    if (window.localStorage) {
      const saved = localStorage.getItem('theme');
      if (saved && themes.includes(saved)) {
        current = themes.indexOf(saved);
      }
    }
    setTheme(current);
  }

  // 3. STAR CANVAS MODULE
  function setupStarCanvas() {
    const canvas = document.getElementById('star-canvas');
    const hero = document.getElementById('hero');
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // =====================
    // Config
    // =====================

    const STAR_COLORS = [
      '#fff8e7', '#ffe9c4', '#ffd1a9', '#cce0ff', '#aabfff',
      '#b5ffd9', '#f7baff', '#ffffff', '#ffd6a5', '#b5ffd9'
    ];

    // Meteor palettes with distinct 3-stop radial head + 5-stop linear tail
    const cosmicPalettes = [
      // 1. MERCURY SHINE (silvery‐blue flash)
      {
        id: 'mercury_shine',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(255,255,255,1)' }, // bright white core
            { at: 0.30, color: 'rgba(100,200,255,1.00)' }, // vivid sky-blue
            { at: 1.00, color: 'rgba(100,200,255,0.00)' }  // fade out
          ],
          // Add these for backward compatibility:
          inner: 'rgba(255,255,255,1)',
          outer: 'rgba(100,200,255,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(255,255,255,1)' },
          { at: 0.20, color: 'rgba(224,241,255,0.80)' },
          { at: 0.40, color: 'rgba(160,200,255,0.60)' },
          { at: 0.70, color: 'rgba(100,150,220,0.40)' },
          { at: 1.00, color: 'rgba(100,150,220,0.00)' }
        ]
      },

      // 2. CARBON FLARE (ember red → charcoal)
      {
        id: 'carbon_flare',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(255,240,235,1)' },
            { at: 0.30, color: 'rgba(200,60,40,1.00)' },
            { at: 1.00, color: 'rgba(200,60,40,0.00)' }
          ],
          inner: 'rgba(255,240,235,1)',
          outer: 'rgba(200,60,40,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(255,240,235,1)' },
          { at: 0.20, color: 'rgba(255,120,90,0.80)' },
          { at: 0.40, color: 'rgba(200,60,40,0.60)' },
          { at: 0.70, color: 'rgba(60,20,20,0.40)' },
          { at: 1.00, color: 'rgba(60,20,20,0.00)' }
        ]
      },

      // 3. NEON BLAST (hot pink → magenta)
      {
        id: 'neon_blast',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(255,245,255,1)' },
            { at: 0.30, color: 'rgba(220,0,180,1.00)' },
            { at: 1.00, color: 'rgba(220,0,180,0.00)' }
          ],
          inner: 'rgba(255,245,255,1)',
          outer: 'rgba(220,0,180,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(255,245,255,1)' },
          { at: 0.20, color: 'rgba(255,80,200,0.80)' },
          { at: 0.40, color: 'rgba(220,0,180,0.60)' },
          { at: 0.70, color: 'rgba(150,0,120,0.40)' },
          { at: 1.00, color: 'rgba(150,0,120,0.00)' }
        ]
      },

      // 4. KRYPTON GLOW (ruby red → rose)
      {
        id: 'krypton_glow',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(255,240,250,1.00)' },
            { at: 0.30, color: 'rgba(220,0,60,1)' },
            { at: 1.00, color: 'rgba(220,0,60,0.00)' }
          ],
          inner: 'rgba(255,240,250,1)',
          outer: 'rgba(220,0,60,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(255,240,250,1)' },
          { at: 0.20, color: 'rgba(255,90,120,0.80)' },
          { at: 0.40, color: 'rgba(220,0,60,0.60)' },
          { at: 0.70, color: 'rgba(180,0,80,0.40)' },
          { at: 1.00, color: 'rgba(180,0,80,0.00)' }
        ]
      },

      // 5. ARGON DREAM (cosmic purple → indigo)
      {
        id: 'argon_dream',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(250,240,255,1)' },
            { at: 0.30, color: 'rgba(140,80,255,1.00)' },
            { at: 1.00, color: 'rgba(140,80,255,0.00)' }
          ],
          inner: 'rgba(250,240,255,1)',
          outer: 'rgba(140,80,255,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(250,240,255,1)' },
          { at: 0.20, color: 'rgba(200,140,255,0.80)' },
          { at: 0.40, color: 'rgba(140,80,255,0.60)' },
          { at: 0.70, color: 'rgba(80,20,180,0.40)' },
          { at: 1.00, color: 'rgba(80,20,180,0.00)' }
        ]
      },

      // 6. XENON RIPPLES (cerulean → navy)
      {
        id: 'xenon_ripples',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(240,255,255,1)' },
            { at: 0.30, color: 'rgba(0,100,200,1.00)' },
            { at: 1.00, color: 'rgba(0,100,200,0.00)' }
          ],
          inner: 'rgba(240,255,255,1)',
          outer: 'rgba(0,100,200,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(240,255,255,1)' },
          { at: 0.20, color: 'rgba(120,230,255,0.80)' },
          { at: 0.40, color: 'rgba(60,180,255,0.60)' },
          { at: 0.70, color: 'rgba(0,100,200,0.40)' },
          { at: 1.00, color: 'rgba(0,100,200,0.00)' }
        ]
      },

      // 7. URANIUM GREEN (neon chartreuse → olive)
      {
        id: 'uranium_green',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(245,255,230,1)' },
            { at: 0.30, color: 'rgba(140,220,0,1.00)' },
            { at: 1.00, color: 'rgba(140,220,0,0.00)' }
          ],
          inner: 'rgba(245,255,230,1)',
          outer: 'rgba(140,220,0,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(245,255,230,1)' },
          { at: 0.20, color: 'rgba(180,255,0,0.80)' },
          { at: 0.40, color: 'rgba(140,220,0,0.60)' },
          { at: 0.70, color: 'rgba(100,160,0,0.40)' },
          { at: 1.00, color: 'rgba(100,160,0,0.00)' }
        ]
      },

      // 8. THORIUM TIDE (neon cyan → electric blue)
      {
        id: 'thorium_tide',
        head: {
          stops: [
            { at: 0.00, color: 'rgba(230,255,255,1)' },
            { at: 0.30, color: 'rgba(0,200,220,1.00)' },
            { at: 1.00, color: 'rgba(0,200,220,0.00)' }
          ],
          inner: 'rgba(230,255,255,1)',
          outer: 'rgba(0,200,220,0.00)'
        },
        stops: [
          { at: 0.00, color: 'rgba(230,255,255,1)' },
          { at: 0.20, color: 'rgba(80,255,240,0.80)' },
          { at: 0.40, color: 'rgba(0,200,220,0.60)' },
          { at: 0.70, color: 'rgba(0,120,200,0.40)' },
          { at: 1.00, color: 'rgba(0,120,200,0.00)' }
        ]
      }
    ];

    // =====================
    // State
    // =====================

    let meteors = [], width = 0, height = 0, staticStarsLayer = null;
    let lastFrameTime = performance.now();
    let lastMeteorTime = 0;
    let MAX_METEORS = window.innerWidth < 600 ? 1 : 2;
    const METEOR_INTERVAL = 3200;

    // =====================
    // Helper functions
    // =====================

    function getStarCount(w) {
      if (w < 600) return 40;
      if (w < 900) return 80;
      return 120;
    }

    function renderStaticStarsLayer(w, h) {
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const offctx = off.getContext('2d');

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
      return off;
    }

    // =====================
    // Meteor class
    // =====================

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
        this.maxLife = Math.random() * 1.2 + 2.5;
        this.life = 0;
        this.alpha = 1;
        this.palette = cosmicPalettes[Math.floor(Math.random() * cosmicPalettes.length)];
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

        // Draw glow (outer head)
        ctx.globalAlpha = this.alpha * 0.6;
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 18);
        // Use head.stops if available, else fallback to inner/outer
        if (this.palette.head && Array.isArray(this.palette.head.stops)) {
          this.palette.head.stops.forEach(stop => {
            glow.addColorStop(stop.at, stop.color);
          });
        } else {
          glow.addColorStop(0, this.palette.head.inner || '#fff');
          glow.addColorStop(1, this.palette.head.outer || '#fff0');
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, 12, 0, 2 * Math.PI);
        ctx.fillStyle = glow;
        ctx.fill();

        // Draw core (inner head)
        ctx.globalAlpha = Math.min(1, this.alpha * 1.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.8, 0, 2 * Math.PI);
        ctx.fillStyle = this.palette.head.inner || '#fff';
        ctx.shadowColor = this.palette.head.inner || '#fff';
        ctx.shadowBlur = 6;
        ctx.fill();

        // Draw trail
        ctx.globalAlpha = this.alpha * 0.85;
        const norm = Math.hypot(this.vx, this.vy);
        const tx = this.x - this.vx / norm * this.length;
        const ty = this.y - this.vy / norm * this.length;
        const grad = ctx.createLinearGradient(this.x, this.y, tx, ty);
        this.palette.stops.forEach(stop => grad.addColorStop(stop.at, stop.color));
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

    // =====================
    // Canvas functions
    // =====================

    function resizeCanvas() {
      width = hero.clientWidth || window.innerWidth;
      height = hero.clientHeight || window.innerHeight;
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
      if (window.__shouldAnimate === false) {
        requestAnimationFrame(drawFrame);
        return;
      }
      const dt = Math.min((now - lastFrameTime) / 1000, 0.07);
      lastFrameTime = now;

      ctx.clearRect(0, 0, width, height);
      if (staticStarsLayer) ctx.drawImage(staticStarsLayer, 0, 0);
      meteors.forEach(m => m.update(dt));
      meteors = meteors.filter(m => m.isAlive(width, height));
      meteors.forEach(m => m.draw(ctx));

      if (now - lastMeteorTime > METEOR_INTERVAL) {
        spawnMeteor();
        lastMeteorTime = now;
      }
      requestAnimationFrame(drawFrame);
    }

    // =====================
    // Init
    // =====================

    function ensureCanvasReady() {
      resizeCanvas();
      lastFrameTime = performance.now();
      lastMeteorTime = performance.now();
      requestAnimationFrame(drawFrame);
    }

    hero.style.position = 'relative';
    Object.assign(canvas.style, {
      position: 'absolute', left: '0', top: '0', right: '0', bottom: '0',
      width: '100%', height: '100%', display: 'block', pointerEvents: 'none', zIndex: '0'
    });

    ensureCanvasReady();
    window.addEventListener('resize', () => {
      MAX_METEORS = window.innerWidth < 600 ? 1 : 2;
      resizeCanvas();
    });
    window.addEventListener('load', ensureCanvasReady);
  }

  // 4. CTA SMOOTH SCROLL
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

  // 5. THEME-BASED SHADOWS/ANIMATIONS UPDATE
  function setupThemeDynamicCss() {
    function updateThemedClasses() {
      document.querySelectorAll('.themed-shadow, .themed-border, .themed-btn, .themed-heading').forEach(el => {
        el.style.boxShadow = '';
        el.style.borderColor = '';
        el.style.color = '';
      });
    }
    document.documentElement.addEventListener('themechange', updateThemedClasses);
    document.addEventListener('DOMContentLoaded', updateThemedClasses);
  }

  // 6. INITIALIZATION
  function initializePortfolio() {
    setupThemeSwitcher();
    setupStarCanvas();
    setupCtaSmoothScroll();
    setupThemeDynamicCss();
    setupHamburger();
    // GSAP ScrollSmoother is only initialized if loaded (no-op if not present)
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
  initializePortfolio();

  //   // Initialize GSAP ScrollSmoother (only once, after DOM is ready)
  //   if (window.gsap && window.ScrollTrigger && window.ScrollSmoother) {
  //     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  //     ScrollSmoother.create({
  //       wrapper: "#main-wrapper",
  //       content: "#main-content",
  //       smooth: 1.5,
  //       effects: true,
  //     });
  //   }
  // }

});
