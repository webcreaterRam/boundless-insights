
document.addEventListener('DOMContentLoaded', () => {    
          // Hamburger menu toggle
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
        // Optional: Hide menu when a link is clicked (for better UX)
        mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
          });
        });
      }
  const canvas = document.getElementById('star-canvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const STAR_COLORS = ['#fff8e7', '#ffe9c4', '#ffd1a9', '#cce0ff', '#aabfff', '#b5ffd9', '#f7baff', '#ffffff', '#ffd6a5', '#b5ffd9'];
  const METEOR_HEAD_COLORS = [
    '#ffecd2', '#fcb69f', '#ff9966', '#ff5e62', '#ff512f', '#dd2476', '#d53369', '#cb2d3e', '#ef473a', '#e94057'
  ];

  let meteors = [];
  let width = 0, height = 0;
  let staticStarsLayer = null;
  let lastFrameTime = performance.now();
  let lastMeteorTime = 0;
  const MAX_METEORS = window.innerWidth < 600 ? 1 : 2;
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
    const grad = offctx.createRadialGradient(w / 2, h / 2, h * 0.1, w / 2, h / 2, Math.max(w, h) * 0.9);
    offctx.fillStyle = grad;
    offctx.fillRect(0, 0, w, h);
    const count = getStarCount(w);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1 + 0.5;
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      offctx.beginPath();
      offctx.arc(x, y, r, 0, 2 * Math.PI);
      offctx.fillStyle = color;
      offctx.globalAlpha = 0.85 + Math.random() * 0.15;
      offctx.shadowColor = color;
      offctx.shadowBlur = 4;
      offctx.fill();
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
      this.headColor = METEOR_HEAD_COLORS[Math.floor(Math.random() * METEOR_HEAD_COLORS.length)];
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
      const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 14);
      glow.addColorStop(0, this.headColor);
      glow.addColorStop(0.5, this.headColor + 'cc');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 9, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.8, 0, 2 * Math.PI);
      ctx.fillStyle = this.headColor;
      ctx.shadowColor = this.headColor;
      ctx.shadowBlur = 8;
      ctx.fill();

      const norm = Math.hypot(this.vx, this.vy);
      const tx = this.x - this.vx / norm * this.length;
      const ty = this.y - this.vy / norm * this.length;
      const grad = ctx.createLinearGradient(this.x, this.y, tx, ty);
      grad.addColorStop(0, this.headColor + 'cc');
      grad.addColorStop(1, this.headColor + '00');

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

  function spawnMeteor() {
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom <= 0 || heroRect.top >= window.innerHeight) return;
    if (meteors.length >= MAX_METEORS) return;
    meteors.push(new Meteor(width, height));
    lastMeteorTime = performance.now();
  }

  function drawFrame(now) {
    const dt = Math.min((now - lastFrameTime) / 1000, 0.033);
    lastFrameTime = now;
    const heroVisible = hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;

    if (!heroVisible) {
      requestAnimationFrame(drawFrame);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    if (staticStarsLayer) ctx.drawImage(staticStarsLayer, 0, 0);

    meteors = meteors.filter(m => m.isAlive(width, height));
    meteors.forEach(m => { m.update(dt); m.draw(ctx); });

    if (now - lastMeteorTime > METEOR_INTERVAL && meteors.length < MAX_METEORS) {
      spawnMeteor();
    }

    requestAnimationFrame(drawFrame);
  }

  function resizeCanvas() {
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    staticStarsLayer = renderStaticStarsLayer(width, height);
    meteors = [];
    spawnMeteor();
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(drawFrame);
});

