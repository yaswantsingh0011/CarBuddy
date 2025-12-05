import { MetadataRoute } from 'next';

// BASE_URL Updated to Vercel URL
export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://car-buddy-new.vercel.app';

  return {
    rules: {
      userAgent: '*', // Sabhi bots ke liye allowed hai
      allow: '/',
      disallow: ['/admin/', '/private/'], // In pages ko Google se chupana hai
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Ye line sabse zaroori hai (Vercel URL use ho raha hai)
  };
}