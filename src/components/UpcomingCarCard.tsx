"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
// ✅ Icons add kiye
import { FaBell, FaPlusCircle, FaCheckCircle } from 'react-icons/fa';

interface UpcomingCarCardProps {
  name: string;
  priceRange: string;
  launchDate: string;
  imageUrl: string;
  slug: string;
  onAlertClick: () => void;
}

const UpcomingCarCard: React.FC<UpcomingCarCardProps> = ({
  name,
  priceRange,
  launchDate,
  imageUrl,
  slug,
  onAlertClick,
}) => {
  
  // ✅ Compare State
  const [isCompared, setIsCompared] = useState(false);

  const detailPageUrl = `/car-details/${slug}`;

  // ✅ Compare Toggle Function
  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCompared(!isCompared);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col h-full relative group">
      
      {/* Clickable Image */}
      <Link href={detailPageUrl} className="relative w-full h-48 bg-gray-100 block cursor-pointer">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Launch Date Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-gray-700 shadow-sm uppercase tracking-wider">
            {launchDate}
        </div>
      </Link>

      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full cursor-pointer hover:bg-white shadow-sm z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Name */}
        <div className="flex justify-between items-start mb-1">
            <Link href={detailPageUrl} className="hover:text-blue-600 transition-colors">
               <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
            </Link>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mb-1">{priceRange}</p>
        <p className="text-xs text-gray-500 mb-4">Estimated Price</p>

        {/* Buttons (Alert + Compare) */}
        <div className="mt-auto flex flex-col gap-2">
            
            {/* Alert Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); onAlertClick(); }}
                className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-600 font-bold py-2.5 rounded-lg text-sm hover:bg-red-50 transition-colors uppercase tracking-wider"
            >
                <FaBell size={14} />
                Alert Me When Launched
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

export default UpcomingCarCard;