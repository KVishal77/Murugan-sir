// Advanced Chemistry Research Canvas Animation (Periodic Elements & Molecular Nodes)
const canvas = document.getElementById('molecule-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 35;
const chemSymbols = ['Fe', 'Cu', 'Ni', 'Mn', 'C', 'H', 'O', 'N', 'Zn', 'P'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class ChemicalParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 3;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.speedY = Math.random() * 0.8 - 0.4;
    this.symbol = chemSymbols[Math.floor(Math.random() * chemSymbols.length)];
    this.isElement = Math.random() > 0.6;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.fill();

    if (this.isElement) {
      ctx.font = '12px Poppins, sans-serif';
      ctx.fillStyle = 'rgba(192, 132, 252, 0.75)';
      ctx.fillText(this.symbol, this.x + 8, this.y - 8);
    }
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new ChemicalParticle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 * (1 - distance / 130)})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Project Tab Switching
function switchTab(tabName) {
  document.querySelectorAll('.project-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(`${tabName}-projects`).classList.add('active');
  event.target.classList.add('active');
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(9, 13, 22, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }

  // Publications Search & Filter
  const searchInput = document.getElementById('pub-search');
  const yearBtns = document.querySelectorAll('.year-btn');
  const pubItems = document.querySelectorAll('.pub-item');

  if (searchInput) {
    searchInput.addEventListener('input', filterPubs);
  }

  yearBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      yearBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterPubs();
    });
  });

  function filterPubs() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const activeYear = document.querySelector('.year-btn.active')?.dataset.year || 'all';

    pubItems.forEach(item => {
      const yearMatches = activeYear === 'all' || item.dataset.year === activeYear;
      const textMatches = item.innerText.toLowerCase().includes(query);

      if (yearMatches && textMatches) {
        item.style.display = 'grid';
      } else {
        item.style.display = 'none';
      }
    });
  }
});
