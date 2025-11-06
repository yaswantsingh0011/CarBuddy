// src/app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CarGridCard from '@/components/CarGridCard';
import BookingForm from '@/components/BookingForm'; 
import Hero from '@/components/Hero';  
import ImageModal from '@/components/ImageModal';
import FeaturesModal from '@/components/FeaturesModal';
import OffersModal from '@/components/OffersModal'; 
import { carsData, Car } from '@/data/cars';

export default function HomePage() {
  
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<Car | null>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<Car | null>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<Car | null>(null); 
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // *** EXPLORE CLICK LOGIC (Scrolling only) ***
  const handleExploreClick = () => {
    const allCarsGrid = document.getElementById('all-cars-grid');
    if (allCarsGrid) {
        // Scroll to the car grid section
        allCarsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // --- Rest of the Handlers (Unchanged for brevity) ---
  const handleBookNowClick = (car: Car) => { setSelectedCarForBooking(car); };
  const handleCloseBookingModal = () => { setSelectedCarForBooking(null); };
  const handleImageClick = (car: Car, index: number) => { setSelectedCarForImages(car); setImageModalStartIndex(index); };
  const handleCloseImageModal = () => { setSelectedCarForImages(null); };
  const handleShowFeaturesClick = (car: Car) => { setSelectedCarForFeatures(car); };
  const handleCloseFeaturesModal = () => { setSelectedCarForFeatures(null); };
  const handleOffersClick = (car: Car) => { setSelectedCarForOffers(car); };
  const handleCloseOffersModal = () => { setSelectedCarForOffers(null); };

  const handleToggleCompare = (carName: string) => {
    setCompareList((prevList) => {
      if (prevList.includes(carName)) return prevList.filter((name) => name !== carName);
      else if (prevList.length < 4) return [...prevList, carName];
      return prevList;
    });
  };

  const compareUrl = `/compare?cars=${compareList.join(',')}`;

  return (
    <>
      {/* 1. Hero Section */}
      <Hero onExploreClick={handleExploreClick} /> 
      
      {/* 2. All Cars Section */}
      <div className="bg-gray-100 flex-grow" id="all-cars-grid"> 
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Cars</h2>
          
          {/* MOBILE OPTIMIZATION: Default is 1 column, md and up is 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
            {carsData.map((car) => {
              const isSelected = compareList.includes(car.name);
              return (
                <CarGridCard
                  key={car.name}
                  name={car.name}
                  rating={car.rating}
                  reviews={car.reviews}
                  priceRange={car.priceRange}
                  location={car.location}
                  imageUrls={car.imageUrls}
                  onBookNowClick={() => handleBookNowClick(car)}
                  onGetOffersClick={() => handleOffersClick(car)} 
                  onImageClick={(index) => handleImageClick(car, index)}
                  onShowFeaturesClick={() => handleShowFeaturesClick(car)}
                  onAddToCompare={() => handleToggleCompare(car.name)}
                  isSelectedForCompare={isSelected}
                  compareCount={compareList.length}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {/* 3. Floating Compare Button */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-8 right-8 z-50"> 
          <Link href={compareUrl} 
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors shadow-2xl animate-pulse"
          >
            Compare ({compareList.length}) Cars
          </Link>
        </div>
      )}
      
      {/* Modals */}
      {selectedCarForBooking && (
        <BookingForm isOpen={!!selectedCarForBooking} onClose={handleCloseBookingModal} car={selectedCarForBooking} />
      )}
      {selectedCarForImages && (
        <ImageModal isOpen={!!selectedCarForImages} onClose={handleCloseImageModal} imageUrls={selectedCarForImages.imageUrls} startIndex={imageModalStartIndex} />
      )}
      <FeaturesModal isOpen={!!selectedCarForFeatures} onClose={handleCloseFeaturesModal} car={selectedCarForFeatures} />
      <OffersModal isOpen={!!selectedCarForOffers} onClose={handleCloseOffersModal} car={selectedCarForOffers} />
    </>
  );
}