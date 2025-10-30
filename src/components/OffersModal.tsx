// src/components/OffersModal.tsx
'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
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
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]">
          <FaTimes size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Offers for {car.name}</h2>

        {offers.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {offers.map((offer, index) => (
              <li key={index} className="text-base">{offer}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No current offers available for this car.</p>
        )}

         <button onClick={onClose} className="mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">
            Close
          </button>
      </div>
    </div>
  );
};

export default OffersModal;