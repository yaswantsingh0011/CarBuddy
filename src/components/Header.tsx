// src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCar, FaRegUser, FaChevronDown } from 'react-icons/fa';
import AuthModal from './AuthModal';
import AccountModal from './AccountModal';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  // --- States for Modals and Session ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
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
    router.push('/');
  };

  return (
    <>
      <header className="shadow-md bg-white">
        <div className="container mx-auto px-4">
          
          {/* Main container: Logo (Left), Nav (Center), User (Right) */}
          <div className="flex justify-between items-center py-4">

            {/* 1. Logo (Left) */}
            <Link href="/" className="flex items-center space-x-3">
              <FaCar className="text-5xl text-blue-600" />
              <div>
                <span className="text-4xl font-bold text-blue-600">CarBuddy</span>
                <p className="text-sm font-normal text-gray-600 -mt-1">
                  Your Travel Companion
                </p>
              </div>
            </Link>

            {/* 2. Navigation Links (Center) */}
            <nav className="hidden md:flex space-x-12"> 
              {/* --- Home Link is Primary Link (Restored) --- */}
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              
              <Link href="/new-cars" className="text-gray-700 hover:text-blue-600 font-medium">New Cars</Link>
              <Link href="/used-cars" className="text-gray-700 hover:text-blue-600 font-medium">Used Cars</Link>
              
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
            </nav>

            {/* 3. User Links (Right) */}
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <a href="#" className="flex items-center hover:text-blue-600">
                <span>English</span>
                <FaChevronDown className="ml-1 h-3 w-3" />
              </a>

              {/* Login/Logout Logic */}
              {session ? (
                <>
                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="flex items-center hover:text-blue-600"
                  >
                    <FaRegUser className="mr-1 h-4 w-4" />
                    <span>My Account</span>
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

      {/* --- Modals (Rendered outside the header) --- */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </>
  );
};

export default Header;