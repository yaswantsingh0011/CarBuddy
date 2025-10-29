// src/app/page.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CarGridCard from '@/components/CarGridCard';
import BookingForm from '@/components/BookingForm';
import Hero from '@/components/Hero';
import ImageModal from '@/components/ImageModal';
import FeaturesModal from '@/components/FeaturesModal'; // Import Features Modal
import { carsData, Car } from '@/data/cars'; // Import data and interface

export default function HomePage() {
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<Car | null>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<Car | null>(null);
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);

  // --- Handlers ---
  const handleBookNowClick = (car: Car) => { setSelectedCarForBooking(car); };
  const handleCloseBookingModal = () => { setSelectedCarForBooking(null); };
  const handleImageClick = (car: Car, index: number) => { setSelectedCarForImages(car); setImageModalStartIndex(index); };
  const handleCloseImageModal = () => { setSelectedCarForImages(null); };
  const handleOffersClick = (car: Car) => { alert(`Checking offers for ${car.name}...`); };
  const handleShowFeaturesClick = (car: Car) => { setSelectedCarForFeatures(car); };
  const handleCloseFeaturesModal = () => { setSelectedCarForFeatures(null); };

  const handleToggleCompare = (carName: string) => {
    setCompareList((prevList) => {
      if (prevList.includes(carName)) {
        return prevList.filter((name) => name !== carName);
      } else if (prevList.length < 4) {
        return [...prevList, carName];
      }
      return prevList;
    });
  };

  const compareUrl = `/compare?cars=${compareList.join(',')}`;

  return (
    <>
      <Hero />

      <div className="bg-gray-100 flex-grow" id="all-cars"> {/* flex-grow added */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Cars</h2>

          {/* Compare Button */}
          {compareList.length >= 2 && (
            <div className="text-center mb-8"> {/* This div starts */}
              <Link href={compareUrl}
                className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors"
              >
                Compare ({compareList.length}) Cars
              </Link>
            </div> // <-- And closes here
          )} {/* This is the closing brace for the condition */}

          {/* Car Grid */}
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

      {/* Booking Modal */}
      {selectedCarForBooking && (
        <BookingForm
          isOpen={!!selectedCarForBooking}
          onClose={handleCloseBookingModal}
          car={selectedCarForBooking}
        />
      )}

      {/* Image Modal */}
      {selectedCarForImages && (
        <ImageModal
          isOpen={!!selectedCarForImages}
          onClose={handleCloseImageModal}
          imageUrls={selectedCarForImages.imageUrls}
          startIndex={imageModalStartIndex}
        />
      )}

       {/* Features Modal */}
       <FeaturesModal
        isOpen={!!selectedCarForFeatures}
        onClose={handleCloseFeaturesModal}
        car={selectedCarForFeatures}
      />
    </>
  );
}