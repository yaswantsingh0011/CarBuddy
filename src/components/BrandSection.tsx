"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { popularBrands } from '@/data/brands';

const BrandSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
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

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  // ✅ Mobile pe hamesha visible, desktop pe hidden md:flex same
  const arrowBase = "absolute top-1/2 -translate-y-1/2 z-10 bg-white text-gray-600 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed items-center justify-center";
  const arrowClass = isMobile
    ? `${arrowBase} flex`
    : `${arrowBase} hidden md:flex`;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto pt-0">
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Brands</h2>

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

            {/* Brand Cards — same as before */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="min-w-[150px] md:min-w-[200px] h-[150px] md:h-[180px] flex-shrink-0 border border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group/card block"
                >
                  <div className="relative w-24 h-16 md:w-32 md:h-20 mb-4 opacity-90 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      onError={(e: any) => { e.target.src = "https://placehold.co/100x100?text=Logo"; }}
                    />
                  </div>
                  <span className="text-gray-700 font-semibold group-hover/card:text-blue-600 transition-colors text-sm md:text-base">
                    {brand.name}
                  </span>
                </Link>
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
      </div>
    </section>
  );
};

export default BrandSection;