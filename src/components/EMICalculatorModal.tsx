'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalculator, FaCalendarAlt, FaPercentage, FaMoneyBillWave } from 'react-icons/fa';

interface EMICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
  city: string;
}

const EMICalculatorModal: React.FC<EMICalculatorModalProps> = ({ isOpen, onClose, price, city }) => {
  
  // ✅ FIXED PARSING LOGIC
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const matches = priceStr.match(/(\d+\.?\d*)/); 
    if (!matches) return 0;
    const value = parseFloat(matches[0]);
    
    if (priceStr.toLowerCase().includes("cr") || priceStr.toLowerCase().includes("crore")) {
        return value * 10000000; // 1 Crore
    }
    return value * 100000; // 1 Lakh
  };

  const exShowroom = parsePrice(price);
  const estimatedOnRoad = Math.round(exShowroom * 1.15); 

  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(5);

  useEffect(() => {
    if (isOpen) {
      // Default Down Payment 20%
      setDownPayment(Math.round(estimatedOnRoad * 0.20));
    }
  }, [isOpen, estimatedOnRoad]);

  if (!isOpen) return null;

  const loanAmount = estimatedOnRoad - downPayment;
  const monthlyRate = interestRate / 1200;
  const tenureMonths = tenure * 12;
  
  // EMI Formula
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-gray-900 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg"><FaCalculator className="text-white" /></div>
                <div><h2 className="text-lg font-bold">EMI Calculator</h2><p className="text-xs text-gray-400">Plan your finance for {city}</p></div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><FaTimes size={22} /></button>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div><p className="text-xs text-gray-500 uppercase font-bold">Estimated On-Road</p><p className="text-lg font-bold text-gray-900">{formatCurrency(estimatedOnRoad)}</p></div>
                <div className="text-right"><p className="text-xs text-gray-500 uppercase font-bold">Loan Amount</p><p className="text-lg font-bold text-blue-700">{formatCurrency(loanAmount)}</p></div>
            </div>

            {/* Tenure */}
            <div className="mb-8">
                <div className="flex justify-between mb-3"><label className="flex items-center gap-2 text-gray-700 font-semibold text-sm"><FaCalendarAlt className="text-orange-500"/> Loan Tenure (Years)</label><span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded text-sm">{tenure} Years</span></div>
                <input type="range" min="1" max="7" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"/>
                <div className="flex justify-between text-xs text-gray-400 mt-2"><span>1 Yr</span><span>2 Yr</span><span>3 Yr</span><span>4 Yr</span><span>5 Yr</span><span>6 Yr</span><span>7 Yr</span></div>
            </div>

            {/* Down Payment Slider */}
            <div className="mb-8">
                <div className="flex justify-between mb-3">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm"><FaMoneyBillWave className="text-green-500"/> Down Payment</label>
                    <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">{Math.round((downPayment / estimatedOnRoad) * 100)}%</span>
                </div>
                {/* Logic: Min 0, Max 80% of price */}
                <input 
                    type="range" 
                    min={0} 
                    max={Math.round(estimatedOnRoad * 0.8)} 
                    step={10000} 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between mt-2"><span className="text-xs text-gray-500">{formatCurrency(0)}</span><span className="text-sm font-bold text-gray-800 border border-gray-200 px-3 py-1 rounded-md">{formatCurrency(downPayment)}</span></div>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
                <div className="flex justify-between mb-2"><label className="flex items-center gap-2 text-gray-700 font-semibold text-sm"><FaPercentage className="text-blue-500"/> Interest Rate (% P.A.)</label></div>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700"/>
            </div>
        </div>

        <div className="bg-gray-50 p-5 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4"><span className="text-gray-600 font-medium">Your Monthly EMI</span><span className="text-3xl font-extrabold text-gray-900">{formatCurrency(emi)}</span></div>
            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase tracking-wide">Apply for Loan</button>
        </div>

      </div>
    </div>
  );
};

export default EMICalculatorModal;