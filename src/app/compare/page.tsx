'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import CompareCard from '@/components/CompareCard'; // ✅ Import

const ComparePage = () => {
  const { compareList, removeFromCompare } = useCompare();

  if (compareList.length === 0) {
    // ... Empty state code (same as before) ...
    return <div className="text-center p-10">List is empty <Link href="/">Go Back</Link></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compare Cars</h1>

        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {compareList.map((car, index) => (
                <CompareCard 
                    key={car.id || index} 
                    car={car} 
                    onRemove={removeFromCompare} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;