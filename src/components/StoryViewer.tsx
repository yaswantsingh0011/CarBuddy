'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface StoryViewerProps {
  stories: any[];
  startIndex: number;
  onClose: () => void;
}

const SLIDE_DURATION = 3000; // 5 seconds

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(startIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentStory = stories[currentStoryIndex];

  // Fallback agar slides missing ho
  const slides =
    currentStory?.slides?.length > 0
      ? currentStory.slides
      : [{ image: currentStory.coverImage, text: currentStory.title }];

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex];

  /* ===============================
     AUTO SLIDE TIMER (CLEAN)
  =============================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      // Next slide
      if (currentSlideIndex < totalSlides - 1) {
        setCurrentSlideIndex((prev) => prev + 1);
      }
      // Next story
      else if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1);
        setCurrentSlideIndex(0);
      }
      // End → close
      else {
        onClose();
      }
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [
    currentSlideIndex,
    currentStoryIndex,
    totalSlides,
    stories.length,
    onClose,
  ]);

  /* ===============================
     MANUAL CONTROLS
  =============================== */
  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentSlideIndex(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    } else if (currentStoryIndex > 0) {
      const prevStoryIndex = currentStoryIndex - 1;
      const prevSlidesCount =
        stories[prevStoryIndex]?.slides?.length || 1;
      setCurrentStoryIndex(prevStoryIndex);
      setCurrentSlideIndex(prevSlidesCount - 1);
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Background Blur */}
      <div className="absolute inset-0 opacity-40 blur-3xl">
        <Image src={currentSlide.image} alt="bg" fill className="object-cover" />
      </div>

      {/* Main Container */}
      <div className="relative w-full md:w-[400px] h-full md:h-[90vh] bg-black md:rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gray-800 z-10">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-4 z-20 bg-gradient-to-b from-black/80 to-transparent">
          {/* Progress Bars */}
          <div className="flex gap-1 h-1 mb-3">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gray-600 rounded-full overflow-hidden h-full"
              >
                <div
                  className={`h-full bg-white ${
                    idx < currentSlideIndex
                      ? 'w-full'
                      : idx === currentSlideIndex
                      ? 'animate-progress'
                      : 'w-0'
                  }`}
                  style={
                    idx === currentSlideIndex
                      ? { animationDuration: `${SLIDE_DURATION}ms` }
                      : {}
                  }
                />
              </div>
            ))}
          </div>

          {/* Title & Close */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-white overflow-hidden relative">
                <Image
                  src={currentStory.coverImage}
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white text-sm font-bold truncate max-w-[200px]">
                {currentStory.title}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 p-1 bg-black/20 rounded-full"
            >
              <FaTimes size={22} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex-grow bg-black flex items-center justify-center">
          <Image
            src={currentSlide.image}
            alt="Story Slide"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Text */}
        <div className="absolute bottom-10 left-4 right-4 z-z-20 text-center pb-8">
          <p className="text-white text-lg font-medium leading-relaxed mb-6">
            {currentSlide.text}
          </p>
          <button className="text-xs font-bold text-black bg-white px-6 py-3 rounded-full uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-lg">
            View Details
          </button>
        </div>

        {/* Tap Zones */}
        <div
          className="absolute top-20 bottom-32 left-0 w-1/3 z-10"
          onClick={handlePrev}
        />
        <div
          className="absolute top-20 bottom-32 right-0 w-1/3 z-10"
          onClick={handleNext}
        />

        {/* Desktop Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 z-20 bg-white/10 p-3 rounded-full hover:bg-white/20 hidden md:block backdrop-blur-sm transition-all hover:scale-110"
        >
          <FaChevronLeft className="text-white text-lg" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 z-20 bg-white/10 p-3 rounded-full hover:bg-white/20 hidden md:block backdrop-blur-sm transition-all hover:scale-110"
        >
          <FaChevronRight className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
