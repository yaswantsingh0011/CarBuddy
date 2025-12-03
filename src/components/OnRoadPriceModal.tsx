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
  
  // ✅ NEW PROPS ADDED
  onOpenOffers: () => void;
  onOpenBooking: () => void;
}

const OnRoadPriceModal: React.FC<OnRoadPriceModalProps> = ({ 
  isOpen, onClose, carName, price, city, 
  onOpenEMI, onOpenOffers, onOpenBooking // ✅ Destructure new props
}) => {
  const [isOptionalSelected, setIsOptionalSelected] = useState(true);

  if (!isOpen) return null;

  const extractPrice = (priceStr: string) => {
    const matches = priceStr.match(/(\d+\.?\d*)/); 
    return matches ? parseFloat(matches[0]) : 0;
  };

  const basePriceLakh = extractPrice(price); 
  const exShowroom = basePriceLakh * 100000; 
  const rtoCharges = Math.round(exShowroom * 0.10); 
  const insuranceCharges = Math.round(exShowroom * 0.04); 
  const otherCharges = 2500; 
  const optionalCharges = Math.round(exShowroom * 0.015); 
  const totalOnRoad = exShowroom + rtoCharges + insuranceCharges + otherCharges + (isOptionalSelected ? optionalCharges : 0);

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
        
        {/* Header */}
        <div className="p-6 pb-2">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{carName} price</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><FaTimes size={24} /></button>
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-1"><span>{city}</span></div>
        </div>

        {/* Breakdown Table */}
        <div className="px-6 py-2 space-y-4">
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Ex-Showroom Price</span><span className="font-medium text-gray-900">{formatCurrency(exShowroom)}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">RTO</span><span className="font-medium text-gray-900">{formatCurrency(rtoCharges)}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600 flex items-center gap-1">Insurance <FaInfoCircle className="text-gray-300"/></span><span className="font-medium text-gray-900">{formatCurrency(insuranceCharges)}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600 flex items-center gap-1">Others <FaInfoCircle className="text-gray-300"/></span><span className="font-medium text-gray-900">{formatCurrency(otherCharges)}</span></div>
            
            <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={isOptionalSelected} onChange={() => setIsOptionalSelected(!isOptionalSelected)} className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-gray-300" />
                    <span className="text-gray-600 flex items-center gap-1">Optional <FaInfoCircle className="text-gray-300"/></span>
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

        {/* Footer Actions */}
        <div className="p-4 mt-4 flex gap-3 border-t border-gray-100">
            {/* ✅ CONNECTED BUTTONS */}
            <button 
                onClick={() => { onClose(); onOpenOffers(); }} // Close this, Open Offers
                className="flex-1 py-3 border border-blue-600 text-blue-600 font-bold rounded hover:bg-blue-50 transition-colors text-sm uppercase"
            >
                Get Current Offers
            </button>
            
            <button 
                onClick={() => { onClose(); onOpenBooking(); }} // Close this, Open Booking
                className="flex-1 py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 shadow-md transition-colors text-sm uppercase"
            >
                Book Your Test Drive Now
            </button>
        </div>

      </div>
    </div>
  );
};

export default OnRoadPriceModal;