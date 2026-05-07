"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { visualStories } from '@/data/visualStories';
import StoryViewer from './StoryViewer';

const VisualStoriesSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect touch device
  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // ✅ Track scroll for arrow disable/enable
  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: -width, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: width, behavior: 'smooth' });
    }
  };

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setIsViewerOpen(true);
  };

  // ✅ Mobile pe hamesha visible, desktop pe hidden md:flex
  const arrowBase = "absolute top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed items-center justify-center";
  const arrowClass = isMobile
    ? `${arrowBase} flex`
    : `${arrowBase} hidden md:flex`;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Car Visual Stories</h2>

          <div className="relative group">
            {/* ✅ Left Arrow */}
            <button
              onClick={slideLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`${arrowClass} left-0 -translate-x-4`}
            >
              <FaChevronLeft size={16} />
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {visualStories.map((story, index) => (
                <div
                  key={story.id}
                  onClick={() => handleStoryClick(index)}
                  className="relative min-w-[80%] sm:min-w-[40%] md:min-w-[calc(25%-12px)] h-[320px] md:h-[380px] rounded-xl overflow-hidden flex-shrink-0 group/card cursor-pointer"
                >
                  <Image
                    src={story.coverImage || story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    onError={(e: any) => { e.target.src = "https://placehold.co/400x600?text=Story"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover/card:opacity-100" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                    <FaPlay className="text-white text-xs" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <h3 className="text-white font-bold text-lg leading-snug line-clamp-3 group-hover/card:text-blue-200 transition-colors">
                      {story.title}
                    </h3>
                    <span className="text-xs text-gray-300 mt-2 inline-block font-medium uppercase tracking-wider">
                      Read Story
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Right Arrow */}
            <button
              onClick={slideRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`${arrowClass} right-0 translate-x-4`}
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Story Viewer Modal — same as before */}
        {isViewerOpen && (
          <StoryViewer
            stories={visualStories}
            startIndex={selectedStoryIndex}
            onClose={() => setIsViewerOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default VisualStoriesSection;