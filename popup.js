/**
 * LinkedIn Queens Solver - Popup Script
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Queens Solver popup loaded');

  // Add smooth entrance animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.3s ease-in';
    document.body.style.opacity = '1';
  }, 10);
});
