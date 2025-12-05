import { MetadataRoute } from 'next';

// 1. Apna Domain yahan likh (Updated to Vercel URL)
const BASE_URL = 'https://car-buddy-new.vercel.app';

// 2. Ye function tere database se cars layega
// (Yahan apna asli logic lagana, API call ya DB query)
async function getAllCars() {
  // Example: const res = await fetch('https://api.carbuddy.in/cars');
  // return res.json();
  
  // Dummy data example (Tujhe ye replace karna hai apne DB se)
  return [
    { slug: 'maruti-swift', updatedAt: new Date() },
    { slug: 'hyundai-creta', updatedAt: new Date() },
    { slug: 'tata-nexon', updatedAt: new Date() },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A. Database se saari cars fetch karo
  const cars = await getAllCars();

  // B. Dynamic URLs banao (Har car ke liye ek link)
  const carUrls = cars.map((car) => ({
    url: `${BASE_URL}/car/${car.slug}`, // URL pattern Vercel domain ke saath
    lastModified: car.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Products/Cars ki priority thodi high rakhte hain
  }));

  // C. Static URLs (Jo pages fix hain)
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1, // Homepage sabse important
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    // Agar compare page hai toh wo bhi daal de
    {
        url: `${BASE_URL}/compare`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
  ];

  // D. Sabko jod kar return kar do
  return [...staticRoutes, ...carUrls];
}