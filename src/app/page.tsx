"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';

// --- COMPONENTS ---
import UpcomingCarCard from '@/components/UpcomingCarCard';
import ElectricCarCard from '@/components/ElectricCarCard';
import MostSearchedSection from '@/components/MostSearchedSection'; // Naya Tabs Wala Section

// --- DATA IMPORTS ---
import { newLaunchCars } from '@/data/newlaunchcars'; 
import { electricCars } from '@/data/electricCars'; 

// --- ICONS ---
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- MODALS ---
import BookingForm from '@/components/BookingForm'; 
import FeaturesModal from '@/components/FeaturesModal';
import OffersModal from '@/components/OffersModal'; 
import ImageModal from '@/components/ImageModal';

export default function Home() {
  // --- STATES FOR MODALS ---
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<any>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<any>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<any>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<any>(null);
  const [imageStartIndex, setImageStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<number[]>([]);

  // --- HANDLERS ---
  const scrollToCars = () => document.getElementById('upcoming-cars')?.scrollIntoView({ behavior: 'smooth' });

  const handleBookNow = (car: any) => setSelectedCarForBooking(car);
  const handleShowFeatures = (car: any) => setSelectedCarForFeatures(car);
  const handleGetOffers = (car: any) => setSelectedCarForOffers(car);
  const handleImageClick = (car: any, index: number) => { setSelectedCarForImages(car); setImageStartIndex(index); };
  
  const handleAlert = (carName: string) => {
    alert(`Notification set for ${carName}! We will notify you when it launches.`);
  };

  // --- SLIDER LOGIC (Refs) ---
  const upcomingSliderRef = useRef<HTMLDivElement>(null);
  const electricSliderRef = useRef<HTMLDivElement>(null);

  // Upcoming Slider Functions
  const slideUpcomingLeft = () => upcomingSliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideUpcomingRight = () => upcomingSliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  // Electric Slider Functions
  const slideElectricLeft = () => electricSliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideElectricRight = () => electricSliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });


  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      
      {/* 1. HERO SECTION */}
      <Hero onExploreClick={scrollToCars} />

      {/* 2. UPCOMING CARS SECTION */}
      <section id="upcoming-cars" className="container mx-auto px-4 pt-12 pb-8 relative">
        <div className="text-left mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Upcoming Cars</h2>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button onClick={slideUpcomingLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
          </button>
          
          {/* Slider Container */}
          <div ref={upcomingSliderRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {newLaunchCars.map((car, index) => (
              <div key={index} className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0">
                 <UpcomingCarCard 
                    name={car.name} 
                    priceRange={car.priceRange} 
                    launchDate={car.location || "Coming Soon"} 
                    imageUrl={car.imageUrls[0]} 
                    onAlertClick={() => handleAlert(car.name)} 
                 />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={slideUpcomingRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center">
            <FaChevronRight size={20} />
          </button>
        </div>
      </section>


      {/* 3. MOST SEARCHED CARS (Tabs Section) */}
      {/* Ye wo naya component hai jo humne banaya */}
      <MostSearchedSection />


      {/* 4. ELECTRIC CARS SECTION */}
      <section className="container mx-auto px-4 pb-12 relative">
        <div className="text-left mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Electric Cars</h2>
        </div>

        <div className="relative group">
          <button onClick={slideElectricLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
          </button>

          <div ref={electricSliderRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {electricCars.map((car, index) => (
              <div key={index} className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0">
                 <ElectricCarCard 
                    name={car.name} 
                    priceRange={car.priceRange} 
                    imageUrl={car.image} 
                    onOfferClick={() => alert(`Offers for ${car.name} coming soon!`)} 
                 />
              </div>
            ))}
          </div>

          <button onClick={slideElectricRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center">
            <FaChevronRight size={20} />
          </button>
        </div>
      </section>


      {/* --- HIDDEN MODALS --- */}
      {selectedCarForBooking && <BookingForm isOpen={!!selectedCarForBooking} onClose={() => setSelectedCarForBooking(null)} car={selectedCarForBooking} />}
      {selectedCarForFeatures && <FeaturesModal isOpen={!!selectedCarForFeatures} onClose={() => setSelectedCarForFeatures(null)} car={selectedCarForFeatures} />}
      {selectedCarForOffers && <OffersModal isOpen={!!selectedCarForOffers} onClose={() => setSelectedCarForOffers(null)} car={selectedCarForOffers} />}
      {selectedCarForImages && <ImageModal isOpen={!!selectedCarForImages} onClose={() => setSelectedCarForImages(null)} imageUrls={selectedCarForImages.imageUrls} startIndex={imageStartIndex} />}
      
      {/* FLOATING COMPARE BAR */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[400px] z-50">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-3 md:p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3 ml-1">
              <div className="bg-gray-900 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md">{compareList.length}</div>
              <div className="flex flex-col"><span className="text-sm font-bold text-gray-800 leading-tight">Cars Added</span><button onClick={() => setCompareList([])} className="text-[11px] text-red-500 font-semibold uppercase tracking-wide text-left hover:underline">Clear List</button></div>
            </div>
            <Link href={`/compare?cars=${compareList.join(',')}`} className="ml-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:bg-blue-700 flex items-center">Compare Now <span className="ml-2 text-lg">→</span></Link>
          </div>
        </div>
      )}

    </main>
  );
}