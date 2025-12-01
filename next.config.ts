import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  
  // ✅ Ye section add kiya hai images allow karne ke liye
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com', // CarWale domain
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Backup ke liye (agar kabhi use karein)
      },
    ],
  },
};

export default nextConfig;