"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShareAlt, FaPlus } from 'react-icons/fa';

interface CarGridCardProps {
  name: string;
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
        await navigator.share({
          title: name,
          text: `Check out ${name}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row relative mb-6 w-full">

      {/* IMAGE SECTION */}
      <div className="w-full md:w-[40%] relative p-2 md:p-3 flex flex-col justify-between">
        <div
          className="w-full h-56 md:h-full md:min-h-[240px] relative cursor-pointer rounded-lg overflow-hidden"
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
        <div className="hidden md:flex space-x-2 justify-center mt-2 h-14">
          {imageUrls.slice(0, 4).map((url, index) => (
            <div
              key={index}
              className={`w-16 relative cursor-pointer border rounded-md ${
                selectedImageIndex === index
                  ? "border-blue-600"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image src={url} alt="thumb" fill className="object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="w-full md:w-[60%] p-4 flex flex-col border-t md:border-l border-gray-100">

        {/* NAME & SHARE */}
        <div className="flex justify-between items-start">
          <Link href={`/car/${carSlug}`}>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 hover:text-blue-700">
              {name}
            </h2>
          </Link>

          <button
            onClick={handleShare}
            className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-gray-50 transition"
            title="Share"
          >
            <FaShareAlt size={18} />
          </button>
        </div>

        {/* PRICE */}
        <div className="mt-3 md:mt-5">
          <p className="text-xl md:text-2xl font-extrabold text-gray-900">{priceRange}</p>
          <p className="text-xs text-gray-500">*Ex-showroom price in {location}</p>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 md:mt-auto">
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:gap-2">

            <button
              onClick={onShowFeaturesClick}
              className="col-span-2 w-full bg-purple-600 text-white font-bold py-2.5 rounded-md hover:bg-purple-700 text-sm"
            >
              View Features
            </button>

            <button
              onClick={onGetOffersClick}
              className="bg-white text-blue-600 border border-blue-600 font-bold py-2.5 rounded-md hover:bg-blue-50 text-xs sm:text-sm"
            >
              Check Offers
            </button>

            <button
              onClick={onBookNowClick}
              className="bg-green-500 text-white font-bold py-2.5 rounded-md hover:bg-green-600 text-xs sm:text-sm shadow-sm"
            >
              Test Drive
            </button>
          </div>

          {/* Compare */}
          <div className="mt-3 flex justify-center">
            <button
              onClick={onAddToCompare}
              disabled={disableCompare}
              className={`text-xs sm:text-sm flex items-center font-medium py-2 px-3 rounded hover:bg-gray-50 ${
                isSelectedForCompare ? "text-red-600" : "text-gray-500 hover:text-blue-600"
              } ${disableCompare ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaPlus
                className={`mr-2 ${isSelectedForCompare ? "rotate-45" : ""} transition`}
                size={12}
              />
              {isSelectedForCompare ? "Remove from Compare" : "Add to Compare"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarGridCard;
