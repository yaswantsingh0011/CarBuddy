import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Import ALL data sources
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';

import { FaArrowLeft, FaStar } from 'react-icons/fa';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  
  // URL se brand name nikal kar readable banana (e.g. "tata-motors" -> "tata motors")
  const brandNameSearch = slug.replace(/-/g, " ").toLowerCase();

  // --- DATA AGGREGATION ---
  const allCars = [
    ...mostSearchedCars,
    ...electricCars,
    ...newLaunchCars
  ];

  // Filter Logic: Brand Name match karna
  const uniqueCarsMap = new Map();

  allCars.forEach((car: any) => {
    const carName = car.name.toLowerCase();
    
    // Check agar Car Name me Brand Name shamil hai (e.g. "Tata" in "Tata Nexon")
    if (carName.includes(brandNameSearch)) {
        if (!uniqueCarsMap.has(car.name)) {
            uniqueCarsMap.set(car.name, car);
        }
    }
  });

  const filteredCars = Array.from(uniqueCarsMap.values());

  // Agar koi car nahi mili
  if (filteredCars.length === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No cars found for "{slug}"</h2>
            <Link href="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Go Home
            </Link>
        </div>
    );
  }

  const displayBrandName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

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
                <p className="text-gray-500">Showing {filteredCars.length} results</p>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car: any, index: number) => {
                
                // Image Handling
                const imageSrc = car.images ? car.images[0] : (car.image || car.imageUrls?.[0] || "/cars/placeholder.jpg");
                const price = car.price || car.priceRange;
                
                // ✅ SLUG GENERATION (Sabse Important Part)
                // Agar car ke data me pehle se slug hai (New Launches) to wo use karo, 
                // nahi to naam se banao.
                const detailSlug = car.slug || car.name.trim().toLowerCase().replace(/\s+/g, "-");

                return (
                    // ✅ LINK: Pure Card ko Clickable banaya hai
                    <Link href={`/car-details/${detailSlug}`} key={index} className="group block h-full">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                            
                            {/* Image */}
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image 
                                    src={imageSrc} 
                                    alt={car.name} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{car.name}</h3>
                                
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                                        4.5 <FaStar size={8} />
                                    </span>
                                    <span>(120 Reviews)</span>
                                </div>

                                <p className="text-xl font-bold text-gray-900 mt-auto">{price}</p>
                                <p className="text-xs text-gray-500 mb-4">*Ex-showroom price</p>

                                <button className="w-full py-2.5 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>

      </div>
    </div>
  );
}