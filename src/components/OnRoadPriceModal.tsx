'use client';

import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

interface OnRoadPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  price: string; 
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

  if (!isOpen) return null;

  // ✅✅✅ FIXED LOGIC FOR CRORE VS LAKH ✅✅✅
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    
    // Extract the number (e.g., 1.41 or 13.99)
    const matches = priceStr.match(/(\d+\.?\d*)/); 
    if (!matches) return 0;
    
    const value = parseFloat(matches[0]);
    
    // Check unit
    const lowerPrice = priceStr.toLowerCase();
    if (lowerPrice.includes("cr") || lowerPrice.includes("crore")) {
        return value * 10000000; // 1 Crore = 1,00,00,000
    }
    
    // Default to Lakh
    return value * 100000; // 1 Lakh = 1,00,000
  };

  const exShowroom = parsePrice(price);

  // ✅ LUXURY TAX LOGIC
  // Cars > 10 Lakh usually attract 1% TCS. Luxury cars have higher RTO caps.
  const isLuxury = exShowroom > 2000000; // If price > 20 Lakh

  const rtoPercent = isLuxury ? 0.12 : 0.10; // 12% for Luxury, 10% Normal
  const insurancePercent = isLuxury ? 0.04 : 0.045; // Insurance % drops slightly for high value but amount is huge

  const rtoCharges = Math.round(exShowroom * rtoPercent); 
  const insuranceCharges = Math.round(exShowroom * insurancePercent); 
  
  // Handling + TCS (1% TCS mandatory for cars > 10L)
  const tcsCharges = exShowroom > 1000000 ? Math.round(exShowroom * 0.01) : 0;
  const otherCharges = 2500 + tcsCharges; 

  const optionalCharges = Math.round(exShowroom * 0.01); // 1% for accessories
  
  const totalOnRoad = exShowroom + rtoCharges + insuranceCharges + otherCharges + (isOptionalSelected ? optionalCharges : 0);

  // EMI Logic (80% Loan, 9% Interest, 5 Years)
  const loanAmount = totalOnRoad * 0.8; 
  const monthlyRate = 9 / 1200;
  const tenureMonths = 60; 
  const emi = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden relative">
        
        <div className="p-6 pb-2">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{carName} price</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><FaTimes size={24} /></button>
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-1"><span>{city}</span></div>
        </div>

        <div className="px-6 py-2 space-y-4">
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Ex-Showroom Price</span><span className="font-medium text-gray-900">{formatCurrency(exShowroom)}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">RTO</span><span className="font-medium text-gray-900">{formatCurrency(rtoCharges)}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600 flex items-center gap-1">Insurance <FaInfoCircle className="text-gray-300"/></span><span className="font-medium text-gray-900">{formatCurrency(insuranceCharges)}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600 flex items-center gap-1">Others (TCS + FastTag) <FaInfoCircle className="text-gray-300"/></span><span className="font-medium text-gray-900">{formatCurrency(otherCharges)}</span></div>
            
            <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={isOptionalSelected} onChange={() => setIsOptionalSelected(!isOptionalSelected)} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-gray-300" />
                    <span className="text-gray-600 flex items-center gap-1">Optional (Warranty/Acc.) <FaInfoCircle className="text-gray-300"/></span>
                </label>
                <span className="font-medium text-gray-900">{formatCurrency(optionalCharges)}</span>
            </div>

            <div className="flex justify-between items-end pt-2">
                <span className="text-lg font-bold text-gray-800">On-Road Price</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(totalOnRoad)}</span>
            </div>
            
            <div className="flex justify-end items-center gap-2 text-sm">
                <span className="text-gray-600 border-b border-gray-400">EMI : {formatCurrency(emi)}/month</span>
                <button onClick={() => { onClose(); onOpenEMI(); }} className="text-blue-600 font-bold hover:underline">View EMI Offers</button>
            </div>
        </div>

        <div className="p-4 mt-4 flex gap-3 border-t border-gray-100">
            <button onClick={() => { onClose(); onOpenOffers(); }} className="flex-1 py-3 border border-blue-600 text-blue-600 font-bold rounded hover:bg-blue-50 transition-colors text-sm uppercase">Get Current Offers</button>
            <button onClick={() => { onClose(); onOpenBooking(); }} className="flex-1 py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 shadow-md transition-colors text-sm uppercase">Book Your Test Drive Now</button>
        </div>

      </div>
    </div>
  );
};

export default OnRoadPriceModal;