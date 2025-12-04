'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

// Components
import ElectricCarCard from '@/components/ElectricCarCard';

// Data Imports (Sari files import karein)
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';

// Helper function to extract brand from name if brand key is missing
const getBrand = (car: any) => car.brand || car.name.split(' ')[0];

// Main Component Wrapper (Required for useSearchParams in Next.js)
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL se query nikalo (e.g. ?q=suv)
  const query = searchParams.get('q') || ''; 

  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  
  // Filters States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  // Unique Lists for Sidebar Options
  const allCars = [...mostSearchedCars, ...electricCars, ...newLaunchCars];
  const allBrands = Array.from(new Set(allCars.map(c => getBrand(c)))).sort();
  const allFuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
  const allCategories = ["SUV", "Sedan", "Hatchback", "MUV", "Luxury"];

  // --- FILTERING LOGIC (The Brain 🧠) ---
  useEffect(() => {
    let result = allCars;

    // 1. Search Text Filter (Name, Brand, or Category)
    if (searchTerm) {
        const lowerQ = searchTerm.toLowerCase();
        result = result.filter(car => 
            car.name.toLowerCase().includes(lowerQ) || 
            getBrand(car).toLowerCase().includes(lowerQ) ||
            car.category.toLowerCase().includes(lowerQ) ||
            (car.fuelType && car.fuelType.toLowerCase().includes(lowerQ))
        );
    }

    // 2. Brand Sidebar Filter
    if (selectedBrands.length > 0) {
        result = result.filter(car => selectedBrands.includes(getBrand(car)));
    }

    // 3. Fuel Sidebar Filter
    if (selectedFuel.length > 0) {
        result = result.filter(car => {
            // Helper to normalize fuel type
            const fType = car.fuelType || (car.category === 'EV' ? 'Electric' : 'Petrol'); 
            return selectedFuel.some(sf => fType.includes(sf));
        });
    }

    // 4. Category Sidebar Filter
    if (selectedCategory.length > 0) {
        result = result.filter(car => selectedCategory.includes(car.category));
    }

    // Remove Duplicates (by Name)
    const uniqueMap = new Map();
    result.forEach(car => uniqueMap.set(car.name, car));
    setFilteredCars(Array.from(uniqueMap.values()));

  }, [searchTerm, selectedBrands, selectedFuel, selectedCategory]);

  // Handle Search Submit from page input
  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  // Toggle Checkbox Logic
  const toggleFilter = (list: string[], setList: any, value: string) => {
    if (list.includes(value)) {
        setList(list.filter(item => item !== value));
    } else {
        setList([...list, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Top Search Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {query ? `Search Results for "${query}"` : "All Cars"}
            </h1>
            <form onSubmit={handleLocalSearch} className="flex gap-2 max-w-2xl">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search again..." 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800">
                    Search
                </button>
            </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* ================= SIDEBAR FILTERS ================= */}
            <div className="w-full lg:w-1/4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2"><FaFilter /> Filters</h2>
                        <button 
                            onClick={() => {setSelectedBrands([]); setSelectedFuel([]); setSelectedCategory([]);}}
                            className="text-xs text-red-500 font-bold hover:underline"
                        >
                            CLEAR ALL
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase">Category</h3>
                        <div className="space-y-2">
                            {allCategories.map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategory.includes(cat)}
                                        onChange={() => toggleFilter(selectedCategory, setSelectedCategory, cat)}
                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600 text-sm">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Fuel Type Filter */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase">Fuel Type</h3>
                        <div className="space-y-2">
                            {allFuelTypes.map(fuel => (
                                <label key={fuel} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedFuel.includes(fuel)}
                                        onChange={() => toggleFilter(selectedFuel, setSelectedFuel, fuel)}
                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600 text-sm">{fuel}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Brand Filter (Scrollable) */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase">Brands</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {allBrands.map(brand => (
                                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600 text-sm">{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ================= RESULTS GRID ================= */}
            <div className="w-full lg:w-3/4">
                <p className="mb-4 text-gray-500 font-medium">Found {filteredCars.length} cars matching your criteria</p>
                
                {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map((car, idx) => (
                             <ElectricCarCard 
                                key={idx}
                                id={car.id || idx}
                                name={car.name}
                                priceRange={car.price || car.priceRange}
                                imageUrl={car.images ? car.images[0] : (car.image || "/cars/placeholder.jpg")}
                                fuelType={car.fuelType || "Petrol"}
                                specs={car.specs}
                                features={car.features}
                                images={car.images}
                                onDetailClick={() => router.push(`/car-details/${car.name.trim().toLowerCase().replace(/\s+/g, "-")}`)}
                                onOfferClick={() => alert("Offer Clicked")} // You can connect modal here
                             />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-gray-300">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900">No Cars Found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search query.</p>
                        <button 
                            onClick={() => {setSearchTerm(''); setSelectedBrands([]); setSelectedFuel([]); setSelectedCategory([]);}}
                            className="mt-4 text-blue-600 font-semibold hover:underline"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}