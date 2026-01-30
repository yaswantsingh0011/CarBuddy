"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import ElectricCarCard from "@/components/ElectricCarCard"; //
import { supabase } from "@/lib/supabaseClient"; //

export default function ElectricCarsSection() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchElectricCars() {
      setLoading(true);
      const { data } = await supabase
        .from('cars')
        .select('*')
        .or('fuelType.ilike.Electric,fuel_type.ilike.Electric'); //

      setCars(data || []);
      setLoading(false);
    }
    fetchElectricCars();
  }, []);

  // 🔥 1. सिर्फ 5 कारें दिखाने का सख्त लॉजिक
  const displayCars = cars.slice(0, 5);

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        
        {/* --- 🔥 2. हेडर: Title Left और View All Right --- */}
        <div className="flex flex-row justify-between items-center mb-10 w-full border-b border-gray-100 pb-4">
          
          {/* बाईं तरफ का हिस्सा */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Electric Cars
            </h2>
            <p className="text-[10px] md:text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">
              Go Electric • Sustainable
            </p>
          </div>
          
          {/* दाईं तरफ का 'View All' बटन */}
          <Link 
            href="/electric-cars"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            View All Cars <FaChevronRight size={10} />
          </Link>
        </div>

        {/* --- 3. ग्रिड: 5 कॉलम लेआउट --- */}
        {loading ? (
          <div className="py-20 text-center text-gray-400 font-bold italic">Loading EV Inventory...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {displayCars.map((car) => (
              <ElectricCarCard key={car.id} car={car} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}