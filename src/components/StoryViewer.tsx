'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface StoryViewerProps {
  stories: any[];
  startIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose }) => {
  // Current Story aur Slide ka State
  const [currentStoryIndex, setCurrentStoryIndex] = useState(startIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentStory = stories[currentStoryIndex];
  // Fallback: Agar slides nahi hain to cover image hi dikhaye
  const slides = currentStory.slides || [{ image: currentStory.coverImage, text: currentStory.title }];
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  // --- Auto Play Logic (5 Seconds) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); 
    return () => clearTimeout(timer);
  }, [currentSlideIndex, currentStoryIndex]);

  // --- Navigation Logic ---
  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      // Next Slide
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      // Next Story (Start from 0)
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentSlideIndex(0);
    } else {
      // End
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      // Previous Slide
      setCurrentSlideIndex((prev) => prev - 1);
    } else if (currentStoryIndex > 0) {
      // Previous Story (Go to last slide)
      const prevStoryIndex = currentStoryIndex - 1;
      const prevStorySlidesCount = stories[prevStoryIndex].slides?.length || 1;
      setCurrentStoryIndex(prevStoryIndex);
      setCurrentSlideIndex(prevStorySlidesCount - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      
      {/* Background Blur Effect (Ambiance ke liye) */}
      <div className="absolute inset-0 opacity-40 blur-3xl">
         <Image 
            src={currentSlide.image} 
            alt="bg" 
            fill 
            className="object-cover" 
         />
      </div>

      {/* Main Story Container */}
      <div className="relative w-full md:w-[400px] h-full md:h-[90vh] bg-black md:rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gray-800 z-10">
        
        {/* --- Header: Progress Bars & Info --- */}
        <div className="absolute top-0 left-0 w-full p-4 z-20 bg-gradient-to-b from-black/80 to-transparent">
            
            {/* Progress Bars */}
            <div className="flex gap-1 h-1 mb-3">
                {slides.map((_, idx) => (
                    <div key={idx} className="flex-1 bg-gray-600 rounded-full overflow-hidden h-full">
                        <div 
                            className={`h-full bg-white transition-all duration-300 ease-linear ${
                                idx < currentSlideIndex ? 'w-full' : idx === currentSlideIndex ? 'w-full animate-progress' : 'w-0'
                            }`}
                        />
                    </div>
                ))}
            </div>

            {/* Title & Close Button */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-white overflow-hidden relative">
                        <Image src={currentStory.coverImage} alt="logo" fill className="object-cover" />
                    </div>
                    <span className="text-white text-sm font-bold truncate max-w-[200px] drop-shadow-md">
                        {currentStory.title}
                    </span>
                </div>
                <button onClick={onClose} className="text-white hover:text-gray-300 p-1 bg-black/20 rounded-full">
                    <FaTimes size={24} />
                </button>
            </div>
        </div>

        {/* --- Main Image Section --- */}
        <div className="relative flex-grow bg-black flex items-center justify-center">
            <Image 
                src={currentSlide.image} 
                alt="Story Slide" 
                fill 
                // ✅ UPDATE: 'object-contain' taaki photo puri dikhe
                className="object-contain" 
                priority
            />
            
            {/* Bottom Gradient for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
        </div>

        {/* --- Bottom Text & Button --- */}
        <div className="absolute bottom-10 left-4 right-4 z-20 text-center pb-8">
             <p className="text-white text-lg font-medium leading-relaxed drop-shadow-lg mb-6">
                {currentSlide.text}
             </p>
             <button className="text-xs font-bold text-black bg-white px-6 py-3 rounded-full uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-lg">
                View Details
             </button>
        </div>

        {/* --- Tap Zones (Invisible Controls) --- */}
        <div className="absolute top-20 bottom-32 left-0 w-1/3 z-10" onClick={handlePrev}></div>
        <div className="absolute top-20 bottom-32 right-0 w-1/3 z-10" onClick={handleNext}></div>

        {/* --- Desktop Arrows --- */}
        <button onClick={handlePrev} className="absolute left-2 top-1/2 z-20 bg-white/10 p-3 rounded-full hover:bg-white/20 hidden md:block backdrop-blur-sm transition-all hover:scale-110">
            <FaChevronLeft className="text-white text-lg" />
        </button>
        <button onClick={handleNext} className="absolute right-2 top-1/2 z-20 bg-white/10 p-3 rounded-full hover:bg-white/20 hidden md:block backdrop-blur-sm transition-all hover:scale-110">
            <FaChevronRight className="text-white text-lg" />
        </button>

      </div>
    </div>
  );
};

export default StoryViewer;