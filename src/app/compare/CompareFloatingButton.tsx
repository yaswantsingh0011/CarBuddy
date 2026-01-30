'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FaExchangeAlt } from 'react-icons/fa';

const CompareFloatingButton = () => {
  const { compareList } = useCompare();

  // ✅ Sirf tabhi dikhao jab kam se kam 2 cars selected hon
  // Maximum 4 ka limit tere Context mein pehle se set hai.
  if (compareList.length < 2) return null; 

  return (
    <div className="fixed bottom-10 right-10 z-[100] group">
      {/* Tooltip for user help */}
      <div className="absolute bottom-full mb-3 right-0 bg-gray-900 text-white text-[10px] py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
        Ready to Compare!
      </div>
      
      <Link href="/compare">
        <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(234,88,12,0.3)] flex items-center gap-3 hover:bg-orange-700 transition-all font-black border-2 border-white/20 active:scale-95 animate-in slide-in-from-bottom-10">
          <FaExchangeAlt className="text-xl" />
          <span className="uppercase tracking-tighter">Compare {compareList.length} Cars</span>
          
          {/* Chhota indicator badge */}
          <span className="absolute -top-2 -right-2 bg-white text-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-orange-600">
            {compareList.length}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default CompareFloatingButton;