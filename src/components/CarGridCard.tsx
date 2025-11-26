"use client";

import React from "react";

interface Props {
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

export default function CarGridCard({
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
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">

      {/* Left Side Image */}
      <div className="w-full md:w-1/2">
        <img
          src={imageUrls[0]}
          alt={name}
          className="w-full h-56 object-cover rounded-xl cursor-pointer"
          onClick={() => onImageClick(0)}
        />

        {/* Thumbnail Row */}
        <div className="flex gap-2 mt-3">
          {imageUrls.slice(0, 4).map((url, index) => (
            <img
              key={index}
              src={url}
              alt="thumbnail"
              className="w-16 h-14 object-cover rounded-md cursor-pointer border"
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 flex flex-col justify-between px-2 py-2">

        {/* TITLE (fixed spacing) */}
        <h2 className="text-[20px] font-semibold text-gray-900 leading-tight mt-0 pt-0">
          {name}
        </h2>

        <p className="text-gray-500 text-sm mb-3">
          *Ex-showroom price in {location}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onShowFeaturesClick}
            className="w-full py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: "#8b2cff" }}
          >
            View Features
          </button>

          <button
            onClick={onGetOffersClick}
            className="w-full py-3 rounded-lg font-semibold text-blue-600 border border-blue-500"
          >
            Check Offers
          </button>

          <button
            onClick={onBookNowClick}
            className="w-full py-3 rounded-lg font-semibold text-white bg-green-600"
          >
            Test Drive
          </button>
        </div>

        {/* Compare Button */}
        <button
          onClick={onAddToCompare}
          className="mt-4 text-gray-700 text-sm flex items-center gap-2"
        >
          {isSelectedForCompare ? "✓ Added" : "+ Add to Compare"}
        </button>
      </div>
    </div>
  );
}
