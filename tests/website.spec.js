import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function settleScroll(page, selector, fraction = 0) {
  await page.evaluate(
    ({ selector, fraction }) => {
      const el = document.querySelector(selector);
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(
        0,
        el.getBoundingClientRect().top +
          scrollY +
          Math.max(0, el.offsetHeight - innerHeight) * fraction,
      );
    },
    { selector, fraction },
  );
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}

test("page renders locally with correct identity and no failed requests", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://127.0.0.1"))
      errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Mehrdad.", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".robot-image")).toHaveJSProperty("complete", true);
  expect(
    await page.locator(".robot-image").evaluate((el) => el.naturalWidth),
  ).toBeGreaterThan(0);
  await expect(
    page.locator('a[href="https://www.instagram.com/mhrddmmz"]'),
  ).toHaveCount(1);
  expect(
    await page
      .locator(".work-row")
      .evaluateAll((rows) => rows.map((row) => row.dataset.work)),
  ).toEqual(["huawei", "delta", "paper", "galactic", "opti", "rage", "neuro"]);
  await expect(page.locator("[data-project-drawing] svg")).toHaveCount(4);
  await expect(page.locator('a[href="https://x.com/MMZisHere"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test("scroll reveals machine view and opens the computer", async ({ page }) => {
  await page.goto("/");
  await settleScroll(page, ".intro", 0.85);
  await expect(page.locator(".view-label")).toContainText("MACHINE VIEW");
  await expect(page.locator(".perception-copy")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  const opaquePixels = await page.locator(".robot-points").evaluate((el) => {
    const data = el
      .getContext("2d")
      .getImageData(0, 0, el.width, el.height).data;
    let pixels = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) pixels++;
    return pixels;
  });
  expect(opaquePixels).toBeGreaterThan(200);
  const cornerPixels = await page.locator(".robot-points").evaluate((el) => {
    const data = el.getContext("2d").getImageData(0, 0, 20, 20).data;
    return [...data].filter((value, i) => i % 4 === 3 && value > 0).length;
  });
  expect(cornerPixels).toBe(0);
  await settleScroll(page, "#curiosity", 0.9);
  await expect(page.locator(".computer-mode")).toContainText("INTERNALS");
  expect(
    Number(await page.locator("#explore-computer").inputValue()),
  ).toBeGreaterThan(90);
});

test("computer responds to keyboard controls and blueprint switch", async ({
  page,
}) => {
  await page.goto("/");
  await settleScroll(page, "#curiosity", 0.4);
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  await expect(page.locator(".step-number")).toContainText("CONNECTIONS");
  const before = await page
    .locator(".pc-front")
    .evaluate((el) => getComputedStyle(el).transform);
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  const after = await page
    .locator(".pc-front")
    .evaluate((el) => getComputedStyle(el).transform);
  expect(before).not.toBe(after);
  const toggle = page.getByRole("button", { name: "BLUEPRINT VIEW" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#curiosity")).toHaveClass(/blueprint/);
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("interest tabs have working click and keyboard navigation", async ({
  page,
}) => {
  await page.goto("/");
  const keyboard = page.getByRole("tab", { name: "03 / KEYBOARDS" });
  await keyboard.click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "The details you can feel.",
  );
  await keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "04 / MUSIC" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Something good in the background.",
  );
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText(
    "A little perspective.",
  );
  await expect(page.getByRole("tab", { selected: true })).toHaveCount(1);
});

for (const [width, height] of [
  [320, 568],
  [360, 800],
  [390, 844],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
  [844, 390],
  [1280, 600],
]) {
  test(`layout and controls fit ${width} × ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const [section, variable, artwork] of [
      [".intro", "intro", ".robot-points"],
      ["#curiosity", "computer", ".computer-svg"],
    ]) {
      for (const fraction of [0, 0.5, 0.95]) {
        await page.evaluate(
          ({ section, variable, fraction }) => {
            const el = document.querySelector(section);
            const style = getComputedStyle(el);
            const pin = parseFloat(
              style.getPropertyValue(`--${variable}-pin-top`),
            );
            const travel = parseFloat(
              style.getPropertyValue(`--${variable}-travel`),
            );
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(
              0,
              el.getBoundingClientRect().top +
                scrollY -
                pin +
                travel * fraction,
            );
          },
          { section, variable, fraction },
        );
        await expect
          .poll(async () =>
            page
              .locator(section)
              .evaluate(
                (el, variable) =>
                  parseFloat(
                    getComputedStyle(el).getPropertyValue(
                      variable === "intro" ? "--intro" : "--open",
                    ),
                  ),
                variable,
              ),
          )
          .toBeCloseTo(fraction * fraction * (3 - 2 * fraction), 1);
        const box = await page.locator(artwork).boundingBox();
        expect(box.y).toBeLessThan(height);
        expect(box.y + box.height).toBeGreaterThan(0);
      }
    }
    await expect(page.locator(".robot-image")).toHaveCSS("opacity", /0\.0/);
    await expect(page.locator(".computer-mode")).toContainText("INTERNALS");
    for (const [selector, fraction] of [
      [".intro", 0],
      ["#work", 0],
      ["#curiosity", 0.85],
      ["#about", 0],
      ["#contact", 0],
    ]) {
      await settleScroll(page, selector, fraction);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    for (const selector of [
      "#explore-computer",
      ".blueprint-toggle",
      ".copy-email",
    ]) {
      const control = page.locator(selector);
      await control.scrollIntoViewIfNeeded();
      const box = await control.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      expect(box.y).toBeGreaterThanOrEqual(-1);
      expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
    }
  });
}

test("touch controls remain usable after rotating a phone", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  await page.getByRole("tab", { name: "05 / FOOTBALL" }).tap();
  await expect(page.getByRole("tabpanel")).toContainText("Arsenal, always.");
  await page.getByRole("button", { name: "BLUEPRINT VIEW" }).tap();
  await expect(page.locator("#curiosity")).toHaveClass(/blueprint/);
  await page.getByRole("slider").fill("100");
  await settleScroll(page, "#about");
  await expect(page.getByRole("slider")).toHaveValue("100");
  await page.setViewportSize({ width: 844, height: 390 });
  await page.getByRole("button", { name: "BLUEPRINT VIEW" }).tap();
  await expect(page.locator("#curiosity")).not.toHaveClass(/blueprint/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    844,
  );
  await context.close();
});

test("reduced motion retains the content and manual computer controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-reduced/);
  expect(
    await page
      .locator(".intro-sticky")
      .evaluate((el) => getComputedStyle(el).position),
  ).toBe("relative");
  await page.getByRole("slider").fill("100");
  await expect(page.locator(".computer-mode")).toContainText("INTERNALS");
  await page.getByRole("button", { name: "Enable scroll animations" }).click();
  await expect(page.locator("html")).toHaveClass(/motion-enabled/);
  expect(
    await page
      .locator(".intro-sticky")
      .evaluate((el) => getComputedStyle(el).position),
  ).toBe("sticky");
});

test("copy email gives a truthful success message", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName === "webkit",
    "WebKit does not expose clipboard permissions to Playwright.",
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "COPY EMAIL" }).click();
  await expect(page.locator(".copy-status")).toHaveText(
    "Email address copied to clipboard.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "mehrdad.mmz.ca@gmail.com",
  );
});

test("essential navigation and content remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  await expect(
    page.getByRole("heading", { name: "Mehrdad.", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Work 01", exact: true }),
  ).toHaveAttribute("href", "#work");
  await expect(
    page.getByRole("link", { name: "mehrdad.mmz.ca@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:mehrdad.mmz.ca@gmail.com");
  await expect(
    page.getByRole("heading", { name: "Tehran تهران" }),
  ).toBeVisible();
  await context.close();
});

test("primary views pass automated accessibility checks", async ({ page }) => {
  await page.goto("/");
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await settleScroll(page, "#curiosity", 0.5);
  await page.getByRole("button", { name: "BLUEPRINT VIEW" }).click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});
