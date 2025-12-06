"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import dynamic from 'next/dynamic'; // ✅ Dynamic import ke liye
import Hero from '@/components/Hero';

// --- COMPONENTS ---
// ✅ Dynamic Imports for Components below the fold (LCP, TBT improvement)
const MostSearchedSection = dynamic(() => import('@/components/MostSearchedSection'), { ssr: false });
const UsedCarsSection = dynamic(() => import('@/components/UsedCarsSection'), { ssr: false }); 
const BrandSection = dynamic(() => import('@/components/BrandSection'), { ssr: false });
const LatestStories = dynamic(() => import('@/components/LatestStories'), { ssr: false });
const VisualStoriesSection = dynamic(() => import('@/components/VisualStoriesSection'), { ssr: false });
const BlogSection = dynamic(() => import('@/components/BlogSection'), { ssr: false }); // BlogSection

// Static Imports for Sliders and Cards (Visible above the fold or small payload)
import UpcomingCarCard from '@/components/UpcomingCarCard';
import ElectricCarCard from '@/components/ElectricCarCard'; 

// --- DATA IMPORTS ---
import { newLaunchCars } from '@/data/newlaunchcars'; 
import { electricCars } from '@/data/electricCars'; 
import { blogs as allBlogs } from '@/data/blogs'; // ✅ Blog data import

// --- ICONS ---
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- MODALS ---
const BookingForm = dynamic(() => import('@/components/BookingForm'), { ssr: false }); 
const FeaturesModal = dynamic(() => import('@/components/FeaturesModal'), { ssr: false });
const OffersModal = dynamic(() => import('@/components/OffersModal'), { ssr: false }); 
const ImageModal = dynamic(() => import('@/components/ImageModal'), { ssr: false });


