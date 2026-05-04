"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import UsedCarCard from '@/components/UsedCarCard'; 
import { FaFilter, FaXmark } from 'react-icons/fa6'; 

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
  }, []);

  // ✅ FIXED: Filter Logic for both Fuel and Budget
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // 1. Fuel Filter Logic
      const dbFuel = car.fuel_type || car.fuelType || "";
      const matchFuel = fuelFilter === "All" || dbFuel.toLowerCase().includes(fuelFilter.toLowerCase());

      // 2. Budget Filter Logic
      let matchBudget = true;
      if (budgetFilter !== "All") {
        const selectedRange = BUDGET_RANGES.find(r => r.label === budgetFilter);
        if (selectedRange) {
          // Car price ko number mein convert karna (e.g., "14.50 Lakh" -> 14.50)
          const carPriceStr = car.price || "0";
          const numericPrice = parseFloat(carPriceStr.replace(/[^\d.]/g, ''));
          
          matchBudget = numericPrice >= selectedRange.min && numericPrice <= selectedRange.max;
        }
      }

      return matchFuel && matchBudget;
    });
  }, [cars, fuelFilter, budgetFilter]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") params.delete(key);
    else params.set(key, value);
    router.push(`/used-cars?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className={`
            fixed inset-0 z-[60] bg-white p-6 w-72 
            md:relative md:block md:inset-auto md:z-0 md:bg-transparent md:p-0 md:w-64
            ${isSidebarOpen ? 'block' : 'hidden'}
          `}>
            <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="font-black text-red-600">Filters</h3>
                <button onClick={() => setIsSidebarOpen(false)}><FaXmark /></button>
              </div>

              <div className="space-y-8">
                {/* Fuel Filter UI */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Fuel Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...FUEL_TYPES].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFilter("fuel", type)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          fuelFilter === type 
                          ? 'bg-red-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Filter UI */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Budget</h3>
                  <div className="space-y-1">
                    {["All", ...BUDGET_RANGES.map(b => b.label)].map((label) => (
                      <button
                        key={label}
                        onClick={() => updateFilter("budget", label)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                          budgetFilter === label 
                          ? 'bg-red-50 text-red-700 font-bold border-l-4 border-red-600' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black italic uppercase">Used Cars</h1>
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden bg-red-600 text-white px-5 py-2 rounded-2xl"><FaFilter /> Filters</button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-3xl" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.length > 0 ? (
                  filteredCars.map(car => <UsedCarCard key={car.id} car={car} />)
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-500 bg-white rounded-3xl border">
                    No cars found matching t
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function UsedCarsPage() {
  return <Suspense><UsedCarsContent /></Suspense>;
}   