'use client';
import React, { useEffect, useState } from 'react';
import { MoreVertical, Plus, Edit, Trash, Eye, Filter } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function MostSearchedListing() {
  const router = useRouter();
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'SUV', 'MUV', 'Sedan', 'Luxury', 'Hatchback'];

  const fetchCars = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('most_searched_cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setCars(data);
      setFilteredCars(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCars(); }, []);

  useEffect(() => {
    if (activeFilter === 'All') setFilteredCars(cars);
    else setFilteredCars(cars.filter(c => c.category === activeFilter));
  }, [activeFilter, cars]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this car?')) return;
    await supabase.from('most_searched_cars').delete().eq('id', id);
    fetchCars();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-10 border-b flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Most Searched Cars</h1>
          <p className="text-gray-400 text-sm">Managing {filteredCars.length} cars</p>
        </div>

        {/* ✅ FIXED CLICK */}
        <Link
          href="/admin/cars/most-searched/add"
          className="flex items-center gap-2 bg-[#0F172A] text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-lg"
        >
          <Plus size={22} /> Create New Car
        </Link>
      </div>

      <div className="px-10 py-4 flex gap-2 items-center">
        <Filter size={18} />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${
              activeFilter === cat ? 'bg-black text-white' : 'bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-10">
        {loading ? (
          <p className="py-20 text-center text-gray-400">Loading…</p>
        ) : (
          filteredCars.map((car, idx) => (
            <div
              key={car.id}
              className="flex justify-between items-center p-5 rounded-2xl hover:bg-gray-50"
            >
              <div className="flex gap-6 items-center">
                <span className="font-black opacity-40">{String(idx + 1).padStart(2, '0')}</span>
                <img
                  src={car.images?.[0] || '/cars/placeholder.jpg'}
                  className="w-24 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{car.name}</h3>
                  <div className="text-xs text-gray-500">
                    {car.brand} · {car.category} · {car.fuel_type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10 relative">
                <div className="font-bold">{car.price}</div>

                <button onClick={() => setShowMenu(showMenu === car.id ? null : car.id)}>
                  <MoreVertical />
                </button>

                {showMenu === car.id && (
                  <div className="absolute right-0 top-10 bg-white shadow-xl rounded-xl p-2 z-50">
                    <button
                      onClick={() => router.push(`/car-details/${car.slug}`)}
                      className="flex gap-2 px-4 py-2 w-full hover:bg-gray-50"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => router.push(`/admin/cars/most-searched/edit/${car.id}`)}
                      className="flex gap-2 px-4 py-2 w-full hover:bg-gray-50"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="flex gap-2 px-4 py-2 w-full text-red-500 hover:bg-red-50"
                    >
                      <Trash size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
