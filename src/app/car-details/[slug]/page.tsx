"use client";

import React, { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';

// 1. IMPORT ALL DATA FILES
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars'; 
import { newLaunchCars } from '@/data/newlaunchcars'; 
import { newCarsData } from '@/data/newCarsData';
import { usedCarsData } from '@/data/usedCarsData';

// Components
import BookingForm from '@/components/BookingForm';
import OffersModal from '@/components/OffersModal';
import CarOverviewGrid from '@/components/CarOverviewGrid';
import OnRoadPriceModal from '@/components/OnRoadPriceModal';
import EMICalculatorModal from '@/components/EMICalculatorModal';
import VariantsTable from '@/components/VariantsTable'; 
import UserReviews from '@/components/UserReviews'; 
import DealersSection from '@/components/DealersSection'; // ✅ NEW IMPORT

import { useLocation } from '@/context/LocationContext'; 

import { 
  FaStar, FaStarHalfAlt, FaGasPump, FaCogs, FaBolt, FaArrowRight, FaCheckCircle, FaCar, FaRoad, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaPhoneAlt, FaWhatsapp, FaChevronDown
} from 'react-icons/fa';

const generateSlug = (name: string) => name.trim().toLowerCase().replace(/\s+/g, "-");

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CarDetailPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const { city } = useLocation();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isOnRoadOpen, setIsOnRoadOpen] = useState(false);
  const [isEMIOpen, setIsEMIOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  // Find Car Logic
  const foundCar = 
    mostSearchedCars.find((c) => generateSlug(c.name) === decodedSlug) || 
    electricCars.find((c) => generateSlug(c.name) === decodedSlug) ||
    newLaunchCars.find((c) => (c.slug === decodedSlug) || (generateSlug(c.name) === decodedSlug)) ||
    newCarsData.find((c) => (c.slug === decodedSlug) || (generateSlug(c.name) === decodedSlug)) ||
    usedCarsData.find((c) => generateSlug(c.name) === decodedSlug || c.slug === decodedSlug);

  useEffect(() => {
    if (foundCar && (foundCar as any).variants && (foundCar as any).variants.length > 0) {
        setSelectedVariant((foundCar as any).variants[0]); 
    }
  }, [foundCar]);

  if (!foundCar) return notFound();

  const isUsed = (foundCar as any).kms !== undefined; 
  const isEV = foundCar.id > 800 || (foundCar as any).category === "EV" || foundCar.name.includes("Electric") || foundCar.name.includes("EV");
  const carImages = (foundCar as any).images || (foundCar as any).imageUrls || [(foundCar as any).image] || ["/cars/placeholder.jpg"];
  const basePrice = (foundCar as any).price || (foundCar as any).priceRange;
  const displayPrice = selectedVariant ? selectedVariant.price : basePrice;
  const variants = (foundCar as any).variants || [];
  const brandName = foundCar.name.split(" ")[0]; // ✅ Extract Brand Name

  let normalizedSpecs = { engine: "N/A", power: "N/A", torque: "N/A", transmission: "N/A", bootSpace: "N/A", groundClearance: "N/A", mileage: "N/A" };
  
  if (selectedVariant) {
     normalizedSpecs = { 
        ...normalizedSpecs, 
        ...((foundCar as any).specs || {}),
        engine: selectedVariant.engine || (foundCar as any).specs?.engine,
        transmission: selectedVariant.transmission || (foundCar as any).specs?.transmission 
     };
  } else if (!isUsed) {
      if ((foundCar as any).keySpecifications) {
        const specsMap: any = {};
        (foundCar as any).keySpecifications.forEach((s: any) => {
            if(s.label.includes("Power") || s.label.includes("Motor")) specsMap.power = s.value;
            if(s.label.includes("Torque")) specsMap.torque = s.value;
            if(s.label.includes("Transmission")) specsMap.transmission = s.value;
            if(s.label.includes("Mileage") || s.label.includes("Range")) specsMap.mileage = s.value;
            if(s.label.includes("Engine") || s.label.includes("Battery")) specsMap.engine = s.value;
        });
        if((foundCar as any).utilitySpecs) {
            (foundCar as any).utilitySpecs.forEach((s: any) => {
                if(s.label.includes("Boot")) specsMap.bootSpace = s.value;
                if(s.label.includes("Ground")) specsMap.groundClearance = s.value;
            });
        }
        normalizedSpecs = { ...normalizedSpecs, ...specsMap };
      } else {
        normalizedSpecs = { ...normalizedSpecs, ...((foundCar as any).specs || {}) };
      }
  }

  const features = (foundCar as any).features || ["Standard Safety Features", "AC", "Power Windows", "Music System", "ABS with EBD"];

  const getOffersList = () => {
    if(isUsed) return ["7-Day Money Back Guarantee", "6 Months Warranty", "Free RC Transfer"];
    if(isEV) return ["Free Home Wall Box Charger", "3 Year Battery Health Checkup", "Zero Loan Processing Fee"];
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const handleOpenOffers = () => setIsOffersOpen(true);
  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleOpenOnRoad = () => setIsOnRoadOpen(true);
  const handleOpenEMI = () => setIsEMIOpen(true);
  
  const handleWhatsApp = () => {
    const phone = (foundCar as any).sellerPhone || "919876543210"; 
    const message = `Hi, I am interested in buying ${foundCar.name}. Is it available?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const carForModal = { ...foundCar, offers: getOffersList() };

  return (
    <div className="min-h-screen bg-gray-100 py-8 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* TOP SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            
            {/* GALLERY */}
            <div>
                <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50 flex items-center justify-center">
                    <img src={carImages[selectedImageIndex]} alt={foundCar.name} className="w-full h-full object-contain transition-all duration-300 hover:scale-105" />
                    {isUsed && <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Used Car</span>}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {carImages.map((img: string, idx: number) => (
                        <div key={idx} onClick={() => setSelectedImageIndex(idx)} className={`relative w-20 h-16 md:w-24 md:h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                            <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* INFO */}
            <div className="flex flex-col h-full"> 
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 mt-4">{foundCar.name}</h1>
                
                <div className="flex items-center space-x-2 mb-4 text-sm border-b border-gray-100 pb-4">
                    <div className="flex text-yellow-400"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></div>
                    <span className="text-gray-900 font-bold">{(foundCar as any).rating || 4.5} / 5</span>
                    <span className="text-gray-500">| {(foundCar as any).reviews || 20} Reviews</span>
                    {(foundCar as any).location && <span className="flex items-center gap-1 text-gray-500 ml-2"><FaMapMarkerAlt className="text-red-500"/> {(foundCar as any).location}</span>}
                </div>

                {variants.length > 0 && (
                    <div className="mb-4">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Select Variant</label>
                        <div className="relative">
                            <select value={selectedVariant?.name || ""} onChange={(e) => { const v = variants.find((item: any) => item.name === e.target.value); setSelectedVariant(v); }} className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 font-semibold cursor-pointer">
                                <option value="" disabled>Select a Variant</option>
                                {variants.map((v: any, idx: number) => (<option key={idx} value={v.name}>{v.name}</option>))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"><FaChevronDown size={12} /></div>
                        </div>
                    </div>
                )}

                <div className="mb-1"><h2 className="text-3xl font-bold text-gray-900">{displayPrice}</h2></div>
                <div className="flex items-center gap-2 mb-6">
                    <p className="text-xs text-gray-500">{isUsed ? "*Asking Price (Negotiable)" : "*Ex-showroom price"}</p>
                    {!isUsed && <button onClick={handleOpenOnRoad} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"><FaInfoCircle /> Check On-Road Price</button>}
                </div>

                {isUsed && (foundCar as any).sellerPhone && (
                      <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-4 flex items-center justify-between">
                        <div><p className="text-xs text-gray-500 font-bold uppercase">Seller Contact</p><p className="text-blue-700 font-bold text-lg">{(foundCar as any).sellerPhone}</p></div>
                        <a href={`tel:${(foundCar as any).sellerPhone}`} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 flex items-center gap-2"><FaPhoneAlt size={12} /> Call Now</a>
                      </div>
                )}

                <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                    <div className="flex justify-between items-center mb-2"><span className="text-gray-700 font-medium">Estimated EMI:</span><span onClick={handleOpenEMI} className="text-blue-700 font-bold text-sm cursor-pointer hover:underline">Check Eligibility</span></div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs"/> <span className="text-xs">{isEV ? "Long Range Battery" : "Powerful Performance"}</span></div>
                        <div className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs"/> <span className="text-xs">{isUsed ? "Certified & Inspected" : "Premium Comfort & Safety"}</span></div>
                    </div>
                </div>

                <div className="flex gap-4 mt-4 w-full">
                    <button onClick={handleOpenOffers} className="flex-1 py-3.5 border-2 border-red-600 text-red-600 font-bold rounded hover:bg-red-50 transition-colors uppercase text-sm tracking-wide">{isUsed ? "Check Warranty" : "Check Offers"}</button>
                    <button onClick={handleOpenBooking} className="flex-1 py-3.5 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition-colors shadow-lg shadow-red-100 uppercase text-sm tracking-wide">{isUsed ? "Contact Seller" : "Book Visit"}</button>
                </div>
                
                {isUsed && <button onClick={handleWhatsApp} className="w-full mt-3 border border-green-500 text-green-600 font-bold py-3 rounded hover:bg-green-50 transition flex items-center justify-center gap-2"><FaWhatsapp size={20} /> Chat with Seller</button>}
            </div>
        </div>

        {/* TABS SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{isUsed ? "Vehicle Details & Features" : "Detailed Key Specs & Features"}</h3>
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                <button onClick={() => setActiveTab('specs')} className={`pb-3 pr-8 text-sm md:text-base font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'specs' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>{isUsed ? "Car Overview" : "Key Specifications"}</button>
                <button onClick={() => setActiveTab('features')} className={`pb-3 px-8 text-sm md:text-base font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'features' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>{isUsed ? "Condition & Features" : "Top Features"}</button>
                <button onClick={() => setActiveTab('reviews')} className={`pb-3 px-8 text-sm md:text-base font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'reviews' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-400'}`}>User Reviews</button>
            </div>

            {activeTab === 'specs' && (
                isUsed ? (<CarOverviewGrid car={foundCar} />) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 animate-fadeIn">
                        <SpecItem icon={isEV ? <FaBolt/> : <FaGasPump/>} label={isEV ? "Battery" : "Engine"} value={normalizedSpecs.engine} />
                        <SpecItem icon={<FaBolt/>} label="Power" value={normalizedSpecs.power} />
                        <SpecItem icon={<FaCogs/>} label="Transmission" value={normalizedSpecs.transmission} />
                        <SpecItem icon={<FaRoad/>} label={isEV ? "Range" : "Mileage"} value={normalizedSpecs.mileage} />
                        <SpecItem icon={<FaCogs/>} label="Torque" value={normalizedSpecs.torque} />
                        <SpecItem icon={<FaCar/>} label="Boot Space" value={normalizedSpecs.bootSpace} />
                        <SpecItem icon={<FaCar/>} label="Ground Clearance" value={normalizedSpecs.groundClearance} />
                    </div>
                )
            )}

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

            {activeTab === 'reviews' && <UserReviews carName={foundCar.name} />}
            
            <div className="mt-8 pt-4 border-t border-gray-100">
                <button className="text-red-600 text-sm font-bold flex items-center gap-1 hover:underline">View All Specs and Features <FaArrowRight size={12} /></button>
            </div>
        </div>

        {/* ✅ DEALERS SECTION (New Cars Only) */}
        {!isUsed && (
             <DealersSection brand={foundCar.name.split(" ")[0]} />
        )}

        {/* VARIANTS TABLE */}
        {!isUsed && (foundCar as any).variants && (
             <div className="mt-8">
                <VariantsTable variants={(foundCar as any).variants} carName={foundCar.name} />
             </div>
        )}

        {/* MODALS */}
        {isBookingOpen && <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} car={foundCar} />}
        <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} car={carForModal} />
        <OnRoadPriceModal isOpen={isOnRoadOpen} onClose={() => setIsOnRoadOpen(false)} carName={selectedVariant ? `${foundCar.name} ${selectedVariant.name}` : foundCar.name} price={displayPrice} city={city} onOpenEMI={() => setIsEMIOpen(true)} onOpenOffers={() => setIsOffersOpen(true)} onOpenBooking={() => setIsBookingOpen(true)} />
        <EMICalculatorModal isOpen={isEMIOpen} onClose={() => setIsEMIOpen(false)} price={displayPrice} city={city} />

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