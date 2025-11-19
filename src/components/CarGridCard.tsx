"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { FaStar, FaShareAlt, FaPlus } from 'react-icons/fa'; 

interface CarGridCardProps {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrls: string[];
  onBookNowClick: () => void;
  onGetOffersClick: () => void;
  onImageClick: (index: number) => void;
  onShowFeaturesClick: () => void;
  onAddToCompare: () => void;
  isSelectedForCompare: boolean;
  compareCount: number;
}

const CarGridCard: React.FC<CarGridCardProps> = ({
  name,
  rating,
  reviews,
  priceRange,
  location,
  imageUrls,
  onBookNowClick,
  onGetOffersClick,
  onImageClick,
  onShowFeaturesClick,
  onAddToCompare,
  isSelectedForCompare,
  compareCount,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const disableCompare = !isSelectedForCompare && compareCount >= 4;
  const carSlug = encodeURIComponent(name.toLowerCase().replace(/ /g, '-'));

  // Share Function
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/car/${carSlug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `Check out ${name}`, url: shareUrl });
      } catch (err) { console.log(err); }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  };

  return (
    // CONTAINER FIX: 
    // 'flex-col' (Mobile: Upar se niche) 
    // 'md:flex-row' (PC: Left se Right)
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row relative mb-6 w-full">

      {/* --- 1. IMAGE SECTION --- */}
      {/* Mobile: Height fixed (h-48) aur Width Full. PC: Height Full aur Width 40% */}
      <div className="w-full md:w-[40%] bg-white relative p-2 md:p-3 flex flex-col justify-between">
        
        {/* Main Image */}
        <div
          className="w-full h-48 md:h-full min-h-[180px] relative cursor-pointer rounded-lg overflow-hidden"
          onClick={() => onImageClick(selectedImageIndex)}
        >
          <Image 
            src={imageUrls[selectedImageIndex]} 
            alt={name} 
            fill 
            className="object-contain" 
          />
        </div>
        
        {/* Thumbnails (Mobile par hide, PC par show) */}
        <div className="hidden md:flex space-x-2 justify-center mt-2 h-12">
          {imageUrls.slice(0, 3).map((url, index) => (
             <div key={index} className={`w-14 relative cursor-pointer border rounded-md ${selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'}`} onClick={() => setSelectedImageIndex(index)}>
                <Image src={url} alt="thumb" fill className="object-cover rounded-md"/>
              </div>
          ))}
        </div>
      </div>

      {/* --- 2. DETAILS SECTION --- */}
      {/* Mobile: Width 100%. PC: Width 60% */}
      <div className="w-full md:w-[60%] p-4 flex flex-col border-t md:border-t-0 md:border-l border-gray-100"> 
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/car/${carSlug}`} className="hover:text-blue-700 transition-colors">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">{name}</h2>
            </Link>
             <div className="flex items-center mt-1 space-x-2">
              <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded text-xs font-semibold text-gray-700 border border-gray-200">
                <span>{rating.toFixed(1)}</span>
                <FaStar className="h-3 w-3 text-yellow-500 ml-1" />
              </div>
              <span className="text-xs text-gray-500">{reviews} Reviews</span>
             </div>
          </div>
          <button onClick={handleShare} className="text-gray-400 hover:text-blue-600 p-1">
            <FaShareAlt size={18} />
          </button>
        </div>

        {/* Price */}
        <div className="mt-3 md:mt-4">
          <p className="text-xl md:text-2xl font-extrabold text-gray-900">{priceRange}</p>
          <p className="text-xs text-gray-500">*Ex-showroom Price in {location}</p>
        </div>

        {/* --- 3. BUTTONS (Mobile Grid Fix) --- */}
        <div className="mt-6 md:mt-auto">
            {/* MOBILE: Grid (Features upar, Offers+TestDrive niche)
               PC: Flex Column (Sab ek ke neeche ek stacked) 
            */}
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:gap-2">
                
                {/* View Features: Mobile (Full Width), PC (Stacked) */}
                <button
                    onClick={onShowFeaturesClick}
                    className="col-span-2 w-full bg-purple-600 text-white font-bold py-2.5 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors uppercase tracking-wide"
                >
                    View Features
                </button>

                {/* Check Offers */}
                <button onClick={onGetOffersClick} className="col-span-1 w-full bg-white text-blue-600 border border-blue-600 font-bold py-2.5 px-2 rounded-md text-xs sm:text-sm hover:bg-blue-50 transition-colors">
                    Check Offers
                </button>

                {/* Test Drive */}
                <button onClick={onBookNowClick} className="col-span-1 w-full bg-green-500 text-white font-bold py-2.5 px-2 rounded-md text-xs sm:text-sm hover:bg-green-600 transition-colors shadow-sm uppercase tracking-wide">
                   Test Drive
                </button>
            </div>

            {/* Compare Link */}
            <div className="mt-3 flex justify-center">
                <button
                    onClick={onAddToCompare}
                    disabled={disableCompare}
                    className={`text-xs sm:text-sm flex items-center font-medium transition-colors py-2 px-3 rounded hover:bg-gray-50 ${
                    isSelectedForCompare ? 'text-red-600' : 'text-gray-500 hover:text-blue-600'
                    } ${disableCompare ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <FaPlus className={`mr-2 ${isSelectedForCompare ? 'rotate-45' : ''} transition-transform`} size={12}/>
                    {isSelectedForCompare ? 'Remove from Compare' : 'Add to Compare'}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CarGridCard;