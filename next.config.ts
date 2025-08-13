import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: { 
    styledComponents: true 
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;




