import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Build block nahi hogi lint errors se
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgd.aeplcdn.com' },
      { protocol: 'https', hostname: 'tcxrcnmxzjsrvnscifhy.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'], // ✅ Better image compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // ✅ Responsive sizes
  },
  // ✅ Compression enable karo
  compress: true,
};

export default nextConfig;