'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaGasPump, FaCogs, FaRoad, FaTachometerAlt } from 'react-icons/fa';

interface CompareCardProps {
  car: any;
  onRemove: (id: string | number) => void;
}

const CompareCard: React.FC<CompareCardProps> = ({ car, onRemove }) => {
  // Ensure images array exists
  const carImages = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
  const [activeImg, setActiveImg] = useState(carImages[0]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative flex flex-col w-full">
      
      {/* Remove Button */}
      <button onClick={() => onRemove(car.id || car.name)} className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full hover:bg-red-100 z-20 shadow-sm"><FaTimes /></button>

      {/* Main Image */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image src={activeImg} alt={car.name} fill className="object-cover" />
      </div>

      {/* Thumbnails (Max 4) */}
      <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-100">
        {carImages.slice(0, 4).map((img: string, idx: number) => (
            <div key={idx} onClick={() => setActiveImg(img)} className={`relative w-1/4 h-10 rounded overflow-hidden cursor-pointer border-2 ${activeImg === img ? "border-blue-500" : "border-transparent"}`}>
                <Image src={img} alt="thumb" fill className="object-cover" />
            </div>
        ))}
      </div>

      {/* Details */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{car.name}</h3>
        <p className="text-blue-600 font-bold text-md mb-3">{car.priceRange}</p>
        
        {/* Specs Table */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs text-gray-700">
            <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-500 flex items-center gap-1"><FaGasPump/> Fuel</span>
                <span className="font-semibold">{car.fuelType || "N/A"}</span>
            </div>
            {car.specs && (
                <>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-gray-500 flex items-center gap-1"><FaCogs/> Engine</span>
                        <span className="font-semibold truncate w-24 text-right" title={car.specs.engine}>{car.specs.engine || "-"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="text-gray-500 flex items-center gap-1"><FaRoad/> Mileage</span>
                        <span className="font-semibold">{car.specs.mileage || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 flex items-center gap-1"><FaTachometerAlt/> Power</span>
                        <span className="font-semibold">{car.specs.power || "-"}</span>
                    </div>
                </>
            )}
        </div>

        {/* Features */}
        {car.features && (
            <div className="mt-3 flex flex-wrap gap-1">
                {car.features.slice(0, 3).map((feat: string, idx: number) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2 py-1 rounded">{feat}</span>
                ))}
            </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-100">
        <Link href={`/car-details/${car.name.toLowerCase().replace(/\s+/g, "-")}`} className="block w-full py-2 text-center text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
            View Details
        </Link>
      </div>
    </div>
  );
};

export default CompareCard;