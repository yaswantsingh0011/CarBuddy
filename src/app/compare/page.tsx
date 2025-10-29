// src/app/compare/page.tsx
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { carsData, Car } from '@/data/cars';
import Link from 'next/link';
import CompareColumn from '@/components/CompareColumn'; // 1. Import the new component

export default function ComparePage() {
  const searchParams = useSearchParams();
  const carNamesString = searchParams.get('cars');
  const selectedCarNames = carNamesString ? carNamesString.split(',') : [];

  const carsToCompare = carsData.filter(car => selectedCarNames.includes(car.name));

  // Determine column class based on the number of cars
  let gridColsClass = 'md:grid-cols-2'; // Default for 2 cars
  if (carsToCompare.length === 3) {
    gridColsClass = 'md:grid-cols-3';
  } else if (carsToCompare.length === 4) {
    gridColsClass = 'md:grid-cols-4';
  }


  return (
    <div className="bg-gray-100 container mx-auto px-4 py-12 pt-28 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Compare Cars</h1>

      {carsToCompare.length >= 2 ? (
         // 2. Use Grid layout for better alignment
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
          {carsToCompare.map((car) => (
            // 3. Use the CompareColumn component
            <CompareColumn key={car.name} car={car} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Please select 2 to 4 cars to compare from the{' '}
          <Link href="/" className="text-blue-600 underline">
            homepage
          </Link>.
        </p>
      )}
    </div>
  );
}