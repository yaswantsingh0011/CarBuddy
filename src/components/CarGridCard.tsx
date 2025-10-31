// src/components/CarGridCard.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { FaStar, FaRegStar, FaShareAlt, FaRegHeart, FaHeart, FaPlus } from 'react-icons/fa'; 
import { useAuth } from '@/context/AuthContext'; // <-- Sahi Casing

interface CarGridCardProps {
  // ... (props interface)
}

const CarGridCard: React.FC<CarGridCardProps> = ({
  // ... (props)
}) => {
  // ... (state)
  const { user, isInWishlist, addToWishlist, removeFromWishlist } = useAuth(); 
  const isWishlisted = isInWishlist(name);

  const handleWishlistToggle = () => {
    // ... (wishlist logic)
  };

  const carSlug = encodeURIComponent(name.toLowerCase().replace(/ /g, '-'));

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-row relative">
      {/* --- Image Section --- */}
      <div className="w-5/12 p-4 flex flex-col items-center justify-between h-full">
        {/* ... (image and thumbnails) ... */}
      </div>

      {/* --- Details Section --- */}
      <div className="w-7/1Course p-4 flex flex-col flex-grow border-l border-gray-100"> 
        <div className="flex justify-between items-start">
          <Link href={`/car/${carSlug}`} className="hover:text-blue-600">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          </Link>
          <div className="flex space-x-3 text-gray-500">
            <button onClick={handleWishlistToggle} className={isWishlisted ? "text-red-500" : "hover:text-red-500"}>
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button className="hover:text-blue-600"><FaShareAlt /></button>
          </div>
        </div>
         {/* ... (rating, price, buttons) ... */}
      </div>
    </div>
  );
};

export default CarGridCard;