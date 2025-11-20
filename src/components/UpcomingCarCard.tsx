// src/components/UpcomingCarCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { FaBell } from 'react-icons/fa';

interface UpcomingCarCardProps {
  name: string;
  priceRange: string;
  launchDate: string; // Ye hum location field se utha lenge
  imageUrl: string;
  onAlertClick: () => void;
}

const UpcomingCarCard: React.FC<UpcomingCarCardProps> = ({
  name,
  priceRange,
  launchDate,
  imageUrl,
  onAlertClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative w-full h-48">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        
        {/* Expected Launch Badge (Top Left) */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-gray-700 shadow-sm border border-gray-200 uppercase tracking-wide">
          Expected Launch : {launchDate}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
          <div className="flex items-baseline space-x-1">
            <p className="text-base font-semibold text-gray-800">{priceRange}</p>
            <span className="text-xs text-gray-500">Estimated</span>
          </div>
        </div>

        {/* Alert Button */}
        <button 
          onClick={onAlertClick}
          className="mt-4 w-full flex items-center justify-center space-x-2 border border-red-500 text-red-600 font-bold py-2.5 rounded-lg hover:bg-red-50 transition-colors text-sm uppercase"
        >
          <FaBell size={14} />
          <span>Alert Me When Launched</span>
        </button>
      </div>

    </div>
  );
};

export default UpcomingCarCard;