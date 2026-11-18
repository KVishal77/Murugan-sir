// Smooth scrolling & Robust Mobile Menu Toggle
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

  // Universal Mobile Toggle Injector for all pages (About, Contact, Home, etc.)
  const navContainers = document.querySelectorAll('.nav-container');
  navContainers.forEach(navContainer => {
    const navUl = navContainer.querySelector('ul') || navContainer.querySelector('.nav-links');
    if (navUl && !navContainer.querySelector('.mobile-toggle')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-toggle';
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
      
      const navElement = navContainer.querySelector('nav') || navUl.parentElement;
      navContainer.insertBefore(toggleBtn, navElement);

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navUl.classList.toggle('active');
        toggleBtn.innerHTML = navUl.classList.contains('active') ? '✕' : '☰';
      });

      // Close menu when clicking outside or on a link
      document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target)) {
          navUl.classList.remove('active');
          toggleBtn.innerHTML = '☰';
        }
      });

      navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navUl.classList.remove('active');
          toggleBtn.innerHTML = '☰';
        });
      });
    }
  });
});
