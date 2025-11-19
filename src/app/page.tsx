"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CarGridCard from '@/components/CarGridCard';
import { newLaunchCars } from '@/data/newlaunchcars'; 

// Modals imports
import BookingForm from '@/components/BookingForm'; 
import FeaturesModal from '@/components/FeaturesModal';
import OffersModal from '@/components/OffersModal'; 
import ImageModal from '@/components/ImageModal';

export default function Home() {
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<any>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<any>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<any>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<any>(null);
  const [imageStartIndex, setImageStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<number[]>([]);

  const scrollToCars = () => document.getElementById('car-listings')?.scrollIntoView({ behavior: 'smooth' });
  const handleBookNow = (car: any) => setSelectedCarForBooking(car);
  const handleShowFeatures = (car: any) => setSelectedCarForFeatures(car);
  const handleGetOffers = (car: any) => setSelectedCarForOffers(car);
  const handleImageClick = (car: any, index: number) => { setSelectedCarForImages(car); setImageStartIndex(index); };

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) setCompareList((prev) => prev.filter((carId) => carId !== id));
    else {
      if (compareList.length >= 4) { alert("You can only compare up to 4 cars."); return; }
      setCompareList((prev) => [...prev, id]);
    }
  };

  return (
    // CHANGE 1: 'pb-24' ko kam karke 'pb-8' kar diya
    <main className="bg-gray-50 min-h-screen pb-8">
      <Hero onExploreClick={scrollToCars} />

      {/* CHANGE 2: 'pb-4' ko 'pb-0' kar diya taaki neeche space na bache */}
      <section id="car-listings" className="container mx-auto px-4 pt-12 pb-0">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Upcoming Launches</h2>
          <p className="text-gray-600">Be the first to drive the future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newLaunchCars.map((car, index) => (
            <CarGridCard
              key={car.id || index}
              name={car.name}
              rating={car.rating}
              reviews={car.reviews}
              priceRange={car.priceRange}
              location={car.location}
              imageUrls={car.imageUrls}
              onBookNowClick={() => handleBookNow(car)}
              onGetOffersClick={() => handleGetOffers(car)}
              onImageClick={(idx) => handleImageClick(car, idx)}
              onShowFeaturesClick={() => handleShowFeatures(car)}
              onAddToCompare={() => toggleCompare(Number(car.id) || index)}
              isSelectedForCompare={compareList.includes(Number(car.id) || index)}
              compareCount={compareList.length}
            />
          ))}
        </div>

      </section>

      {/* Modals */}
      {selectedCarForBooking && <BookingForm isOpen={!!selectedCarForBooking} onClose={() => setSelectedCarForBooking(null)} car={selectedCarForBooking} />}
      {selectedCarForFeatures && <FeaturesModal isOpen={!!selectedCarForFeatures} onClose={() => setSelectedCarForFeatures(null)} car={selectedCarForFeatures} />}
      {selectedCarForOffers && <OffersModal isOpen={!!selectedCarForOffers} onClose={() => setSelectedCarForOffers(null)} car={selectedCarForOffers} />}
      {selectedCarForImages && <ImageModal isOpen={!!selectedCarForImages} onClose={() => setSelectedCarForImages(null)} imageUrls={selectedCarForImages.imageUrls} startIndex={imageStartIndex} />}
      
      {/* Compare Bar */}
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