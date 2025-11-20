// src/app/car-details/[slug]/page.tsx

import React from 'react'; // "use client" hata sakte hain agar ye server component rakhna hai, par hooks use kiye to rakhna padega
import { notFound } from 'next/navigation';
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars'; // Import added
import { 
  FaStar, FaStarHalfAlt, FaGasPump, FaCogs, FaTachometerAlt, FaBolt, FaArrowRight 
} from 'react-icons/fa';

// Helper to generate slug
const generateSlug = (name: string) => name.toLowerCase().split(" ").join("-");

interface PageProps {
  params: {
    slug: string;
  };
}

// Default Specs (Placeholder)
const defaultSpecs = {
    engine: "1.5L Turbo / Battery Info",
    power: "118 - 150 bhp",
    torque: "170 - 300 Nm",
    transmission: "Automatic / Manual",
    fuel: "Petrol / Electric",
    rating: 4.5,
    reviews: 120
};

const CarDetailPage = ({ params }: PageProps) => {
  const { slug } = params;

  // 1. Check in BOTH arrays
  // Type assertion use kr rahe hain taaki TS error na de (kyuki properties thodi alag ho sakti hain)
  const car = 
    mostSearchedCars.find((c) => generateSlug(c.name) === slug) || 
    electricCars.find((c) => generateSlug(c.name) === slug);

  if (!car) return notFound();

  // 2. Normalize Data (Handle Price vs PriceRange mismatch)
  // mostSearchedCars me 'price' hai, electricCars me 'priceRange' hai
  const displayPrice = (car as any).price || (car as any).priceRange;
  
  // Check specific ID or category to customize specs for EV
  // Aapke data me EVs ki ID 800 series me hai
  const isEV = car.id > 800 || (car as any).category === "EV"; 

  return (
    <div className="min-h-screen bg-gray-100 py-8 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* TOP SECTION */}
        <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-gray-100">
                 <img src={car.image} alt={car.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>

                <div className="flex items-center space-x-2 mb-4 text-sm">
                    <div className="flex text-yellow-400">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                    </div>
                    <span className="text-gray-600 font-medium">4.5 / 5</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">45 Reviews</span>
                </div>

                {/* Updated Price Logic */}
                <div className="mb-1">
                    <h2 className="text-3xl font-bold text-gray-900">{displayPrice}</h2>
                </div>
                <p className="text-xs text-gray-500 mb-6">*Ex-showroom price</p>

                {/* EMI Box */}
                <div className="bg-gray-50 rounded-md p-4 border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">Estimated EMI:</span>
                        <span className="text-green-600 font-bold text-sm cursor-pointer">Check Eligibility</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        <p className="font-semibold mb-1 text-gray-800">Why choose this car?</p>
                        <ul className="list-none space-y-1 pl-1">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> {isEV ? "Zero Emissions" : "High Performance Engine"}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Premium Safety Features
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded hover:bg-blue-50 transition-colors">
                        Get Current Offers
                    </button>
                    <button className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-colors shadow-md">
                        Book Your Test Drive Now
                    </button>
                </div>
            </div>
        </div>

        {/* SPECS SECTION */}
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Specs</h3>
            
            {/* Agar EV hai to Battery icon dikhayein, nahi to Pump */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        {isEV ? <FaBolt className="text-yellow-500"/> : <FaGasPump />} 
                        <span className="text-xs">{isEV ? "Range/Battery" : "Engine"}</span>
                    </div>
                    <p className="font-bold text-gray-900">{isEV ? "400+ km / 40kWh" : defaultSpecs.engine}</p>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <FaCogs /> <span className="text-xs">Transmission</span>
                    </div>
                    <p className="font-bold text-gray-900">{isEV ? "Automatic" : defaultSpecs.transmission}</p>
                </div>

                {/* Add more specs as needed */}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline">
                    View All Specs <FaArrowRight size={12} />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CarDetailPage;