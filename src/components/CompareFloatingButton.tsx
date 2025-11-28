"use client";

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FaLayerGroup, FaTimes } from 'react-icons/fa';

const CompareFloatingButton = () => {
  const { compareList, clearCompare } = useCompare();

  // Agar koi car select nahi hai, to button mat dikhao
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end animate-in slide-in-from-bottom-4 duration-300">
      
      {/* Clear Button (Chhota sa cross upar) */}
      <button 
        onClick={clearCompare}
        className="mb-2 mr-1 bg-gray-800 text-white p-1.5 rounded-full text-xs shadow-md hover:bg-red-600 transition-colors"
        title="Clear List"
      >
        <FaTimes />
      </button>

      {/* Main Compare Button */}
      <Link href="/compare">
        <button className="bg-orange-600 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-orange-700 hover:scale-105 transition-all font-bold tracking-wide border-2 border-white">
          <FaLayerGroup className="text-xl" />
          <span>Compare Cars</span>
          <span className="bg-white text-orange-600 text-xs font-extrabold px-2 py-0.5 rounded-full min-w-[24px] text-center">
            {compareList.length}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default CompareFloatingButton;