import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

// Rebuild the robot's point study after replacing its source illustration.
// Sample once here so browsers don't need to read image pixels at runtime.
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5173");
  const points = await page.locator(".robot-image").evaluate(async (image) => {
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 250;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(image, 0, 0, 250, 250);
    const pixels = ctx.getImageData(0, 0, 250, 250).data;
    const points = [];
    for (let y = 0; y < 250; y += 2)
      for (let x = 0; x < 250; x += 2) {
        const k = (y * 250 + x) * 4;
        const shade = (pixels[k] + pixels[k + 1] + pixels[k + 2]) / 3;
        if (pixels[k + 3] > 128 && shade < 205)
          points.push([
            x / 250,
            y / 250,
            Number(((255 - shade) / 255).toFixed(4)),
            Number(pixels[k] > pixels[k + 2] + 13),
          ]);
      }
    return points;
  });
  if (points.length < 500)
    throw new Error(
      "Source image did not produce the expected robot point study.",
    );
  await writeFile(
    new URL("../js/robot-points.json", import.meta.url),
    JSON.stringify(points) + "\n",
  );
  console.log(`Saved ${points.length} robot points.`);
} finally {
  await browser.close();
}
