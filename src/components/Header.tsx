// src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCar, FaRegUser, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'; 
import AuthModal from './AuthModal';
import AccountModal from './AccountModal';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  // --- States ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  // --- Logic to check user session ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- Logout Function ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAccountModalOpen(false);
    setIsMobileMenuOpen(false); 
    router.push('/');
  };

  return (
    <>
      <header className="shadow-md bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          
          {/* Main Header Row */}
          <div className="flex justify-between items-center py-4">

            {/* 1. Logo (Left) */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <FaCar className="text-4xl md:text-5xl text-blue-600" />
              <div>
                <span className="text-2xl md:text-4xl font-bold text-blue-600">CarBuddy</span>
                <p className="hidden md:block text-sm font-normal text-gray-600 -mt-1">
                  Your Travel Companion
                </p>
              </div>
            </Link>

            {/* 2. Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 lg:space-x-12"> 
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              
              {/* ❌ Removed 'All Cars' from here */}
              
              <Link href="/new-cars" className="text-gray-700 hover:text-blue-600 font-medium">New Cars</Link>
              <Link href="/used-cars" className="text-gray-700 hover:text-blue-600 font-medium">Used Cars</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
            </nav>

            {/* 3. Desktop User Links */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="flex items-center hover:text-blue-600">
                <span>English</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </a>

              {session ? (
                <>
                  <button onClick={() => setIsAccountModalOpen(true)} className="flex items-center hover:text-blue-600">
                    <FaRegUser className="mr-1 h-4 w-4" />
                    <span>My Account</span>
                  </button>
                  <button onClick={handleLogout} className="flex items-center hover:text-blue-600">
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center hover:text-blue-600">
                  <FaRegUser className="mr-1 h-4 w-4" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>

            {/* 4. Mobile Hamburger Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>

          </div>

          {/* 5. Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              
              {/* ❌ Removed 'All Cars' from here too */}
              
              <Link href="/new-cars" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>New Cars</Link>
              <Link href="/used-cars" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Used Cars</Link>
              <Link href="/blog" className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              
              <div className="border-t border-gray-100 pt-4">
                 {session ? (
                    <div className="space-y-3">
                      <button onClick={() => { setIsAccountModalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center text-gray-700 hover:text-blue-600 w-full">
                        <FaRegUser className="mr-2 h-4 w-4" /> My Account
                      </button>
                      <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 w-full">
                        Logout
                      </button>
                    </div>
                 ) : (
                    <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center text-blue-600 font-bold w-full">
                      <FaRegUser className="mr-2 h-4 w-4" /> Login / Register
                    </button>
                 )}
              </div>
            </div>
          )}

        </div>
      </header>

      {/* --- Modals --- */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <AccountModal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} />
    </>
  );
};

export default Header;