"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react'; // ✅ Suspense add kiya
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // ✅ Supabase client update
import UsedCarCard from '@/components/UsedCarCard'; 
import { FaFilter, FaTimes, FaCarRear } from 'react-icons/fa6'; // New icons for better UI

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "CNG"];
const BUDGET_RANGES = [
  { label: "Under 5 Lakh", min: 0, max: 5 },
  { label: "5 - 10 Lakh", min: 5, max: 10 },
  { label: "10 - 15 Lakh", min: 10, max: 15 },
  { label: "15 - 20 Lakh", min: 15, max: 20 },
  { label: "Above 20 Lakh", min: 20, max: 999 },
];

// --- ✅ Internal Component for Content ---
function UsedCarsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fuelFilter = searchParams.get("fuel") || "All";
  const budgetFilter = searchParams.get("budget") || "All";

  // Fetch from Supabase
  useEffect(() => {
    async function fetchUsedCars() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('used_cars') 
          .select('*');

        if (error) throw error;
        setCars(data || []);
      } catch (err) {
        console.error("Database Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsedCars();
  }, []);

  // Price Parser Logic
  const getMinPrice = (priceVal: any) => {
    if (!priceVal) return 0;
    if (typeof priceVal === 'number') return priceVal;
    // Format: "₹ 7.50 Lakh" -> 7.50
    const match = priceVal.toString().replace(/,/g, '').match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Memoized Filtered List
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const dbFuel = car.fuel_type || car.fuelType || "";
      const matchFuel = fuelFilter === "All" || 
        dbFuel.toLowerCase().includes(fuelFilter.toLowerCase());

      let matchBudget = true;
      if (budgetFilter !== "All") {
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
    if (value === "All") params.delete(key);
    else params.set(key, value);
    router.push(`/used-cars?${params.toString()}`);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filter Logic */}
        <aside className={`fixed inset-0 z-[60] bg-white p-6 w-72 md:relative md:block md:inset-auto md:z-0 border-r border-gray-100 md:bg-transparent md:border-none ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center mb-8 md:hidden">
            <h3 className="font-black text-red-600 uppercase tracking-tighter">Filters</h3>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full"><FaTimes /></button>
          </div>

          <div className="space-y-10 sticky top-28">
            <div>
              <h4 className="font-black mb-5 text-gray-900 border-b-2 border-red-600 w-fit pb-1 text-xs uppercase tracking-widest">Budget</h4>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => updateFilter("budget", "All")}
                  className={`text-left text-xs py-3 px-4 rounded-xl border transition-all ${budgetFilter === "All" ? "bg-red-600 text-white font-bold shadow-lg shadow-red-100 border-red-600" : "bg-white hover:border-red-400 text-gray-700 border-gray-100"}`}
                >
                  All Budgets
                </button>
                {BUDGET_RANGES.map(range => (
                  <button 
                    key={range.label}
                    onClick={() => updateFilter("budget", range.label)}
                    className={`text-left text-xs py-3 px-4 rounded-xl border transition-all ${budgetFilter === range.label ? "bg-red-50 border-red-600 text-red-600 font-extrabold" : "bg-white hover:border-red-400 text-gray-700 border-gray-100"}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black mb-5 text-gray-900 border-b-2 border-red-600 w-fit pb-1 text-xs uppercase tracking-widest">Fuel Type</h4>
              <div className="flex flex-wrap gap-2">
                {["All", ...FUEL_TYPES].map(fuel => (
                  <button 
                    key={fuel}
                    onClick={() => updateFilter("fuel", fuel)}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border transition-all ${fuelFilter === fuel ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-white text-gray-500 border-gray-200 hover:border-red-600"}`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Cars Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">Used Cars for Sale</h1>
              <p className="text-gray-400 font-bold text-sm mt-1">{filteredCars.length} Certified Cars found</p>
            </div>
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-2xl shadow-xl font-bold text-sm">
              <FaFilter /> Filters
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Fetching inventory...</p>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {filteredCars.map((car) => (
                <UsedCarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FaCarRear className="text-gray-300 text-3xl" />
              </div>
              <p className="text-gray-500 font-extrabold text-xl mb-2">No cars match your criteria.</p>
              <button onClick={() => { updateFilter("budget", "All"); updateFilter("fuel", "All"); }} className="text-red-600 font-black uppercase text-sm hover:underline">Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// --- ✅ Main Export with Suspense Wrapper ---
export default function UsedCarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <UsedCarsContent />
    </Suspense>
  );
}