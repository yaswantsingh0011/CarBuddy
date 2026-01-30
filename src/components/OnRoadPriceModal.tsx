"use client";

import React, { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';

interface OnRoadPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  price: string | number;
  city: string;
  onOpenEMI: () => void;
  onOpenOffers: () => void;
  onOpenBooking: () => void;
}

const OnRoadPriceModal: React.FC<OnRoadPriceModalProps> = ({ 
  isOpen, onClose, carName, price, city, 
  onOpenEMI, onOpenOffers, onOpenBooking 
}) => {
  const [isOptionalSelected, setIsOptionalSelected] = useState(true);

  // Agar modal open nahi hai, toh kuch mat dikhao (Safety Check)
  if (!isOpen) return null;

  // --- PRICE CALCULATION LOGIC ---
  const parsePrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    
    // Number nikaalo (e.g. "13.40" from "₹ 13.40 Lakh")
    const matches = priceStr.match(/(\d+\.?\d*)/); 
    if (!matches) return 0;
    
    const value = parseFloat(matches[0]);
    const lowerPrice = priceStr.toLowerCase();
    
    // Crore ya Lakh convert karo
    if (lowerPrice.includes("cr") || lowerPrice.includes("crore")) {
        return value * 10000000;
    }
    return value * 100000;
  };

  const exShowroom = parsePrice(price);
  const isLuxury = exShowroom > 2000000; // 20 Lakh se upar luxury tax
  
  // Percentages
  const rtoPercent = isLuxury ? 0.12 : 0.10;
  const insurancePercent = 0.04; // Approx 4%

  // Exact Values
  const rtoCharges = Math.round(exShowroom * rtoPercent); 
  const insuranceCharges = Math.round(exShowroom * insurancePercent); 
  const tcsCharges = exShowroom > 1000000 ? Math.round(exShowroom * 0.01) : 0; // 1% TCS if > 10L
  const otherCharges = 2500 + tcsCharges; // FastTag + TCS
  const optionalCharges = Math.round(exShowroom * 0.01); // 1% Accessories
  
  // FINAL TOTAL
  const totalOnRoad = exShowroom + rtoCharges + insuranceCharges + otherCharges + (isOptionalSelected ? optionalCharges : 0);

  // Currency Formatter (Indian Style: 1,00,000)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        
        {/* === HEADER === */}
        <div className="p-6 pb-4 border-b border-gray-100">
            <div className="flex justify-between items-start">
                <h2 className="text-xl font-black text-gray-900">{carName} Price Breakdown</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaTimes size={20} />
                </button>
            </div>
            <p className="text-sm text-gray-500 font-bold mt-1">Location: <span className="text-blue-600">{city}</span></p>
        </div>

        {/* === BODY (Costs) === */}
        <div className="p-6 space-y-4 bg-gray-50/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Ex-Showroom Price</span>
              <span className="font-bold text-gray-900">{formatCurrency(exShowroom)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">RTO Charges</span>
              <span className="font-bold text-gray-900">{formatCurrency(rtoCharges)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium flex items-center gap-1">Insurance <FaInfoCircle className="text-gray-300"/></span>
              <span className="font-bold text-gray-900">{formatCurrency(insuranceCharges)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium flex items-center gap-1">Others (TCS + FastTag)</span>
              <span className="font-bold text-gray-900">{formatCurrency(otherCharges)}</span>
            </div>
            
            {/* Optional Checkbox */}
            <div className="flex justify-between items-center text-sm py-3 border-t border-dashed border-gray-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={isOptionalSelected} 
                      onChange={() => setIsOptionalSelected(!isOptionalSelected)} 
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <span className="text-gray-600 font-medium">Optional (Warranty/Acc.)</span>
                </label>
                <span className="font-bold text-gray-900">{formatCurrency(optionalCharges)}</span>
            </div>

            {/* Total Box */}
            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center border border-blue-100">
                <span className="text-lg font-black text-blue-900">Total On-Road</span>
                <span className="text-2xl font-black text-blue-600">{formatCurrency(totalOnRoad)}</span>
            </div>
        </div>

        {/* === FOOTER (Actions) === */}
        <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-3">
            <button 
              onClick={() => { onClose(); onOpenEMI(); }} 
              className="py-3 border border-blue-600 text-blue-600 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-blue-50 transition-all"
            >
              View EMI Offers
            </button>
            <button 
              onClick={() => { onClose(); onOpenBooking(); }} 
              className="py-3 bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg shadow-red-100"
            >
              Book Test Drive
            </button>
        </div>

      </div>
    </div>
  );
};
