import { webkit } from "@playwright/test";
const browser = await webkit.launch();
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  page.on("pageerror", (error) => console.log(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") console.log(message.text());
  });
  await page.goto("http://127.0.0.1:5173");
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator(".desk-explorer")
    .screenshot({ path: `/tmp/desk-${width}.png` });
  await page.locator("#explore-desk").fill("100");
  await page
    .locator(".desk-explorer")
    .screenshot({ path: `/tmp/desk-${width}-open.png` });
  await page.locator('[data-desk-select="keyboard"]').click();
  await page
    .locator(".desk-explorer")
    .screenshot({ path: `/tmp/desk-${width}-keyboard.png` });
  console.log(
    width,
    await page.evaluate(() => document.documentElement.scrollWidth),
  );
  await page.close();
}
await browser.close();
