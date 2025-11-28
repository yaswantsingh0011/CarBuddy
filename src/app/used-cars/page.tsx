"use client";

import React from 'react';
import { usedCars } from '@/data/usedCarsData'; // ✅ Naya Data Import
import UsedCarCard from '@/components/UsedCarCard'; // ✅ Naya Component Import
import Link from 'next/link';

export default function UsedCarsPage() {
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-white py-12 border-b border-gray-200 mb-10 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Used Cars for Sale
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Browse our curated list of certified pre-owned cars available in your city with the best prices.
          </p>
        </div>
      </div>

      {/* --- CARS GRID --- */}
      <div className="container mx-auto px-4">
        
        {usedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {usedCars.map((car) => (
              // ✅ Naya Card Component Use Ho Raha Hai
              <UsedCarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-700">No cars found</h3>
            <p className="text-gray-500">Please check back later or modify your search.</p>
          </div>
        )}

      </div>

      {/* Optional: Bottom CTA */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="text-gray-600 mb-4">Didn't find what you were looking for?</p>
        <Link href="/new-cars">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Check New Cars
            </button>
        </Link>
      </div>

    </div>
  );
}