// src/components/CarDetailSection.tsx

import React from 'react';
import Image from 'next/image';

interface CarDetailProps {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrl: string;
  onBookNowClick: () => void;
  onGetOffersClick: () => void;
}

const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg> );
const ShareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" /></svg> );
const StarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> );

const CarDetailSection: React.FC<CarDetailProps> = ({
  name,
  rating,
  reviews,
  priceRange,
  location,
  imageUrl,
  onBookNowClick,
  onGetOffersClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex">
      <div className="w-1/2 relative">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="contain" // Changed from "cover" to "contain"
        />
      </div>

      <div className="w-1/2 p-4 flex flex-col">
        <div className="flex justify-end space-x-3">
          <HeartIcon />
          <ShareIcon />
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mt-1">{name}</h2>
        
        <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center">
              <StarIcon />
              <span className="text-sm text-gray-600 ml-1">{rating}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-600">{reviews} Reviews</span>
        </div>

        <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{priceRange}</p>
            <p className="text-xs text-gray-500 mt-1">*Ex-showroom Price in {location}</p>
        </div>

        <div className="mt-auto pt-4 flex flex-col space-y-2">
            <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-red-700 transition-colors">
                Get On-Road Price
            </button>
            <button
              onClick={onGetOffersClick}
              className="bg-white text-blue-600 border border-blue-600 font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-50 transition-colors"
            >
              Get Current Offers
            </button>
            <button 
              onClick={onBookNowClick} 
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-green-600 transition-colors"
            >
              Book Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailSection;