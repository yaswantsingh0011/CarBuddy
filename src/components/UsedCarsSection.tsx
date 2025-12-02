'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ElectricCarCard from './ElectricCarCard';
import OffersModal from './OffersModal';
import { usedCarsData } from '@/data/usedCarsData';

const UsedCarsSection = () => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [offerCar, setOfferCar] = useState<any>(null);

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  // Navigation Function
  const handleCardClick = (carName: string) => {
    const slug = carName.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
  };

  const carForModal = offerCar ? { 
    ...offerCar, 
    offers: ["Free RC Transfer", "6 Months Engine Warranty", "1 Free Service"] 
  } : null;

  return (
    <section className="container mx-auto px-4 py-12 relative">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Used Cars</h2>
        <p className="text-gray-500 text-sm mt-1">Verified pre-owned cars for you</p>
      </div>

      <div className="relative group">
        <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
        </button>

        <div ref={sliderRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {usedCarsData.map((car: any, index) => {
            // Image Fallback
            const displayImage = car.image || "/cars/placeholder.jpg";
            
            return (
              <div 
                key={car.id || index} 
                className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleCardClick(car.name)}
              >
                 <div className="h-full pointer-events-auto">
                    <ElectricCarCard 
                        id={car.id || index}
                        name={car.name} 
                        priceRange={car.price} 
                        imageUrl={displayImage}
                        fuelType={car.fuelType || "Petrol"}
                        
                        enableLocationLogic={false} 
                        
                        // ✅ YE HAI WO CHANGE (Zoom Out ke liye)
                        imageFit="contain"

                        // Data Passed for Compare Page
                        specs={car.specs}
                        features={car.features}
                        images={car.images}

                        onDetailClick={() => handleCardClick(car.name)}
                        onOfferClick={() => setOfferCar(car)} 
                    />
                 </div>
              </div>
            );
          })}
        </div>

        <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronRight size={20} />
        </button>
      </div>

      {offerCar && (
        <OffersModal isOpen={!!offerCar} onClose={() => setOfferCar(null)} car={carForModal} />
      )}
    </section>
  );
};



export default UsedCarsSection;