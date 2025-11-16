/* ═════════════════════  MAIN APPLICATION ENTRY POINT  ═════════════════════ */

/**
 * Initialize the application
 * This is the main entry point that coordinates all modules
 */
window.addEventListener("load", () => {
  // Clean up URL hash
  history.replaceState({}, "", window.location.pathname);

  // Run preloader animation
  runPreloader();

  // Initialize smooth scrolling for anchor links
  initSmoothScroll();

  // Initialize button handlers (open in new tabs)
  initButtonHandlers();

  // Initialize particle cursor trail
  initParticles();

  // Initialize scroll progress indicator
  initScrollProgress();
});
