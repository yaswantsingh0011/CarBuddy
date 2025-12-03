'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  city: string;
  setCity: (city: string) => void;
  getPriceForCity: (basePrice: string) => string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("Jaipur"); // Default City

  // ✅ ADVANCED PRICE LOGIC BASED ON CITY
  const getPriceForCity = (basePrice: string) => {
    if (!basePrice) return "N/A";
    
    // 1. Agar price range hai (e.g. "10.00 - 15.00 Lakh"), toh hum use modify nahi karenge complex logic se bachne ke liye
    if (basePrice.includes("-")) return basePrice;

    // 2. Price string se number nikalo (e.g. "13.99 Lakh" -> 13.99)
    let numericPrice = parseFloat(basePrice.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return basePrice;

    // 3. City Multiplier Logic (Real world RTO difference simulation)
    let multiplier = 1.0; // Default (Ex-Showroom)

    // RTO Tax variations approx:
    if (city === "New Delhi") multiplier = 1.00; // Standard Reference
    else if (city === "Jaipur") multiplier = 1.02; // ~2% higher
    else if (city === "Mumbai") multiplier = 1.05; // ~5% higher
    else if (city === "Bangalore") multiplier = 1.08; // ~8% higher (High Tax)
    else if (city === "Chennai") multiplier = 1.04;
    else if (city === "Kolkata") multiplier = 1.03;

    // Calculate New Price
    const newPrice = (numericPrice * multiplier).toFixed(2);

    // Return formatted string (Same unit as input)
    if (basePrice.includes("Cr")) {
        return `₹ ${newPrice} Cr*`;
    }
    return `₹ ${newPrice} Lakh*`;
  };

  return (
    <LocationContext.Provider value={{ city, setCity, getPriceForCity }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};