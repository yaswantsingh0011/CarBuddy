// src/components/CarGridCard.tsx

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { FaStar, FaRegStar, FaShareAlt, FaRegHeart, FaHeart, FaPlus } from 'react-icons/fa'; 
import { useAuth } from '@/context/AuthContext'; 

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

  const { user, isInWishlist, addToWishlist, removeFromWishlist } = useAuth(); 
  const isWishlisted = isInWishlist(name);

  const handleWishlistToggle = () => {
    if (!user) {
      alert("Please login to add items to your wishlist.");
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(name);
    } else {
      addToWishlist(name);
    }
  };

  const carSlug = encodeURIComponent(name.toLowerCase().replace(/ /g, '-'));

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-row relative">

      {/* --- Image Section --- */}
      <div className="w-5/12 p-4 flex flex-col items-center justify-between h-full">
        <div
          className="w-full h-52 relative cursor-pointer mb-2 flex-grow"
          onClick={() => onImageClick(selectedImageIndex)}
        >
          <Image src={imageUrls[selectedImageIndex]} alt={name} fill style={{ objectFit: 'contain' }} />
        </div>
        <div className="flex space-x-2 justify-center mt-2 flex-shrink-0">
          {imageUrls.map((url, index) => (
             <div key={index} className={`w-12 h-8 relative cursor-pointer border-2 rounded-sm ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`} onClick={() => setSelectedImageIndex(index)}>
                <Image src={url} alt={`${name} thumbnail ${index+1}`} fill style={{ objectFit: 'cover' }} className="rounded-sm"/>
              </div>
          ))}
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="w-7/12 p-4 flex flex-col flex-grow border-l border-gray-100"> 
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
         <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => i < Math.round(rating) ? <FaStar key={i} className="h-4 w-4 text-yellow-400" /> : <FaRegStar key={i} className="h-4 w-4 text-yellow-400" />)}
            <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-600">{reviews} Reviews</span>
         </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-900">{priceRange}</p>
          <p className="text-xs text-gray-500 mt-1">*Ex-showroom Price in {location}</p>
        </div>
        <div className="mt-auto pt-4 flex flex-col space-y-2">
          <button
            onClick={onShowFeaturesClick}
            className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors"
          >
            View Features
          </button>
          <button onClick={onGetOffersClick} className="bg-white text-blue-600 border border-blue-600 font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-50 transition-colors">
            Get Current Offers
          </button>
          <button onClick={onBookNowClick} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-green-600 transition-colors">
            Book Your Test Drive Now
          </button>
          <button
            onClick={onAddToCompare}
            disabled={disableCompare}
            className={`mt-1 text-xs py-1 px-2 rounded flex items-center justify-center transition-colors ${
              isSelectedForCompare
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${disableCompare ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaPlus className={`mr-1 ${isSelectedForCompare ? 'hidden' : 'inline'}`} size={10}/>
            {isSelectedForCompare ? 'Remove from Compare' : 'Add to Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarGridCard;