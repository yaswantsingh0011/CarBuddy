// src/components/FeaturesModal.tsx
'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Car } from '@/data/cars'; // Import the Car interface

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null; // Pass the whole car object
}

const FeaturesModal: React.FC<FeaturesModalProps> = ({ isOpen, onClose, car }) => {
  if (!isOpen || !car) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4">
      {/* Modal Panel */}
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg relative max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]">
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{car.name} - Key Features</h2>

        {/* Features List */}
        {car.features && car.features.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No features listed for this car.</p>
        )}

        {/* Close button at bottom */}
         <button onClick={onClose} className="mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">
            Close
          </button>
      </div>
    </div>
  );
};

export default FeaturesModal;