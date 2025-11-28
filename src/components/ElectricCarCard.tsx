"use client";

import React from 'react';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { PlusCircle, CheckCircle } from 'lucide-react';

interface ElectricCarCardProps {
  carData?: any; // ✅ Full object accept karne ke liye
  name: string;
  priceRange: string;
  imageUrl: string;
  onOfferClick: () => void;
}

const ElectricCarCard: React.FC<ElectricCarCardProps> = ({
  carData,
  name,
  priceRange,
  imageUrl,
  onOfferClick,
}) => {
  
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  
  // Unique ID
  const carId = carData?.id || name; 
  const isCompared = isInCompare(carId);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCompared) {
        removeFromCompare(carId);
    } else {
        // ✅ SMART MAPPING: Data ko sahi format mein convert kar rahe hain
        // Taaki Compare Page par "N/A" na aaye
        const compareObject = { 
            id: carId, 
            name, 
            price: priceRange, 
            
            // Images: Agar array hai to wo lo, nahi to single image ko array banao
            imageUrls: carData?.images || carData?.imageUrls || [imageUrl], 

            // Details: Data file mein 'specs' ke andar fuel/transmission hota hai
            fuelType: carData?.specs?.fuel || carData?.fuelType || (name.includes("EV") ? "Electric" : "Petrol/Diesel"),
            transmission: carData?.specs?.transmission || "Automatic", 
            mileage: carData?.specs?.mileage || carData?.range || "N/A",
            
            rating: 4.5, 
            reviews: 24
        };

        addToCompare(compareObject);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full p-3 group">
      
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3 bg-gray-100">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{priceRange}</p>
        </div>

        <div className="mt-auto flex flex-col gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation(); 
                onOfferClick();      
              }}
              className="w-full border border-orange-500 text-orange-600 font-bold py-2.5 rounded-lg hover:bg-orange-50 transition-colors text-sm"
            >
              View Current Offers
            </button>

            <button 
                onClick={toggleCompare}
                className={`w-full flex items-center justify-center gap-2 text-sm font-medium transition-colors py-1 ${
                    isCompared ? 'text-green-600' : 'text-gray-500 hover:text-gray-900'
                }`}
            >
                {isCompared ? <CheckCircle size={16} /> : <PlusCircle size={16} />}
                {isCompared ? "Added to Compare" : "Add to Compare"}
            </button>

        </div>
      </div>

    </div>
  );
};

export default ElectricCarCard;