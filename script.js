// Smooth scrolling to hash sections
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    const element = document.querySelector(hash);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
});
