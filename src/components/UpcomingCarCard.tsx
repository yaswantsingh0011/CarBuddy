'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBell, FaCalendarAlt } from 'react-icons/fa';

interface UpcomingCarCardProps {
  slug: string;
  name: string;
  priceRange: string;
  launchDate: string;
  imageUrl: string;
  onAlertClick: () => void;
}

const UpcomingCarCard: React.FC<UpcomingCarCardProps> = ({ 
  slug, 
  name, 
  priceRange, 
  launchDate, 
  imageUrl, 
  onAlertClick 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full group relative">
      
      {/* Image Section */}
      <Link href={`/car-details/${slug}`} className="relative h-48 w-full bg-gray-100 overflow-hidden block">
        <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Label */}
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            UPCOMING
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/car-details/${slug}`} className="block">
            <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-orange-600 transition-colors line-clamp-1" title={name}>
                {name}
            </h3>
        </Link>
        
        <div className="mb-4">
            <p className="text-blue-600 font-extrabold text-lg">
                {priceRange}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1 font-medium">
                <FaCalendarAlt className="mr-1" /> 
                <span>Launch: {launchDate}</span>
            </div>
        </div>

        {/* Notify Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAlertClick();
          }}
          className="mt-auto w-full bg-white border border-orange-500 text-orange-600 py-2 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
        >
           <FaBell /> Notify Me
        </button>
      </div>
    </div>
  );
};

export default UpcomingCarCard;