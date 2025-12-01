"use client"; // ✅ Client Component banaya interactivity ke liye

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; // ✅ Hooks for params/nav
import { FaArrowLeft } from 'react-icons/fa';

// ✅ Imports for UI consistency
import ElectricCarCard from '@/components/ElectricCarCard';
import OffersModal from '@/components/OffersModal';

// Data Sources
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';

export default function BrandPage() {
  const params = useParams(); // ✅ Get slug from URL
  const router = useRouter();
  const slug = params.slug as string;

  // ✅ State for Offers Modal
  const [offerCar, setOfferCar] = useState<any>(null);

  // Safety Check
  if (!slug) return <div className="min-h-screen bg-gray-50"></div>;

  // 1. Brand Name Logic
  const brandNameSearch = slug.replace(/-/g, " ").toLowerCase();
  const displayBrandName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  // 2. Data Aggregation
  const allCars = [
    ...mostSearchedCars,
    ...electricCars,
    ...newLaunchCars
  ];

  // 3. Filter Logic (Aapka wala logic)
  const uniqueCarsMap = new Map();
  allCars.forEach((car: any) => {
    const carName = car.name.toLowerCase();
    if (carName.includes(brandNameSearch)) {
        if (!uniqueCarsMap.has(car.name)) {
            uniqueCarsMap.set(car.name, car);
        }
    }
  });
  const filteredCars = Array.from(uniqueCarsMap.values());

  // Navigation Handler
  const handleCardClick = (carName: string) => {
    const detailSlug = carName.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${detailSlug}`);
  };

  // Offers Logic
  const getOffersList = (car: any) => {
    if (!car) return [];
    const name = car.name || "";
    if (name.includes("EV") || car.category === "EV") {
      return ["Free Home Wall Box Charger", "Zero Processing Fee on Loan"];
    }
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const carForModal = offerCar ? { ...offerCar, offers: getOffersList(offerCar) } : null;

  // --- RENDERING ---

  // Agar car nahi mili
  if (filteredCars.length === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No cars found for "{displayBrandName}"</h2>
            <Link href="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Go Home
            </Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-gray-600 transition-colors">
                <FaArrowLeft />
            </Link>
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cars by {displayBrandName}</h1>
                <p className="text-gray-500 text-sm">Showing {filteredCars.length} results</p>
            </div>
        </div>

        {/* ✅ Grid with ElectricCarCard (Proper Styling) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car: any, index: number) => {
                
                // Image handling
                const imageSrc = car.images ? car.images[0] : (car.image || car.imageUrls?.[0] || "/cars/placeholder.jpg");
                
                // Fuel Type Logic (Auto-detect)
                const fuelType = car.fuelType || (car.name.toLowerCase().includes("ev") ? "Electric" : "Petrol");

                return (
                    <div 
                        key={index} 
                        // Card Click Navigate karega
                        onClick={() => handleCardClick(car.name)}
                        className="cursor-pointer transition-transform hover:scale-105"
                    >
                        {/* Wrapper div to capture clicks properly */}
                        <div className="h-full pointer-events-auto">
                            <ElectricCarCard 
                                id={car.id || index} 
                                name={car.name} 
                                priceRange={car.price || car.priceRange} 
                                imageUrl={imageSrc} 
                                fuelType={fuelType}
                                
                                // Offers Modal Trigger
                                onOfferClick={() => setOfferCar(car)} 
                            />
                        </div>
                    </div>
                );
            })}
        </div>

      </div>

      {/* ✅ Offers Modal Integration */}
      {offerCar && (
        <OffersModal 
            isOpen={!!offerCar}
            onClose={() => setOfferCar(null)}
            car={carForModal}
        />
      )}

    </div>
  );
}