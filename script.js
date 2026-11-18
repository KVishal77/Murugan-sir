// Smooth scrolling and Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for hash links
  const hash = window.location.hash;
  if (hash) {
    const element = document.querySelector(hash);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Mobile Hamburger Menu Toggle Logic
  const navContainer = document.querySelector('.nav-container');
  if (navContainer) {
    const navUl = navContainer.querySelector('ul');
    if (navUl && !document.querySelector('.mobile-toggle')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-toggle';
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
      
      // Insert toggle button before nav element
      navContainer.insertBefore(toggleBtn, navContainer.querySelector('nav'));

      toggleBtn.addEventListener('click', () => {
        navUl.classList.toggle('active');
        toggleBtn.innerHTML = navUl.classList.contains('active') ? '✕' : '☰';
      });

      // Close menu on link click in mobile view
      navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navUl.classList.remove('active');
          toggleBtn.innerHTML = '☰';
        });
      });
    }
  }
});
