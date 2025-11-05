// src/components/FeaturesModal.tsx
"use client";

import React, { useState } from 'react';
import { UsedCar } from '@/types/index';
import { X } from 'lucide-react'; // Close icon ke liye

// Props jaisa aapke page mein use ho raha hai
interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: UsedCar | null; 
}

// Tabs define karein
type Tab = 'specs' | 'top' | 'standout';

export const FeaturesModal: React.FC<FeaturesModalProps> = ({ isOpen, onClose, car }) => {
  const [activeTab, setActiveTab] = useState<Tab>('specs');

  // Agar modal band hai ya car data nahi hai toh kuch render na karein
  if (!isOpen || !car) return null;

  // Tabs ki list
  const tabs: { id: Tab; label: string }[] = [
    { id: 'specs', label: 'Key Specifications' },
    { id: 'top', label: 'Top Features' },
    { id: 'standout', label: 'Stand Out Features' },
  ];

  // Tab button styling
  const getTabClasses = (tabId: Tab) => 
    `px-4 py-2 font-semibold text-sm transition-colors border-b-2 ${
      activeTab === tabId
        ? 'border-red-500 text-red-600'
        : 'border-transparent text-gray-600 hover:text-gray-900'
    }`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        
        {/* Title and Close Button */}
        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {car.name} Specs & Features
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-[73px] bg-white border-b flex px-5 z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={getTabClasses(tab.id)}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Content will be conditionally rendered here */}
          
          {activeTab === 'specs' && (
            <div className="py-4">
              {/* Key Specifications (Engine, Power, etc.) Yahan Aayenge */}
              <h3 className="text-lg font-semibold mb-4">Key Specifications Placeholder</h3>
            </div>
          )}

          {activeTab === 'top' && (
            <div className="py-4">
              {/* Top Features (Cruise Control, AC Vents) Yahan Aayenge */}
              <h3 className="text-lg font-semibold mb-4">Top Features Placeholder</h3>
            </div>
          )}
          
          {activeTab === 'standout' && (
            <div className="py-4">
              {/* Stand Out Features (Image Cards) Yahan Aayenge */}
              <h3 className="text-lg font-semibold mb-4">Stand Out Features Placeholder</h3>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FeaturesModal;