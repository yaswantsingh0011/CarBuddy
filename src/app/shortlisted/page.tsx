'use client';

import React from 'react';
import Link from 'next/link';
import { useShortlist } from '@/context/ShortlistContext'; // ✅ Tera context hook
import ElectricCarCard from '@/components/ElectricCarCard';
import { useRouter } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';

const ShortlistPage = () => {
  const { shortlist } = useShortlist();
  const router = useRouter();

  // --- ✅ 1. EMPTY STATE: Match with image_9ba5d4.png ---
  if (shortlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a202c] mb-4">
            Your Shortlist is Empty
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Start exploring cars and add them to your wishlist!
          </p>
          <Link 
            href="/search" 
            className="inline-block bg-[#2162e3] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  // --- ✅ 2. SHORTLISTED CARS GRID ---
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 flex items-center gap-4">
           <div className="bg-red-50 p-3 rounded-2xl">
              <FaHeart className="text-red-500 text-2xl" />
           </div>
           <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                My Shortlisted Cars ({shortlist.length})
              </h1>
              <p className="text-gray-500 font-medium">Cars you've saved for later</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {shortlist.map((car: any) => (
                <div key={car.id || car.name} className="h-full">
                    {/* ✅ Prop spreading taaki card ko saara data mil jaye */}
                    <ElectricCarCard 
                        {...car} 
                        onOfferClick={() => console.log("Offer for", car.name)}
                        onDetailClick={() => router.push(`/car-details/${car.slug || car.name.toLowerCase().replace(/\s+/g, "-")}`)}
                    />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShortlistPage;