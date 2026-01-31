// Terminal Typing Effect
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  element.classList.add('typing');

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove typing cursor after completion
      setTimeout(() => {
        element.classList.remove('typing');
      }, 500);
    }
  }

  type();
}

// Apply typing effect to status lines
document.addEventListener('DOMContentLoaded', () => {
  const statusElements = document.querySelectorAll('.status');
  const texts = [];

  // Store original text and filter out empty lines
  const elementsToType = [];
  statusElements.forEach((el) => {
    const text = el.textContent.trim();
    if (text.length > 0) {
      elementsToType.push({ element: el, text: text });
    }
  });

  // Apply typing effect with delays
  elementsToType.forEach((item, index) => {
    setTimeout(() => {
      typeWriter(item.element, item.text, 60);
    }, index * 800); // Stagger the typing effect
  });
});

// Custom Cursor with Trailing Dots
const cursor = {
  dot: null,
  trails: [],
  maxTrails: 8,

  init() {
    // Create main cursor dot
    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';
    document.body.appendChild(this.dot);

    // Create trail dots
    for (let i = 0; i < this.maxTrails; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      this.trails.push({
        element: trail,
        x: 0,
        y: 0
      });
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.moveCursor(e.clientX, e.clientY);
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      this.dot.style.opacity = '0';
      this.trails.forEach(trail => trail.element.style.opacity = '0');
    });

    document.addEventListener('mouseenter', () => {
      this.dot.style.opacity = '1';
      this.trails.forEach(trail => trail.element.style.opacity = '0.5');
    });
  },

  moveCursor(x, y) {
    // Move main cursor
    this.dot.style.left = x + 'px';
    this.dot.style.top = y + 'px';

    // Update trails with delay effect
    this.trails.forEach((trail, index) => {
      setTimeout(() => {
        trail.x = x;
        trail.y = y;
        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
      }, (index + 1) * 20); // Delay increases for each trail
    });
  }
};

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
  cursor.init();
});

// Disable custom cursor on mobile/touch devices
if ('ontouchstart' in window) {
  document.body.style.cursor = 'auto';
  const style = document.createElement('style');
  style.textContent = `
    .cursor-dot, .cursor-trail {
      display: none !important;
    }
    body, a, button {
      cursor: auto !important;
    }
  `;
  document.head.appendChild(style);
}

// Theme Toggle
const themeToggle = {
  button: null,

  init() {
    this.button = document.getElementById('theme-toggle');
    if (!this.button) return;

    this.loadTheme();
    this.button.addEventListener('click', () => this.toggle());
  },

  loadTheme() {
    const saved = localStorage.getItem('theme');
    const theme = saved || 'dark'; // Default to dark mode
    this.setTheme(theme, false);
  },

  setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      localStorage.setItem('theme', theme);
    }
    this.updateButton(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  },

  updateButton(theme) {
    // Show sun emoji in dark mode (click to go light)
    // Show moon emoji in light mode (click to go dark)
    this.button.textContent = theme === 'dark' ? '☀️' : '🌙';
    this.button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
};

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', () => {
  themeToggle.init();
});
