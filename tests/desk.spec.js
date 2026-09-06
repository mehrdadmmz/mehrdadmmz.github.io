import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desk slider and item details work with keyboard input", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  const slider = page.getByRole("slider", { name: "LOOK A LITTLE CLOSER" });
  const keyboard = page.locator('[data-desk-part="keyboard"]');
  const initial = await keyboard.evaluate(
    (el) => getComputedStyle(el).transform,
  );
  await slider.focus();
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  await expect(page.locator(".desk-view-label")).toHaveText("THE DETAILS");
  expect(
    await keyboard.evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe(initial);
  const choices = page.getByRole("group", {
    name: "Explore my desk equipment",
  });
  await expect(choices.getByRole("button")).toHaveCount(11);
  await choices.getByRole("button", { name: "02 Keyboard" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".desk-item-title")).toHaveText("NuPhy Air75 V3");
  await expect(page.locator(".desk-detail-preview svg")).toBeVisible();
  expect(
    await page.locator(".desk-detail-preview svg").getAttribute("viewBox"),
  ).not.toContain("NaN");
  await expect(keyboard).toHaveClass(/is-selected/);
  await page.keyboard.press("Enter");
  await expect(page.locator(".desk-item-title")).toHaveText(
    "Good tools. Little distractions.",
  );
  await slider.focus();
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  expect(await keyboard.evaluate((el) => getComputedStyle(el).transform)).toBe(
    initial,
  );
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`desk is readable and contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page
      .getByRole("slider", { name: "LOOK A LITTLE CLOSER" })
      .fill("100");
    for (const [id, expected] of [
      ["ferrari", "LEGO Ferrari SF90 XX Stradale"],
      ["porsche", "LEGO Porsche 911 GT3 RS"],
      ["desk", "IKEA MITTZON"],
      ["monitor", "Dell UltraSharp U2724DE"],
    ]) {
      await page.locator(`[data-desk-select="${id}"]`).click();
      await expect(page.locator(".desk-item-title")).toHaveText(expected);
      const box = await page.locator(".desk-detail").boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
    }
    const results = await new AxeBuilder({ page })
      .include(".desk-explorer")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.failureSummary),
      })),
    ).toEqual([]);
  });
}

test("desk remains manually explorable with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("slider", { name: "LOOK A LITTLE CLOSER" }).fill("100");
  await page.locator('[data-desk-select="mac"]').click();
  await expect(page.locator(".desk-item-title")).toHaveText(
    "MacBook Air · 13.3-inch",
  );
  await expect(page.locator(".desk-view-label")).toHaveText("THE DETAILS");
});
