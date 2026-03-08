import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "medias.watsons.com.my",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.theoriginote.com",
      },
      {
        protocol: "https",
        hostname: "down-my.img.susercontent.com",
      },
    ],
  },
};

export default nextConfig;
