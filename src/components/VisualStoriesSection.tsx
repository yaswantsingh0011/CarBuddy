"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// ✅ FIX: FaArrowRight yahan add kar diya hai
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaPlay } from 'react-icons/fa';
import { visualStories } from '@/data/visualStories';

const VisualStoriesSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Car Visual Stories</h2>

            <div className="relative group">
                {/* Left Arrow */}
                <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 hidden md:flex items-center justify-center transition-transform hover:scale-110">
                    <FaChevronLeft size={16} />
                </button>

                {/* Slider Container */}
                <div 
                    ref={sliderRef} 
                    className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {visualStories.map((story) => (
                        <Link 
                            key={story.id} 
                            href={story.link}
                            // Desktop: exactly 4 cards visible (25% width)
                            className="relative min-w-[80%] sm:min-w-[40%] md:min-w-[calc(25%-12px)] h-[320px] md:h-[380px] rounded-xl overflow-hidden flex-shrink-0 group/card cursor-pointer"
                        >
                            {/* Background Image */}
                            <Image 
                                src={story.image} 
                                alt={story.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                onError={(e: any) => { e.target.src = "https://placehold.co/400x600?text=Story"; }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity group-hover/card:opacity-100"></div>

                            {/* Icon */}
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                                <FaPlay className="text-white text-xs" />
                            </div>

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 p-5 w-full">
                                <h3 className="text-white font-bold text-lg leading-snug line-clamp-3 group-hover/card:text-blue-200 transition-colors">
                                    {story.title}
                                </h3>
                                <span className="text-xs text-gray-300 mt-2 inline-block font-medium uppercase tracking-wider">
                                    Read Story
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right Arrow */}
                <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 hidden md:flex items-center justify-center transition-transform hover:scale-110">
                    <FaChevronRight size={16} />
                </button>
            </div>

            <div className="mt-6">
                <Link href="/stories" className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors">
                    View All Car Visual Stories <FaArrowRight className="ml-2 text-sm" />
                </Link>
            </div>

        </div>
      </div>
    </section>
  );
};

export default VisualStoriesSection;