'use client';

import React from 'react';
import Link from 'next/link';
import { useShortlist } from '@/context/ShortlistContext';
import ElectricCarCard from '@/components/ElectricCarCard';
import { useRouter } from 'next/navigation';

const ShortlistPage = () => {
  const { shortlist } = useShortlist();
  const router = useRouter();

  if (shortlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Shortlist is Empty</h2>
        <p className="text-gray-500 mb-6">Start exploring cars and add them to your wishlist!</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Browse Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Shortlisted Cars ({shortlist.length})</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shortlist.map((car: any, index: number) => (
                <div key={index} className="cursor-pointer transition-transform hover:scale-105">
                    <div className="h-full pointer-events-auto">
                        <ElectricCarCard 
                            id={car.id}
                            name={car.name}
                            priceRange={car.priceRange}
                            imageUrl={car.imageUrl}
                            fuelType={car.fuelType}
                            specs={car.specs}
                            features={car.features}
                            images={car.images}
                            onOfferClick={() => alert("Offers available on detail page")}
                            onDetailClick={() => router.push(`/car-details/${car.name.toLowerCase().replace(/\s+/g, "-")}`)}
                        />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShortlistPage;