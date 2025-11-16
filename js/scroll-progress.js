/* ═════════════════════  SCROLL PROGRESS INDICATOR  ═════════════════════ */

/**
 * Initialize scroll progress indicator
 */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  // Update progress on scroll
  window.addEventListener('scroll', updateScrollProgress);

  // Initial update
  updateScrollProgress();
}

/**
 * Update the scroll progress bar width
 */
function updateScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Calculate scroll percentage
  const scrollableDistance = documentHeight - windowHeight;
  const scrollPercentage = (scrollTop / scrollableDistance) * 100;

  progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initScrollProgress };
}
