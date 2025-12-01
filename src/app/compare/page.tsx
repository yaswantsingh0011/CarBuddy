'use client'; // ✅ YE LINE SABSE ZAROORI HAI (Build Error Fix)

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FaTrash, FaTimes } from 'react-icons/fa';

const ComparePage = () => {
  const { compareList, removeFromCompare } = useCompare();

  // Agar koi car select nahi ki hai
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Compare Cars</h1>
        <p className="text-gray-500 mb-8">You haven't added any cars to compare yet.</p>
        <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
          Browse Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compare Cars</h1>

        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[600px]">
            
            {/* Compare Columns */}
            {compareList.map((car, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative flex flex-col">
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCompare(car.id || car.name)}
                  className="absolute top-2 right-2 bg-red-100 text-red-500 p-2 rounded-full hover:bg-red-200 transition-colors z-10"
                  title="Remove"
                >
                  <FaTimes />
                </button>

                {/* Image */}
                <div className="relative h-48 w-full bg-gray-100">
                  <Image 
                    src={car.imageUrl || "/cars/placeholder.jpg"} 
                    alt={car.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                {/* Specs */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{car.name}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-medium">Price</span>
                        <span className="text-gray-900 font-bold text-right">{car.priceRange}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-medium">Fuel Type</span>
                        <span className="text-gray-900 font-bold text-right">
                            {car.fuelType || (car.name.toLowerCase().includes('ev') ? 'Electric' : 'Petrol/Diesel')}
                        </span>
                    </div>
                    {/* Add more specs here if available in data */}
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 font-medium">Transmission</span>
                        <span className="text-gray-900 font-bold text-right">Automatic / Manual</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <Link href={`/car-details/${car.name.toLowerCase().replace(/\s+/g, "-")}`} className="block w-full text-center text-blue-600 font-bold hover:underline">
                        View Full Details
                    </Link>
                </div>
              </div>
            ))}

            {/* Add Car Placeholder (If only 1 car selected) */}
            {compareList.length === 1 && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 min-h-[400px]">
                    <p className="text-gray-400 font-medium mb-4">Add another car to compare</p>
                    <Link href="/" className="px-6 py-2 border border-gray-400 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                        + Add Car
                    </Link>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;