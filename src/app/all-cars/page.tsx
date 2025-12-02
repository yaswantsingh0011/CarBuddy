"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import CarGridCard from '@/components/CarGridCard';

// IMPORTS: Sabhi data files
import { newCarsData } from '@/data/newCarsData';
import { carsData } from '@/data/cars';
import { usedCars } from '@/data/usedCarsData';

// MODALS IMPORTS
import BookingForm from '@/components/BookingForm';
import FeaturesModal from '@/components/FeaturesModal';
import OffersModal from '@/components/OffersModal';
import ImageModal from '@/components/ImageModal';

export default function AllCarsPage() {
  // --- MERGING ALL DATA ---
  const allVehiclesRaw = [...newCarsData, ...carsData, ...(usedCars as any[])];

  // --- FIX 1: FILTER BAD DATA ---
  // Ye line ensure karegi ki agar koi empty object ya bina ID wali car hai to wo remove ho jaye
  const allVehicles = allVehiclesRaw.filter(car => car && (car.id || car.name));

  // States
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<any>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<any>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<any>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<any>(null);
  const [imageStartIndex, setImageStartIndex] = useState(0);
  const [compareList, setCompareList] = useState<number[]>([]);

  // Handlers
  const handleBookNow = (car: any) => setSelectedCarForBooking(car);
  const handleShowFeatures = (car: any) => setSelectedCarForFeatures(car);
  const handleGetOffers = (car: any) => setSelectedCarForOffers(car);
  const handleImageClick = (car: any, index: number) => { 
    // FIX: Ensure we pass the correct image array to modal
    const correctImages = car.imageUrls || car.images || [];
    setSelectedCarForImages({ ...car, imageUrls: correctImages }); 
    setImageStartIndex(index); 
  };

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) setCompareList((prev) => prev.filter((carId) => carId !== id));
    else {
      if (compareList.length >= 4) { alert("You can only compare up to 4 cars."); return; }
      setCompareList((prev) => [...prev, id]);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-6 pb-24">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">All Cars Inventory</h1>
        <p className="text-gray-600">Browse our complete collection: New, Featured, and Pre-owned.</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {allVehicles.map((car, index) => {
            // --- FIX 2: SAFE IMAGE HANDLING ---
            // Agar data me 'images' hai to wo use karega, agar 'imageUrls' hai to wo use karega.
            // Agar dono nahi hain, to empty array jayega taaki crash na ho.
            const safeImages = car.imageUrls || car.images || [];

            return (
              <CarGridCard
                key={car.id || index} // Prefer ID over index
                name={car.name}
                rating={car.rating || 4.5}
                reviews={car.reviews || 10}
                priceRange={car.priceRange}
                location={car.location || "Jaipur"}
                
                // CRITICAL FIX HERE:
                imageUrls={safeImages} 

                onBookNowClick={() => handleBookNow(car)}
                onGetOffersClick={() => handleGetOffers(car)}
                onImageClick={(idx) => handleImageClick(car, idx)}
                onShowFeaturesClick={() => handleShowFeatures(car)}
                onAddToCompare={() => toggleCompare(Number(car.id) || index)}
                isSelectedForCompare={compareList.includes(Number(car.id) || index)}
                compareCount={compareList.length}
              />
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedCarForBooking && <BookingForm isOpen={!!selectedCarForBooking} onClose={() => setSelectedCarForBooking(null)} car={selectedCarForBooking} />}
      {selectedCarForFeatures && <FeaturesModal isOpen={!!selectedCarForFeatures} onClose={() => setSelectedCarForFeatures(null)} car={selectedCarForFeatures} />}
      {selectedCarForOffers && <OffersModal isOpen={!!selectedCarForOffers} onClose={() => setSelectedCarForOffers(null)} car={selectedCarForOffers} />}
      
      {/* Image Modal needs safe images too */}
      {selectedCarForImages && (
        <ImageModal 
          isOpen={!!selectedCarForImages} 
          onClose={() => setSelectedCarForImages(null)} 
          imageUrls={selectedCarForImages.imageUrls || []} 
          startIndex={imageStartIndex} 
        />
      )}
      
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