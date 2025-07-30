/* ─────────────────────────  GLOBAL SETUP  ───────────────────────── */
window.addEventListener("load", () => {
  // tidy up any stray #hash on refresh
  history.replaceState({}, "", window.location.pathname);

  runPreloader();
});

/* ─────────────────────────  BURGER MENU  ───────────────────────── */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* ────────────────────────  INTRO SEQUENCE  ─────────────────────── */
function runPreloader() {
  /* DOM refs */
  const preloader = document.getElementById("preloader");
  const steps = Array.from(document.querySelectorAll("#load-steps li"));
  const percentEl = document.getElementById("load-percent");
  const captionEl = document.querySelector(".load-caption");

  if (!preloader || !percentEl || !captionEl) return; // markup missing

  /* freeze scrolling while overlay is up */
  document.documentElement.style.overflow = "hidden";

  /* STEP 1 ▸ fake progress 0 → 100 % */
  let pct = 0;
  const timer = setInterval(() => {
    pct += 1;
    percentEl.textContent = `${pct} %`;

    /* highlight the relevant status line (5 steps → 20 % each) */
    const idx = Math.min(
      steps.length - 1,
      Math.floor(pct / (100 / steps.length))
    );
    steps.forEach((li, i) => li.classList.toggle("active", i === idx));

    if (pct >= 100) {
      clearInterval(timer);
      finishPreloader();
    }
  }, 55); // 55 ms × 100 ≈ 5.5 s

  /* STEP 2 ▸ show welcome text, then fade overlay */
  function finishPreloader() {
    captionEl.innerHTML =
      "WELCOME TO MY WEBSITE 🚀 <br><br>HOPE YOU ENJOY IT AS MUCH AS I ENJOYED CREATING IT 💙";
    captionEl.style.opacity = "1";
    captionEl.style.fontWeight = "500";

    /* keep overlay visible for 2 s, then fade */
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
        document.documentElement.style.overflow = ""; // re-enable scroll
      }, 450);
    }, 2000);
  }
}

/* ───── Gentle anchor scrolling ───── */
(function () {
  const SCROLL_DURATION = 1200; // ← milliseconds
  const EASE = (t) =>
    t < 0.5 // ease-in-out quad
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return; // no match → bail

      e.preventDefault(); // kill instant jump

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
})();
