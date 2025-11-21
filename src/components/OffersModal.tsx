// src/components/OffersModal.tsx
'use client';

import React from 'react';
import { FaTimes, FaTag, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: any; // 'any' rakha hai taaki dynamic 'offers' array accept kar sake
}

const OffersModal: React.FC<OffersModalProps> = ({ isOpen, onClose, car }) => {
  // Agar modal band hai ya car data nahi hai, to kuch mat dikhao
  if (!isOpen || !car) return null;

  // Offers array nikal rahe hain (Parent component se pass kiya hua)
  const offers = car.offers || [];

  // Current Month End Date logic (Design ke liye)
  const today = new Date();
  // const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // Optional: Exact date ke liye
  const monthName = today.toLocaleString('default', { month: 'short' });

  return (
    // --- BACKDROP (Overlay) ---
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose} // Background click par close
    >
      
      {/* --- MODAL BOX --- */}
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()} // Box click par close na ho
      >
        
        {/* Header */}
        <div className="p-6 pb-2 flex justify-between items-start">
          <div>
             <div className="flex items-center gap-2 mb-1">
                <FaTag className="text-red-500 text-lg transform -rotate-90" />
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Limited Time Deal</span>
             </div>
             <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
               Current Offers for <br />
               <span className="text-blue-700">{car.name}</span>
             </h2>
          </div>
          
          {/* Top Close Icon */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <FaTimes size={22} />
          </button>
        </div>

        {/* --- OFFERS LIST --- */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {offers.length > 0 ? (
            offers.map((offer: string, index: number) => (
              <div 
                key={index} 
                className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                {/* Checkmark Icon */}
                <div className="mt-1 bg-blue-600 text-white rounded-full p-1 flex-shrink-0">
                   <FaCheckCircle size={12} />
                </div>
                
                {/* Offer Text */}
                <div className="flex-1">
                   <h3 className="font-bold text-gray-900 text-base">{offer}</h3>
                   <div className="flex items-center gap-1 text-xs text-gray-500 mt-1.5 font-medium">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>Valid till month-end ({monthName}) only</span>
                   </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback agar offers empty hon
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
               <p className="text-gray-500">No specific offers listed right now.</p>
               <p className="text-sm text-gray-400">Please contact dealer directly.</p>
            </div>
          )}
        </div>

        {/* --- FOOTER --- */}
        <div className="p-6 pt-2 bg-white border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center mb-4 leading-relaxed">
                *Offers are subject to change based on variant, color, and location. Terms and conditions apply.
            </p>
            
            {/* Big Close Button */}
            <button 
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default OffersModal;