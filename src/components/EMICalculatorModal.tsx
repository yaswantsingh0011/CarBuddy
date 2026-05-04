"use client";

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface EMICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string | number;
  city?: string;
  carName?: string;
}

const EMICalculatorModal: React.FC<EMICalculatorModalProps> = ({ isOpen, onClose, price, carName }) => {
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(9.5); // Default interest rate
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  if (!isOpen) return null;

  const parsePrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const matches = priceStr.toString().match(/(\d+\.?\d*)/);
    if (!matches) return 0;
    const value = parseFloat(matches[0]);
    const lowerPrice = priceStr.toString().toLowerCase();
    if (lowerPrice.includes("cr") || lowerPrice.includes("crore")) return value * 10000000;
    return value * 100000;
  };

  const exShowroom = parsePrice(price);
  const onRoadEst = Math.round(exShowroom * 1.15); 
  const downPaymentAmount = Math.round(onRoadEst * (downPaymentPercent / 100));
  const loanAmount = onRoadEst - downPaymentAmount;

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = (interestRate / 100) / 12;
    const months = tenure * 12;
    if (principal <= 0 || ratePerMonth === 0) return 0;
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-[3rem] rounded-t-[3rem] overflow-hidden shadow-2xl relative h-[95vh] sm:h-auto flex flex-col text-gray-900 border border-gray-100">
        
        {/* Header */}
        <div className="bg-[#121a2a] text-white p-8 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black tracking-tight">EMI Calculator</h2>
            {carName && <p className="text-blue-400 text-[10px] font-black uppercase mt-1 tracking-widest">{carName}</p>}
          </div>
          <button onClick={onClose} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all">
            <FaTimes />
          </button>
        </div>
        
        <div className="p-8 space-y-8 overflow-y-auto flex-1 scrollbar-hide">
          {/* On-Road Price Display */}
          <div className="bg-gray-50 p-6 rounded-3xl flex justify-between items-center border border-gray-100 shadow-inner">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Est. On-Road Price</span>
            <span className="text-xl font-black text-gray-900">{fmt(onRoadEst)}</span>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between mb-2 items-end">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Loan Tenure</label>
              <span className="text-blue-600 font-black text-xl">{tenure} <span className="text-xs opacity-50">Years</span></span>
            </div>
            <input type="range" min="1" max="7" step="1" value={tenure} onChange={(e)=>setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
          </div>

          {/* Interest Rate Slider (New) */}
          <div>
            <div className="flex justify-between mb-2 items-end">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Interest Rate (p.a)</label>
              <span className="text-purple-600 font-black text-xl">{interestRate}%</span>
            </div>
            <input type="range" min="5" max="20" step="0.1" value={interestRate} onChange={(e)=>setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"/>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between mb-2 items-end">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Down Payment ({downPaymentPercent}%)</label>
              <span className="text-green-600 font-black text-xl">{fmt(downPaymentAmount)}</span>
            </div>
            <input type="range" min="10" max="80" step="5" value={downPaymentPercent} onChange={(e)=>setDownPaymentPercent(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600"/>
          </div>

          {/* EMI Result */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 flex flex-col items-center gap-1 shadow-sm">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">Estimated Monthly EMI</p>
            <p className="text-5xl font-black text-gray-900 tracking-tighter">{fmt(monthlyEMI)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculatorModal;