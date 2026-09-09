import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const output = "docs/qa";
await mkdir(output, { recursive: true });
const results = [];
for (const width of [1440, 1024, 768, 390, 360]) {
  const page = await browser.newPage({
    viewport: { width, height: width < 700 ? 844 : 1000 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(process.env.SITE_URL || "http://localhost:3000", {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw new Error(`Horizontal overflow at ${width}`);
  if ((await page.locator("h1").count()) !== 1)
    throw new Error("Heading structure");
  await page.screenshot({
    path: `${output}/desktop-${width}.png`,
    fullPage: true,
  });
  if (width < 700) {
    const menu = page.getByRole("button", { name: "فتح القائمة" });
    await menu.click();
    if (!(await page.getByRole("dialog").isVisible()))
      throw new Error("Menu failed");
    await page.keyboard.press("Escape");
    if (await page.getByRole("dialog").isVisible())
      throw new Error("Escape failed");
    if (!(await menu.evaluate((el) => el === document.activeElement)))
      throw new Error("Focus restoration failed");
    await menu.click();
    await page
      .getByRole("navigation", { name: "التنقل على الجوال" })
      .getByRole("link", { name: /كيف نعمل/ })
      .click();
    if (await page.getByRole("dialog").isVisible())
      throw new Error("Menu navigation did not close");
  }
  await page.getByRole("button", { name: /تسوّق الآن/ }).click();
  if (!(await page.getByRole("status").first().isVisible()))
    throw new Error("Store placeholder notice failed");
  const images = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs
        .filter(
          (i) =>
            i.getBoundingClientRect().top < innerHeight &&
            i.getBoundingClientRect().bottom > 0,
        )
        .every((i) => i.complete && i.naturalWidth > 0),
    );
  if (!images) throw new Error("Visible image failed");
  results.push({ width, overflow, errors, visibleImagesLoaded: images });
  await page.close();
}
const reduced = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await reduced.goto(process.env.SITE_URL || "http://localhost:3000", {
  waitUntil: "networkidle",
});
await reduced.screenshot({ path: `${output}/mobile-reduced-motion.png` });
results.push({
  reducedMotion: await reduced.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    heroTransform: getComputedStyle(document.querySelector(".hero-image"))
      .transform,
  })),
});
await reduced.close();
await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
await browser.close();
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => r.errors?.length)) process.exitCode = 1;
