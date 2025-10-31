// src/app/car/[slug]/page.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { carsData, Car } from '@/data/cars'; 
import { notFound, usePathname } from 'next/navigation'; // notFound ke saath usePathname import karein
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  
  // 1. URL se slug lein
  const slug = params.slug;

  // 2. carsData mein har car ka slug bana kar check karein
  const car = carsData.find(c => {
    // Bilkul wahi logic use karein jo CarGridCard mein link banane ke liye kiya tha
    const carSlug = encodeURIComponent(c.name.toLowerCase().replace(/ /g, '-'));
    return carSlug === slug;
  });

  // 3. Agar car nahi milti (jaise Scorpio-N ke case mein ho raha tha), toh 404 dikhaye
  if (!car) {
    notFound();
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen pt-8 pb-12">
      <div className="container mx-auto px-4">
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{car.name}</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Images */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Main Image */}
              <div className="relative w-full h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 flex-shrink-0">
                <Image
                  src={car.imageUrls[selectedImageIndex]}
                  alt={car.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              {/* Thumbnails */}
              <div className="flex space-x-4 justify-center flex-wrap gap-2">
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

            {/* Right Column: Details */}
            <div className="lg:w-1/2 flex flex-col space-y-6">
              
              {/* --- Price and Rating Section --- */}
              <div>
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => i < Math.round(car.rating) ? <FaStar key={i} className="h-5 w-5 text-yellow-400" /> : <FaRegStar key={i} className="h-5 w-5 text-yellow-400" />)}
                    <span className="text-lg text-gray-700 ml-2">{car.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-lg text-gray-700">{car.reviews} Reviews</span>
                </div>
                
                {/* Price */}
                <div className="mt-4">
                  <p className="text-4xl font-bold text-gray-900">{car.priceRange}</p>
                  <p className="text-sm text-gray-500 mt-1">*Ex-showroom Price in {car.location}</p>
                </div>
              </div>

              {/* --- Key Features Section --- */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Key Features</h2>
                {car.features && car.features.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                    {car.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No features listed for this car.</p>
                )}
              </div>

              {/* --- Current Offers Section --- */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Current Offers</h2>
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
          </div> 
        </div> 
      </div>
    </div>
  );
}