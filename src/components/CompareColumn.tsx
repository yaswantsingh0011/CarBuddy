"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// Note: Type ko 'any' kar diya hai taaki Used/New dono cars fit ho jayein
// Agar aapke paas strict type hai to wo use karein
import { FaStar, FaRegStar, FaTimesCircle } from 'react-icons/fa';

interface CompareColumnProps {
  car: any; // Type flexibility ke liye any rakha hai
  onRemove: () => void; // ✅ New Prop
}

const CompareColumn: React.FC<CompareColumnProps> = ({ car, onRemove }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Safety check: Agar images array nahi hai to empty array ya placeholder
  const images = car.imageUrls || car.images || ["/cars/placeholder.jpg"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col relative h-full">
      
      {/* ✅ Remove Button (Top Right) */}
      <button 
        onClick={onRemove}
        className="absolute -top-3 -right-3 bg-white text-red-500 rounded-full p-1 shadow-md hover:scale-110 transition-transform z-20 border border-gray-200"
        title="Remove from comparison"
      >
        <FaTimesCircle size={24} />
      </button>

      {/* --- Image Section --- */}
      <div className="p-4 border-b border-gray-100">
        {/* Main Image */}
        <div className="relative w-full h-40 mb-3 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={images[selectedImageIndex] || "/cars/placeholder.jpg"}
            alt={car.name}
            fill
            className="object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2 justify-center overflow-x-auto pb-1 scrollbar-hide">
          {images.slice(0, 4).map((url: string, index: number) => (
            <div
              key={index}
              className={`relative w-12 h-10 cursor-pointer border-2 rounded-md overflow-hidden flex-shrink-0 ${
                selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200 opacity-60 hover:opacity-100'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image src={url} alt="thumb" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="p-4 flex flex-col gap-2">
          {/* Name */}
          <h2 className="text-lg font-bold text-center text-gray-900 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
            {car.name}
          </h2>
          
          {/* Price */}
          <p className="text-xl font-bold text-orange-600 text-center">{car.price || car.priceRange}</p>
          
          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mb-2 bg-green-50 py-1 rounded-full w-fit mx-auto px-3">
            <span className="text-sm font-bold text-green-700">{car.rating || 4.5}</span>
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-gray-300 text-xs">|</span>
            <span className="text-xs text-gray-500">{car.reviews || 20} Reviews</span>
          </div>

          {/* --- Specs Table (Key Features) --- */}
          <div className="mt-4 space-y-3">
             <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-xs text-gray-500 uppercase font-bold">Fuel Type</span>
                <span className="text-sm font-semibold text-gray-800">{car.fuelType || "N/A"}</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-xs text-gray-500 uppercase font-bold">Transmission</span>
                <span className="text-sm font-semibold text-gray-800">{car.transmission || "N/A"}</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-xs text-gray-500 uppercase font-bold">Mileage/Range</span>
                <span className="text-sm font-semibold text-gray-800">{car.mileage || car.range || "N/A"}</span>
             </div>
          </div>

          {/* Feature List */}
          <div className="mt-4 bg-gray-50 p-3 rounded-lg flex-grow">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Key Highlights</h3>
            {car.features && car.features.length > 0 ? (
              <ul className="space-y-1.5">
                {car.features.slice(0, 4).map((feature: string, index: number) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 text-[10px] mt-0.5">●</span> {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400 italic">No features listed.</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default CompareColumn;