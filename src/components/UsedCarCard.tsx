"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTag } from 'react-icons/fa'; // Offers के लिए टैग आइकॉन

interface UsedCarCardProps {
  car: any;
}

const UsedCarCard: React.FC<UsedCarCardProps> = ({ car }) => {
  // डेटाबेस से स्लग या नाम के आधार पर लिंक बनाना
  const carSlug = car.slug || (car.name ? encodeURIComponent(car.name.toLowerCase().replace(/ /g, '-')) : '#');

  // सुरक्षित इमेज हैंडलिंग
  const displayImage = car.image_url || car.images?.[0] || car.imageUrls?.[0] || "/cars/placeholder.jpg";

  // 🔥 PRICE FIX: डबल '₹' साइन को रोकने के लिए लॉजिक
  const rawPrice = car.price_range || car.price || "";
  const finalPrice = rawPrice.toString().includes("₹") ? rawPrice : `₹ ${rawPrice}`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      
      {/* --- इमेज सेक्शन (इमेज पर फ्यूल बैज के साथ) --- */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
        <Link href={`/car-details/${carSlug}`}>
          <Image
            src={displayImage}
            alt={car.name || "Car Image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* ⛽ फ्यूल बैज: सफ़ेद छोटा बॉक्स */}
        {car.fuel_type && (
          <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded shadow-sm text-[10px] font-bold text-gray-700 flex items-center gap-1 uppercase tracking-tighter">
             <span className="text-blue-500 text-xs">⛽</span> {car.fuel_type}
          </div>
        )}
      </div>

      {/* --- कंटेंट सेक्शन --- */}
      <div className="p-4 flex flex-col flex-grow">
        {/* कार का नाम */}
        <Link href={`/car-details/${carSlug}`}>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors mb-1">
            {car.name}
          </h3>
        </Link>

        {/* कीमत: सिंगल सिंबल फिक्स के साथ */}
        <p className="text-xl font-extrabold text-gray-900 leading-tight">
          {finalPrice}
        </p>

        {/* लोकेशन/डिस्क्लेमर टेक्स्ट */}
        <p className="text-[11px] text-gray-500 mt-1 mb-5">
          Avg. Ex-Showroom {car.location || 'Jaipur'}
        </p>

        {/* --- बटन्स सेक्शन (DETAILS & OFFERS - अगल-बगल) --- */}
        <div className="flex gap-3 mt-auto">
          {/* DETAILS बटन (आउटलाइन स्टाइल) */}
          <Link href={`/car-details/${carSlug}`} className="flex-1">
            <button className="w-full border-2 border-blue-600 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-50 transition-all text-xs uppercase tracking-wider">
              DETAILS
            </button>
          </Link>

          {/* OFFERS बटन (नीला सॉलिड स्टाइल) */}
          <button 
            className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            onClick={() => alert(`Offers for ${car.name}!`)}
          >
            <FaTag size={12} /> OFFERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsedCarCard;