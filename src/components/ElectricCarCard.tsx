"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// ✅ Icons Import kiye
import { FaPlusCircle, FaCheckCircle } from 'react-icons/fa';

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
  
  // ✅ Compare State
  const [isCompared, setIsCompared] = useState(false);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Parent card click hone se rokega
    setIsCompared(!isCompared);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full p-3 group">
      
      {/* Image Section */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{priceRange}</p>
        </div>

        {/* Buttons Section */}
        <div className="mt-auto flex flex-col gap-2">
            
            {/* Offer Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); 
                onOfferClick();      
              }}
              className="w-full border border-orange-500 text-orange-600 font-bold py-2.5 rounded-lg hover:bg-orange-50 transition-colors text-sm"
            >
              View Current Offers
            </button>

            {/* ✅ ADD TO COMPARE BUTTON */}
            <button 
                onClick={toggleCompare}
                className={`w-full flex items-center justify-center gap-2 text-sm font-medium transition-colors py-1 ${
                    isCompared ? 'text-green-600' : 'text-gray-500 hover:text-gray-900'
                }`}
            >
                {isCompared ? <FaCheckCircle /> : <FaPlusCircle />}
                {isCompared ? "Added to Compare" : "Add to Compare"}
            </button>

        </div>
      </div>

    </div>
  );
};

export default ElectricCarCard;