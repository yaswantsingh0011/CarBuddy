// src/app/car/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { carsData, Car } from '@/data/cars'; 
import { notFound } from 'next/navigation'; 
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const decodedName = decodeURIComponent(params.slug).replace(/-/g, ' ');
  const car = carsData.find(c => c.name.toLowerCase() === decodedName.toLowerCase());

  if (!car) {
    notFound();
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{car.name}</h1>
      <div className="mb-8">
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={car.imageUrls[selectedImageIndex]}
            alt={car.name}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className="flex space-x-4 justify-center">
          {car.imageUrls.map((url, index) => (
            <div 
              key={index}
              className={`w-24 h-16 relative cursor-pointer border-2 rounded-md ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image 
                src={url} 
                alt={`${car.name} thumbnail ${index+1}`} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">Key Features</h2>
        {car.features && car.features.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No features listed.</p>
        )}
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">Current Offers</h2>
        {car.offers && car.offers.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            {car.offers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No current offers available.</p>
        )}
      </div>
    </div>
  );
}