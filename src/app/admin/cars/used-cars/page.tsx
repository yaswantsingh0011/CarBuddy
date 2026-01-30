"use client";
import React, { useEffect, useState } from 'react';
import { MoreVertical, Plus, Edit, Trash, Eye, Zap, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function UsedCarsListing() {
  const router = useRouter();
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState<string | null>(null); // ✅ Tracks open menu by ID

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('used_cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCars(data);
      setFilteredCars(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCars(); }, []);

  // ✅ Click Outside Fix: Menu ko band karne ke liye
  useEffect(() => {
    const handleClickOutside = () => setShowMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Stop event bubbling
    if (confirm("Bhai, pakka delete karna hai?")) {
      const { error } = await supabase.from('used_cars').delete().eq('id', id);
      if (!error) fetchCars();
    }
    setShowMenu(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header Section */}
      <div className="p-10 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0F172A]">Featured Used Cars</h1>
            <p className="text-gray-400 text-sm mt-1">Found {filteredCars.length} cars in used_cars table</p>
          </div>
          <Link href="/admin/cars/used-cars/add" className="bg-[#0F172A] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-lg transition-all">
            <Plus size={22} /> Add New
          </Link>
      </div>

      <div className="px-10 py-6">
        {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin" size={40}/></div> : (
          <div className="space-y-2">
            {filteredCars.map((car, index) => (
              <div key={car.id} className="relative flex items-center justify-between p-5 hover:bg-gray-50/60 transition-all rounded-[24px] border border-transparent hover:border-gray-100 group">
                
                {/* Car Info Side */}
                <div className="flex items-center gap-10 flex-1">
                  <span className="text-[#0F172A] font-black text-2xl opacity-10 group-hover:opacity-40 w-10">{String(index + 1).padStart(2, '0')}</span>
                  <div className="flex items-center gap-6">
                    <img src={car.images?.[0] || "/cars/placeholder.jpg"} className="w-24 h-16 rounded-[18px] object-cover border border-gray-100 shadow-sm" />
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-xl">{car.name}</h3>
                      <div className="flex gap-2 items-center mt-1.5 text-[10px] font-black uppercase text-gray-500">
                        <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg">{car.brand}</span>
                        <span>{car.kms}</span> • <span>{car.model_year}</span> • <span>{car.owner}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-10">
                  <div className="font-extrabold text-[#0F172A] text-lg">{car.price}</div>
                  
                  {/* Date Display */}
                  <span className="text-gray-400 font-bold text-xs">
                    {new Date(car.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>

                  {/* ✅ THE FIXED MENU BUTTON */}
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ Important
                        setShowMenu(showMenu === car.id ? null : car.id);
                      }} 
                      className={`p-3 rounded-xl transition-all ${showMenu === car.id ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-black hover:bg-gray-100'}`}
                    >
                      <MoreVertical size={24} />
                    </button>

                    {/* ✅ FIXED DROPDOWN MENU */}
                    {showMenu === car.id && (
                      <div className="absolute right-0 mt-3 w-52 bg-white shadow-2xl rounded-[22px] border border-gray-100 z-[99] overflow-hidden p-2 animate-in fade-in zoom-in duration-150">
                        <button 
                          onClick={() => router.push(`/car-details/${car.slug}`)}
                          className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-3 rounded-[15px] transition-colors"
                        >
                          <Eye size={18} className="text-gray-400" /> View Details
                        </button>
                        
                        <button 
                          onClick={() => router.push(`/admin/cars/used-cars/edit/${car.id}`)}
                          className="w-full text-left px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-3 rounded-[15px] transition-colors"
                        >
                          <Edit size={18} className="text-gray-400" /> Edit Info
                        </button>

                        <div className="h-[1px] bg-gray-100 my-1 mx-2"></div>
                        
                        <button 
                          onClick={(e) => handleDelete(car.id, e)}
                          className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 rounded-[15px] transition-colors"
                        >
                          <Trash size={18} /> Delete Car
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}