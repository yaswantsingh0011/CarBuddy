import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://carbuddy.in';

  return {
    rules: {
      userAgent: '*', // Sabhi bots ke liye allowed hai
      allow: '/',
      disallow: ['/admin/', '/private/'], // In pages ko Google se chupana hai
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Ye line sabse zaroori hai
  };
}