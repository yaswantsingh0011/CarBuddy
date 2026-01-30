'use client';

import React from 'react';
import Image from 'next/image';
import { FaBolt, FaTag, FaGasPump, FaRegHeart, FaHeart, FaExchangeAlt } from 'react-icons/fa'; 
import { useLocation } from '@/context/LocationContext';
import { useShortlist } from '@/context/ShortlistContext'; 
import { useCompare } from '@/context/CompareContext'; // ✅ Tera Compare Hook

const ElectricCarCard: React.FC<any> = ({ 
  id, name, priceRange, imageUrl, images, fuelType, slug, onOfferClick, onDetailClick 
}) => {
  const { city, getPriceForCity } = useLocation();
  const { toggleShortlist, isShortlisted } = useShortlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare(); // ✅ Context Functions

  const shortlisted = isShortlisted(id || name);
  const inCompare = isInCompare(id || name); // ✅ Check if car is already in compare

  // Comparison toggle logic
  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(id || name);
    } else {
      addToCompare({ id, name, priceRange, imageUrl, images, fuelType, slug });
    }
  };

  let finalImg = imageUrl || (images && images[0]) || "/cars/placeholder.jpg";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all relative flex flex-col h-full group cursor-pointer" onClick={onDetailClick}>
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image src={finalImg} alt={name} fill className="object-cover group-hover:scale-105 transition-all" unoptimized />

        {/* ✅ Compare Icon (Top Left): Blue if active */}
        <button 
          onClick={handleCompareToggle}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10 transition-all ${
            inCompare ? 'bg-blue-600 text-white' : 'bg-white/90 text-gray-700 hover:text-blue-600'
          }`}
        >
          <FaExchangeAlt className="text-sm" />
        </button>

        {/* Favorite Icon (Top Right) */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleShortlist({ id, name, priceRange, imageUrl, images, fuelType, slug }); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md z-10"
        >
          {shortlisted ? <FaHeart className="text-red-500 text-sm" /> : <FaRegHeart className="text-gray-700 text-sm" />}
        </button>

        <div className="absolute bottom-2 left-2">
          <span className="bg-white/90 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm uppercase">
            {fuelType === 'Electric' ? <FaBolt className="text-green-600"/> : <FaGasPump className="text-blue-600"/>} 
            {fuelType || "Petrol"}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{name}</h3>
        <p className="text-xl font-black text-gray-900">{getPriceForCity(priceRange)}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <button className="border border-blue-600 text-blue-600 py-2 rounded-lg font-bold text-xs uppercase hover:bg-blue-50">Details</button>
          <button className="bg-blue-600 text-white py-2 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-1" onClick={(e) => { e.stopPropagation(); onOfferClick(); }}>
            <FaTag /> Offers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricCarCard;