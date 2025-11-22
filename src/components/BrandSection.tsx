"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Link import kiya
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { popularBrands } from '@/data/brands';

const BrandSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Brands</h2>

            <div className="relative group">
                <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white text-gray-600 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hidden md:flex items-center justify-center transition-transform hover:scale-110">
                    <FaChevronLeft size={16} />
                </button>

                <div 
                    ref={sliderRef} 
                    className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {popularBrands.map((brand) => (
                        // ✅ FIX: Link Wrap kar diya
                        // URL banega: /brand/tata ya /brand/maruti-suzuki
                        <Link 
                            key={brand.id} 
                            href={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="min-w-[140px] md:min-w-[180px] h-[140px] md:h-[160px] flex-shrink-0 border border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group/card block"
                        >
                            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 opacity-80 group-hover/card:opacity-100 transition-opacity">
                                <Image 
                                    src={brand.logo} 
                                    alt={brand.name} 
                                    fill 
                                    className="object-contain"
                                    onError={(e: any) => { e.target.src = "https://placehold.co/100x100?text=Logo"; }}
                                />
                            </div>
                            <span className="text-gray-700 font-semibold group-hover/card:text-blue-600 transition-colors">
                                {brand.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white text-gray-600 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hidden md:flex items-center justify-center transition-transform hover:scale-110">
                    <FaChevronRight size={16} />
                </button>
            </div>

            <div className="mt-6">
                <Link href="#" className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors">
                    View All Brands <FaArrowRight className="ml-2 text-sm" />
                </Link>
            </div>

        </div>
      </div>
    </section>
  );
};

export default BrandSection;