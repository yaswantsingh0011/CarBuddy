'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch, FaCar, FaSortAmountDownAlt, FaHistory } from 'react-icons/fa';
import ElectricCarCard from '@/components/ElectricCarCard';
// ✅ FIXED: Sahi file import ki
import { supabase } from '@/lib/supabaseClient'; 

// --- ✅ Price Parser: Lakh vs Crore Logic ---
const parsePrice = (p: string) => {
  if (!p || typeof p !== 'string') return 0;
  const num = parseFloat(p.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return 0;
  
  const lowerP = p.toLowerCase();
  // Magnitude correction: 1 Cr = 100 Lakhs
  if (lowerP.includes('cr') || lowerP.includes('crore')) {
    return num * 100;
  }
  return num;
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-gray-500 italic">Bhai, thoda sabr karo... Search load ho raha hai.</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  // ❌ Removed: const supabase = createClient();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // --- 🔍 1. Suggestions Fetching Logic ---
  useEffect(() => {
    const fetchSuggestions = async () => {
      const input = searchTerm.trim();
      if (input.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const prefix = `${input}%`; // Starts with query
        const [res1, res2, res3, res4] = await Promise.all([
          supabase.from('electric_cars').select('name').ilike('name', prefix).limit(3),
          supabase.from('most_searched_cars').select('name').ilike('name', prefix).limit(3),
          supabase.from('upcoming_cars').select('name').ilike('name', prefix).limit(3),
          supabase.from('used_cars').select('name').ilike('name', prefix).limit(3),
        ]);

        const combined = [
          ...(res1.data || []),
          ...(res2.data || []),
          ...(res3.data || []),
          ...(res4.data || [])
        ].map(item => item.name);

        setSuggestions(Array.from(new Set(combined)).slice(0, 8)); // Unique results
      } catch (err) {
        console.error("Suggestion Error:", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // Debounce typing
    return () => clearTimeout(timer);
  }, [searchTerm]); // supabase dependency hatayi

  // Handle outside click to hide suggestions
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // --- 🔍 2. Full Search Results Logic ---
  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      const dbQuery = `%${query.trim()}%`;

      try {
        const fetchTable = (table: string) => supabase.from(table).select('*').ilike('name', dbQuery);

        const [res1, res2, res3, res4] = await Promise.all([
          fetchTable('electric_cars'), fetchTable('most_searched_cars'),
          fetchTable('upcoming_cars'), fetchTable('used_cars')
        ]);

        const normalize = (list: any[], type: string) => (list || []).map((item) => {
          // --- 🔍 Image Parsing from JSON Column ---
          let rawImg = item.images || item.image_urls || item.imageUrl || item.image;
          let finalImg = "/cars/placeholder.jpg";

          if (typeof rawImg === 'string' && rawImg.startsWith('[')) {
            try { 
              const parsed = JSON.parse(rawImg);
              rawImg = Array.isArray(parsed) ? parsed[0] : rawImg;
            } catch { }
          } else if (Array.isArray(rawImg) && rawImg.length > 0) {
            rawImg = rawImg[0];
          }

          if (rawImg && typeof rawImg === 'string') {
            finalImg = (rawImg.startsWith('/') || rawImg.startsWith('http')) ? rawImg : `/cars/${rawImg}`;
          }

          const priceStr = item.price_range || item.priceRange || item.price || "Price TBD";

          return {
            id: item.id,
            name: item.name || "New Car",
            priceRange: priceStr,
            imageUrl: finalImg,
            fuelType: item.fuel_type || item.fuelType || (type === 'electric' ? 'Electric' : 'Petrol'),
            slug: item.slug || item.id,
            sourceTable: type,
            priceVal: parsePrice(priceStr) // Correct sorting value
          };
        });

        const allResults = [
          ...normalize(res1.data, 'electric'), ...normalize(res2.data, 'popular'),
          ...normalize(res3.data, 'upcoming'), ...normalize(res4.data, 'used'),
        ];

        const uniqueResults = Array.from(new Map(allResults.map(c => [c.name.toLowerCase(), c])).values())
                                          .sort((a, b) => a.priceVal - b.priceVal);
        
        setCars(uniqueResults);
      } finally {
        setLoading(false);
        setShowSuggestions(false);
      }
    };

    getSearchResults();
  }, [query]);

  const onSelectSuggestion = (s: string) => {
    setSearchTerm(s);
    setShowSuggestions(false);
    router.push(`/search?q=${s}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* --- Search Bar with Suggestions Dropdown --- */}
      <div className="bg-white border-b sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl relative" ref={suggestionRef}>
          <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchTerm}`); }} className="flex gap-2">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for Toyota, Fortuner, Tata..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-800"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95">
              SEARCH
            </button>
          </form>

          {/* --- Dropdown Box --- */}
          {showSuggestions && (searchTerm.length > 1) && (
            <div className="absolute left-4 right-24 top-[110%] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[60]">
              {suggestions.length > 0 ? suggestions.map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => onSelectSuggestion(s)}
                  className="px-6 py-4 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors border-b last:border-none"
                >
                  <FaHistory className="text-gray-300" />
                  <span className="font-semibold text-gray-700">{s}</span>
                </div>
              )) : (
                <div className="px-6 py-4 text-gray-400 italic">No matches found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
           <div>
             <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
               <FaCar className="text-blue-600" />
               {loading ? "Searching..." : `Found ${cars.length} Matches`}
             </h2>
           </div>
           {!loading && (
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border text-xs font-bold text-gray-600 shadow-sm uppercase">
               <FaSortAmountDownAlt className="text-blue-600" /> Sorted by Price
             </div>
           )}
        </div>

        {/* --- Grid Layout --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white rounded-2xl animate-pulse border border-gray-100" />)}
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <ElectricCarCard 
                key={`${car.sourceTable}-${car.id}`}
                {...car} 
                onDetailClick={() => router.push(`/car-details/${car.slug}`)}
                onOfferClick={() => {}} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-900 text-xl font-bold">Bhai, is naam ki koi car nahi mili!</p>
          </div>
        )}
      </div>
    </div>
  );
}