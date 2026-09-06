import {
  computerDrawing,
  smallDrawings,
  cityDrawings,
  projectDrawings,
} from "./drawings.js";
import { initDesk } from "./desk.js";
import robotPoints from "./robot-points.json";

const root = document.documentElement;
root.classList.remove("no-js");
const intro = document.querySelector(".intro");
const introScene = document.querySelector(".intro-sticky");
const computerSection = document.querySelector(".computer-section");
const computerScene = document.querySelector(".computer-sticky");
const explore = document.querySelector("#explore-computer");
const motionButton = document.querySelector(".motion-toggle");
const mediaMotion = matchMedia("(prefers-reduced-motion: reduce)");
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (v) => v * v * (3 - 2 * v);
let savedMotion = null;
try {
  savedMotion = localStorage.getItem("mehrdad-motion");
} catch {
  /* Storage is optional. */
}
let reduceMotion =
  savedMotion === "reduced" || (savedMotion !== "full" && mediaMotion.matches);
let manualOpen = null;
let manualScrollY = 0;
let frame = null;
let currentStep = -1;
const particleData = robotPoints.map(([x, y, z, warm]) => ({ x, y, z, warm }));
let lastParticleKey = "";

// All artwork markup is authored locally, with no remote or user-supplied HTML.
document.querySelector("#computer-drawing").innerHTML = computerDrawing;
document.querySelectorAll("[data-drawing]").forEach((el) => {
  el.innerHTML = smallDrawings[el.dataset.drawing];
});
document.querySelectorAll("[data-city]").forEach((el) => {
  el.innerHTML = cityDrawings[el.dataset.city];
});

document.querySelectorAll("[data-project-drawing]").forEach((el) => {
  el.innerHTML = projectDrawings[el.dataset.projectDrawing];
});
initDesk();

const fringe = document.querySelector(".code-fringe");
const phrases = [
  "01001",
  "OBSERVE",
  "11010",
  "LEARN",
  "BUILD",
  "00101",
  "REPEAT",
  "MMZ",
  "10110",
  "CREATE",
];
// Decorative code fringe is drawn as artwork, not presented as low-contrast body text.
const fringeCanvas = document.createElement("canvas");
fringeCanvas.setAttribute("aria-hidden", "true");
fringe.append(fringeCanvas);
function drawFringe() {
  const width = fringe.clientWidth;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  fringeCanvas.width = width * ratio;
  fringeCanvas.height = 100 * ratio;
  const ctx = fringeCanvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(ratio, ratio);
  ctx.font = "10px NBMono, monospace";
  const count = Math.ceil(width / 24);
  for (let col = 0; col < count; col++) {
    const text =
      phrases[col % phrases.length] + phrases[(col * 3 + 1) % phrases.length];
    const offset = -((col * 17) % 50);
    ctx.fillStyle = `rgba(70,85,57,${0.25 + ((col * 7) % 10) / 15})`;
    for (let row = 0; row < text.length; row++)
      ctx.fillText(text[row], 12 + col * 24, offset + row * 12);
  }
}
drawFringe();
window.addEventListener("resize", drawFringe, { passive: true });
document.fonts.ready.then(drawFringe);

// A small, illustrative field study; not a plot of research results.
const waveGroup = document.querySelector(".wave-study g");
for (let row = 0; row < 16; row++) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const pts = [];
  for (let x = 0; x <= 220; x += 3) {
    const height =
      27 * Math.sin(x / 31 + row / 5) * Math.exp(-Math.pow((x - 115) / 105, 2));
    pts.push(`${x + 20},${27 + row * 6 + height}`);
  }
  path.setAttribute("d", "M" + pts.join("L"));
  path.setAttribute("opacity", String(0.3 + row / 25));
  waveGroup.append(path);
}

// Sample the source illustration at authoring time. Some WebKit versions
// return empty pixels when sampling a loaded image during page initialization.
const particleCanvas = document.querySelector(".robot-points");
const particleCtx = particleCanvas.getContext("2d");
if (!particleCtx) root.classList.add("no-particles");
let canvasSize = 0;
let canvasRatio = 1;

function drawParticles(progress) {
  if (!particleCtx || !particleData.length || reduceMotion || progress < 0.01)
    return;
  const width = particleCanvas.getBoundingClientRect().width;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  if (Math.abs(width - canvasSize) > 1 || ratio !== canvasRatio) {
    canvasSize = width;
    canvasRatio = ratio;
    particleCanvas.width = Math.round(width * ratio);
    particleCanvas.height = Math.round(width * ratio);
    particleCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
    lastParticleKey = "";
  }
  const key = `${Math.round(progress * 400)}:${Math.round(width)}`;
  if (key === lastParticleKey) return;
  lastParticleKey = key;
  particleCtx.clearRect(0, 0, width, width);
  const angle = progress * 0.25;
  for (const point of particleData) {
    const x =
      (point.x - 0.52) * Math.cos(angle) +
      point.z * Math.sin(angle) * 0.07 +
      0.52;
    const y = point.y - point.z * progress * 0.012;
    particleCtx.fillStyle = point.warm
      ? "#b54e32"
      : `rgba(57,77,51,${0.35 + point.z * 0.65})`;
    const size = width < 400 ? 0.85 : 1.1 + point.z * 0.5;
    particleCtx.fillRect(x * width, y * width, size, size);
  }
}

