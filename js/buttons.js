/* ═════════════════════  BUTTON HANDLERS MODULE  ═════════════════════ */

/**
 * Force all buttons with navigation to open in new tabs
 */
function initButtonHandlers() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((btn) => {
    const inline = btn.getAttribute("onclick");
    if (!inline) return;

    // Try to extract a URL from common inline patterns
    // Pattern 1: location.href='URL'
    let m = inline.match(/location\.href=['"]([^'"]+)['"]/);
    // Pattern 2: window.open('URL' ...)
    if (!m) m = inline.match(/window\.open\(['"]([^'"]+)['"]/);
    if (!m) return;

    const url = m[1];
    // Remove original inline handler to avoid same-tab nav
    btn.removeAttribute("onclick");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initButtonHandlers };
}
