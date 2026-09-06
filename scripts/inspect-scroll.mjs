import { webkit } from "@playwright/test";

const browser = await webkit.launch();
for (const [width, height] of [
  [390, 664],
  [320, 568],
  [1440, 730],
  [844, 390],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile: width < 900,
    hasTouch: width < 900,
  });
  await page.goto("http://127.0.0.1:5173");
  await page.evaluate(() => document.fonts.ready);
  for (const [selector, variable] of [
    [".intro", "intro"],
    ["#curiosity", "computer"],
  ]) {
    await page.evaluate(
      ({ selector, variable }) => {
        const el = document.querySelector(selector);
        const styles = getComputedStyle(el);
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(
          0,
          scrollY +
            el.getBoundingClientRect().top -
            parseFloat(styles.getPropertyValue(`--${variable}-pin-top`)) +
            0.9 * parseFloat(styles.getPropertyValue(`--${variable}-travel`)),
        );
      },
      { selector, variable },
    );
    await page.waitForTimeout(100);
    await page.screenshot({ path: `/tmp/scroll-${width}-${variable}.png` });
  }
  await page.close();
}
await browser.close();
