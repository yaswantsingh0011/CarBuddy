// src/components/CarCard.tsx

import React from 'react';
import Image from 'next/image';

interface CarCardProps {
  name: string;
  priceRange: string;
  imageUrl: string;
}

const CarCard: React.FC<CarCardProps> = ({ name, priceRange, imageUrl }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white group">
      {/* Car Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        {/* Car Name */}
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
        
        {/* Car Price */}
        <p className="text-base font-semibold text-gray-900 mt-2">{priceRange}</p>
        
        {/* View Details Button */}
        <button className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;