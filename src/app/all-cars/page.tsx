"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaFilter, FaTimes } from "react-icons/fa";
import ElectricCarCard from "@/components/ElectricCarCard"; // आपका मौजूदा कार्ड
import { getMostSearchedCars } from "@/lib/homeData"; // डेटा फेचिंग फंक्शन

const CATEGORIES = ["All", "SUV", "MUV", "Luxury", "Sedan", "Hatchback"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "CNG"];
const PRICE_RANGES = [
  { label: "Under 5 Lakh", min: 0, max: 500000 },
  { label: "5 - 10 Lakh", min: 500000, max: 1000000 },
  { label: "10 - 20 Lakh", min: 1000000, max: 2000000 },
  { label: "Above 20 Lakh", min: 2000000, max: 10000000 },
];

export default function AllCarsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // STATES
  const [allCars, setAllCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // FILTERS FROM URL
  const categoryFilter = searchParams.get("category") || "All";
  const fuelFilter = searchParams.get("fuel") || "All";

  useEffect(() => {
    getMostSearchedCars().then((data) => {
      setAllCars(data);
      setFilteredCars(data);
    });
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let result = allCars;

    if (categoryFilter !== "All") {
      result = result.filter(car => car.category?.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (fuelFilter !== "All") {
      result = result.filter(car => car.fuelType?.toLowerCase() === fuelFilter.toLowerCase());
    }

    setFilteredCars(result);
  }, [categoryFilter, fuelFilter, allCars]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") params.delete(key);
    else params.set(key, value);
    router.push(`/all-cars?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      {/* TOP HEADER SECTION (Cardekho Style) */}
      <div className="bg-white border-b mb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Best Cars in India</h1>
          <p className="text-gray-500 mt-2">Explore {filteredCars.length} cars with latest prices, images, and features.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className={`fixed inset-0 z-50 bg-white p-6 w-72 md:relative md:block md:inset-auto md:z-0 border rounded-xl shadow-sm ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="font-bold">Filters</h3>
            <button onClick={() => setIsSidebarOpen(false)}><FaTimes /></button>
          </div>

          <div className="space-y-8">
            {/* Category Filter */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 border-b pb-2">Category</h4>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-orange-600 transition">
                    <input 
                      type="radio" 
                      name="category"
                      className="accent-orange-600 w-4 h-4"
                      checked={categoryFilter === cat}
                      onChange={() => updateFilter("category", cat)}
                    />
                    <span className={categoryFilter === cat ? "text-orange-600 font-medium" : "text-gray-600"}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter (UI Reference: Cardekho) */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 border-b pb-2">Budget</h4>
              <div className="grid grid-cols-1 gap-2">
                {PRICE_RANGES.map(range => (
                  <button 
                    key={range.label}
                    className="text-left text-sm py-2 px-3 rounded-md hover:bg-orange-50 hover:text-orange-600 border transition"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 border-b pb-2">Fuel Type</h4>
              <div className="flex flex-wrap gap-2">
                {FUEL_TYPES.map(fuel => (
                  <button 
                    key={fuel}
                    onClick={() => updateFilter("fuel", fuel)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${fuelFilter === fuel ? "bg-orange-600 text-white border-orange-600" : "bg-white text-gray-600 hover:border-orange-600"}`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN LISTING */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{categoryFilter} Cars ({filteredCars.length})</h2>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden flex items-center gap-2 bg-white px-4 py-2 border rounded-lg"
            >
              <FaFilter /> Filters
            </button>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <ElectricCarCard 
                  key={car.id} 
                  {...car} 
                  onDetailClick={() => router.push(`/car-details/${car.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border">
              <p className="text-gray-500">No cars found matching your filters.</p>
              <button onClick={() => router.push('/all-cars')} className="text-orange-600 mt-2 font-semibold">Clear All Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}