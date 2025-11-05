// src/components/CarDetails.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
// types से Car, KeySpec import करें
import { Car, KeySpec } from "@/types"; 
import { FaStar, FaRegStar } from "react-icons/fa";
import { 
  Cylinder, 
  Power, 
  Gauge, 
  Users, 
  Car as CarIcon, 
  Settings,
  Shield, 
  Music, 
  Zap,
  Luggage,
  Mountain, 
  Maximize, 
  Wrench,
} from "lucide-react"; 

// --- 1. MODAL IMPORTS ---
import BookingForm from "./BookingForm"; 
import OffersModal from "./OffersModal"; 

interface Props {
  car: Car;
}

// Function to render stars (ratings ke liye)
const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className="h-5 w-5" />
            ))}
            {rating % 1 !== 0 && rating > 0 && (
                <FaStar key="half" className="h-5 w-5" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} className="h-5 w-5" />
            ))}
        </>
    );
};

// Icon Mapping Function (Key Specs Tab के लिए)
const getIconForKeySpec = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('engine') || lowerLabel.includes('type')) return Cylinder;
    if (lowerLabel.includes('power') || lowerLabel.includes('hp')) return Power;
    if (lowerLabel.includes('torque') || lowerLabel.includes('nm') || lowerLabel.includes('mileage')) return Gauge;
    if (lowerLabel.includes('seat')) return Users;
    if (lowerLabel.includes('drive') || lowerLabel.includes('transmission')) return Settings;
    if (lowerLabel.includes('airbag') || lowerLabel.includes('safety')) return Shield;
    if (lowerLabel.includes('audio') || lowerLabel.includes('touchscreen')) return Music;
    if (lowerLabel.includes('battery') || lowerLabel.includes('range')) return Zap;
    
    // Utility Specific Icons
    if (lowerLabel.includes('boot')) return Luggage;
    if (lowerLabel.includes('ground clearance')) return Mountain;
    if (lowerLabel.includes('length')) return Maximize;

    return CarIcon;
};

// Icon Mapper for the Utility Specs section (Top Features Tab के लिए)
const getUtilityIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('boot')) return Luggage;
    if (lowerLabel.includes('ground clearance')) return Mountain;
    if (lowerLabel.includes('length')) return Maximize;
    if (lowerLabel.includes('wheel')) return Settings;
    return Wrench;
};


// --- EMI CALCULATION FUNCTION (Dynamic EMI) ---
const calculateEstimatedEMI = (priceRange: string) => {
    const priceMatch = priceRange.match(/₹\s*([\d\.\,]+)\s*(Lakh|Cr)/i);
    if (!priceMatch) return null;

    let price = parseFloat(priceMatch[1].replace(/,/g, ''));
    const unit = priceMatch[2].toLowerCase();

    if (unit.includes('cr') || unit.includes('crore')) {
        price *= 10000000;
    } else if (unit.includes('lakh')) {
        price *= 100000;
    } else {
        return null;
    }
    
    // Approx 1% of total price is monthly EMI (Price / 100)
    const estimatedEMI = price * 0.01; 
    
    return estimatedEMI.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).replace('₹', '₹ ');
};
// --- END EMI CALCULATION FUNCTION ---


