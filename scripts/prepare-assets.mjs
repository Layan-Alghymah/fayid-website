import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
for (const [name, source] of [
  ["rack", "rack-source"],
  ["garments", "garments-source"],
]) {
  for (const width of [640, 1000, 1600])
    await sharp(`public/images/${source}.jpg`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(`public/images/${name}-${width}.webp`);
  await sharp(`public/images/${source}.jpg`)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`public/images/${name}.webp`);
}
await sharp("public/images/brand-original.png")
  .extract({ left: 235, top: 228, width: 500, height: 480 })
  .resize(160, 154)
  .png()
  .toFile("public/images/mark.png");
await sharp("public/images/brand-teal.jpg")
  .resize(630, 630)
  .extend({ left: 285, right: 285, background: "#174951" })
  .jpeg({ quality: 88 })
  .toFile("public/images/og.jpg");
