"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; 
import { FaArrowLeft } from 'react-icons/fa';
import ElectricCarCard from '@/components/ElectricCarCard';
import OffersModal from '@/components/OffersModal';
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';

export default function BrandPage() {
  const params = useParams(); 
  const router = useRouter();
  const slug = params.slug as string;
  const [offerCar, setOfferCar] = useState<any>(null);

  if (!slug) return <div className="min-h-screen bg-gray-50"></div>;

  const brandNameSearch = slug.replace(/-/g, " ").toLowerCase();
  const displayBrandName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  const allCars = [...mostSearchedCars, ...electricCars, ...newLaunchCars];

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

  const handleCardClick = (carName: string) => {
    const detailSlug = carName.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${detailSlug}`);
  };

  const getOffersList = (car: any) => {
    if (!car) return [];
    const name = car.name || "";
    if (name.includes("EV") || car.category === "EV") {
      return ["Free Home Wall Box Charger", "Zero Processing Fee on Loan"];
    }
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const getFuelType = (car: any) => {
    if (car.fuelType) return car.fuelType;
    if (car.category === "EV" || car.name.toLowerCase().includes("ev")) return "Electric";
    const dieselCars = ["Scorpio", "Fortuner", "Harrier", "Safari", "Innova", "Endeavour", "Thar", "Gloster", "XUV700", "Bolero"];
    if (dieselCars.some(model => car.name.includes(model))) return "Diesel";
    return "Petrol";
  };

  const carForModal = offerCar ? { ...offerCar, offers: getOffersList(offerCar) } : null;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-gray-600 transition-colors"><FaArrowLeft /></Link>
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cars by {displayBrandName}</h1>
                <p className="text-gray-500 text-sm">Showing {filteredCars.length} results</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car: any, index) => {
                const imageSrc = car.images ? car.images[0] : (car.image || car.imageUrls?.[0] || "/cars/placeholder.jpg");
                const fuelType = getFuelType(car);

                return (
                    <div key={index} className="cursor-pointer transition-transform hover:scale-105">
                        <div className="h-full pointer-events-auto">
                            <ElectricCarCard 
                                id={car.id || index} 
                                name={car.name} 
                                priceRange={car.price || car.priceRange} 
                                imageUrl={imageSrc} 
                                fuelType={fuelType}
                                
                                // ✅ DATA PASSED FOR COMPARE
                                specs={car.specs}
                                features={car.features}
                                images={car.images}

                                onDetailClick={() => handleCardClick(car.name)}
                                onOfferClick={() => setOfferCar(car)} 
                            />
                        </div>
                    </div>
                );
            })}
        </div>

      </div>
      {offerCar && <OffersModal isOpen={!!offerCar} onClose={() => setOfferCar(null)} car={carForModal} />}
    </div>
  );
}