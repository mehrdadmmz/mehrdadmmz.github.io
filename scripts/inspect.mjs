import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "/tmp/mehrdad-desktop.png" });
await page.screenshot({ path: "/tmp/mehrdad-full.png", fullPage: true });
console.log(
  "desktop",
  await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    images: [...document.images].map((i) => ({
      src: i.currentSrc,
      loaded: i.complete && i.naturalWidth > 0,
    })),
  })),
);
await page.locator("#curiosity").scrollIntoViewIfNeeded();
await page.locator("#explore-computer").fill("100");
await page.screenshot({ path: "/tmp/mehrdad-computer.png" });
await page.locator("#work").scrollIntoViewIfNeeded();
await page.screenshot({ path: "/tmp/mehrdad-work-desktop.png" });
await page.close();
const mobilePage = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
await mobilePage.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await mobilePage.evaluate(() => document.fonts.ready);

await mobilePage.screenshot({ path: "/tmp/mehrdad-mobile.png" });
await mobilePage.screenshot({
  path: "/tmp/mehrdad-mobile-full.png",
  fullPage: true,
});
console.log(
  "mobile",
  await mobilePage.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    overflow: [...document.querySelectorAll("body *")]
      .filter(
        (e) =>
          e.getBoundingClientRect().right > innerWidth + 2 &&
          getComputedStyle(e).position !== "absolute",
      )
      .slice(0, 12)
      .map((e) => ({ tag: e.tagName, cls: e.className })),
  })),
);
await mobilePage.locator('[data-work="huawei"]').scrollIntoViewIfNeeded();
await mobilePage.screenshot({ path: "/tmp/mehrdad-work-mobile.png" });
await mobilePage.locator("#about").scrollIntoViewIfNeeded();
await mobilePage.screenshot({ path: "/tmp/mehrdad-about-mobile.png" });
for (const [width, height] of [
  [320, 568],
  [768, 1024],
  [1024, 768],
  [844, 390],
]) {
  await mobilePage.setViewportSize({ width, height });
  await mobilePage.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => document.fonts.ready);
  if (width === 844)
    console.log(
      "landscape overflow",
      await mobilePage.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.right > innerWidth + 1 || r.left < -1;
          })
          .map((el) => ({
            tag: el.tagName,
            cls: el.getAttribute("class"),
            right: el.getBoundingClientRect().right,
            left: el.getBoundingClientRect().left,
          }))
          .slice(0, 30),
      ),
    );
  await mobilePage.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await mobilePage.screenshot({ path: `/tmp/mehrdad-${width}-hero.png` });
  await mobilePage.locator("#explore-computer").scrollIntoViewIfNeeded();
  await mobilePage.screenshot({ path: `/tmp/mehrdad-${width}-computer.png` });
}
console.log("errors", errors);
await browser.close();
