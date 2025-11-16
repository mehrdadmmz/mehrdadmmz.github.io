/* ═════════════════════  PARTICLE CURSOR TRAIL  ═════════════════════ */

/**
 * Initialize particle cursor trail effect
 */
function initParticles() {
  // Skip on mobile devices for performance
  if (window.innerWidth <= 768) return;

  let lastTime = 0;
  const throttleDelay = 30; // ms between particle creation

  document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();

    // Throttle particle creation
    if (currentTime - lastTime < throttleDelay) return;
    lastTime = currentTime;

    createParticle(e.clientX, e.clientY);
  });
}

/**
 * Create a particle at the given position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random size between 4-10px
  const size = Math.random() * 6 + 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Position at cursor
  particle.style.left = `${x - size / 2}px`;
  particle.style.top = `${y - size / 2}px`;

  // Random direction for movement
  const tx = (Math.random() - 0.5) * 100;
  const ty = (Math.random() - 0.5) * 100;
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--ty', `${ty}px`);

  document.body.appendChild(particle);

  // Remove particle after animation completes
  setTimeout(() => {
    particle.remove();
  }, 800);
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initParticles };
}
