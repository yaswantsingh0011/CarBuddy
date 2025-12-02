'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ShortlistContextType {
  shortlist: any[];
  toggleShortlist: (car: any) => void;
  isShortlisted: (id: number | string) => boolean;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export const ShortlistProvider = ({ children }: { children: ReactNode }) => {
  const [shortlist, setShortlist] = useState<any[]>([]);

  // Local Storage se data load karo (Optional: agar refresh ke baad bhi rakhna hai)
  useEffect(() => {
    const saved = localStorage.getItem('shortlistedCars');
    if (saved) setShortlist(JSON.parse(saved));
  }, []);

  // Save to Local Storage whenever shortlist changes
  useEffect(() => {
    localStorage.setItem('shortlistedCars', JSON.stringify(shortlist));
  }, [shortlist]);

  const toggleShortlist = (car: any) => {
    setShortlist((prev) => {
      const exists = prev.some((item) => (item.id || item.name) === (car.id || car.name));
      if (exists) {
        // Remove
        return prev.filter((item) => (item.id || item.name) !== (car.id || car.name));
      } else {
        // Add
        return [...prev, car];
      }
    });
  };

  const isShortlisted = (id: number | string) => {
    return shortlist.some((item) => (item.id || item.name) === id);
  };

  return (
    <ShortlistContext.Provider value={{ shortlist, toggleShortlist, isShortlisted }}>
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => {
  const context = useContext(ShortlistContext);
  if (!context) throw new Error("useShortlist must be used within ShortlistProvider");
  return context;
};