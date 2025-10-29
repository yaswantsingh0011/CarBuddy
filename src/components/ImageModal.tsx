// src/components/ImageModal.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrls: string[]; // 'imageUrl' की जगह 'imageUrls' (ऐरे)
  startIndex: number; // कहाँ से शुरू करना है
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrls, startIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // जब भी startIndex बदले (यूजर नई थंबनेल पर क्लिक करे), तो Modal का इंडेक्स अपडेट करें
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  if (!isOpen) return null;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Modal को बंद होने से रोकें
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Modal को बंद होने से रोकें
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
      onClick={onClose} 
    >
      <button 
        className="absolute top-6 right-6 text-white text-3xl z-50 hover:opacity-75"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Left Arrow */}
      <button 
        className="absolute left-4 md:left-10 text-white text-4xl z-50 hover:opacity-75"
        onClick={goToPrevious}
      >
        <FaChevronLeft />
      </button>
      
      {/* Right Arrow */}
      <button 
        className="absolute right-4 md:right-10 text-white text-4xl z-50 hover:opacity-75"
        onClick={goToNext}
      >
        <FaChevronRight />
      </button>

      {/* Image Container */}
      <div 
        className="relative w-full h-full max-w-4xl max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} 
      >
        <Image
          src={imageUrls[currentIndex]} // सिर्फ 'currentIndex' वाली इमेज दिखाएं
          alt="Enlarged car view"
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-lg"
          priority // मेन इमेज को जल्दी लोड करें
        />
      </div>
    </div>
  );
};

export default ImageModal;