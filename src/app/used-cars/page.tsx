"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; 
import UsedCarCard from '@/components/UsedCarCard'; 
// ✅ FaTimes ko FaXmark se replace kiya (fa6 support)
import { FaFilter, FaXmark, FaCarRear } from 'react-icons/fa6'; 

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "CNG"];
const BUDGET_RANGES = [
  { label: "Under 5 Lakh", min: 0, max: 5 },
  { label: "5 - 10 Lakh", min: 5, max: 10 },
  { label: "10 - 15 Lakh", min: 10, max: 15 },
  { label: "15 - 20 Lakh", min: 15, max: 20 },
  { label: "Above 20 Lakh", min: 20, max: 999 },
];

function UsedCarsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fuelFilter = searchParams.get("fuel") || "All";
  const budgetFilter = searchParams.get("budget") || "All";

  useEffect(() => {
    async function fetchUsedCars() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('used_cars').select('*');
        if (error) throw error;
        setCars(data || []);
      } catch (err) {
        console.error("DB Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsedCars();
  }, [supabase]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const dbFuel = car.fuel_type || car.fuelType || "";
      const matchFuel = fuelFilter === "All" || dbFuel.toLowerCase().includes(fuelFilter.toLowerCase());
      // Budget logic logic...
      return matchFuel;
    });
  }, [cars, fuelFilter]);

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        <aside className={`fixed inset-0 z-[60] bg-white p-6 w-72 md:relative md:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center mb-8 md:hidden">
            <h3 className="font-black text-red-600">Filters</h3>
            {/* ✅ FaXmark use kiya yahan */}
            <button onClick={() => setIsSidebarOpen(false)}><FaXmark /></button>
          </div>
          {/* Filters content... */}
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
             <h1 className="text-3xl font-black">Used Cars for Sale</h1>
             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-2xl"><FaFilter /> Filters</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCars.map(car => <UsedCarCard key={car.id} car={car} />)}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function UsedCarsPage() {
  return <Suspense><UsedCarsContent /></Suspense>;
}