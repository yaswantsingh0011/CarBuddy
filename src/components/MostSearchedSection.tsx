"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import ElectricCarCard from './ElectricCarCard';
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import OffersModal from './OffersModal';

const categories = ["SUV", "Hatchback", "Sedan", "Luxury"];

const MostSearchedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("SUV");
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // State for Offers Modal
  const [offerCar, setOfferCar] = useState<any>(null);

  // Filter cars based on active tab
  const filteredCars = mostSearchedCars.filter(car => car.category === activeTab);

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  const handleCardClick = (carName: string) => {
    const slug = carName.toLowerCase().split(" ").join("-");
    router.push(`/car-details/${slug}`);
  };

  // Helper: Generate Offers
  const getOffersList = (car: any) => {
    if (!car) return [];
    const name = car.name;
    
    if (name.includes("EV") || car.category === "EV") {
      return ["Free Home Wall Box Charger", "Zero Processing Fee on Loan", "3 Year Battery Health Checkup Free"];
    }
    if (car.category === "Luxury" || ["Mercedes", "BMW", "Audi", "Toyota Fortuner"].some(x => name.includes(x))) {
      return ["5 Year Service Package Free", "Ceramic Coating @ 50% Off", "Accessories Kit Included"];
    }
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const carForModal = offerCar ? { ...offerCar, offers: getOffersList(offerCar) } : null;

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
        <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
        </button>

        <div 
          ref={sliderRef} 
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredCars.map((car) => {
            // 🛠️ FIX: Image Logic
            // Agar 'images' array hai to pehli image lo, nahi to purana 'image' string lo
            // (mostSearchedCars me ab 'images' array hai)
            const displayImage = (car as any).images ? (car as any).images[0] : (car as any).image;

            return (
              <div 
                  key={car.id} 
                  onClick={() => handleCardClick(car.name)}
                  className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              >
                 <div className="h-full pointer-events-auto">
                     <ElectricCarCard 
                        name={car.name} 
                        // Note: Data file me 'price' hai
                        priceRange={(car as any).price} 
                        // Yahan Fixed Image Pass kar rahe hain
                        imageUrl={displayImage || "/cars/placeholder.jpg"} 
                        onOfferClick={() => setOfferCar(car)} 
                     />
                 </div>
              </div>
            );
          })}
        </div>

        <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center">
            <FaChevronRight size={20} />
        </button>
      </div>

      {/* Render Modal */}
      {offerCar && (
        <OffersModal 
            isOpen={!!offerCar}
            onClose={() => setOfferCar(null)}
            car={carForModal}
        />
      )}

    </section>
  );
};

export default MostSearchedSection;