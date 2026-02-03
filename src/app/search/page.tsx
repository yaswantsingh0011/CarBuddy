'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCar, FaSortAmountDownAlt, FaFrownOpen } from 'react-icons/fa';
import ElectricCarCard from '@/components/ElectricCarCard';
import { supabase } from '@/lib/supabaseClient'; 

const parsePrice = (p: string) => {
  if (!p || typeof p !== 'string') return 0;
  const num = parseFloat(p.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return 0;
  return p.toLowerCase().includes('cr') ? num * 100 : num;
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-gray-400 animate-pulse">Searching for your dream car...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      const dbQuery = `%${query.trim()}%`;

      try {
        const fetchTable = (table: string) => supabase.from(table).select('*').ilike('name', dbQuery);
        const [res1, res2, res3, res4] = await Promise.all([
          fetchTable('electric_cars'), fetchTable('most_searched_cars'),
          fetchTable('upcoming_cars'), fetchTable('used_cars')
        ]);

        const normalize = (list: any[], type: string) => (list || []).map((item) => {
          let rawImg = item.images || item.image_urls || item.image_url || "/cars/placeholder.jpg";
          if (typeof rawImg === 'string' && rawImg.startsWith('[')) {
            try { rawImg = JSON.parse(rawImg)[0]; } catch { }
          } else if (Array.isArray(rawImg)) { rawImg = rawImg[0]; }

          return {
            id: item.id,
            name: item.name || "New Car",
            priceRange: item.price_range || item.price || "Price TBD",
            imageUrl: (typeof rawImg === 'string' && (rawImg.startsWith('/') || rawImg.startsWith('http'))) ? rawImg : `/cars/${rawImg}`,
            fuelType: item.fuel_type || (type === 'electric' ? 'Electric' : 'Petrol'),
            slug: item.slug || item.id,
            priceVal: parsePrice(item.price_range || item.price || "0")
          };
        });

        const allResults = [...normalize(res1.data, 'electric'), ...normalize(res2.data, 'popular'), ...normalize(res3.data, 'upcoming'), ...normalize(res4.data, 'used')];
        const uniqueResults = Array.from(new Map(allResults.map(c => [c.name.toLowerCase(), c])).values()).sort((a, b) => a.priceVal - b.priceVal);
        setCars(uniqueResults);
      } finally { setLoading(false); }
    };
    getSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-6">
           <div>
             <h1 className="text-3xl font-black text-gray-900">Search Results</h1>
             <p className="text-gray-500 font-medium">Showing matches for <span className="text-blue-600">"{query}"</span></p>
           </div>
           {!loading && cars.length > 0 && (
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border text-[10px] font-black text-gray-500 uppercase tracking-widest shadow-sm">
               <FaSortAmountDownAlt className="text-blue-600" /> Sorted by Price
             </div>
           )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border" />)}
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <ElectricCarCard 
                key={car.id}
                {...car} 
                onDetailClick={() => router.push(`/car-details/${car.slug}`)}
                onOfferClick={() => {}} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
            <FaFrownOpen className="text-6xl text-gray-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Bhai, kuch nahi mila!</h2>
            <p className="text-gray-500">Ek baar spelling check kar lo ya koi aur model search karo.</p>
          </div>
        )}
      </div>
    </div>
  );
}