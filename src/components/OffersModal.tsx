// src/components/OffersModal.tsx
'use client';

import React from 'react';
import { FaTimes, FaTag, FaCalendarAlt, FaCheckCircle, FaStar } from 'react-icons/fa'; 
import { Car } from '@/data/cars';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

const OffersModal: React.FC<OffersModalProps> = ({ isOpen, onClose, car }) => {
  if (!isOpen || !car) return null;

  const offers = car.offers || [];

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4" onClick={onClose}>
      {/* Modal Panel */}
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]">
          <FaTimes size={20} />
        </button>
        
        {/* Title (Using Tag Icon for better look) */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
            <FaTag className="text-red-600 mr-3" />
            Current Offers for {car.name}
        </h2>

        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer, index) => (
              
              // --- Offer Card/Box (Matching new image style - Blue box with checkmark) ---
              <div 
                key={index} 
                // Light blue background, rounded, slightly shadowed
                className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm flex items-start cursor-pointer transition-all hover:bg-blue-100"
              >
                {/* Custom Checkmark (Matching the style of the image) */}
                <div className="flex-shrink-0 pt-1">
                    <FaCheckCircle className="text-blue-600 h-6 w-6" />
                </div>
                
                <div className="ml-4">
                    {/* Offer Title (Bold and clear) */}
                    <p className="text-lg font-semibold text-gray-800 leading-snug">{offer}</p>
                    
                    {/* Offer details / Validity */}
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                        <FaCalendarAlt className="mr-1 h-3 w-3" />
                        <span>Valid till month-end only</span>
                    </div>
                </div>
              </div>
              // --- End Offer Card ---

            ))}
            
            {/* Disclaimer */}
            <p className="text-xs text-gray-500 pt-2 px-1">
                *Offers are subject to change and may vary based on variant and location. Contact dealer for final details.
            </p>
          </div>
        ) : (
          <div className="p-4 text-center bg-gray-100 rounded-lg">
            <p className="text-gray-600 font-medium">No special offers available at this moment.</p>
            <p className="text-sm text-gray-500 mt-1">Please check back later or book a test drive.</p>
          </div>
        )}

         {/* Close button at bottom (Large Blue Button) */}
         <button onClick={onClose} className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
            Close
          </button>
      </div>
    </div>
  );
};

export default OffersModal;