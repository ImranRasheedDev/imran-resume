import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The screenshots in /public/projects are already sized, compressed WebP files (all under 100 KB),
    // so serve them as-is. This also keeps the site off Vercel's Image Optimization quota, which
    // returns 402 once the free allowance is used up and leaves the images blank.
    unoptimized: true,
  },
};

export default nextConfig;
