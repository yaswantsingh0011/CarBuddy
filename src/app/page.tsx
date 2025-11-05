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
  
  // STATE: अब यह तय करता है कि All Cars सेक्शन दिखना चाहिए या नहीं।
  // चूंकि हम चाहते हैं कि यह डिफ़ॉल्ट रूप से दिखे (जब तक स्क्रॉल न हो), हम इसे true नहीं रखेंगे।
  // हम सीधे Scroll Logic का उपयोग करेंगे।
  
  // Modals के लिए पुरानी States बहाल
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<Car | null>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<Car | null>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<Car | null>(null); 
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // *** EXPLORE CLICK LOGIC (UPDATED) ***
  const handleExploreClick = () => {
    // 1. All Cars Grid पर Scroll करें
    const allCarsGrid = document.getElementById('all-cars-grid');
    if (allCarsGrid) {
        allCarsGrid.scrollIntoView({ behavior: 'smooth' });
    }
    // Note: हम Hero Section को छुपा नहीं रहे हैं, बस नीचे स्क्रॉल कर रहे हैं।
  };
  
  // --- Hook to manage initial scroll or persistent view ---
  // Page लोड होने पर, All Cars Grid हमेशा visible रहेगा।
  // useEffect(() => {
  //   // If you want to force smooth scroll to All Cars only on a deep link or specific condition,
  //   // you would put that logic here. For normal load, they should stack.
  // }, []);


  // --- Rest of the Handlers (Unchanged) ---
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
      {/* 1. Hero Section (हम इसे हमेशा दिखाएंगे) */}
      <Hero onExploreClick={handleExploreClick} /> 
      
      {/* 2. All Cars Section (हम इसे हमेशा दिखाएंगे, कोई conditional rendering नहीं) */}
      <div className="bg-gray-100 flex-grow" id="all-cars-grid"> {/* ID for scrolling target */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Cars</h2>
          
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