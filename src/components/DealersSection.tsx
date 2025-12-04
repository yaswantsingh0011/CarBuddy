'use client';

import React from 'react';
import { useLocation } from '@/context/LocationContext';
import { dealersData } from '@/data/dealersData';
import { FaMapMarkerAlt, FaPhoneAlt, FaDirections } from 'react-icons/fa';

const DealersSection = ({ brand }: { brand: string }) => {
  const { city } = useLocation();

  // 1. Find dealers object for the current city
  const cityData = dealersData.find(d => d.city === city);

  // 2. FILTER LOGIC ADDED HERE:
  // City milne par check karega ki dealer ka brand current car brand se match karta hai ya nahi
  const dealers = cityData 
    ? cityData.dealers.filter(dealer => dealer.brand === brand) 
    : [];

  // Agar City mein dealer nahi hai ya Brand match nahi hua
  if (dealers.length === 0) {
    return (
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <FaMapMarkerAlt className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No {brand} Dealers Found in {city}</h3>
            <p className="text-gray-500 text-sm">
                We couldn't find any registered showrooms for this brand in your selected city.
            </p>
        </div>
    );
  }

  return (
    <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-600" /> 
            {brand} Dealers in {city}
        </h2>
        <span className="text-xs font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100">
            {dealers.length} Showrooms Found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dealers.map((dealer, index) => (
            <div key={index} className="border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow bg-gray-50 group">
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red-600 transition-colors">
                    {dealer.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">
                    {dealer.address}
                </p>
                
                <div className="flex gap-3">
                    <a 
                        href={`tel:${dealer.phone}`} 
                        className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all"
                    >
                        <FaPhoneAlt size={12}/> Call
                    </a>
                    <a 
                        href={dealer.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-red-700 shadow-sm hover:shadow transition-all"
                    >
                        <FaDirections size={14}/> Locate
                    </a>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DealersSection;