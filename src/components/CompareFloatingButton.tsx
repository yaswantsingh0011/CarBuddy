'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FaExchangeAlt } from 'react-icons/fa';

const CompareFloatingButton = () => {
  // Context se data lena
  const compareContext = useCompare();
  
  // Safety check: Agar context load nahi hua ya list khali hai
  if (!compareContext || compareContext.compareList.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <Link href="/compare">
        <button className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:bg-orange-700 transition-all font-bold border-2 border-white">
          <FaExchangeAlt />
          Compare ({compareContext.compareList.length})
        </button>
      </Link>
    </div>
  );
};

export default CompareFloatingButton;