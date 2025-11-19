// src/app/car/[slug]/page.tsx

// NOTE: Yahan se 'use client' HATA DIYA hai. 
// Ye Server Component rahega taaki hum async params use kar sakein.

import React from 'react';
import { carsData } from '@/data/cars';
import { notFound } from 'next/navigation';
import CarDetails from '@/components/CarDetails';

// Change 1: params ka type Promise bana diya
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Change 2: Function ko 'async' banaya
export default async function CarDetailPage({ params }: PageProps) {
  
  // Change 3: Params ko await kiya
  const { slug } = await params;

  const car = carsData.find(c => {
    const carSlug = encodeURIComponent(c.name.toLowerCase().replace(/ /g, '-'));
    return carSlug === slug;
  });

  if (!car) {
    notFound();
  }

  return <CarDetails car={car} />;
}