export default function CarDetails({ car }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState("detailed_specs"); 

  // --- 2. MODAL STATES ---
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);

  const detailedSpecsData: KeySpec[] = car.keySpecifications || [];
  const utilitySpecsData: KeySpec[] = car.utilitySpecs || [];
  const estimatedEMI = calculateEstimatedEMI(car.priceRange); 

  const demoTopFeatures = [
      "Keyless Entry", "Cruise Control", 
      "Steering Mounted Controls", "Automatic Climate Control",
      "Wireless Phone Charging", "Rear AC Vents"
  ];


  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        
        {/* 1. Image + Details Grid (MAIN CARD) */}
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
          
          {/* Left Column: Images */}
          <div>
            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={car.imageUrls[selectedImageIndex]}
                alt={car.name}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {car.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-16 rounded-lg border-2 cursor-pointer overflow-hidden transition-all ${
                    selectedImageIndex === index
                      ? "border-blue-500 scale-105"
                      : "border-gray-200 opacity-80"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image src={url} alt={`${car.name} ${index}`} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Name, Rating, Price, and Offers */}
          <div className="flex flex-col justify-start">
            
            {/* Name and Rating (PRIMARY HEADER) */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{car.name}</h1>
            <div className="flex items-center gap-2 text-yellow-400 mb-6">
                {renderStars(car.rating)}
                <span className="text-gray-700 ml-2">{car.rating.toFixed(1)} / 5</span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-700">{car.reviews} Reviews</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-gray-900 mb-1">{car.priceRange}</p>
            <p className="text-sm text-gray-500 mb-8">
              *Ex-showroom price in <span className="underline cursor-pointer">{car.location}</span>
            </p>
            
            {/* EMI and KSPs */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                {/* 1. EMI Estimate (DYNAMIC) */}
                <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-semibold text-gray-700">Estimated EMI:</span>
                    <span className="text-xl font-bold text-green-600">
                        {estimatedEMI || 'N/A'} / month*
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    *Based on estimated on-road price, 8% interest, 5-year tenure. <a href="#" className="text-blue-600 hover:underline">Check Loan Eligibility</a>
                </p>

                <div className="h-px bg-gray-200 my-4"></div>

                {/* 2. Quick Highlights / Value Props (car.features से डेटा का उपयोग करें) */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Why choose the {car.name}?</h3>
                    {/* car.features के पहले 3 items को quick highlights के रूप में उपयोग करें */}
                    {car.features?.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-800">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>{feature}</span>
                        </div>
                    )) || <p className="text-sm text-gray-500">Premium quality guaranteed.</p>}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
                {/* 1. Get Current Offers Button (Opens Offers Modal) */}
                <button 
                     className="w-full py-3 font-bold rounded-lg text-lg transition-colors 
                                border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                     onClick={() => setIsOffersModalOpen(true)} // <-- ENABLED!
                 >
                     Get Current Offers
                 </button>
                 
                {/* 2. Book Your Test Drive Now Button (Opens Booking Form) */}
                <button 
                     className="w-full py-3 bg-green-500 text-white font-bold rounded-lg text-lg hover:bg-green-600 transition-colors shadow-lg"
                     onClick={() => setIsBookingModalOpen(true)} // <-- ENABLED!
                 >
                     Book Your Test Drive Now
                 </button>
            </div>
          </div>
        </div>
        {/* --- END: MAIN CARD --- */}


        {/* 2. Detailed Key Specs & Features (Bottom Box - Venue Style) */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Key Specs & Features</h2>
            
            {/* Tabs for Detailed Specs/Features (Red Highlight) */}
            <div className="flex border-b mb-6">
                <button
                    className={`py-2 px-4 font-medium transition-colors ${
                        activeBottomTab === "detailed_specs" 
                            ? "text-red-600 border-b-2 border-red-600" 
                            : "text-gray-600 hover:text-red-600"
                    }`}
                    onClick={() => setActiveBottomTab("detailed_specs")}
                >
                    Key Specifications
                </button>
                <button
                    className={`py-2 px-4 font-medium transition-colors ${
                        activeBottomTab === "detailed_features" 
                            ? "text-red-600 border-b-2 border-red-600" 
                            : "text-gray-600 hover:text-red-600"
                    }`}
                    onClick={() => setActiveBottomTab("detailed_features")}
                >
                    Top Features
                </button>
            </div>

            {/* Content Area for Detailed Specs (Venue Style Grid) */}
            {activeBottomTab === "detailed_specs" && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
                    {/* Data from car.keySpecifications */}
                    {detailedSpecsData.length > 0 ? (
                        detailedSpecsData.map((spec, i) => {
                            const IconComponent = getIconForKeySpec(spec.label);
                            return (
                                <div key={i} className="flex flex-col justify-start">
                                    <div className="flex items-center text-gray-600 text-sm mb-1">
                                        <IconComponent className="w-5 h-5 text-gray-400 mr-2"/>
                                        {spec.label}
                                    </div>
                                    <span className="text-lg font-bold text-gray-900 ml-7">
                                        {spec.value}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="col-span-4 text-gray-500">Key performance specifications are not yet available in the data source. Please check the Top Features tab for general features.</p>
                    )}
                </div>
            )}

            {/* Content Area for Detailed Features (List Style - DYNAMIC UTILITY SPECS) */}
            {activeBottomTab === "detailed_features" && (
                <div className="space-y-6">
                     
                     {/* 1. Utility Specs Section (DYNAMIC) */}
                     <h3 className="text-lg font-bold text-gray-800 border-b pb-1">Dimensions & Utility</h3>
                     
                     {utilitySpecsData.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
                             {utilitySpecsData.map((spec, i) => {
                                const IconComponent = getUtilityIcon(spec.label); 
                                return (
                                    <div key={i} className="flex flex-col justify-start">
                                        <div className="flex items-center text-gray-600 text-sm mb-1">
                                            <IconComponent className="w-5 h-5 text-gray-400 mr-2"/>
                                            {spec.label}
                                        </div>
                                        <span className="text-lg font-bold text-gray-900 ml-7">
                                            {spec.value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                     ) : (
                         <p className="text-gray-500">Dimensions and utility data are not yet available for this model.</p>
                     )}

                     
                     {/* 2. Primary Features Section */}
                     <h3 className="text-lg font-bold text-gray-800 border-b pb-1 pt-3">Comfort & Infotainment</h3>
                     <ul className="list-disc list-inside ml-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(car.features?.length ? car.features : demoTopFeatures).map((feature, i) => (
                           <li key={i}>{feature}</li>
                        ))}
                     </ul>

                    {/* 3. Safety Features Section */}
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-1 pt-3">Safety & Security</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li>High Strength Steel Body</li>
                        <li>Multi-Terrain ABS with EBD</li>
                        <li>Vehicle Stability Control</li>
                        <li>Hill Descent Control</li>
                    </ul>
                </div>
            )}

            {/* View All Link (Venue Style) */}
            <div className="mt-8 text-left">
                <a href="#" className="text-red-600 font-bold flex items-center group text-base">
                    View All Specs and Features 
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
            </div>

        </div>
        
      </div>
      
      {/* --- 4. MODALS RENDERED HERE --- */}
      {/* Booking Form ko open/close karne ke liye state aur car data pass kiya gaya hai */}
      <BookingForm 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
          car={car} 
      />
      {/* Offers Modal ko open/close karne ke liye state aur car data pass kiya gaya hai */}
      <OffersModal 
          isOpen={isOffersModalOpen} 
          onClose={() => setIsOffersModalOpen(false)} 
          car={car} 
      />
    </div>
  );
}