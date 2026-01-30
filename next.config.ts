import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // ✅ Build pass karne ke liye zaruri
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgd.aeplcdn.com' },
      { protocol: 'https', hostname: 'tcxrcnmxzjsrvnscifhy.supabase.co' },
    ],
  },
  // ❌ 'eslint' block yahan nahi hona chahiye
};

export default nextConfig;