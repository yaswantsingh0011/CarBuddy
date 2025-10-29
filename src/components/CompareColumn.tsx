// src/components/CompareColumn.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Car } from '@/data/cars';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface CompareColumnProps {
  car: Car;
}

const CompareColumn: React.FC<CompareColumnProps> = ({ car }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="border rounded-lg p-4 bg-white shadow flex flex-col">
      {/* --- Image Section --- */}
      <div className="mb-4">
        {/* Main Image */}
        <div className="relative w-full h-40 mb-2">
          <Image
            src={car.imageUrls[selectedImageIndex]} // Show selected image
            alt={car.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        {/* Thumbnails */}
        <div className="flex space-x-2 justify-center">
          {car.imageUrls.map((url, index) => (
            <div
              key={index}
              className={`w-10 h-8 relative cursor-pointer border-2 rounded-sm ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setSelectedImageIndex(index)} // Change main image on click
            >
              <Image
                src={url}
                alt={`${car.name} thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>
      {/* --- End Image Section --- */}

      {/* Name */}
      <h2 className="text-xl font-bold mb-2 text-center text-gray-900">{car.name}</h2>
      {/* Rating */}
      <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
        {[...Array(5)].map((_, i) => i < Math.round(car.rating) ? <FaStar key={i} className="h-4 w-4 text-yellow-400" /> : <FaRegStar key={i} className="h-4 w-4 text-yellow-400" />)}
        <span className="ml-1">{car.rating.toFixed(1)}</span>
        <span className="mx-1">|</span>
        <span>{car.reviews} Reviews</span>
      </div>
      {/* Price */}
      <p className="text-lg font-semibold text-gray-900 mb-1 text-center">{car.priceRange}</p>
      <p className="text-xs text-gray-500 mb-4 text-center">*Ex-showroom Price</p>

      {/* --- Features Section --- */}
      <div className="mt-4 border-t pt-4 flex-grow"> {/* Added flex-grow */}
        <h3 className="text-md font-semibold mb-2 text-gray-800">Key Features:</h3>
        {car.features && car.features.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No features listed.</p>
        )}
      </div>
    </div>
  );
};

export default CompareColumn;