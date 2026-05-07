import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

const BASE_URL = 'https://car-buddy-new.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabaseClient();

  // ✅ Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/all-cars`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/electric-cars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/used-cars`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/new-cars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/car-comparisons`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faqs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/advertise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // ✅ Dynamic car detail pages
  let carPages: MetadataRoute.Sitemap = [];
  try {
    const tables = ['most_searched_cars', 'electric_cars', 'used_cars', 'upcoming_cars'];
    const results = await Promise.all(
      tables.map(table =>
        supabase.from(table).select('slug, updated_at').limit(500)
      )
    );

    const allCars = results.flatMap(({ data }) => data || []);
    const uniqueSlugs = Array.from(new Map(allCars.map(c => [c.slug, c])).values());

    carPages = uniqueSlugs
      .filter(car => car.slug)
      .map(car => ({
        url: `${BASE_URL}/car-details/${car.slug}`,
        lastModified: car.updated_at ? new Date(car.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (e) {
    console.error('Sitemap: car pages fetch failed', e);
  }

  // ✅ Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at')
      .limit(500);

    blogPages = (blogs || [])
      .filter(b => b.slug)
      .map(b => ({
        url: `${BASE_URL}/blogs/${b.slug}`,
        lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
  } catch (e) {
    console.error('Sitemap: blog pages fetch failed', e);
  }

  // ✅ Dynamic brand pages
  let brandPages: MetadataRoute.Sitemap = [];
  try {
    const { data: brands } = await supabase
      .from('brands')
      .select('slug')
      .limit(100);

    brandPages = (brands || [])
      .filter(b => b.slug)
      .map(b => ({
        url: `${BASE_URL}/brand/${b.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  } catch (e) {
    console.error('Sitemap: brand pages fetch failed', e);
  }

  return [...staticPages, ...carPages, ...blogPages, ...brandPages];
}
