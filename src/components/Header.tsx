// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCar, FaRegHeart, FaHeart, FaRegUser, FaChevronDown } from 'react-icons/fa';
import AuthModal from './AuthModal';
// import AccountModal from './AccountModal'; // Is file ko bhi check karein
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext'; // <-- Sahi Casing

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { user, wishlist } = useAuth(); // AuthContext se data liya

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // setIsAccountModalOpen(false);
  };

  return (
    <>
      <header className="shadow-md bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            
            {/* 1. Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <FaCar className="text-3xl text-red-500" />
              <div>
                <span className="text-2xl font-bold text-blue-700">CarBuddy</span>
                <p className="text-sm font-normal text-gray-600 -mt-1">
                  Your Travel Companion
                </p>
              </div>
            </Link>

            {/* 2. Navigation Links */}
            <nav className="hidden md:flex space-x-8"> 
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/new-cars" className="text-gray-700 hover:text-blue-600 font-medium">New Cars</Link>
              <Link href="/used-cars" className="text-gray-700 hover:text-blue-600 font-medium">Used Cars</Link>
              <Link href="/compare" className="text-gray-700 hover:text-blue-600 font-medium">Compare</Link>
            </nav>

            {/* 3. User Links (TopBar Logic) */}
            <div className="flex items-center space-x-5 text-sm text-gray-600">
              <a href="#" className="flex items-center hover:text-blue-600">
                <span>English</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </a>
              <a href="#" className="flex items-center hover:text-blue-600 relative">
                {wishlist.length > 0 ? <FaHeart className="mr-1 h-4 w-4 text-red-500"/> : <FaRegHeart className="mr-1 h-4 w-4" />}
                <span>Wishlist</span>
                {wishlist.length > 0 && (
                 <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                   {wishlist.length}
                 </span>
               )}
              </a>
              {user ? (
                <>
                  <button
                    // onClick={() => setIsAccountModalOpen(true)}
                    className="flex items-center hover:text-blue-600"
                  >
                    <FaRegUser className="mr-1 h-4 w-4" />
                    <span>{user.email?.split('@')[0]}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center hover:text-blue-600"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center hover:text-blue-600"
                >
                  <FaRegUser className="mr-1 h-4 w-4" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      {/* <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      /> */}
    </>
  );
};

export default Header;