/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ नई सेटिंग्स (eslint, typescript, reactStrictMode)
  eslint: {
    ignoreDuringBuilds: true, // Build के दौरान ESLint errors को ignore करता है
  },
  typescript: {
    ignoreBuildErrors: true, // Build के दौरान TypeScript errors को ignore करता है
  },
  reactStrictMode: true,

  // ✅ Images को remote domains से allow करने के लिए
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com', // CarWale domain
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Backup के लिए
      },
      // 👇 Yeh naya Supabase wala domain add kiya hai
      {
        protocol: 'https',
        hostname: 'tcxrcnmxzjsrvnscifhy.supabase.co',
        pathname: '/storage/v1/object/public/**', // Security ke liye path limit kiya
      },
    ],
  },

  // 🛠️ Sitemap fix के लिए ज़रूरी Headers (Caching और Content-Type)
  async headers() {
    return [
      {
        // sitemap.xml फ़ाइल के लिए HTTP Header सेट करता है
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml', // यह सुनिश्चित करता है कि ब्राउज़र/Googlebot इसे XML समझे
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate', // Caching को तुरंत रीसेट करता है
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;