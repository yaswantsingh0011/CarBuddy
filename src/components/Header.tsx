// src/components/Header.tsx

import React from 'react';
import TopBar from './TopBar';
import { FaCar } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <TopBar />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo, Name & Tagline Section */}
          <a href="/" className="flex items-center"> {/* पूरे हिस्से को एक लिंक बनाया */}
            
            {/* 1. Logo Icon */}
            <FaCar className="text-4xl mr-3 text-red-500" /> {/* आइकॉन और टेक्स्ट के बीच थोड़ी ज़्यादा जगह */}
            
            {/* 2. Name and Tagline Group */}
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-blue-700">CarBuddy</span>
              <p className="text-gray-800 text-sm italic">Aapke safar ka saathi...</p> {/* टैगलाइन और डार्क की */}
            </div>

          </a>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-bold text-base tracking-wide">NEW CARS</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-bold text-base tracking-wide">USED CARS</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-bold text-base tracking-wide">NEWS & REVIEWS</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-bold text-base tracking-wide">VIDEOS</a>
          </nav>

          {/* Placeholder */}
          <div className="flex items-center space-x-4">
            <div className="w-48 h-8 bg-gray-200 rounded-md"></div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;