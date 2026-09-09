import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1000, 1600],
    imageSizes: [48, 96, 160],
  },
  devIndicators: false,
};
export default config;
