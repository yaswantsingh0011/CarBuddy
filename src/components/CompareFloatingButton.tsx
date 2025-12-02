'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { FaExchangeAlt } from 'react-icons/fa';

const CompareFloatingButton = () => {
  const { compareList } = useCompare();

  // Agar list khali hai to button hi mat dikhao
  if (compareList.length === 0) return null;

  // ✅ Click Logic: Check Min 2 Cars
  const handleClick = (e: React.MouseEvent) => {
    if (compareList.length < 2) {
      e.preventDefault(); // Page change roko
      alert("Please select at least 2 cars to compare.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <Link href="/compare" onClick={handleClick}>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:bg-orange-700 transition-all font-bold border-2 border-white">
          <FaExchangeAlt />
          Compare ({compareList.length})
        </button>
      </Link>
    </div>
  );
};

export default CompareFloatingButton;