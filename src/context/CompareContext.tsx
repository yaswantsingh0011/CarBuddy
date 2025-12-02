'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompareContextType {
  compareList: any[];
  addToCompare: (car: any) => void;
  removeFromCompare: (id: number | string) => void;
  isInCompare: (id: number | string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<any[]>([]);

  // ✅ Add Car Logic (Updated Limit to 4)
  const addToCompare = (car: any) => {
    if (compareList.length >= 4) {
      alert("You can only compare up to 4 cars at a time!");
      return;
    }
    // Avoid duplicates
    if (!isInCompare(car.id || car.name)) {
        setCompareList((prev) => [...prev, car]);
    }
  };

  const removeFromCompare = (id: number | string) => {
    setCompareList((prev) => prev.filter((item) => (item.id || item.name) !== id));
  };

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