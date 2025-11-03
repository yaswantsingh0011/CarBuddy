// src/app/used-cars/[slug]/page.tsx
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { usedCars } from '@/data/usedCarsData'; 
import Image from 'next/image';
import BookingForm from '@/components/BookingForm'; 
import ContactSellerModal from '@/components/ContactSellerModal'; // <-- Naya modal import kiya

// Simple check mark icon
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// --- PURANA DUMMY MODAL YAHAN SE HATA DIYA GAYA HAI ---

export default function UsedCarDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); 

  const car = usedCars.find(c => encodeURIComponent(c.name.toLowerCase().replace(/ /g, '-')) === slug);

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">Car Not Found</h1>
        <p className="text-gray-600 mt-4">Sorry, we couldn't find the car you're looking for.</p>
      </div>
    );
  }

  // Used Car ke features
  const keyFeatures = [
    { name: "Model Year", value: car.modelYear },
    { name: "KMs Driven", value: car.kms },
    { name: "Fuel Type", value: car.fuelType },
    { name: "Ownership", value: car.owner },
    { name: "Location", value: car.location },
  ];

  return (
    <> 
      <div className="container mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">{car.name}</h1>
        
        {/* Main Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden p-6">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side: Images */}
            <div className="w-full lg:w-7/12">
              {/* Main Image */}
              <div className="relative w-full h-80 lg:h-96 rounded-lg overflow-hidden border">
                <Image
                  src={car.imageUrls[selectedImageIndex]}
                  alt={car.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              {/* Thumbnails */}
              <div className="flex space-x-2 justify-center mt-4">
                {car.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className={`w-20 h-16 relative cursor-pointer border-2 rounded-md ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={url}
                      alt={`${car.name} thumbnail ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-sm"
                    />
                  </div>
                ))}
              </div>
            </div> 
            
            {/* Right Side: Details */}
            <div className="w-full lg:w-5/12 lg:pl-8 mt-6 lg:mt-0">
              {/* Price */}
              <p className="text-4xl font-bold text-gray-900">₹ {car.price}</p>
              <p className="text-sm text-gray-500 mt-1">*Listing Price in {car.location}</p>
              
              <hr className="my-6" />

              {/* Key Features */}
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Key Details</h3>
              <ul className="space-y-3">
                {keyFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-center text-gray-700">
                    <CheckIcon />
                    <span className="font-medium">{feature.name}:</span>
                    <span className="ml-2">{feature.value}</span>
                  </li>
                ))}
              </ul>
              
              <hr className="my-6" />

              {/* Buttons */}
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-green-500 text-white font-semibold py-3 px-6 rounded-md text-lg hover:bg-green-600 transition-colors"
                >
                  Book Your Test Drive Now
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-6 rounded-md text-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Seller
                </button>
              </div>
            </div> 
          </div> 
        </div> 
      </div> 

      {/* Booking Form Modal */}
      {isBookingModalOpen && (
        <BookingForm
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          car={car}
        />
      )}
      
      {/* Naya Contact Seller Modal */}
      {isContactModalOpen && (
        <ContactSellerModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          car={car}
        />
      )}
    </>
  );
}