/* ═════════════════════  PRELOADER MODULE  ═════════════════════ */

/**
 * Run the preloader animation sequence
 */
function runPreloader() {
  const preloader = document.getElementById("preloader");
  const steps = Array.from(document.querySelectorAll("#load-steps li"));
  const percentEl = document.getElementById("load-percent");
  const captionEl = document.querySelector(".load-caption");

  if (!preloader || !percentEl) return;

  // Freeze scrolling while overlay is up
  document.documentElement.style.overflow = "hidden";

  // STEP 1: Fake progress 0 → 100%
  let pct = 0;
  const timer = setInterval(() => {
    pct += 1;
    percentEl.textContent = `${pct} %`;

    // Highlight the relevant status line
    const idx = Math.min(
      steps.length - 1,
      Math.floor(pct / (100 / steps.length))
    );
    steps.forEach((li, i) => li.classList.toggle("active", i === idx));

    if (pct >= 100) {
      clearInterval(timer);
      finishPreloader();
    }
  }, 35); // 35ms × 100 ≈ 3.5s

  // STEP 2: Fade out overlay
  function finishPreloader() {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
        document.documentElement.style.overflow = "";
      }, 450);
    }, 2000);
  }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runPreloader };
}
