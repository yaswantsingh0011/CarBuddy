"use client";

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import CompareColumn from '@/components/CompareColumn'; 
import { PlusCircle, Trash2, Layers } from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  // 1. EMPTY STATE
  if (compareList.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4 text-center pt-20">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 shadow-sm animate-bounce">
            <Layers size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">No Cars to Compare</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Please add at least 2 cars to compare their features.
        </p>
        <Link href="/">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition shadow-lg">
            Browse Cars
          </button>
        </Link>
      </div>
    );
  }

  // ✅ DYNAMIC GRID CLASS LOGIC
  // Jitni cars hain, utne columns banenge taaki wo poora space le lein
  let gridClass = "grid-cols-1"; // Mobile default
  if (compareList.length === 2) gridClass = "sm:grid-cols-2";
  else if (compareList.length === 3) gridClass = "sm:grid-cols-2 lg:grid-cols-3";
  else if (compareList.length === 4) gridClass = "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-28">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-200 pb-6">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-gray-900">Compare Cars</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Comparing <span className="font-bold text-blue-600">{compareList.length}</span> vehicle{compareList.length > 1 ? 's' : ''}
                </p>
            </div>
            
            <div className="flex gap-3">
                {compareList.length < 4 && (
                    <Link href="/new-cars">
                        <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition">
                            <PlusCircle size={18} /> Add Another Car
                        </button>
                    </Link>
                )}
                <button 
                    onClick={clearCompare}
                    className="flex items-center gap-2 bg-white border border-red-200 text-red-500 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-50 transition shadow-sm"
                >
                    <Trash2 size={18} /> Clear All
                </button>
            </div>
        </div>

        {/* ✅ DYNAMIC GRID */}
        <div className={`grid ${gridClass} gap-6 w-full max-w-7xl mx-auto`}>
            
            {/* Sirf Selected Cars dikhayenge (No Empty Slots) */}
            {compareList.map((car) => (
                <div key={car.id} className="h-full animate-in fade-in zoom-in-95 duration-300">
                    <CompareColumn 
                        car={car} 
                        onRemove={() => removeFromCompare(car.id)} 
                    />
                </div>
            ))}

        </div>

      </div>
    </div>
  );
}