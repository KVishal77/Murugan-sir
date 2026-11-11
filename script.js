// Floating Chemistry Molecule Animation Canvas
const canvas = document.getElementById('molecule-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 45;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 2;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
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

      if (distance < 110) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${1 - distance / 110})`;
        ctx.lineWidth = 0.6;
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

// Publications Search & Filter
document.addEventListener('DOMContentLoaded', () => {
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
