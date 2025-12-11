'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ElectricCarCard from './ElectricCarCard';
import OffersModal from './OffersModal';
import { usedCarsData } from '@/data/usedCarsData';

const UsedCarsSection = () => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [offerCar, setOfferCar] = useState<any>(null);
  
  // Default Tab
  const [activeTab, setActiveTab] = useState("CarBuddy Used Cars");

  // --- SLIDER FUNCTIONS ---
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Tab change hone par slider wapas start par laane ke liye
  useEffect(() => {
    if (sliderRef.current) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // --- FILTER LOGIC ---
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const numericPart = priceStr.replace(/[^\d.]/g, ''); 
    return parseFloat(numericPart);
  };

  const getFilteredCars = () => {
    if (activeTab === "CarBuddy Used Cars") {
      return usedCarsData;
    }

    return usedCarsData.filter((car) => {
      const price = parsePrice(car.price);
      switch (activeTab) {
        case "Under 5 Lakh": return price <= 5;
        case "5 - 10 Lakh":  return price > 5 && price <= 10;
        case "10 - 15 Lakh": return price > 10 && price <= 15;
        case "15 - 20 Lakh": return price > 15 && price <= 20;
        case "Above 20 Lakh": return price > 20;
        default: return true;
      }
    });
  };

  const filteredCars = getFilteredCars();
  
  const tabs = ["CarBuddy Used Cars", "Under 5 Lakh", "5 - 10 Lakh", "10 - 15 Lakh", "15 - 20 Lakh", "Above 20 Lakh"];

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
    <section className="container mx-auto px-4 py-12 relative bg-gray-50/50">
      
      {/* HEADER & TABS */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Used Cars</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">Verified pre-owned cars for you</p>

        {/* TABS SCROLLABLE */}
        <div className="flex gap-4 border-b border-gray-200 overflow-x-auto scrollbar-hide pb-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-2 text-sm md:text-base font-bold whitespace-nowrap transition-all border-b-2 ${
                        activeTab === tab 
                        ? "border-red-600 text-red-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* ✅ SLIDER FOR ALL TABS */}
      {filteredCars.length > 0 ? (
        <div className="relative group">
            
            {/* Left Button */}
            <button onClick={slideLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center -ml-4">
                <FaChevronLeft size={20} />
            </button>

            {/* Slider Container */}
            <div ref={sliderRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {filteredCars.map((car: any, index) => (
                    <div 
                        key={car.id || index} 
                        className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0"
                    >
                        <ElectricCarCard 
                            id={car.id || index}
                            name={car.name} 
                            priceRange={car.price} 
                            imageUrl={car.image || "/cars/placeholder.jpg"}
                            fuelType={car.fuelType || "Petrol"}
                            enableLocationLogic={false} 
                            imageFit="contain"
                            specs={car.specs}
                            features={car.features}
                            images={car.images}
                            onDetailClick={() => handleCardClick(car.name)}
                            onOfferClick={() => setOfferCar(car)} 
                        />
                    </div>
                ))}
            </div>

            {/* Right Button */}
            <button onClick={slideRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center -mr-4">
                <FaChevronRight size={20} />
            </button>
        </div>
      ) : (
        // NO RESULTS STATE
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No cars found in {activeTab} range.</p>
            <button onClick={() => setActiveTab("CarBuddy Used Cars")} className="mt-2 text-red-600 font-bold hover:underline">View All Cars</button>
        </div>
      )}


      {/* OFFERS MODAL */}
      {offerCar && (
        <OffersModal isOpen={!!offerCar} onClose={() => setOfferCar(null)} car={carForModal} />
      )}
    </section>
  );
};

export default UsedCarsSection;