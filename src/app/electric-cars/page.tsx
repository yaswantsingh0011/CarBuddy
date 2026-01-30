"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // आपके प्रोजेक्ट का सुपबेस क्लाइंट
import ElectricCarCard from '@/components/ElectricCarCard'; // आपका नया कार्ड
import { FaFilter, FaTimes } from 'react-icons/fa';

// बजट रेंज (इलेक्ट्रिक कारों के हिसाब से)
const BUDGET_RANGES = [
  { label: "Under 10 Lakh", min: 0, max: 10 },
  { label: "10 - 20 Lakh", min: 10, max: 20 },
  { label: "20 - 30 Lakh", min: 20, max: 30 },
  { label: "30 - 50 Lakh", min: 30, max: 50 },
  { label: "Above 50 Lakh", min: 50, max: 999 },
];

export default function ElectricCarsListingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // URL से फ़िल्टर पढ़ना
  const budgetFilter = searchParams.get("budget") || "All";

  // 1. SUPABASE से डेटा लाना (सिर्फ Electric कारें)
  useEffect(() => {
    async function fetchAllElectric() {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars') // अगर टेबल का नाम 'used_cars' है तो यहाँ बदल लें
        .select('*')
        .ilike('fuelType', 'Electric');

      if (error) {
        console.error("Error fetching electric cars:", error.message);
      } else {
        setCars(data || []);
      }
      setLoading(false);
    }
    fetchAllElectric();
  }, []);

  // 2. कीमत निकालने वाला लॉजिक
  const getMinPrice = (priceVal: any) => {
    if (!priceVal) return 0;
    const match = priceVal.toString().replace(/,/g, '').match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[0]) : 0;
  };

  // 3. मास्टर फ़िल्टर लॉजिक
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (budgetFilter === "All" || budgetFilter === "all") return true;
      
      const range = BUDGET_RANGES.find(r => r.label === budgetFilter);
      const price = getMinPrice(car.price || car.priceRange);
      
      return range ? (price >= range.min && price <= range.max) : true;
    });
  }, [cars, budgetFilter]);

  // URL अपडेट करने वाला फंक्शन
  const updateFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") params.delete("budget");
    else params.set("budget", value);
    router.push(`/electric-cars?${params.toString()}`);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* --- SIDEBAR FILTER (Price Base) --- */}
        <aside className={`fixed inset-0 z-50 bg-white p-6 w-72 md:relative md:block md:inset-auto md:z-0 border rounded-xl shadow-sm ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="font-bold text-blue-600">Filters</h3>
            <button onClick={() => setIsSidebarOpen(false)}><FaTimes /></button>
          </div>

          <h4 className="font-bold mb-4 text-gray-900 border-b pb-2 text-sm uppercase tracking-wider">Filter by Price</h4>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => updateFilter("All")}
              className={`text-left text-xs py-2 px-3 rounded-md border transition-all ${budgetFilter === "All" ? "bg-blue-600 text-white font-bold" : "bg-white hover:border-blue-400 text-gray-700"}`}
            >
              All Prices
            </button>
            {BUDGET_RANGES.map(range => (
              <button 
                key={range.label}
                onClick={() => updateFilter(range.label)}
                className={`text-left text-xs py-2 px-3 rounded-md border transition-all ${budgetFilter === range.label ? "bg-blue-50 border-blue-600 text-blue-600 font-bold" : "bg-white hover:border-blue-400 text-gray-700"}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </aside>

        {/* --- LISTING AREA --- */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Electric Cars Inventory ({filteredCars.length})
            </h1>
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden flex items-center gap-2 bg-white px-4 py-2 border rounded-lg shadow-sm">
              <FaFilter className="text-blue-600" /> Filters
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 font-bold text-gray-400 italic">Fetching EV data...</div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <ElectricCarCard 
                  key={car.id} 
                  {...car} 
                  imageUrl={car.image_url || car.images?.[0] || car.imageUrls?.[0]}
                  onDetailClick={() => router.push(`/car-details/${car.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No electric cars matching this price range.</p>
              <button onClick={() => updateFilter("All")} className="text-blue-600 font-bold mt-4 hover:underline">Reset Price Filter</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}