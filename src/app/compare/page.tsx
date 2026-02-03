'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FaExchangeAlt, FaTrash, FaPlus, FaBalanceScale } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ComparePage = () => {
  const { compareList, removeFromCompare } = useCompare();
  const router = useRouter();

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
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- 2. DYNAMIC HERO SECTION --- */}
        <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-100 mb-10 relative overflow-hidden">
          <div className="flex flex-row items-stretch justify-center gap-4 md:gap-8 overflow-x-auto pb-4">
            
            {compareList.map((car, index) => (
              <React.Fragment key={car.id || index}>
                <div className="text-center flex-1 min-w-[200px] group relative">
                   <div className="relative mb-6">
                     <img 
                       src={car.imageUrl || (car.images && car.images[0]) || "/cars/placeholder.jpg"} 
                       alt={car.name}
                       className="h-32 md:h-48 mx-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                     />
                     <button 
                       onClick={() => removeFromCompare(car.id || car.name)} 
                       className="absolute -top-2 -right-2 bg-white text-gray-400 p-2 rounded-full shadow-md hover:text-red-500 transition-all border border-gray-100 z-20"
                       title="Remove"
                     >
                       <FaTrash size={12}/>
                     </button>
                   </div>
                   <div className="space-y-1">
                     <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{car.sourceTable || "Featured"}</p>
                     <h2 className="text-lg md:text-xl font-black text-gray-900 leading-tight line-clamp-1">{car.name}</h2>
                     <p className="text-md font-bold text-gray-700">{car.priceRange}</p>
                   </div>
                </div>

                {/* VS Badge - Sirf cars ke beech mein dikhane ke liye */}
                {index < compareList.length - 1 && (
                  <div className="flex items-center justify-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#e11d48] text-white rounded-full flex items-center justify-center font-black text-xs md:text-sm shadow-lg border-4 border-white shrink-0">
                       VS
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

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
            <table className="w-full text-left table-fixed min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] w-48">Key Features</th>
                  {compareList.map((car, idx) => (
                    <th key={idx} className="p-6 font-black text-gray-900 text-center text-md border-l border-gray-50">{car.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* --- Spec Rows --- */}
                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-6 font-bold text-gray-500 text-xs uppercase">Fuel Type</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="p-6 text-center font-bold text-gray-800 border-l border-gray-50">{car.fuelType || "Petrol"}</td>
                  ))}
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-6 font-bold text-gray-500 text-xs uppercase">Price Range</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="p-6 text-center font-black text-blue-600 text-lg border-l border-gray-50">{car.priceRange}</td>
                  ))}
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-6 font-bold text-gray-500 text-xs uppercase">Transmission</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="p-6 text-center font-bold text-gray-800 border-l border-gray-50">{car.specs?.transmission || "Manual / AMT"}</td>
                  ))}
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-6 font-bold text-gray-500 text-xs uppercase">Engine Capacity</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="p-6 text-center font-bold text-gray-800 border-l border-gray-50">{car.specs?.engine || "N/A"}</td>
                  ))}
                </tr>

                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-6 font-bold text-gray-500 text-xs uppercase">Seating</td>
                  {compareList.map((car, idx) => (
                    <td key={idx} className="p-6 text-center font-bold text-gray-800 border-l border-gray-50">{car.specs?.seats || "5 Seater"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="p-10 bg-gray-50/50 flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/search" className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-sm">
                 <FaPlus className="text-blue-600" /> Add Another Car
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;