const computerSteps = [
  {
    label: "01 / THE OUTSIDE",
    title: "A familiar kind of hello.",
    description:
      "A little beige box. A blinking cursor. A whole world waiting on the other side.",
    mode: "EXTERIOR / 01",
  },
  {
    label: "02 / UNDER THE HOOD",
    title: "The interesting part is inside.",
    description:
      "The enclosure moves aside. A display, a logic board, and the connections between them.",
    mode: "EXPLORING / 02",
  },
  {
    label: "03 / THE CONNECTIONS",
    title: "A collection of possibilities.",
    description:
      "Simple parts, working together. That same curiosity carries into the machines I’m learning to build.",
    mode: "INTERNALS / 03",
  },
];
function setComputer(amount) {
  const open = clamp(amount);
  computerSection.style.setProperty("--open", open.toFixed(4));
  const step = open < 0.26 ? 0 : open < 0.73 ? 1 : 2;
  if (step !== currentStep) {
    currentStep = step;
    const info = computerSteps[step];
    document.querySelector(".step-number").textContent = info.label;
    document.querySelector(".computer-step h3").textContent = info.title;
    document.querySelector(".step-description").textContent = info.description;
    document.querySelector(".computer-mode").textContent = info.mode;
  }
  if (document.activeElement !== explore)
    explore.value = String(Math.round(open * 100));
  explore.setAttribute(
    "aria-valuetext",
    `${Math.round(open * 100)} percent open, ${computerSteps[step].title}`,
  );
}
explore.addEventListener("input", () => {
  manualOpen = Number(explore.value) / 100;
  manualScrollY = scrollY;
  setComputer(manualOpen);
});
const blueprintButton = document.querySelector(".blueprint-toggle");
blueprintButton.addEventListener("click", () => {
  const active = computerSection.classList.toggle("blueprint");
  blueprintButton.setAttribute("aria-pressed", String(active));
  blueprintButton.querySelector(".toggle-square").textContent = active
    ? "−"
    : "+";
});

// A scene taller than the viewport scrolls up first, then pins at its bottom.
// Measure the content instead of disabling the sequence at a device breakpoint.
let computerTravel = 1;
let computerPinTop = 0;
function measureComputer() {
  const sceneHeight = computerScene.offsetHeight;
  computerPinTop = Math.min(0, innerHeight - sceneHeight);
  computerTravel = Math.max(600, innerHeight * 1.3);
  computerSection.style.setProperty(
    "--computer-scene-height",
    `${sceneHeight}px`,
  );
  computerSection.style.setProperty(
    "--computer-pin-top",
    `${computerPinTop}px`,
  );
  computerSection.style.setProperty("--computer-travel", `${computerTravel}px`);
  scheduleRender();
}
new ResizeObserver(measureComputer).observe(computerScene);
let introTravel = 1;
let introPinTop = 0;
function measureIntro() {
  const sceneHeight = introScene.offsetHeight;
  introPinTop = Math.min(0, innerHeight - sceneHeight);
  introTravel = Math.max(500, innerHeight * 0.8);
  intro.style.setProperty("--intro-scene-height", `${sceneHeight}px`);
  intro.style.setProperty("--intro-pin-top", `${introPinTop}px`);
  intro.style.setProperty("--intro-travel", `${introTravel}px`);
  scheduleRender();
}
new ResizeObserver(measureIntro).observe(introScene);

