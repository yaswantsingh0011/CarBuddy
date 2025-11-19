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

  // --- NEW SHARE FUNCTION ---
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/car/${carSlug}`;
    const shareData = {
      title: name,
      text: `Check out this ${name} on CarBuddy! \nPrice: ${priceRange}\n`,
      url: shareUrl,
    };

    try {
      // Agar Browser Native Share support karta hai (Mobile mostly)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Agar PC hai to Link Copy karega
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!"); // Yahan custom toast bhi laga sakte ho
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
    // CONTAINER: Mobile = Column, PC = Row
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row relative mb-4 h-auto md:min-h-[280px]">

      {/* --- 1. IMAGE SECTION --- */}
      <div className="w-full md:w-[40%] p-2 md:p-3 flex flex-col justify-between bg-white relative">
        
        {/* Main Image */}
        <div
          className="w-full h-48 md:h-full relative cursor-pointer rounded-lg overflow-hidden"
          onClick={() => onImageClick(selectedImageIndex)}
        >
          <Image 
            src={imageUrls[selectedImageIndex]} 
            alt={name} 
            fill 
            className="object-contain"
          />
        </div>
        
        {/* Thumbnails */}
        <div className="hidden md:flex space-x-2 justify-center mt-2 h-12">
          {imageUrls.slice(0, 3).map((url, index) => (
             <div key={index} className={`w-14 relative cursor-pointer border rounded-md ${selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'}`} onClick={() => setSelectedImageIndex(index)}>
                <Image src={url} alt="thumb" fill className="object-cover rounded-md"/>
              </div>
          ))}
        </div>
      </div>

      {/* --- 2. DETAILS SECTION --- */}
      <div className="w-full md:w-[60%] p-4 flex flex-col border-t md:border-t-0 md:border-l border-gray-100"> 
        
        {/* Header: Name & Share Icon */}
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/car/${carSlug}`} className="hover:text-blue-700 transition-colors">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">{name}</h2>
            </Link>
             
             {/* Ratings */}
             <div className="flex items-center mt-1 space-x-2">
              <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded text-xs font-semibold text-gray-700 border border-gray-200">
                <span>{rating.toFixed(1)}</span>
                <FaStar className="h-3 w-3 text-yellow-500 ml-1" />
              </div>
              <span className="text-xs text-gray-500">{reviews} Reviews</span>
             </div>
          </div>
          
          {/* Share Icon with Click Handler */}
          <div className="text-gray-400">
            <button 
                onClick={handleShare} // Yahan function call lagaya
                className="hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                title="Share this car"
            >
                <FaShareAlt size={18} />
            </button>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-3 md:mt-4">
          <p className="text-xl md:text-2xl font-extrabold text-gray-900">{priceRange}</p>
          <p className="text-xs text-gray-500">*Ex-showroom Price in {location}</p>
        </div>

        {/* --- 3. BUTTONS --- */}
        <div className="mt-auto pt-4">
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-2">
                
                <button
                    onClick={onShowFeaturesClick}
                    className="col-span-2 w-full bg-purple-600 text-white font-bold py-2.5 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors uppercase tracking-wide"
                >
                    View Features
                </button>

                <button onClick={onGetOffersClick} className="w-full bg-white text-blue-600 border border-blue-600 font-bold py-2.5 px-4 rounded-md text-sm hover:bg-blue-50 transition-colors">
                    Check Offers
                </button>

                <button onClick={onBookNowClick} className="w-full bg-green-500 text-white font-bold py-2.5 px-4 rounded-md text-sm hover:bg-green-600 transition-colors shadow-sm uppercase tracking-wide">
                   Test Drive
                </button>
            </div>

            {/* Compare Link (Centered) */}
            <div className="mt-3 flex justify-center">
                <button
                    onClick={onAddToCompare}
                    disabled={disableCompare}
                    className={`text-sm flex items-center font-medium transition-colors py-2 px-3 rounded hover:bg-gray-50 ${
                    isSelectedForCompare
                        ? 'text-red-600'
                        : 'text-gray-500 hover:text-blue-600'
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