export default function Home() {
  const router = useRouter();

  // --- STATES ---
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<any>(null);
  const [selectedCarForFeatures, setSelectedCarForFeatures] = useState<any>(null);
  const [selectedCarForOffers, setSelectedCarForOffers] = useState<any>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<any>(null);
  const [imageStartIndex, setImageStartIndex] = useState(0);

  // --- HANDLERS ---
  const scrollToCars = () => document.getElementById('most-searched-section')?.scrollIntoView({ behavior: 'smooth' });

  const handleBookNow = (car: any) => setSelectedCarForBooking(car);
  const handleShowFeatures = (car: any) => setSelectedCarForFeatures(car);
  
  const handleGetOffers = (car: any) => {
    setSelectedCarForOffers(car);
  };

  const handleImageClick = (car: any, index: number) => { setSelectedCarForImages(car); setImageStartIndex(index); };
  
  const handleAlert = (carName: string) => {
    alert(`Notification set for ${carName}! We will notify you when it launches.`);
  };

  // ✅ Navigation Handler
  const handleCardClick = (carName: string) => {
    const slug = carName.toLowerCase().split(" ").join("-");
    router.push(`/car-details/${slug}`);
  };

  // --- OFFERS LOGIC ---
  const getOffersList = (car: any) => {
    if (!car) return [];
    const name = car.name;
    if (name.includes("EV") || car.category === "EV") {
      return ["Free Home Wall Box Charger", "Zero Processing Fee on Loan", "3 Year Battery Health Checkup Free"];
    }
    if (["Mercedes", "BMW", "Audi", "Toyota Fortuner"].some(x => name.includes(x))) {
      return ["5 Year Service Package Free", "Ceramic Coating @ 50% Off", "Accessories Kit Included"];
    }
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const carForOffersModal = selectedCarForOffers 
    ? { ...selectedCarForOffers, offers: getOffersList(selectedCarForOffers) } 
    : null;


  // --- SLIDER REFS ---
  const upcomingSliderRef = useRef<HTMLDivElement>(null);
  const electricSliderRef = useRef<HTMLDivElement>(null);

  const slideUpcomingLeft = () => upcomingSliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideUpcomingRight = () => upcomingSliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  const slideElectricLeft = () => electricSliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const slideElectricRight = () => electricSliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });


  // ✅ LATEST 3 BLOGS LOGIC: SORT AND SLICE
  const latestBlogs = allBlogs
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
    .slice(0, 3); 


  return (
    <main className="bg-gray-50 min-h-screen">
      
      <Hero onExploreClick={scrollToCars} /> {/* Hero should be static for LCP */}

      {/* 1. MOST SEARCHED CARS */}
      <div id="most-searched-section" className="pt-8">
        <MostSearchedSection /> {/* Dynamic, loads after LCP */}
      </div>

      {/* 2. USED CARS SECTION */}
      <UsedCarsSection /> {/* Dynamic */}

      {/* 3. BRAND SECTION */}
      <BrandSection /> {/* Dynamic */}

      {/* 4. UPCOMING CARS SECTION (Existing logic retained) */}
      <section id="upcoming-cars" className="container mx-auto px-4 pt-12 pb-8 relative">
        <div className="text-left mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Upcoming Cars</h2>
        </div>

        <div className="relative group">
          <button onClick={slideUpcomingLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
          </button>
          
          <div ref={upcomingSliderRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {newLaunchCars.map((car, index) => (
              <div key={index} className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0">
                 <UpcomingCarCard 
                    slug={car.slug || car.name.toLowerCase().replace(/\s+/g, "-")}
                    name={car.name} 
                    priceRange={car.priceRange} 
                    launchDate={car.location || "Coming Soon"} 
                    imageUrl={car.imageUrls ? car.imageUrls[0] : "/cars/placeholder.jpg"} 
                    onAlertClick={() => handleAlert(car.name)} 
                 />
              </div>
            ))}
          </div>

          <button onClick={slideUpcomingRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center">
            <FaChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 5. ELECTRIC CARS SECTION */}
      <section className="container mx-auto px-4 pb-12 relative">
        <div className="text-left mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Electric Cars</h2>
        </div>

        <div className="relative group">
          <button onClick={slideElectricLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all hidden md:flex items-center justify-center">
            <FaChevronLeft size={20} />
          </button>

          <div ref={electricSliderRef} className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {electricCars.map((car, index) => {
              const displayImage = (car as any).images ? (car as any).images[0] : (car as any).image;
              
              return (
                <div 
                    key={index} 
                    onClick={() => handleCardClick(car.name)}
                    className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                >
                   <div className="h-full pointer-events-auto">
                     {/* FIX: COMPARE DATA PASSED HERE */}
                     <ElectricCarCard 
                        id={car.id || index}
                        name={car.name} 
                        priceRange={car.priceRange} 
                        imageUrl={displayImage || "/cars/placeholder.jpg"} 
                        
                        fuelType="Electric"
                        
                        // Pass Specs & Features for Compare Page
                        specs={(car as any).specs}
                        features={(car as any).features}
                        images={(car as any).images} // Gallery Images
                        
                        onOfferClick={() => handleGetOffers(car)}
                        onDetailClick={() => handleCardClick(car.name)} 
                     />
                   </div>
                </div>
              );
            })}
          </div>

          <button onClick={slideElectricRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center">
            <FaChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 6. LATEST STORIES */}
      <LatestStories /> {/* Dynamic */}

      {/* 7. VISUAL STORIES */}
      <VisualStoriesSection /> {/* Dynamic */}

      {/* 8. BLOG SECTION */}
      <BlogSection blogs={latestBlogs} /> {/* Dynamic, needs sorted blogs data */}

      {/* --- MODALS --- */}
      {selectedCarForBooking && <BookingForm isOpen={!!selectedCarForBooking} onClose={() => setSelectedCarForBooking(null)} car={selectedCarForBooking} />}
      {selectedCarForFeatures && <FeaturesModal isOpen={!!selectedCarForFeatures} onClose={() => setSelectedCarForFeatures(null)} car={selectedCarForFeatures} />}
      {selectedCarForOffers && <OffersModal isOpen={!!selectedCarForOffers} onClose={() => setSelectedCarForOffers(null)} car={carForOffersModal} />}
      {selectedCarForImages && <ImageModal isOpen={!!selectedCarForImages} onClose={() => setSelectedCarForImages(null)} imageUrls={selectedCarForImages.imageUrls} startIndex={imageStartIndex} />}
      
    </main>
  );
}