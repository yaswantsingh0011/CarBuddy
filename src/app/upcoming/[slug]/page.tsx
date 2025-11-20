import React from 'react';
import { notFound } from 'next/navigation';
// Apne data file ka sahi path check kar lena
import { newLaunchCars } from '@/data/newlaunchcars'; 
// Jo component tune banaya tha uska import
import UpcomingCarDetails from '@/components/UpcomingCarDetails'; 

interface PageProps {
  params: {
    slug: string;
  };
}

// Ye Server Component hai (yahan "use client" nahi lagana)
export default function Page({ params }: PageProps) {
  
  // 1. URL se jo slug aaya (eg: 'tata-sierra-ev'), usko data mein dhoond rahe hain
  const car = newLaunchCars.find((c) => c.slug === params.slug);

  // 2. Agar slug galat hai ya car nahi mili, to 404 page dikhao
  if (!car) {
    return notFound();
  }

  // 3. Car mil gayi to tera main design component render kar rahe hain data ke saath
  return <UpcomingCarDetails car={car} />;
}

// --- OPTIONAL: Performance ke liye (Static Generation) ---
// Agar chahta hai ki ye pages build time par hi ban jayen (fast load ho), to ye niche wala code bhi add kar de isi file mein:
export async function generateStaticParams() {
  return newLaunchCars.map((car) => ({
    slug: car.slug,
  }));
}