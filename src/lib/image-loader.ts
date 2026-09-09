"use client";
import type { ImageLoaderProps } from "next/image";
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!/^\/images\/(rack|garments)\.webp$/.test(src))
    return `${src}?w=${width}`;
  const size = width <= 640 ? 640 : width <= 1000 ? 1000 : 1600;
  return src.replace(".webp", `-${size}.webp`);
}
