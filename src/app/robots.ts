import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Agar koi private page ho to yahan daalna
    },
    sitemap: 'https://car-buddy-new.vercel.app/sitemap.xml',
  };
}