"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// ✅ FIXED: Correct Import
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm'; 
import ContactSellerModal from '@/components/ContactSellerModal';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function UsedCarDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  // ❌ Removed: const supabase = createClient();
  
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); 

  // ✅ Database se car fetch karne ka logic
  useEffect(() => {
    const fetchUsedCar = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('used_cars') // ✅ Used cars table
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (err) {
        console.error("Error fetching used car:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchUsedCar();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-24 text-center text-xl font-bold">Loading car details...</div>;
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Car Not Found</h1>
        <p className="text-gray-500 mt-4 font-medium">Sorry, we couldn't find the used car you're looking for.</p>
      </div>
    );
  }

  // ✅ Image logic update for database plural columns
  const images = car.image_urls || car.images || car.imageUrls || [];
  const carImages = Array.isArray(images) ? images : (images ? [images] : ["/cars/placeholder.jpg"]);

  const keyFeatures = [
    { name: "Model Year", value: car.model_year || car.modelYear },
    { name: "KMs Driven", value: car.kms || car.kms_driven },
    { name: "Fuel Type", value: car.fuel_type || car.fuelType },
    { name: "Ownership", value: car.owner || car.ownership },
    { name: "Location", value: car.location },
  ];

  return (
    <> 
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-center mb-10 uppercase tracking-tight text-gray-900">{car.name}</h1>
        
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden p-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Side: Images */}
            <div className="w-full lg:w-7/12">
              <div className="relative w-full h-80 lg:h-[450px] rounded-2xl overflow-hidden border border-gray-50 bg-gray-50">
                <Image
                  src={carImages[selectedImageIndex]}
                  alt={car.name}
                  fill
                  className="object-contain p-4"
                  priority
                  unoptimized
                />
              </div>
              <div className="flex space-x-3 justify-center mt-6 overflow-x-auto pb-2">
                {carImages.map((url: string, index: number) => (
                  <div
                    key={index}
                    className={`w-24 h-20 relative cursor-pointer border-2 rounded-xl transition-all ${
                      selectedImageIndex === index ? 'border-blue-600 scale-105 shadow-md' : 'border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={url}
                      alt={`${car.name} ${index}`}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div> 
            
            {/* Right Side: Details */}
            <div className="w-full lg:w-5/12">
              <div className="bg-blue-50 p-6 rounded-2xl mb-8">
                <p className="text-4xl font-black text-blue-600">₹ {car.price}</p>
                <p className="text-sm text-blue-400 font-bold mt-1 uppercase tracking-wider">Avg. Listing Price in {car.location}</p>
              </div>

              <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Vehicle Specifications</h3>
              <ul className="space-y-4">
                {keyFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center text-gray-500 font-bold text-xs uppercase tracking-wide">
                      <CheckIcon /> {feature.name}
                    </div>
                    <span className="font-black text-gray-800">{feature.value}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col space-y-4 mt-10">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-green-600 text-white font-black py-4 px-6 rounded-2xl text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 uppercase"
                >
                  Book Test Drive
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-white text-blue-600 border-2 border-blue-600 font-black py-4 px-6 rounded-2xl text-lg hover:bg-blue-50 transition-all uppercase"
                >
                  Contact Seller
                </button>
              </div>
            </div> 
          </div> 
        </div> 
      </div> 

      {/* Modals are remains same */}
      {isBookingModalOpen && <BookingForm isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} car={car} />}
      {isContactModalOpen && <ContactSellerModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} car={car} />}
    </>
  );
}