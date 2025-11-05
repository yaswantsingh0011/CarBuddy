// src/components/FeaturesModal.tsx
'use client';

import React from 'react';
import { FaTimes, FaCar, FaShieldAlt, FaTachometerAlt, FaStar, FaLock } from 'react-icons/fa'; 
import { Car } from '@/data/cars'; 

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null; // Pass the whole car object
}

// Function to categorize features (Matching the structured look)
const categorizeFeatures = (features: string[]) => {
  const categorized: { [key: string]: string[] } = {
    'Infotainment & Tech': [],
    'Comfort & Convenience': [],
    'Design & Aesthetics': [],
    'Other Highlights': [],
  };

  features.forEach(feature => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('screen') || lowerFeature.includes('audio') || lowerFeature.includes('bose') || lowerFeature.includes('pivi') || lowerFeature.includes('adas') || lowerFeature.includes('360')) {
      categorized['Infotainment & Tech'].push(feature);
    } else if (lowerFeature.includes('sunroof') || lowerFeature.includes('seat') || lowerFeature.includes('climate') || lowerFeature.includes('ac') || lowerFeature.includes('heated')) {
      categorized['Comfort & Convenience'].push(feature);
    } else if (lowerFeature.includes('design') || lowerFeature.includes('alloy') || lowerFeature.includes('led') || lowerFeature.includes('headlamp') || lowerFeature.includes('removable')) {
      categorized['Design & Aesthetics'].push(feature);
    } else {
      categorized['Other Highlights'].push(feature);
    }
  });

  return categorized;
};

// --- Standard Safety Features (जो हर कार में होने चाहिए) ---
const standardSafetyFeatures = [
    "High Strength Steel Body Structure",
    "Multi-Terrain ABS with EBD",
    "Electronic Stability Control (ESC)",
    "Hill Hold/Descent Control",
    "Multiple Airbags (6+)",
    "Vehicle Security System"
];


const FeaturesModal: React.FC<FeaturesModalProps> = ({ isOpen, onClose, car }) => {
  if (!isOpen || !car) return null;

  const categorizedFeatures = categorizeFeatures(car.features || []);

  // Check if any categorized features are available (excluding the mandatory safety section)
  const hasDynamicFeatures = Object.keys(categorizedFeatures).some(key => categorizedFeatures[key].length > 0);

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4" onClick={onClose}>
      {/* Modal Panel */}
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]">
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
            <FaCar className="text-purple-600 mr-3" />
            Key Features of {car.name}
        </h2>

        <div className="space-y-4">
            
            {/* --- DYNAMIC FEATURES SECTIONS (Infotainment, Comfort, Design) --- */}
            {hasDynamicFeatures ? (
                Object.keys(categorizedFeatures).map((category, catIndex) => {
                    const featuresList = categorizedFeatures[category];
                    if (featuresList.length === 0) return null;
                    
                    let Icon;
                    if (category.includes('Infotainment')) Icon = FaTachometerAlt;
                    else if (category.includes('Comfort')) Icon = FaStar;
                    else if (category.includes('Design')) Icon = FaShieldAlt;
                    else Icon = FaCar;

                    return (
                        <div key={catIndex} className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center border-b pb-2">
                                {Icon && <Icon className="text-purple-600 mr-2 h-4 w-4" />}
                                {category}
                            </h3>
                            {/* Features Grid: 2 columns with dots */}
                            <ul className="list-disc list-inside ml-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-base">
                                {featuresList.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })
            ) : (
                 // Fallback message if car.features is empty
                <div className="p-4 text-center bg-gray-100 rounded-lg">
                    <p className="text-gray-600 font-medium">Primary features will be added soon.</p>
                </div>
            )}
            
            {/* --- MANDATORY SECTION: Safety & Security (ALWAYS DISPLAYED) --- */}
            <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center border-b pb-2">
                    <FaLock className="text-red-600 mr-2 h-4 w-4" />
                    Safety & Security
                </h3>
                <ul className="list-disc list-inside ml-4 text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-base">
                    {/* Display standard safety features */}
                    {standardSafetyFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                    {/* Add one car-specific safety feature if available */}
                    {car.keySpecifications?.find(s => s.label.toLowerCase().includes('airbag')) && (
                        <li className="font-semibold text-gray-800">
                           {car.keySpecifications.find(s => s.label.toLowerCase().includes('airbag'))?.label} ({car.keySpecifications.find(s => s.label.toLowerCase().includes('airbag'))?.value})
                        </li>
                    )}
                </ul>
            </div>
            
        </div> {/* End space-y-4 */}

        {/* Close button at bottom */}
         <button onClick={onClose} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Close
          </button>
      </div>
    </div>
  );
};

export default FeaturesModal;