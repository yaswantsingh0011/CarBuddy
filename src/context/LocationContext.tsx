'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define Context Type
interface LocationContextType {
  city: string;
  setCity: (city: string) => void;
  getPriceForCity: (basePrice: string) => string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// ✅ Named Export use kar rahe hain (Layout me { LocationProvider } import hai)
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("Jaipur"); // Default City

  // Price Calculation Logic based on City
  const getPriceForCity = (basePrice: string) => {
    // Agar price range hai (e.g. "10 - 15 Lakh") toh change mat karo
    if (!basePrice || basePrice.includes("-")) return basePrice;

    // Numeric value nikalo
    let numericPrice = parseFloat(basePrice.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericPrice)) return basePrice;

    // City Multipliers (Demo Logic)
    let multiplier = 1;
    if (city === "Bangalore") multiplier = 1.12; // 12% expensive
    if (city === "Mumbai") multiplier = 1.08;    // 8% expensive
    if (city === "Gurgaon") multiplier = 0.98;   // 2% cheaper

    const newPrice = (numericPrice * multiplier).toFixed(2);
    return `₹ ${newPrice} Lakh`;
  };

  return (
    <LocationContext.Provider value={{ city, setCity, getPriceForCity }}>
      {children}
    </LocationContext.Provider>
  );
};

// ✅ Custom Hook to use location easily
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};