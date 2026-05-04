'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaEdit, FaTrash, FaImage, FaEllipsisV, FaExternalLinkAlt, FaBolt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function ElectricCarsList() {
  const [cars, setCars] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null); 
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 1. Fetching Data from electric_cars table
  const fetchCars = async () => {
    const { data } = await supabase.from('electric_cars').select('*').order('id', { ascending: true });
    if (data) setCars(data);
  };

  useEffect(() => { 
    fetchCars();
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Bhai, pakka delete karna hai?")) {
      await supabase.from('electric_cars').delete().eq('id', id);
      fetchCars();
      setActiveMenu(null);
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-black">
      {/* HEADER SECTION - Sync Button Removed */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#0F172A] flex items-center gap-3">
            <FaBolt className="text-yellow-400" /> Electric Cars
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Manage EV Inventory</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/cars/electric-cars/add" className="bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase flex items-center gap-2 shadow-lg transition-all active:scale-95">
            <FaPlus /> Add New EV
          </Link>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[40px] border border-gray-100 overflow-visible shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              {/* ID Column Added */}
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">ID</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Vehicle</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Price Info</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Range (Certified)</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cars.map((car, index) => (
              <tr key={car.id} className="hover:bg-gray-50/30 transition-colors group">
                {/* ID DISPLAY */}
                <td className="px-8 py-6 text-xs font-black text-gray-300 group-hover:text-yellow-500 transition-colors">
                  #{index + 1}
                </td>

                {/* VEHICLE INFO WITH IMAGE */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">
                      {car.image_urls?.[0] ? (
                        <Image src={car.image_urls[0]} alt={car.name} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300"><FaImage size={20}/></div>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-[#0F172A] text-sm leading-tight">{car.name}</p>
                      <span className="text-[9px] font-black bg-blue-50 text-blue-500 px-2 py-0.5 rounded uppercase mt-1 inline-block">Electric</span>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6 font-bold text-gray-700 text-sm">{car.price_range}</td>

                {/* RANGE COLUMN */}
                <td className="px-8 py-6">
                  <p className="text-xs font-black text-green-600">{car.specs?.mileage || "N/A"}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Verified Range</p>
                </td>

                {/* THREE DOT ACTIONS */}
                <td className="px-8 py-6 text-right relative" ref={activeMenu === car.id ? menuRef : null}>
                  <button onClick={() => setActiveMenu(activeMenu === car.id ? null : car.id)} className="p-3 text-gray-400 hover:text-[#0F172A] hover:bg-gray-100 rounded-full transition-all">
                    <FaEllipsisV size={16} />
                  </button>
                  {activeMenu === car.id && (
                    <div className="absolute right-10 top-16 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] py-2">
                      <Link href={`/car-details/${car.slug}`} target="_blank" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <FaExternalLinkAlt size={12} /> View Live
                      </Link>
                      <Link href={`/admin/cars/electric-cars/edit/${car.id}`} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        <FaEdit size={12} /> Edit EV
                      </Link>
                      <button onClick={() => handleDelete(car.id)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all border-t border-gray-50">
                        <FaTrash size={12} /> Delete EV
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cars.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No electric cars found. Add some to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}