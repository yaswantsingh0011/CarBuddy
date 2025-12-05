import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://car-buddy-new.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/private/'], 
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
