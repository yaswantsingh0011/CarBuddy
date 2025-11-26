"use client";

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';

// ✅ 1. IMPORT ALL DATA FILES (Old + New)
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars'; 
import { newLaunchCars } from '@/data/newlaunchcars'; 
import { newCarsData } from '@/data/newCarsData';   // ✅ Added
import { usedCarsData } from '@/data/usedCarsData'; // ✅ Added

import BookingForm from '@/components/BookingForm';
import OffersModal from '@/components/OffersModal'; 
import { 
  FaStar, FaStarHalfAlt, FaGasPump, FaCogs, FaBolt, FaArrowRight, FaCheckCircle, FaCar, FaRoad, FaUser, FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa';

// Helper to clean slug
const generateSlug = (name: string) => name.trim().toLowerCase().replace(/\s+/g, "-");

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CarDetailPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');

  // ✅ 2. UNIVERSAL SEARCH LOGIC (Updated)
  // Sabhi 5 files me dhoondhega
  const foundCar = 
    mostSearchedCars.find((c) => generateSlug(c.name) === decodedSlug) || 
    electricCars.find((c) => generateSlug(c.name) === decodedSlug) ||
    newLaunchCars.find((c) => (c.slug === decodedSlug) || (generateSlug(c.name) === decodedSlug)) ||
    newCarsData.find((c) => (c.slug === decodedSlug) || (generateSlug(c.name) === decodedSlug)) ||
    usedCarsData.find((c) => generateSlug(c.name) === decodedSlug);

  // Agar kahin nahi mili to 404
  if (!foundCar) {
    return notFound();
  }

  // --- DATA NORMALIZATION (Sab data ko ek format me lana) ---
  
  // 1. Detect Car Type
  const isUsed = (foundCar as any).kms !== undefined; // Agar kms hai to Used Car hai
  const isEV = foundCar.id > 800 || (foundCar as any).category === "EV" || foundCar.name.includes("Electric") || foundCar.name.includes("EV");

  // 2. Images
  const carImages = (foundCar as any).images || (foundCar as any).imageUrls || [(foundCar as any).image] || ["/cars/placeholder.jpg"];

  // 3. Price
  const displayPrice = (foundCar as any).price || (foundCar as any).priceRange;

  // 4. Specs Standardization (Sabse Important Part)
  let normalizedSpecs = {
    engine: "N/A", power: "N/A", torque: "N/A", transmission: "N/A", 
    bootSpace: "N/A", groundClearance: "N/A", mileage: "N/A"
  };

  if (isUsed) {
    // USED CARS DATA MAPPING
    normalizedSpecs = {
        engine: (foundCar as any).modelYear + " Model", // Engine ki jagah Year dikha denge
        power: (foundCar as any).owner,                 // Power ki jagah Owner
        torque: "N/A",
        transmission: (foundCar as any).fuelType,       // Transmission ki jagah Fuel
        bootSpace: "N/A", 
        groundClearance: "N/A", 
        mileage: (foundCar as any).kms                  // Mileage ki jagah KMs driven
    };
  } else if ((foundCar as any).keySpecifications) {
    // NEW CARS DATA (Example: newCarsData.ts format)
    const specsMap: any = {};
    (foundCar as any).keySpecifications.forEach((s: any) => {
        if(s.label.includes("Power") || s.label.includes("Motor")) specsMap.power = s.value;
        if(s.label.includes("Torque")) specsMap.torque = s.value;
        if(s.label.includes("Transmission")) specsMap.transmission = s.value;
        if(s.label.includes("Mileage") || s.label.includes("Range")) specsMap.mileage = s.value;
        if(s.label.includes("Engine") || s.label.includes("Battery")) specsMap.engine = s.value;
    });
    // Utility specs merge
    if((foundCar as any).utilitySpecs) {
        (foundCar as any).utilitySpecs.forEach((s: any) => {
            if(s.label.includes("Boot")) specsMap.bootSpace = s.value;
            if(s.label.includes("Ground")) specsMap.groundClearance = s.value;
        });
    }
    normalizedSpecs = { ...normalizedSpecs, ...specsMap };
  } else {
    // OLD DATA FORMAT
    normalizedSpecs = { ...normalizedSpecs, ...((foundCar as any).specs || {}) };
  }

  // 5. Features
  const features = (foundCar as any).features || ["Standard Safety Features", "AC", "Power Windows", "Music System", "ABS with EBD"];

  // Offers Logic
  const getOffersList = () => {
    if(isUsed) return ["7-Day Money Back Guarantee", "6 Months Warranty", "Free RC Transfer"];
    if(isEV) return ["Free Home Wall Box Charger", "3 Year Battery Health Checkup", "Zero Loan Processing Fee"];
    if(foundCar.name.includes("Mercedes") || foundCar.name.includes("BMW")) return ["5 Year Service Package", "Ceramic Coating Free"];
    if((foundCar as any).launchDate) return ["Pre-Booking Open", "Priority Delivery", "Early Bird Price Protection"];
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const carForModal = { ...foundCar, offers: getOffersList() };


  return (
    <div className="min-h-screen bg-gray-100 py-8 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- TOP SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            
            {/* GALLERY */}
            <div>
                <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50 flex items-center justify-center">
                    <img 
                        src={carImages[selectedImageIndex]} 
                        alt={foundCar.name} 
                        className="w-full h-full object-contain transition-all duration-300 hover:scale-105" 
                    />
                    {isUsed && <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Used Car</span>}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {carImages.map((img: string, idx: number) => (
                        <div 
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative w-20 h-16 md:w-24 md:h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                selectedImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        >
                            <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* INFO */}
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{foundCar.name}</h1>
                
                <div className="flex items-center space-x-2 mb-4 text-sm border-b border-gray-100 pb-4">
                    <div className="flex text-yellow-400"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></div>
                    <span className="text-gray-900 font-bold">{(foundCar as any).rating || 4.5} / 5</span>
                    <span className="text-gray-500">| {(foundCar as any).reviews || 20} Reviews</span>
                    {(foundCar as any).location && (
                        <span className="flex items-center gap-1 text-gray-500 ml-2"><FaMapMarkerAlt className="text-red-500"/> {(foundCar as any).location}</span>
                    )}
                </div>

                <div className="mb-1"><h2 className="text-3xl font-bold text-gray-900">{displayPrice}</h2></div>
                <p className="text-xs text-gray-500 mb-6">
                    {isUsed ? "*Asking Price (Negotiable)" : "*Ex-showroom price"}
                </p>

                {/* Used Car Seller Info (Extra Box) */}
                {isUsed && (foundCar as any).sellerPhone && (
                     <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Seller Contact</p>
                            <p className="text-blue-700 font-bold text-lg">{(foundCar as any).sellerPhone}</p>
                        </div>
                        <a href={`tel:${(foundCar as any).sellerPhone}`} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">Call Now</a>
                     </div>
                )}

                {/* Highlight Box */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Estimated EMI:</span>
                        <span className="text-green-700 font-bold text-sm cursor-pointer hover:underline">Check Eligibility</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs"/> <span className="text-xs">{isEV ? "Long Range Battery" : "Powerful Performance"}</span></div>
                        <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs"/> <span className="text-xs">{isUsed ? "Certified & Inspected" : "Premium Comfort & Safety"}</span></div>
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                    <button 
                        onClick={() => setIsOffersOpen(true)}
                        className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors uppercase text-sm tracking-wide"
                    >
                        {isUsed ? "Check Warranty Offers" : "Get Current Offers"}
                    </button>
                    <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-200 uppercase text-sm tracking-wide"
                    >
                        {isUsed ? "Contact Seller / Book Visit" : "Book Your Test Drive Now"}
                    </button>
                </div>
            </div>
        </div>

        {/* TABS SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{isUsed ? "Vehicle Details & Features" : "Detailed Key Specs & Features"}</h3>
            <div className="flex border-b border-gray-200 mb-8">
                <button onClick={() => setActiveTab('specs')} className={`pb-3 pr-8 text-sm md:text-base font-bold transition-all border-b-2 ${activeTab === 'specs' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>
                    {isUsed ? "Car Overview" : "Key Specifications"}
                </button>
                <button onClick={() => setActiveTab('features')} className={`pb-3 px-8 text-sm md:text-base font-bold transition-all border-b-2 ${activeTab === 'features' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>
                    {isUsed ? "Condition & Features" : "Top Features"}
                </button>
            </div>

            {activeTab === 'specs' && (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 animate-fadeIn">
                    {/* Conditional Labels based on Used/New */}
                    <SpecItem icon={isEV ? <FaBolt/> : (isUsed ? <FaCalendarAlt/> : <FaGasPump/>)} label={isEV ? "Battery" : (isUsed ? "Model Year" : "Engine")} value={normalizedSpecs.engine} />
                    
                    <SpecItem icon={isUsed ? <FaUser/> : <FaBolt/>} label={isUsed ? "Owner" : "Power"} value={normalizedSpecs.power} />
                    
                    <SpecItem icon={<FaCogs/>} label={isUsed ? "Fuel Type" : "Transmission"} value={isUsed ? (foundCar as any).fuelType : normalizedSpecs.transmission} />
                    
                    <SpecItem icon={<FaRoad/>} label={isEV ? "Range" : (isUsed ? "KMs Driven" : "Mileage")} value={normalizedSpecs.mileage} />
                    
                    {!isUsed && <SpecItem icon={<FaCogs/>} label="Torque" value={normalizedSpecs.torque} />}
                    {!isUsed && <SpecItem icon={<FaCar/>} label="Boot Space" value={normalizedSpecs.bootSpace} />}
                    {!isUsed && <SpecItem icon={<FaCar/>} label="Ground Clearance" value={normalizedSpecs.groundClearance} />}
                 </div>
            )}

            {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    {features.map((feat: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="bg-white p-1.5 rounded-full text-green-500 shadow-sm"><FaCheckCircle size={14} /></div>
                            <span className="text-gray-700 font-medium text-sm">{feat}</span>
                        </div>
                    ))}
                    {isUsed && (
                        <>
                             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="bg-white p-1.5 rounded-full text-blue-500 shadow-sm"><FaCheckCircle size={14} /></div>
                                <span className="text-gray-700 font-medium text-sm">Non-Accidental</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="bg-white p-1.5 rounded-full text-blue-500 shadow-sm"><FaCheckCircle size={14} /></div>
                                <span className="text-gray-700 font-medium text-sm">Original Paint</span>
                            </div>
                        </>
                    )}
                </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-gray-100">
                <button className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline">View All Specs and Features <FaArrowRight size={12} /></button>
            </div>
        </div>

        {/* MODALS */}
        {isBookingOpen && <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} car={foundCar} />}
        <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} car={carForModal} />

      </div>
    </div>
  );
};

const SpecItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-400 mb-1"><span className="text-sm">{icon}</span> <span className="text-xs uppercase tracking-wide">{label}</span></div>
        <p className="font-bold text-gray-900 text-lg">{value || "N/A"}</p>
    </div>
);

export default CarDetailPage;