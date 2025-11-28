"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Car Type Definition (Flexible rakhne ke liye 'any' use kar rahe hain abhi)
type Car = any;

interface CompareContextType {
  compareList: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (carId: number | string) => void;
  isInCompare: (carId: number | string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [compareList, setCompareList] = useState<Car[]>([]);

  // LocalStorage se data uthana (taaki refresh hone par list na ude)
  useEffect(() => {
    const saved = localStorage.getItem("compareList");
    if (saved) setCompareList(JSON.parse(saved));
  }, []);

  // Update LocalStorage whenever list changes
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  // Add Car Logic
  const addToCompare = (car: Car) => {
    // Check Max Limit (4 Cars)
    if (compareList.length >= 4) {
      alert("You can only compare up to 4 cars!");
      return;
    }
    // Check Duplicate
    if (compareList.find((c) => c.id === car.id || c.name === car.name)) {
      return;
    }
    setCompareList([...compareList, car]);
  };

  // Remove Car Logic
  const removeFromCompare = (carId: number | string) => {
    setCompareList(compareList.filter((c) => c.id !== carId && c.name !== carId));
  };

  // Check if car is already added (For Green Button UI)
  const isInCompare = (carId: number | string) => {
    return compareList.some((c) => c.id === carId || c.name === carId);
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within a CompareProvider");
  return context;
};