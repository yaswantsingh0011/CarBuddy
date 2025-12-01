'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Updated Type Definition
interface CompareContextType {
  compareList: any[];
  addToCompare: (car: any) => void;
  removeFromCompare: (id: number | string) => void;
  isInCompare: (id: number | string) => boolean; // ✅ Added function type
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<any[]>([]);

  // ✅ Add Car Logic
  const addToCompare = (car: any) => {
    if (compareList.length >= 2) {
      alert("You can only compare 2 cars at a time!");
      return;
    }
    // Avoid duplicates
    if (!isInCompare(car.id || car.name)) {
        setCompareList((prev) => [...prev, car]);
    }
  };

  // ✅ Remove Car Logic
  const removeFromCompare = (id: number | string) => {
    setCompareList((prev) => prev.filter((item) => (item.id || item.name) !== id));
  };

  // ✅ Check if Car is in List Logic
  const isInCompare = (id: number | string) => {
    return compareList.some((item) => (item.id || item.name) === id);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};