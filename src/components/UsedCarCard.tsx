"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { UsedCar } from '@/types'; 

interface UsedCarCardProps {
  car: UsedCar;
}

const UsedCarCard: React.FC<UsedCarCardProps> = ({ car }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const carSlug = car.name ? encodeURIComponent(car.name.toLowerCase().replace(/ /g, '-')) : '#';

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      
      {/* --- IMAGE SECTION --- */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
         <Link href={`/used-cars/${carSlug}`}>
            <Image
                src={car.imageUrls?.[0] || "/cars/placeholder.jpg"}
                alt={car.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
         </Link>

         {/* Heart Icon (Top Right) - Optional, image style doesn't strictly have it but good for UX */}
         <button 
            onClick={toggleWishlist}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100"
         >
            {isWishlisted ? <FaHeart className="text-red-500 text-sm" /> : <FaRegHeart className="text-gray-600 text-sm hover:text-red-500" />}
         </button>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Title */}
        <Link href={`/used-cars/${carSlug}`}>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                {car.name}
            </h3>
        </Link>

        {/* Rating Row (Green Box style as per image) */}
        <div className="flex items-center mt-2 mb-3">
            <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                {car.rating || 4.5} <FaStar size={10} />
            </div>
            <span className="text-gray-500 text-xs ml-2 font-medium">
                ({car.reviewCount || 20} Reviews)
            </span>
        </div>

        {/* Price Section */}
        <div className="mt-1">
            <p className="text-xl font-bold text-gray-900">₹ {car.price}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">*Ex-showroom price in {car.location}</p>
        </div>

        {/* Button Section (Outline Blue Style) */}
        <div className="mt-auto pt-5">
            <Link href={`/used-cars/${carSlug}`} className="block w-full">
                <button className="w-full border border-blue-600 text-blue-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    View Details
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default UsedCarCard;