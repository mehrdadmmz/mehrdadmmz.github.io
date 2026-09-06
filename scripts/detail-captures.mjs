import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  const el = document.querySelector(".intro");
  scrollTo(0, el.offsetTop + (el.offsetHeight - innerHeight) * 0.9);
});
await page.evaluate(
  () =>
    new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
);
await page.screenshot({ path: "/tmp/mehrdad-machine-view.png" });
await page.close();
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await mobile.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  const el = document.querySelector("#curiosity");
  scrollTo(0, el.offsetTop + 100);
});
await mobile.getByRole("slider").fill("100");
await mobile.screenshot({ path: "/tmp/mehrdad-mobile-computer.png" });
await mobile.getByRole("button", { name: "BLUEPRINT VIEW" }).click();
await mobile
  .locator(".computer-sticky")
  .evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
await mobile.screenshot({ path: "/tmp/mehrdad-mobile-blueprint.png" });
console.log(await mobile.locator("input[type=range]").boundingBox());
await browser.close();
