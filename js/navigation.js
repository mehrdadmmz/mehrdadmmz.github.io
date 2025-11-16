/* ═════════════════════  NAVIGATION MODULE  ═════════════════════ */

/**
 * Toggle mobile hamburger menu
 */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const SCROLL_DURATION = 1200;
  const EASE = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const start = window.pageYOffset;
      const end = target.getBoundingClientRect().top + start;
      const dist = end - start;
      const t0 = performance.now();

      (function scroll(now) {
        const elapsed = now - t0;
        const progress = Math.min(1, elapsed / SCROLL_DURATION);
        window.scrollTo(0, start + dist * EASE(progress));
        if (progress < 1) requestAnimationFrame(scroll);
      })(t0);
    });
  });
}

// Export functions for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleMenu, initSmoothScroll };
}
