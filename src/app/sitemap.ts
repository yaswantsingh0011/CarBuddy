import { MetadataRoute } from 'next';

// Apni data files import karo
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';
import { usedCarsData } from '@/data/usedCarsData';
import { blogs } from '@/data/blogs';

const BASE_URL = 'https://car-buddy-new.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  
  // 1. Static Pages (Jo hamesha rahenge)
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/careers',
    '/advertise',
    '/partner',
    '/privacy',
    '/terms',
    '/corporate',
    '/investors',
    '/faqs',
    '/feedback',
    '/used-cars', // Agar alag page hai to
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  // 2. Dynamic Car Detail Pages
  // Function to generate slug
  const generateSlug = (name: string) => name.trim().toLowerCase().replace(/\s+/g, "-");

  // Merge all cars into one list for sitemap
  const allCars = [
    ...mostSearchedCars,
    ...electricCars,
    ...newLaunchCars,
    ...usedCarsData
  ];

  const carRoutes = allCars.map((car) => ({
    url: `${BASE_URL}/car-details/${car.slug || generateSlug(car.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Blog Posts
  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Sabko jod kar return kar do
  return [...staticRoutes, ...carRoutes, ...blogRoutes];
}