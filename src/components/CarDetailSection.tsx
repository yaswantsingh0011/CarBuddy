// src/components/CarDetailSection.tsx

"use client"; 

import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal'; 

// --- Props Interface (अपडेट किया हुआ) ---
interface CarDetailProps {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrls: string[]; // 'imageUrl' की जगह 'imageUrls' (ऐरे)
  onBookNowClick: () => void;
  onGetOffersClick: () => void;
}

// --- SVG Icons (आपका कोड) ---
const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg> );
const ShareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" /></svg> );
const StarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> );

// --- Component (अपडेट किया हुआ) ---
const CarDetailSection: React.FC<CarDetailProps> = ({
  name,
  rating,
  reviews,
  priceRange,
  location,
  imageUrls, // imageUrls ऐरे का इस्तेमाल करें
  onBookNowClick,
  onGetOffersClick,
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // कौनसी इमेज दिखानी है, उसका इंडेक्स

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index); // मेन इमेज को भी अपडेट करें
    setIsImageModalOpen(true); // Modal खोलें
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex">
        
        {/* --- Image Section (अपडेट किया हुआ) --- */}
        <div className="w-1/2 p-4">
          {/* Main Image */}
          <div 
            className="w-full h-48 relative cursor-pointer" 
            onClick={() => openImageModal(selectedImageIndex)}
          >
            <Image
              src={imageUrls[selectedImageIndex]} // सिर्फ पहली नहीं, बल्कि 'selected' इमेज दिखाएं
              alt={name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex space-x-2 mt-2">
            {imageUrls.map((url, index) => (
              <div 
                key={url}
                className={`w-16 h-12 relative cursor-pointer border-2 ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedImageIndex(index)} // क्लिक पर मेन इमेज बदलें
              >
                <Image src={url} alt={`${name} thumbnail ${index+1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* --- Details Column (आपका कोड) --- */}
        <div className="w-1/2 p-4 flex flex-col">
          {/* ... (आपका डिटेल्स वाला कोड यहाँ से ... */}
          <div className="flex justify-end space-x-3">
            <HeartIcon />
            <ShareIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-1">{name}</h2>
          {/* ... बाकी डिटेल्स ... */}
          <div className="mt-auto pt-4 flex flex-col space-y-2">
            {/* ... बटन्स ... */}
            <button 
              onClick={onBookNowClick} 
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-green-600 transition-colors"
            >
              Book Now
            </button>
          </div>
          {/* ... यहाँ तक) ... */}
        </div>
      </div>

      {/* इमेज Modal (अपडेट किया हुआ) */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrls={imageUrls} // पूरा ऐरे पास करें
        startIndex={selectedImageIndex} // बताएं कि कौनसी इमेज से शुरू करना है
      />
    </>
  );
};

export default CarDetailSection;