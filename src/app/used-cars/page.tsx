"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CarGridCard from '@/components/CarGridCard';
import BookingForm from '@/components/BookingForm';
import ImageModal from '@/components/ImageModal';
import FeaturesModal from '@/components/FeaturesModal';
import OffersModal from '@/components/OffersModal';
import { Car } from '@/data/cars';
import { usedCars } from '@/data/usedCarsData';

export default function UsedCarsPage() {
  
  const allUsedCars: Car[] = (usedCars as Car[]) || [];

  // Modal States
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<Car | null>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<Car | null>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<Car | null>(null);
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);

  // Compare List
  const [compareList, setCompareList] = useState<string[]>([]);

  const handleBookNowClick = (car: Car) => setSelectedCarForBooking(car);
  const handleCloseBookingModal = () => setSelectedCarForBooking(null);

  const handleImageClick = (car: Car, index: number) => {
    setSelectedCarForImages(car);
    setImageModalStartIndex(index);
  };
  const handleCloseImageModal = () => setSelectedCarForImages(null);

  const handleShowFeaturesClick = (car: Car) => setSelectedCarForFeatures(car);
  const handleCloseFeaturesModal = () => setSelectedCarForFeatures(null);

  const handleOffersClick = (car: Car) => setSelectedCarForOffers(car);
  const handleCloseOffersModal = () => setSelectedCarForOffers(null);

  // Compare
  const handleToggleCompare = (carName: string) => {
    setCompareList((prev) => {
      if (prev.includes(carName)) return prev.filter((n) => n !== carName);
      if (prev.length < 4) return [...prev, carName];
      return prev;
    });
  };

  const compareUrl = `/compare?cars=${compareList.join(',')}`;

  return (
    <>
      {/* Header */}
      <div className="pt-10 pb-4 bg-gray-100">
        <div className="w-full mx-auto px-4 md:px-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Used Cars for Sale</h1>
          <p className="text-gray-600">Browse the best pre-owned cars in your city.</p>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="bg-gray-100 flex-grow" id="used-cars-grid">
        <div className="w-full mx-auto px-4 md:px-12 py-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allUsedCars.map((car) => {
              const isSelected = compareList.includes(car.name);

              return (
                <CarGridCard
                  key={car.name}
                  name={car.name}
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

          {allUsedCars.length === 0 && (
            <p className="text-center text-xl text-gray-500 mt-10">
              Sorry, no used cars are available right now.
            </p>
          )}
        </div>
      </div>

      {/* Compare Floating Button */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-8 right-8 z-50">
          <Link
            href={compareUrl}
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-orange-600 transition-colors shadow-2xl animate-pulse"
          >
            Compare ({compareList.length}) Cars
          </Link>
        </div>
      )}

      {/* Modals */}
      {selectedCarForBooking && (
        <BookingForm
          isOpen={!!selectedCarForBooking}
          onClose={handleCloseBookingModal}
          car={selectedCarForBooking}
        />
      )}

      {selectedCarForImages && (
        <ImageModal
          isOpen={!!selectedCarForImages}
          onClose={handleCloseImageModal}
          imageUrls={selectedCarForImages.imageUrls}
          startIndex={imageModalStartIndex}
        />
      )}

      <FeaturesModal
        isOpen={!!selectedCarForFeatures}
        onClose={handleCloseFeaturesModal}
        car={selectedCarForFeatures}
      />

      <OffersModal
        isOpen={!!selectedCarForOffers}
        onClose={handleCloseOffersModal}
        car={selectedCarForOffers}
      />
    </>
  );
}
