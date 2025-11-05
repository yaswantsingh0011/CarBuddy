'use client';

import React from 'react';
import { carsData } from '@/data/cars';
import { notFound } from 'next/navigation';
import CarDetails from '@/components/CarDetails';

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const car = carsData.find(c => {
    const carSlug = encodeURIComponent(c.name.toLowerCase().replace(/ /g, '-'));
    return carSlug === slug;
  });

  if (!car) {
    notFound();
  }

  return <CarDetails car={car} />;
}
