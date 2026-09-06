import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });
const svg = readFileSync("favicon.svg", "utf8");
for (const [size, path] of [
  [32, "favicon.png"],
  [180, "apple-touch-icon.png"],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>*{box-sizing:border-box}body{margin:0}svg{display:block;width:100vw;height:100vh}</style>${svg}`,
  );
  await page.screenshot({ path, omitBackground: true });
}
await page.setViewportSize({ width: 1200, height: 630 });
await page.route("http://127.0.0.1:5173/__identity__", (route) =>
  route.fulfill({
    contentType: "text/html",
    body: "<!doctype html><html><head></head><body></body></html>",
  }),
);
await page.goto("http://127.0.0.1:5173/__identity__");
await page.setContent(
  `<style>@font-face{font-family:Instrument;src:url('/assets/fonts/InstrumentSerif-Regular.ttf')}@font-face{font-family:Mono;src:url('/fonts/NBInternationalPro-Mono.woff2')}*{box-sizing:border-box}body{margin:0;background:#f4f1e9;color:#282c25;width:1200px;height:630px;overflow:hidden}.frame{position:relative;width:100%;height:100%;padding:42px 60px}.line{border-bottom:1px solid #cecebf;display:flex;justify-content:space-between;padding-bottom:18px;font:10px Mono;letter-spacing:2px}.copy{position:absolute;left:60px;top:182px;z-index:1}h1{font:156px/.95 Instrument;margin:0 0 25px;letter-spacing:-6px}h1 span{color:#b54e32}p{font:39px/1.1 Instrument;margin:0}small{display:block;font:10px Mono;margin-top:32px;letter-spacing:1px;color:#606956}.art{position:absolute;right:10px;top:102px;width:520px;height:520px;background:#f4f1e9}img{width:100%;height:auto;mix-blend-mode:multiply}.bottom{position:absolute;left:60px;bottom:32px;font:9px Mono;letter-spacing:1.5px;color:#606956}</style><div class="frame"><div class="line"><span>MEHRDAD M. ZADEH</span><span>A PERSONAL WORK IN PROGRESS</span></div><div class="copy"><h1>Mehrdad<span>.</span></h1><p>Learning to see.<br>Learning to build.</p><small>COMPUTER SCIENCE / ROBOTICS / CURIOSITY</small></div><div class="art"><img src="/assets/illustrations/robot-pencil.jpg"></div><div class="bottom">ALWAYS LOOKING A LITTLE CLOSER.</div></div>`,
);
await page.evaluate(() => document.fonts.ready);
await page.locator("img").evaluate((img) => img.decode());
await page.screenshot({ path: "assets/social-preview.png" });
await browser.close();
