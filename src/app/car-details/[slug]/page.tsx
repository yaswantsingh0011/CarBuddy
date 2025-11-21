"use client";

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';

// ✅ 1. DONO DATA FILES IMPORT KARNA ZAROORI HAI
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars'; 

import BookingForm from '@/components/BookingForm';
import OffersModal from '@/components/OffersModal'; 
import { 
  FaStar, FaStarHalfAlt, FaGasPump, FaCogs, FaBolt, FaArrowRight, FaCheckCircle, FaCar, FaRoad 
} from 'react-icons/fa';

// Helper to generate slug
const generateSlug = (name: string) => name.toLowerCase().split(" ").join("-");

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CarDetailPage = ({ params }: PageProps) => {
  const { slug } = use(params);

  // States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');

  // ✅ 2. FIX: CAR FINDING LOGIC (Dono arrays check karega)
  const foundCar = 
    mostSearchedCars.find((c) => generateSlug(c.name) === slug) || 
    electricCars.find((c) => generateSlug(c.name) === slug);

  // Agar dono jagah nahi mili, tab 404 dena
  if (!foundCar) return notFound();

  // --- DATA PREPARATION (Handling Naya vs Purana Format) ---
  
  // 1. Images: Agar 'images' array hai to wo lo, nahi to purana single 'image'
  const carImages = (foundCar as any).images || [(foundCar as any).image];

  // 2. Price: Price ya PriceRange
  const displayPrice = (foundCar as any).price || (foundCar as any).priceRange;

  // 3. Specs & Features: Fallback logic agar data missing ho
  const specs = (foundCar as any).specs || { 
    engine: "N/A", power: "N/A", torque: "N/A", transmission: "N/A", 
    bootSpace: "N/A", groundClearance: "N/A", mileage: "N/A"
  }; 
  const features = (foundCar as any).features || ["Standard Safety Features", "AC", "Power Windows", "Music System"];

  // 4. Check if EV (Logic: ID 800+ ya Category 'EV' ya Name me 'EV')
  const isEV = foundCar.id > 800 || (foundCar as any).category === "EV" || foundCar.name.includes("EV");

  // 5. Offers Logic
  const getOffersList = () => {
    if(isEV) return ["Free Home Wall Box Charger", "3 Year Battery Health Checkup", "Zero Loan Processing Fee"];
    if(foundCar.name.includes("Mercedes") || foundCar.name.includes("BMW")) return ["5 Year Service Package", "Ceramic Coating Free"];
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const carForModal = { ...foundCar, offers: getOffersList() };


  return (
    <div className="min-h-screen bg-gray-100 py-8 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- TOP SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            
            {/* GALLERY SECTION */}
            <div>
                {/* Main Large Image */}
                <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50 flex items-center justify-center">
                    <img 
                        src={carImages[selectedImageIndex]} 
                        alt={foundCar.name} 
                        className="w-full h-full object-contain transition-all duration-300 hover:scale-105" 
                    />
                </div>
                
                {/* Thumbnail Strip */}
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

            {/* INFO SECTION */}
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{foundCar.name}</h1>
                
                <div className="flex items-center space-x-2 mb-4 text-sm border-b border-gray-100 pb-4">
                    <div className="flex text-yellow-400"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></div>
                    <span className="text-gray-900 font-bold">4.9 / 5</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">45 Reviews</span>
                </div>

                <div className="mb-1"><h2 className="text-3xl font-bold text-gray-900">{displayPrice}</h2></div>
                <p className="text-xs text-gray-500 mb-6">*Ex-showroom price</p>

                {/* EMI & Why Choose Box */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Estimated EMI:</span>
                        <span className="text-green-700 font-bold text-sm cursor-pointer hover:underline">Check Eligibility</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs"/> <span className="text-xs">{isEV ? "Long Range Battery" : "Powerful Engine"}</span></div>
                        <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs"/> <span className="text-xs">Premium Comfort & Safety</span></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex flex-col gap-3">
                    <button 
                        onClick={() => setIsOffersOpen(true)}
                        className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors uppercase text-sm tracking-wide"
                    >
                        Get Current Offers
                    </button>
                    <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-200 uppercase text-sm tracking-wide"
                    >
                        Book Your Test Drive Now
                    </button>
                </div>
            </div>
        </div>

        {/* --- BOTTOM SECTION: TABS --- */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Key Specs & Features</h3>
            
            <div className="flex border-b border-gray-200 mb-8">
                <button onClick={() => setActiveTab('specs')} className={`pb-3 pr-8 text-sm md:text-base font-bold transition-all border-b-2 ${activeTab === 'specs' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>Key Specifications</button>
                <button onClick={() => setActiveTab('features')} className={`pb-3 px-8 text-sm md:text-base font-bold transition-all border-b-2 ${activeTab === 'features' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>Top Features</button>
            </div>

            {/* Specs Tab */}
            {activeTab === 'specs' && (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 animate-fadeIn">
                    <SpecItem icon={isEV ? <FaBolt/> : <FaGasPump/>} label={isEV ? "Battery" : "Engine"} value={specs.engine} />
                    <SpecItem icon={<FaBolt/>} label="Power" value={specs.power} />
                    <SpecItem icon={<FaCogs/>} label="Torque" value={specs.torque} />
                    <SpecItem icon={<FaCogs/>} label="Transmission" value={specs.transmission} />
                    <SpecItem icon={<FaRoad/>} label={isEV ? "Range" : "Mileage"} value={specs.mileage} />
                    <SpecItem icon={<FaCar/>} label="Boot Space" value={specs.bootSpace} />
                    <SpecItem icon={<FaCar/>} label="Ground Clearance" value={specs.groundClearance} />
                 </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    {features.map((feat: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="bg-white p-1.5 rounded-full text-green-500 shadow-sm"><FaCheckCircle size={14} /></div>
                            <span className="text-gray-700 font-medium text-sm">{feat}</span>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-gray-100">
                <button className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline">
                    View All Specs and Features <FaArrowRight size={12} />
                </button>
            </div>
        </div>

        {/* --- MODALS --- */}
        {isBookingOpen && <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} car={foundCar} />}
        <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} car={carForModal} />

      </div>
    </div>
  );
};

// Sub-Component for cleaner code
const SpecItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-400 mb-1">
            <span className="text-sm">{icon}</span> 
            <span className="text-xs uppercase tracking-wide">{label}</span>
        </div>
        <p className="font-bold text-gray-900 text-lg">{value || "N/A"}</p>
    </div>
);

export default CarDetailPage;