'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext'; // ✅ Tera context hook
import { FaExchangeAlt, FaTrash, FaPlus, FaCheckCircle, FaBalanceScale } from 'react-icons/fa'; // ✅ Fixed Icon Name
import { useRouter } from 'next/navigation';

const ComparePage = () => {
  const { compareList, removeFromCompare } = useCompare();
  const router = useRouter();

  // --- 1. Minimum 2 Cars Check ---
  if (compareList.length < 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <FaExchangeAlt className="text-blue-600 text-4xl" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Compare karne ke liye gadiyan chunein!</h2>
        <p className="text-gray-500 mb-8 max-w-sm font-medium">
          Comparison dekhne ke liye kam se kam 2 gadiyan honi chahiye. Aapne abhi {compareList.length} select ki hai.
        </p>
        <Link href="/search" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all active:scale-95">
            Browse Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* --- 2. VS HERO SECTION (Top Comparison) --- */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100 mb-10 relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-50 hidden md:block" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Car 1 Details */}
            <div className="text-center flex-1 group">
               <div className="relative mb-8">
                 <img 
                   src={compareList[0].imageUrl || (compareList[0].images && compareList[0].images[0]) || "/cars/placeholder.jpg"} 
                   alt={compareList[0].name}
                   className="h-44 md:h-60 mx-auto object-contain transition-transform duration-500 group-hover:scale-110" 
                 />
                 <button 
                   onClick={() => removeFromCompare(compareList[0].id || compareList[0].name)} 
                   className="absolute -top-4 -right-4 bg-white text-gray-400 p-3 rounded-full shadow-lg hover:text-red-500 transition-all border border-gray-100"
                   title="Remove"
                 >
                   <FaTrash size={14}/>
                 </button>
               </div>
               <div className="space-y-2">
                 <p className="text-blue-600 font-black text-xs uppercase tracking-widest">{compareList[0].sourceTable || "Featured"}</p>
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{compareList[0].name}</h2>
                 <p className="text-xl font-bold text-gray-700">{compareList[0].priceRange}</p>
               </div>
            </div>

            {/* VS Badge Logic */}
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 bg-[#e11d48] text-white rounded-full flex items-center justify-center font-black text-2xl shadow-[0_10px_40px_rgba(225,29,72,0.4)] border-8 border-white ring-1 ring-gray-100">
                  VS
               </div>
            </div>

            {/* Car 2 Details */}
            <div className="text-center flex-1 group">
               <div className="relative mb-8">
                 <img 
                   src={compareList[1].imageUrl || (compareList[1].images && compareList[1].images[0]) || "/cars/placeholder.jpg"} 
                   alt={compareList[1].name}
                   className="h-44 md:h-60 mx-auto object-contain transition-transform duration-500 group-hover:scale-110" 
                 />
                 <button 
                   onClick={() => removeFromCompare(compareList[1].id || compareList[1].name)} 
                   className="absolute -top-4 -right-4 bg-white text-gray-400 p-3 rounded-full shadow-lg hover:text-red-500 transition-all border border-gray-100"
                   title="Remove"
                 >
                   <FaTrash size={14}/>
                 </button>
               </div>
               <div className="space-y-2">
                 <p className="text-blue-600 font-black text-xs uppercase tracking-widest">{compareList[1].sourceTable || "Featured"}</p>
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{compareList[1].name}</h2>
                 <p className="text-xl font-bold text-gray-700">{compareList[1].priceRange}</p>
               </div>
            </div>

          </div>
        </div>

        {/* --- 3. DETAILED COMPARISON TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 border-b border-gray-50 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                   <FaBalanceScale className="text-2xl" /> 
                </div>
                <div>
                   <h3 className="text-2xl font-black text-gray-900">Detailed Comparison</h3>
                   <p className="text-gray-400 text-sm font-medium">Side-by-side technical specifications</p>
                </div>
             </div>
             {compareList.length < 4 && (
                <Link href="/search" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:underline">
                   <FaPlus /> Add More
                </Link>
             )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-8 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] w-1/3">Key Features</th>
                  <th className="p-8 font-black text-gray-900 text-center text-lg">{compareList[0].name}</th>
                  <th className="p-8 font-black text-gray-900 text-center text-lg">{compareList[1].name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* --- Spec Rows --- */}
                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-8 font-bold text-gray-500 text-sm uppercase tracking-wide">Fuel Type</td>
                  <td className="p-8 text-center font-bold text-gray-800 text-lg">{compareList[0].fuelType || "Petrol"}</td>
                  <td className="p-8 text-center font-bold text-gray-800 text-lg">{compareList[1].fuelType || "Diesel"}</td>
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-8 font-bold text-gray-500 text-sm uppercase tracking-wide">Price Range</td>
                  <td className="p-8 text-center font-black text-blue-600 text-xl">{compareList[0].priceRange}</td>
                  <td className="p-8 text-center font-black text-blue-600 text-xl">{compareList[1].priceRange}</td>
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-8 font-bold text-gray-500 text-sm uppercase tracking-wide">Transmission</td>
                  <td className="p-8 text-center font-bold text-gray-800">{compareList[0].specs?.transmission || "Manual / Automatic"}</td>
                  <td className="p-8 text-center font-bold text-gray-800">{compareList[1].specs?.transmission || "Manual / Automatic"}</td>
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-8 font-bold text-gray-500 text-sm uppercase tracking-wide">Engine Capacity</td>
                  <td className="p-8 text-center font-bold text-gray-800">{compareList[0].specs?.engine || "1.2L DualJet"}</td>
                  <td className="p-8 text-center font-bold text-gray-800">{compareList[1].specs?.engine || "1.5L Revotorq"}</td>
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-8 font-bold text-gray-500 text-sm uppercase tracking-wide">Seating Capacity</td>
                  <td className="p-8 text-center font-bold text-gray-800">{compareList[0].specs?.seats || "5 Seater"}</td>
                  <td className="p-8 text-center font-bold text-gray-800">{compareList[1].specs?.seats || "5 Seater"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Action Footer */}
          <div className="p-10 bg-gray-50/50 flex flex-col md:flex-row gap-6 justify-center">
             <Link href="/search" className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-sm">
                <FaPlus className="text-blue-600" /> Add Another Car
             </Link>
             <button 
               onClick={() => router.push(`/car-details/${compareList[0].slug}`)}
               className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
             >
                Check Detailed Specs
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;