// src/components/TopBar.tsx

import React from 'react';
import { FaRegHeart, FaRegUser, FaChevronDown } from 'react-icons/fa';

const TopBar: React.FC = () => {
  return (
    <div className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 flex justify-end items-center h-10">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <a href="#" className="flex items-center hover:text-blue-600">
            <span>English</span>
            <FaChevronDown className="ml-1 h-3 w-3" />
          </a>
          <a href="#" className="flex items-center hover:text-blue-600">
            <FaRegHeart className="mr-1 h-4 w-4" />
            <span>Wishlist</span>
          </a>
          <a href="#" className="flex items-center hover:text-blue-600">
            <FaRegUser className="mr-1 h-4 w-4" />
            <span>Login / Register</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;