"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import UsedCarCard from '@/components/UsedCarCard'; 
import { FaFilter, FaTimes } from 'react-icons/fa';

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "CNG"];
const BUDGET_RANGES = [
  { label: "Under 5 Lakh", min: 0, max: 5 },
  { label: "5 - 10 Lakh", min: 5, max: 10 },
  { label: "10 - 15 Lakh", min: 10, max: 15 },
  { label: "15 - 20 Lakh", min: 15, max: 20 },
  { label: "Above 20 Lakh", min: 20, max: 999 },
];

export default function UsedCarsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fuelFilter = searchParams.get("fuel") || "All";
  const budgetFilter = searchParams.get("budget") || "All";

  // --- 🔥 DATABASE FETCH ---
  useEffect(() => {
    async function fetchUsedCars() {
      setLoading(true);
      // 'used_cars' टेबल से डेटा फेच हो रहा है
      const { data, error } = await supabase
        .from('used_cars') 
        .select('*');

      if (error) {
        console.error("Database Error:", error.message);
      } else {
        setCars(data || []);
      }
      setLoading(false);
    }
    fetchUsedCars();
  }, []);

  // कीमत को नंबर में बदलने वाला लॉजिक
  const getMinPrice = (priceVal: any) => {
    if (!priceVal) return 0;
    if (typeof priceVal === 'number') return priceVal;
    const match = priceVal.toString().replace(/,/g, '').match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[0]) : 0;
  };

  // --- मास्टर फिल्टर लॉजिक (फ्यूल टाइप फिक्स के साथ) ---
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // 🔥 फ्यूल फिल्टर फिक्स: 'fuel_type' और 'fuelType' दोनों चेक करें
      const dbFuel = car.fuel_type || car.fuelType || "";
      const matchFuel = fuelFilter === "All" || 
        dbFuel.toLowerCase().includes(fuelFilter.toLowerCase());

      // 🔥 बजट फिल्टर फिक्स: 'price_range' या 'price' दोनों चेक करें
      let matchBudget = true;
      if (budgetFilter !== "All" && budgetFilter.toLowerCase() !== "all") {
        const range = BUDGET_RANGES.find(r => r.label === budgetFilter);
        const priceVal = car.price || car.price_range || car.priceRange;
        const price = getMinPrice(priceVal);
        
        if (range) matchBudget = price >= range.min && price <= range.max;
      }

      return matchFuel && matchBudget;
    });
  }, [cars, fuelFilter, budgetFilter]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`/used-cars?${params.toString()}`);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS - रेड थीम (Used Cars के लिए) */}
        <aside className={`fixed inset-0 z-50 bg-white p-6 w-72 md:relative md:block md:inset-auto md:z-0 border rounded-xl shadow-sm ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="font-bold text-red-600">Filters</h3>
            <button onClick={() => setIsSidebarOpen(false)}><FaTimes /></button>
          </div>

          <div className="space-y-8">
            {/* BUDGET SECTION */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900 border-b pb-2 text-sm uppercase tracking-wider">Budget</h4>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => updateFilter("budget", "All")}
                  className={`text-left text-xs py-2 px-3 rounded-md border transition-all ${budgetFilter === "All" ? "bg-red-600 text-white font-bold shadow-md" : "bg-white hover:border-red-400 text-gray-700"}`}
                >
                  All Budgets
                </button>
                {BUDGET_RANGES.map(range => (
                  <button 
                    key={range.label}
                    onClick={() => updateFilter("budget", range.label)}
                    className={`text-left text-xs py-2 px-3 rounded-md border transition-all ${budgetFilter === range.label ? "bg-red-50 border-red-600 text-red-600 font-bold" : "bg-white hover:border-red-400 text-gray-700"}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FUEL TYPE SECTION */}
            <div>
              <h4 className="font-bold mb-4 text-gray-900 border-b pb-2 text-sm uppercase tracking-wider">Fuel Type</h4>
              <div className="flex flex-wrap gap-2">
                <button 
                   onClick={() => updateFilter("fuel", "All")}
                   className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${fuelFilter === "All" ? "bg-red-600 text-white" : "bg-white text-gray-600 border-gray-300 hover:border-red-600"}`}
                >
                  All
                </button>
                {FUEL_TYPES.map(fuel => (
                  <button 
                    key={fuel}
                    onClick={() => updateFilter("fuel", fuel)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${fuelFilter === fuel ? "bg-red-600 text-white border-red-600 shadow-sm" : "bg-white text-gray-600 border-gray-300 hover:border-red-600"}`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN LISTING */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Used Cars for Sale ({filteredCars.length})
            </h1>
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden flex items-center gap-2 bg-white px-4 py-2 border rounded-lg shadow-sm">
              <FaFilter className="text-red-600" /> Filters
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 font-bold text-gray-400">Loading Used Cars...</div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <UsedCarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No cars matching your filters in 'used_cars' table.</p>
              <button onClick={() => updateFilter("budget", "All")} className="text-red-600 font-bold mt-4 hover:underline">Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}