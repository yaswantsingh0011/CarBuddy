"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaShareAlt, FaBell, FaCogs, FaGasPump, FaBolt, FaRedo } from 'react-icons/fa';
import { Car } from '@/types';

const UpcomingCarDetails = ({ car }: { car: Car }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleAlert = () => {
    alert(`Success! We will notify you when ${car.name} is launched.`);
  };

  return (
    <div className="bg-white min-h-screen pb-12 font-sans">
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 px-4 border-b border-gray-200 text-xs text-gray-500 mb-6">
         <div className="container mx-auto">
            <Link href="/" className="hover:text-blue-600">Home</Link> &gt; Upcoming Cars &gt; <span className="text-gray-700">{car.name}</span>
         </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT SIDE: IMAGES (7 Columns) --- */}
        <div className="lg:col-span-7">
           <div className="relative w-full h-[350px] md:h-[450px] bg-black rounded-xl overflow-hidden mb-4 group">
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider z-10">
                 Upcoming
              </div>
              
              <Image 
                src={car.imageUrls[activeImage] || car.imageUrls[0]} 
                alt={car.name} 
                fill 
                className="object-contain"
              />

              {/* Navigation Arrows (Visual only) */}
              <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center bg-black/10 group-hover:bg-black/20 cursor-pointer text-white" onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : prev)}>‹</div>
              <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center bg-black/10 group-hover:bg-black/20 cursor-pointer text-white" onClick={() => setActiveImage(prev => prev < car.imageUrls.length - 1 ? prev + 1 : prev)}>›</div>
           </div>

           {/* Thumbnails */}
           <div className="flex space-x-2 overflow-x-auto pb-2">
              {car.imageUrls.map((url, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => setActiveImage(idx)}
                   className={`relative w-20 h-16 flex-shrink-0 rounded border-2 cursor-pointer ${activeImage === idx ? 'border-orange-500' : 'border-transparent'}`}
                 >
                    <Image src={url} alt="thumb" fill className="object-cover rounded-sm" />
                 </div>
              ))}
           </div>
        </div>

        {/* --- RIGHT SIDE: DETAILS (5 Columns) --- */}
        <div className="lg:col-span-5">
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>
           
           {/* Views & Share */}
           <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500 flex items-center">
                 <span className="mr-2">2.5K Views</span>
                 <span className="text-orange-500 text-xs border border-orange-200 px-2 py-0.5 rounded bg-orange-50 cursor-pointer">Share your Views</span>
              </div>
              <div className="flex space-x-4 text-gray-400">
                 <FaHeart className="hover:text-red-500 cursor-pointer" size={20} />
                 <FaShareAlt className="hover:text-blue-500 cursor-pointer" size={20} />
              </div>
           </div>

           {/* Description */}
           <p className="text-gray-600 text-sm mb-6 leading-relaxed">
             The {car.name} is set to redefine its segment with futuristic design and cutting-edge technology. 
             Packed with features like {car.features[0]} and {car.features[1]}, it promises a premium driving experience.
             <span className="text-blue-600 cursor-pointer ml-1">... more</span>
           </p>

           {/* Price Section */}
           <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{car.priceRange}</h2>
              <p className="text-xs text-gray-500">Estimated Price in India</p>
           </div>

           {/* Launch Date Box */}
           <div className="mb-6">
              <p className="text-gray-700 font-medium mb-3">
                Expected Launch Date : <span className="text-black font-bold">{car.location || "Coming Soon"}</span>
              </p>
              
              <button 
                onClick={handleAlert}
                className="w-full border border-orange-500 text-orange-600 font-bold py-3 rounded hover:bg-orange-50 transition-colors uppercase tracking-wide"
              >
                 Alert Me When Launched
              </button>
           </div>

        </div>
      </div>

      {/* --- BOTTOM SECTION: KEY SPECS --- */}
      <div className="container mx-auto px-4 mt-10">
         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Key specs of {car.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {car.keySpecifications?.slice(0, 6).map((spec, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
                     <div className="flex items-center text-gray-500 text-sm">
                        {/* Icons logic based on label */}
                        <span className="mr-3 text-gray-400">
                           {spec.label.includes('Engine') || spec.label.includes('Powertrain') ? <FaCogs /> : 
                            spec.label.includes('Fuel') || spec.label.includes('Charging') ? <FaGasPump /> : <FaRedo />}
                        </span>
                        {spec.label}
                     </div>
                     <span className="font-semibold text-gray-900 text-sm">{spec.value}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default UpcomingCarDetails;