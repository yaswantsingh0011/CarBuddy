// src/app/used-cars/page.tsx

"use client";

import React, { useState } from 'react';
import UsedCarCard from '@/components/UsedCarCard';
import { usedCars } from '@/data/usedCarsData';
import { UsedCar } from '@/types'; 

import BookingForm from '@/components/BookingForm';
import ImageModal from '@/components/ImageModal';
import ContactSellerModal from '@/components/ContactSellerModal';

export default function UsedCarsPage() {
  
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<UsedCar | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<UsedCar | null>(null);
  const [selectedCarForContact, setSelectedCarForContact] = useState<UsedCar | null>(null); // Sahi state
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);

  // Handlers
  const handleBookNowClick = (car: UsedCar) => { setSelectedCarForBooking(car); };
  const handleCloseBookingModal = () => { setSelectedCarForBooking(null); };
  
  const handleImageClick = (car: UsedCar, index: number) => { setSelectedCarForImages(car); setImageModalStartIndex(index); };
  const handleCloseImageModal = () => { setSelectedCarForImages(null); };

  const handleContactSellerClick = (car: UsedCar) => { setSelectedCarForContact(car); };
  const handleCloseContactModal = () => { setSelectedCarForContact(null); };

  return (
    <>
      <div className="bg-gray-100 flex-grow" id="all-used-cars">
        <div className="container mx-auto px-4 py-12 pt-8"> 
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Find Your Perfect Used Car</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {usedCars.map((car) => { 
              return (
                <UsedCarCard
                  key={car.id}
                  car={car}
                  onBookNowClick={() => handleBookNowClick(car)}
                  onContactSellerClick={() => handleContactSellerClick(car)}
                  onImageClick={(index) => handleImageClick(car, index)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      
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
            
      {/* === BADLAAV YAHAN === */}
      {/* 'isContactModalOpen' ki jagah 'selectedCarForContact' check hoga */}
      {selectedCarForContact && (
        <ContactSellerModal 
          isOpen={!!selectedCarForContact} 
          onClose={handleCloseContactModal} 
          car={selectedCarForContact} 
        />
      )}
    </>
  );
}