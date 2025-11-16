/* ═════════════════════  UTILITY FUNCTIONS  ═════════════════════ */

/**
 * Clean up URL hash on page load
 */
function cleanUrlHash() {
  history.replaceState({}, "", window.location.pathname);
}

/**
 * Initialize all utilities
 */
function initUtils() {
  cleanUrlHash();
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { cleanUrlHash, initUtils };
}
