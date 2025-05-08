import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for static export
  trailingSlash: true, // GitHub Pages needs this
  basePath: "/pool", // Change this if your repo name is different
  images: { unoptimized: true }, // If you use <Image>
};

export default nextConfig;
