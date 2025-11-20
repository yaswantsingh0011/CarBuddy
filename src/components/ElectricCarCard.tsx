"use client";

import React from 'react';
import Image from 'next/image';

interface ElectricCarCardProps {
  name: string;
  priceRange: string;
  imageUrl: string;
  onOfferClick: () => void;
}

const ElectricCarCard: React.FC<ElectricCarCardProps> = ({
  name,
  priceRange,
  imageUrl,
  onOfferClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full p-3">
      
      {/* Image Section */}
      {/* CHANGE: 'bg-gray-100' hata diya, ab zaroorat nahi */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          // CHANGE: 'object-contain' hata kar 'object-cover' lagaya
          // Ab image poori fail jayegi (Full Width/Height)
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{priceRange}</p>
        </div>

        {/* Button */}
        <button 
          onClick={onOfferClick}
          className="w-full border border-orange-500 text-orange-600 font-bold py-2.5 rounded-lg hover:bg-orange-50 transition-colors text-sm"
        >
          View Details
        </button>
      </div>

    </div>
  );
};

export default ElectricCarCard;