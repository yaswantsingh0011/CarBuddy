'use client';

import React from 'react';
import Image from 'next/image';
import { FaBolt, FaTag, FaGasPump } from 'react-icons/fa'; 

interface ElectricCarCardProps {
  id?: number | string; 
  name: string;
  priceRange: string;
  imageUrl: string;
  fuelType?: string; 
  onOfferClick: () => void;
}

const ElectricCarCard: React.FC<ElectricCarCardProps> = ({ 
  id, 
  name, 
  priceRange, 
  imageUrl, 
  fuelType = "Petrol", 
  onOfferClick 
}) => {
  // Check if car is Electric
  const isElectric = fuelType.toLowerCase() === "electric" || name.toLowerCase().includes("ev");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full relative group">
      
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Dynamic Badge */}
        {isElectric ? (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
                <FaBolt className="mr-1" /> ELECTRIC
            </div>
        ) : (
            <div className="absolute top-3 right-3 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center shadow-sm opacity-90">
                <FaGasPump className="mr-1" /> {fuelType.toUpperCase()}
            </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1" title={name}>{name}</h3>
        
        <div className="mb-4">
            <p className="text-blue-600 font-extrabold text-lg">
                {priceRange}
            </p>
            <p className="text-xs text-gray-500 font-medium">
                Avg. Ex-Showroom Price
            </p>
        </div>

        <div className="mt-auto flex gap-2">
          <button className="flex-1 bg-white border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
            View Details
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onOfferClick(); }}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center"
          >
             <FaTag className="mr-1" /> Offers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricCarCard;