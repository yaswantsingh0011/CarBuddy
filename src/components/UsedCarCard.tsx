// src/components/UsedCarCard.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // <-- Import zaroori hai
import { FaShareAlt } from 'react-icons/fa';
import { UsedCar } from '@/types'; 

// Interface se 'onViewDetailsClick' hata diya hai
interface UsedCarCardProps {
  car: UsedCar;
  onBookNowClick: () => void;
  onContactSellerClick: () => void;
  onImageClick: (index: number) => void;
}

const UsedCarCard: React.FC<UsedCarCardProps> = ({
  car,
  onBookNowClick,
  onContactSellerClick,
  onImageClick,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carSlug = encodeURIComponent(car.name.toLowerCase().replace(/ /g, '-'));

  return (
    // Main horizontal container
    <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-row relative">

      {/* --- Image Section (Left) --- */}
      <div className="w-5/12 p-4 flex flex-col items-center justify-start">
        {/* Main Image */}
        <div
          className="w-full h-48 relative cursor-pointer mb-3"
          onClick={() => onImageClick(selectedImageIndex)}
        >
          <Image
            src={car.imageUrls[selectedImageIndex]}
            alt={car.name}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        {/* Thumbnails */}
        <div className="flex space-x-2 justify-center">
          {car.imageUrls.map((url, index) => (
            <div
              key={index}
              className={`w-14 h-10 relative cursor-pointer border-2 rounded-sm ${
                selectedImageIndex === index ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={url}
                alt={`${car.name} thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Details Section (Right) --- */}
      <div className="w-7/12 p-4 flex flex-col flex-grow border-l border-gray-100">
        
        {/* Details (Name, Specs, Price) */}
        <div className="flex justify-between items-start">
          <Link href={`/used-cars/${carSlug}`} className="hover:text-blue-600">
            <h2 className="text-xl font-bold text-gray-800">{car.name}</h2>
          </Link>
          <div className="flex space-x-3 text-gray-500">
            <button className="hover:text-blue-600"><FaShareAlt /></button>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 space-x-2 flex-wrap my-2">
          <span>{car.kms}</span>
          <span className="text-gray-300">|</span>
          <span>{car.fuelType}</span>
          <span className="text-gray-300">|</span>
          <span>{car.owner}</span>
          <span className="text-gray-300">|</span>
          <span>{car.modelYear}</span>
        </div>
        <div className="mt-2 mb-4">
          <p className="text-2xl font-bold text-gray-900">₹ {car.price}</p>
          <p className="text-xs text-gray-500 mt-1">*Listing Price in {car.location}</p>
        </div>

        {/* Buttons (mt-auto se neeche rahenge) */}
        <div className="mt-auto flex flex-col space-y-2">
          {/* 'View Details' ab LINK hai */}
          <Link 
            href={`/used-cars/${carSlug}`}
            className="bg-purple-600 text-white text-center font-semibold py-2 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors"
          >
            View Details
          </Link>
          
          {/* Baaki 2 buttons waise hi hain */}
          <button
            onClick={onContactSellerClick}
            className="bg-white text-blue-600 border border-blue-600 font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-50 transition-colors"
          >
            Contact Seller
          </button>
          <button
            onClick={onBookNowClick}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-green-600 transition-colors"
          >
            Book Your Test Drive Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsedCarCard;