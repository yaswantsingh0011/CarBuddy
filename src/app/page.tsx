"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CarGridCard from '@/components/CarGridCard';
import BookingForm from '@/components/BookingForm'; 
import Hero from '@/components/Hero';  
import ImageModal from '@/components/ImageModal';
import FeaturesModal from '@/components/FeaturesModal';
import OffersModal from '@/components/OffersModal'; 
import { carsData, Car } from '@/data/cars'; 
import { useRouter } from 'next/navigation';


// --- डमी/उदाहरण डेटा ---
// यदि आप real carsData का उपयोग नहीं कर रहे हैं, तो यह सुनिश्चित करता है कि कुछ दिखे।
const featuredCars = carsData.slice(0, 4) || [
    { name: "Tesla Model 3", priceRange: "₹30L - ₹50L", location: "New Delhi", imageUrls: ["https://placehold.co/600x400/3498db/ffffff?text=Tesla+M3"], rating: 4.8, reviews: 210 },
    { name: "Maruti Swift", priceRange: "₹6L - ₹10L", location: "Mumbai", imageUrls: ["https://placehold.co/600x400/2ecc71/ffffff?text=Swift"], rating: 4.5, reviews: 500 },
    { name: "Tata Nexon", priceRange: "₹8L - ₹15L", location: "Bangalore", imageUrls: ["https://placehold.co/600x400/e67e22/ffffff?text=Nexon"], rating: 4.7, reviews: 320 },
    { name: "Mahindra Thar", priceRange: "₹15L - ₹20L", location: "Jaipur", imageUrls: ["https://placehold.co/600x400/9b59b6/ffffff?text=Thar"], rating: 4.9, reviews: 450 },
];
// --- डमी डेटा एंड ---


export default function HomePage() {
  
  const router = useRouter(); 
  const allCars: Car[] = carsData;
  const [filteredCars, setFilteredCars] = useState<Car[]>(allCars); 
  
  // Modals और Compare List के लिए States
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<Car | null>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<Car | null>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<Car | null>(null); 
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  
  const handleExploreClick = () => {
    const allCarsGrid = document.getElementById('all-cars-grid');
    if (allCarsGrid) {
        allCarsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Used Cars के लिए नेविगेशन लॉजिक
  const handleCarSearch = (filters: { type: 'new' | 'used', mode: 'budget' | 'brand', value: string }) => {
    
    if (filters.type === 'used') {
        router.push('/used-cars'); 
        return; 
    }
    
    let results = allCars;
    
    if (filters.mode === 'brand' && filters.value !== 'Select Brand') {
        results = allCars.filter(car => car.name.startsWith(filters.value));
    }
    
    setFilteredCars(results);
    handleExploreClick(); 
  };


  // --- Rest of the Handlers (unchanged) ---
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
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Hero Section (Assuming this handles the main search bar) */}
      <Hero 
        onExploreClick={handleExploreClick} 
        carsData={allCars} 
        onSearch={handleCarSearch} 
      /> 

      {/* 2. Featured/All Cars Section - Full Width */}
      <section className="py-16">
        {/* ✅ FIX: कंटेनर से max-w-7xl हटा दिया गया */}
        <div className="w-full mx-auto px-4 md:px-12"> 
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Cars</h2>
          
          {/* ✅ FIX: 2 कॉलम ग्रिड सेट किया गया ताकि कार्ड्स पूरी चौड़ाई लें */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> 
            {filteredCars.map((car) => { 
              const isSelected = compareList.includes(car.name);
              return (
                <CarGridCard
                  key={car.name}
                  name={car.name}
                  rating={car.rating || 0.0} 
                  reviews={car.reviews || 0}
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
      </section>

      {/* 3. Floating Compare Button and Modals */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-8 right-8 z-50"> 
          <Link href={compareUrl} 
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors shadow-2xl animate-pulse"
          >
            Compare ({compareList.length}) Cars
          </Link>
        </div>
      )}
      
      {selectedCarForBooking && (
        <BookingForm isOpen={!!selectedCarForBooking} onClose={handleCloseBookingModal} car={selectedCarForBooking} />
      )}
      {selectedCarForImages && (
        <ImageModal isOpen={!!selectedCarForImages} onClose={handleCloseImageModal} imageUrls={selectedCarForImages.imageUrls} startIndex={imageModalStartIndex} />
      )}
      <FeaturesModal isOpen={!!selectedCarForFeatures} onClose={handleCloseFeaturesModal} car={selectedCarForFeatures} />
      <OffersModal isOpen={!!selectedCarForOffers} onClose={handleCloseOffersModal} car={selectedCarForOffers} />
    </div>
  );
}