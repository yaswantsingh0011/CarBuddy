'use client';

import React from 'react';
import Image from 'next/image';
import { FaBolt, FaTag, FaExchangeAlt, FaGasPump, FaHeart, FaRegHeart } from 'react-icons/fa'; 
import { useLocation } from '@/context/LocationContext';
import { useCompare } from '@/context/CompareContext'; 
import { useShortlist } from '@/context/ShortlistContext';

interface ElectricCarCardProps {
  id?: number | string; 
  name: string;
  priceRange: string;
  imageUrl: string;
  fuelType?: string; 
  enableLocationLogic?: boolean;
  
  // Data for Compare/Details
  specs?: any; 
  features?: string[];
  images?: string[]; 

  onOfferClick: () => void;
  onDetailClick?: () => void;
}

const ElectricCarCard: React.FC<ElectricCarCardProps> = ({ 
  id, name, priceRange, imageUrl, fuelType = "Petrol", enableLocationLogic = true,
  specs, features, images, 
  onOfferClick, onDetailClick 
}) => {
  // --- Contexts ---
  const locationContext = useLocation();
  const compareContext = useCompare();
  const shortlistContext = useShortlist();

  // --- Safe Fallbacks ---
  const city = locationContext?.city || "Jaipur";
  const getPriceForCity = locationContext?.getPriceForCity || ((p: string) => p);
  
  const addToCompare = compareContext?.addToCompare || (() => {});
  const removeFromCompare = compareContext?.removeFromCompare || (() => {});
  const isInCompare = compareContext?.isInCompare || (() => false);

  const toggleShortlist = shortlistContext?.toggleShortlist || (() => {});
  const isShortlisted = shortlistContext?.isShortlisted || (() => false);

  // --- Logic ---
  const carId = id || name;
  const isCompared = isInCompare(carId);
  const isSaved = isShortlisted(carId);
  
  const displayPrice = enableLocationLogic ? getPriceForCity(priceRange) : priceRange;
  const locationText = enableLocationLogic ? `Ex-Showroom ${city}` : "Avg. Ex-Showroom Price";
  const isElectric = fuelType.toLowerCase() === "electric" || name.toLowerCase().includes("ev");

  // --- Handlers ---
  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (isCompared) {
        removeFromCompare(carId);
    } else {
        addToCompare({ 
            id: carId, name, priceRange, imageUrl, fuelType,
            specs, features, images: images || [imageUrl] 
        });
    }
  };

  const handleShortlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleShortlist({ 
        id: carId, name, priceRange, imageUrl, fuelType,
        specs, features, images: images || [imageUrl] 
    });
  };

  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full relative group cursor-pointer"
        onClick={onDetailClick} 
    >
      
      {/* 1. COMPARE BUTTON (Top Left) */}
      <button 
        onClick={handleCompareClick}
        className={`absolute top-3 left-3 z-20 p-2 rounded-full shadow-md transition-colors ${
            isCompared ? 'bg-orange-600 text-white' : 'bg-white text-gray-400 hover:text-orange-600'
        }`}
        title={isCompared ? "Remove from Compare" : "Add to Compare"}
      >
        <FaExchangeAlt size={14} />
      </button>

      {/* 2. SHORTLIST / HEART BUTTON (Top Right) */}
      <button 
        onClick={handleShortlistClick}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-md transition-colors ${
            isSaved ? 'bg-white text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
        }`}
        title={isSaved ? "Remove from Shortlist" : "Add to Shortlist"}
      >
        {isSaved ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
      </button>

      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image 
            src={imageUrl} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* ❌ Removed Badge From Here */}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* ✅ NEW LAYOUT: Name + Badge in one row */}
        <div className="flex justify-between items-start gap-2 mb-1">
            
            {/* Name */}
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1 flex-1" title={name}>
                {name}
            </h3>

            {/* ✅ Badge Moved Here */}
            {isElectric ? (
                <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-1 rounded flex items-center shrink-0 uppercase tracking-wide">
                    <FaBolt className="mr-1" /> EV
                </span>
            ) : (
                <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[10px] font-bold px-2 py-1 rounded flex items-center shrink-0 uppercase tracking-wide">
                    <FaGasPump className="mr-1" /> {fuelType}
                </span>
            )}
        </div>
        
        {/* Price */}
        <div className="mb-4">
            <p className="text-blue-600 font-extrabold text-lg">
                {displayPrice}
            </p>
            <p className="text-xs text-gray-500 font-medium">
                {locationText}
            </p>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <button 
            onClick={(e) => { 
                e.stopPropagation(); 
                if(onDetailClick) onDetailClick(); 
            }}
            className="flex-1 bg-white border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
          >
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