function render() {
  frame = null;
  const viewHeight = innerHeight;
  const introRect = intro.getBoundingClientRect();
  const introProgress =
    reduceMotion || getComputedStyle(introScene).position !== "sticky"
      ? 0
      : smoothstep(clamp((introPinTop - introRect.top) / introTravel));
  root.style.setProperty("--intro", introProgress.toFixed(4));
  const detailVisible = introProgress > 0.42;
  const heroCopy = document.querySelector(".hero-copy");
  const perceptionCopy = document.querySelector(".perception-copy");
  heroCopy.inert = detailVisible;
  heroCopy.setAttribute("aria-hidden", String(detailVisible));
  perceptionCopy.inert = !detailVisible;
  perceptionCopy.setAttribute("aria-hidden", String(!detailVisible));
  document.querySelector(".view-label").innerHTML = detailVisible
    ? 'MACHINE VIEW <span class="view-dots" aria-hidden="true">○ ● ●</span>'
    : 'HUMAN VIEW <span class="view-dots" aria-hidden="true">● ○ ○</span>';
  if (introRect.bottom > 0 && introRect.top < viewHeight)
    drawParticles(introProgress);
  const computerRect = computerSection.getBoundingClientRect();
  const computerPinned =
    getComputedStyle(document.querySelector(".computer-sticky")).position ===
    "sticky";
  if (
    manualOpen !== null &&
    Math.abs(scrollY - manualScrollY) > 70 &&
    !reduceMotion &&
    computerPinned
  )
    manualOpen = null;
  const open =
    manualOpen ??
    (reduceMotion || !computerPinned
      ? 0
      : smoothstep(
          clamp((computerPinTop - computerRect.top) / computerTravel),
        ));
  setComputer(open);
  const pageDistance = root.scrollHeight - viewHeight;
  root.style.setProperty(
    "--reading",
    pageDistance > 0 ? clamp(scrollY / pageDistance).toFixed(4) : "0",
  );
}
function scheduleRender() {
  if (frame === null) frame = requestAnimationFrame(render);
}
function applyMotion() {
  root.classList.toggle("motion-reduced", reduceMotion);
  root.classList.toggle("motion-enabled", !reduceMotion);
  measureComputer();
  measureIntro();
  motionButton.setAttribute("aria-pressed", String(reduceMotion));
  motionButton.setAttribute(
    "aria-label",
    reduceMotion ? "Enable scroll animations" : "Reduce scroll animations",
  );
  motionButton.querySelector("span").textContent = reduceMotion ? "OFF" : "ON";
  lastParticleKey = "";
  scheduleRender();
}
motionButton.addEventListener("click", () => {
  // Preserve the reader's position in the footer while page lengths change.
  const previousBottom = root.scrollHeight - scrollY;
  reduceMotion = !reduceMotion;
  savedMotion = reduceMotion ? "reduced" : "full";
  try {
    localStorage.setItem("mehrdad-motion", savedMotion);
  } catch {
    /* Optional preference. */
  }
  applyMotion();
  const savedBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, Math.max(0, root.scrollHeight - previousBottom));
  root.style.scrollBehavior = savedBehavior;
});
mediaMotion.addEventListener("change", () => {
  if (savedMotion === null) {
    reduceMotion = mediaMotion.matches;
    applyMotion();
  }
});
window.addEventListener("scroll", scheduleRender, { passive: true });
window.addEventListener("resize", scheduleRender, { passive: true });
window.addEventListener("resize", measureComputer, { passive: true });
window.addEventListener("resize", measureIntro, { passive: true });
window.addEventListener("pageshow", scheduleRender);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) scheduleRender();
});
new ResizeObserver(scheduleRender).observe(
  document.querySelector(".robot-image-wrap"),
);
applyMotion();

const interests = {
  car: [
    "Form, function, and the open road.",
    "Cars bring together so many things I like: design, engineering, and the feeling of going somewhere.",
    "sometimes the long way is the right way.",
  ],
  gpu: [
    "A soft spot for serious compute.",
    "GPUs, computer hardware, and the systems behind the models. I like understanding the machine behind the machine learning.",
    "there’s always another layer.",
  ],
  keyboard: [
    "The details you can feel.",
    "Keyboards, desk setups, and the small choices that make spending time at a computer feel a little better.",
    "a good place to start building.",
  ],
  music: [
    "Something good in the background.",
    "Music is part of the picture, too. A little space to listen between the things I’m working on.",
    "press play. see where it goes.",
  ],
  football: [
    "Arsenal, always.",
    "I’m an Arsenal fan. Football is one of the things I always come back to: the teamwork, the tension, and having a team to believe in.",
    "come on you gunners.",
  ],
  nature: [
    "A little perspective.",
    "Hiking, sunsets, and beautiful seashores. Time outside is part of what I love so much about Vancouver.",
    "look up every now and then.",
  ],
};
const tabs = [...document.querySelectorAll(".interest-tab")];
function selectInterest(tab, focus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  const [title, body, note] = interests[tab.dataset.interest];
  const panel = document.querySelector("#interest-panel");
  panel.setAttribute("aria-labelledby", tab.id);
  panel.querySelector(".interest-title").textContent = title;
  panel.querySelector(".interest-body").textContent = body;
  panel.querySelector(".interest-note").textContent = note;
  if (focus) tab.focus({ preventScroll: true });
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectInterest(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectInterest(tabs[next], true);
    }
  });
});

let copyTimeout;
const copyButton = document.querySelector(".copy-email");
copyButton.addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");
  clearTimeout(copyTimeout);
  try {
    await navigator.clipboard.writeText("mehrdad.mmz.ca@gmail.com");
    copyButton.textContent = "COPIED ✓";
    status.textContent = "Email address copied to clipboard.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector(".contact-details>a"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyButton.textContent = "EMAIL SELECTED";
    status.textContent =
      "The email address is selected. Use your device’s copy command.";
  }
  copyTimeout = setTimeout(() => {
    copyButton.innerHTML = 'COPY EMAIL <span aria-hidden="true">⧉</span>';
  }, 2800);
});
