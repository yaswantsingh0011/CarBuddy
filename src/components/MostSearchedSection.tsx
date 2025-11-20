"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // 1. Router Import kiya
import ElectricCarCard from './ElectricCarCard'; 
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = ["SUV", "Hatchback", "Sedan", "Luxury"];

const MostSearchedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("SUV");
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // 2. Router initialize kiya

  // Filter cars based on active tab
  const filteredCars = mostSearchedCars.filter(car => car.category === activeTab);

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  // 3. Click Handler Function
  const handleCardClick = (carName: string) => {
    // Car name ko URL format me convert kr rahe hain (e.g. "Tata Nexon" -> "tata-nexon")
    const slug = carName.toLowerCase().split(" ").join("-");
    router.push(`/car-details/${slug}`);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Most Searched Cars</h2>
        
        {/* --- TABS --- */}
        <div className="flex space-x-6 border-b border-gray-200 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`pb-2 text-sm md:text-base font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === cat 
                  ? "text-orange-600 border-b-2 border-orange-600" 
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- SLIDER --- */}
      <div className="relative group">
        {/* Left Arrow */}
        <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
        </button>

        {/* Cards Container */}
        <div 
          ref={sliderRef} 
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredCars.map((car) => (
            <div 
                key={car.id} 
                // 4. Yaha Click Handler lagaya aur cursor pointer kiya
                onClick={() => handleCardClick(car.name)}
                className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            >
               <ElectricCarCard 
                  name={car.name} 
                  priceRange={car.price} 
                  imageUrl={car.image} 
                  // Agar 'View Offers' button par alag action chahiye to use stopPropagation use krna padega
                  onOfferClick={(e: any) => {
                      e.stopPropagation(); // Taaki card click trigger na ho
                      alert(`Offers for ${car.name}`);
                  }} 
               />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center">
            <FaChevronRight size={20} />
        </button>
      </div>

    </section>
  );
};

export default MostSearchedSection;