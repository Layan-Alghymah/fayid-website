import sharp from "sharp";
const { data, info } = await sharp("public/images/mark.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const white = Math.min(data[i], data[i + 1], data[i + 2]);
  if (white > 220) data[i + 3] = 0;
  else if (white > 170) data[i + 3] = Math.round((255 * (220 - white)) / 50);
}
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile("public/images/mark-transparent.png");
