'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaEdit, FaTrash, FaImage, FaEllipsisV, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function UpcomingCarsList() {
  const [cars, setCars] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null); 
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 1. Database se data fetch karna
  const fetchCars = async () => {
    const { data } = await supabase.from('upcoming_cars').select('*').order('id', { ascending: true });
    if (data) setCars(data);
  };

  useEffect(() => { 
    fetchCars();
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Bhai, pakka delete karna hai?")) {
      const { error } = await supabase.from('upcoming_cars').delete().eq('id', id);
      if (!error) fetchCars();
      setActiveMenu(null);
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      {/* HEADER SECTION - Sync Button Hata Diya */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#0F172A]">Upcoming Cars</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Manage Coming Soon Vehicles</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/cars/upcoming-cars/add" className="bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase flex items-center gap-2 shadow-lg transition-all active:scale-95">
            <FaPlus /> Add New Car
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-visible shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">ID</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Vehicle</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Price Info</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Expected Launch</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <span className="text-xs font-black text-gray-300">#{car.id}</span>
                </td>

                {/* IMAGE & NAME */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                      {car.image_urls?.[0] ? (
                        <img src={car.image_urls[0]} alt={car.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300"><FaImage size={20}/></div>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-[#0F172A] text-sm leading-tight">{car.name}</p>
                      <span className="text-[9px] font-black bg-blue-50 text-blue-500 px-2 py-0.5 rounded uppercase mt-1 inline-block">{car.category}</span>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6 font-bold text-gray-700 text-sm">
                  {car.price_range}
                </td>

                {/* LAUNCH DATE */}
                <td className="px-8 py-6">
                  <p className="text-xs font-black text-[#0F172A]">{car.location}</p>
                </td>

                {/* THREE DOT MENU */}
                <td className="px-8 py-6 text-right relative" ref={activeMenu === car.id ? menuRef : null}>
                  <button 
                    onClick={() => setActiveMenu(activeMenu === car.id ? null : car.id)}
                    className="p-3 text-gray-400 hover:text-[#0F172A] hover:bg-gray-100 rounded-full transition-all"
                  >
                    <FaEllipsisV size={16} />
                  </button>

                  {activeMenu === car.id && (
                    <div className="absolute right-10 top-16 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] py-2">
                      <Link href={`/car-details/${car.slug}`} target="_blank" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <FaExternalLinkAlt size={12} /> View Live
                      </Link>
                      <Link href={`/admin/cars/upcoming-cars/edit/${car.id}`} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        <FaEdit size={12} /> Edit Car
                      </Link>
                      <button onClick={() => handleDelete(car.id)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all border-t border-gray-50">
                        <FaTrash size={12} /> Delete Car
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}