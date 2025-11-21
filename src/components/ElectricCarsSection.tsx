"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import ElectricCarCard from './ElectricCarCard';
import { electricCars } from '@/data/electricCars'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// ✅ 1. Modal Import kiya
import OffersModal from './OffersModal';

const ElectricCarsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ 2. State banayi (Ye batayega ki Modal khula hai ya nahi)
  const [offerCar, setOfferCar] = useState<any>(null);

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  // Card Click -> Detail Page navigate
  const handleCardClick = (carName: string) => {
    const slug = carName.toLowerCase().split(" ").join("-");
    router.push(`/car-details/${slug}`);
  };

  // ✅ 3. Offers generate karne ka logic (EVs ke liye)
  const getOffersList = (car: any) => {
    return [
      "Free Home Wall Box Charger",
      "Zero Processing Fee on Loan",
      "3 Year Battery Health Checkup Free",
      "Complimentary Roadside Assistance"
    ];
  };

  // Modal ke liye data prepare karna
  const carForModal = offerCar ? { ...offerCar, offers: getOffersList(offerCar) } : null;

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50">
      <div className="flex justify-between items-end mb-6">
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Electric Cars</h2>
            <p className="text-gray-500 mt-1">Drive into the future with these top EVs</p>
        </div>
      </div>

      <div className="relative group">
        <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
        </button>

        <div 
          ref={sliderRef} 
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {electricCars.map((car) => (
            <div 
                key={car.id} 
                // Pure Card par click -> Detail Page
                onClick={() => handleCardClick(car.name)}
                className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            >
               <div className="h-full pointer-events-auto">
                   <ElectricCarCard 
                      name={car.name} 
                      priceRange={car.priceRange} 
                      imageUrl={car.image} 
                      // ✅ 4. MAIN FIX: Yahan hum 'setOfferCar' call kar rahe hain
                      onOfferClick={() => setOfferCar(car)} 
                   />
               </div>
            </div>
          ))}
        </div>

        <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 flex items-center justify-center">
            <FaChevronRight size={20} />
        </button>
      </div>

      {/* ✅ 5. Modal Render (Agar offerCar null nahi hai tabhi dikhega) */}
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

export default ElectricCarsSection;