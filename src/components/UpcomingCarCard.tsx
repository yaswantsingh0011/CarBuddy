// src/components/UpcomingCarCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Link import kiya
import { FaBell } from 'react-icons/fa';

interface UpcomingCarCardProps {
  slug: string; // 2. Slug add kiya prop mai
  name: string;
  priceRange: string;
  launchDate: string;
  imageUrl: string;
  onAlertClick: () => void;
}

const UpcomingCarCard: React.FC<UpcomingCarCardProps> = ({
  slug, // 3. Slug destructure kiya
  name,
  priceRange,
  launchDate,
  imageUrl,
  onAlertClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      
      {/* Image Section ko Link bana diya */}
      <Link href={`/upcoming/${slug}`} className="relative w-full h-48 block cursor-pointer">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Expected Launch Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-gray-700 shadow-sm border border-gray-200 uppercase tracking-wide">
          Expected Launch : {launchDate}
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        
        {/* Title aur Price ko Link bana diya */}
        <Link href={`/upcoming/${slug}`} className="block cursor-pointer">
          <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-orange-600 transition-colors">{name}</h3>
          <div className="flex items-baseline space-x-1">
            <p className="text-base font-semibold text-gray-800">{priceRange}</p>
            <span className="text-xs text-gray-500">Estimated</span>
          </div>
        </Link>

        {/* Alert Button (Isme Link nahi lagaya) */}
        <button 
          onClick={(e) => {
             e.preventDefault(); // Link click hone se rokne ke liye
             onAlertClick();
          }}
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