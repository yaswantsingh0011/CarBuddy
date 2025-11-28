'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// ✅ Import FaRegHeart (Empty Heart)
import { FaCar, FaRegUser, FaChevronDown, FaBars, FaTimes, FaSearch, FaRegHeart } from 'react-icons/fa'; 
import AuthModal from './AuthModal';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

// --- Data Imports ---
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';
import { newCarsData } from '@/data/newCarsData';
import { usedCarsData } from '@/data/usedCarsData';

const Header: React.FC = () => {
  const router = useRouter();
  
  // --- States ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [session, setSession] = useState<Session | null>(null);

  // --- Search States ---
  const [query, setQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Category State
  const [searchCategory, setSearchCategory] = useState("All"); 
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Auth Logic
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false); 
    router.push('/');
    router.refresh(); 
  };

  // --- SEARCH LOGIC ---
  useEffect(() => {
    let sourceData: any[] = [];

    if (searchCategory === "All") {
        sourceData = [
            ...electricCars, 
            ...mostSearchedCars, 
            ...newCarsData, 
            ...newLaunchCars, 
            ...usedCarsData
        ];
    } else if (searchCategory === "New") {
        sourceData = [
            ...newCarsData, 
            ...newLaunchCars, 
            ...electricCars
        ]; 
    } else if (searchCategory === "Used") {
        sourceData = [...usedCarsData]; 
    }

    if (query.length > 1) {
      const results = sourceData.filter((car) => 
        car.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const uniqueResults = Array.from(new Set(results.map(a => a.name)))
        .map(name => results.find(a => a.name === name));
      
      setFilteredCars(uniqueResults.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setFilteredCars([]);
      setShowSuggestions(false);
    }
  }, [query, searchCategory]);

  // Outside Click Handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCar = (car: any) => {
    const slug = car.slug || car.name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          
          <div className="flex justify-between items-center h-20 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <FaCar className="text-3xl md:text-4xl text-blue-600" />
              <div className="leading-tight">
                <span className="text-2xl font-bold text-blue-600 block">CarBuddy</span>
                <span className="hidden lg:block text-[10px] text-gray-500 uppercase tracking-wider font-medium">Your Travel Companion</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-10 font-bold text-gray-700 text-sm uppercase tracking-wide">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/new-cars" className="hover:text-blue-600 transition-colors">New Cars</Link>
                <Link href="/used-cars" className="hover:text-blue-600 transition-colors">Used Cars</Link>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">Blogs</Link>
            </nav>

            {/* --- SEARCH BAR --- */}
            <div className="hidden md:block flex-1 max-w-xs xl:max-w-sm relative" ref={searchRef}>
                <div className="flex items-center w-full h-10 rounded-full border border-gray-300 bg-gray-50 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all relative">
                    
                    {/* CATEGORY DROPDOWN */}
                    <div 
                        className="flex items-center px-3 border-r border-gray-300 h-full cursor-pointer hover:bg-gray-100 rounded-l-full transition-colors relative"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        ref={categoryRef}
                    >
                        <span className="text-xs font-bold text-gray-700 mr-1 w-8 text-center">{searchCategory}</span>
                        <FaChevronDown className="text-gray-500 text-[10px]" />

                        {showCategoryDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                                {["All", "New", "Used"].map((cat) => (
                                    <div 
                                        key={cat}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSearchCategory(cat);
                                            setShowCategoryDropdown(false);
                                        }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex-grow flex items-center px-3">
                        <FaSearch className="text-gray-400 mr-2 text-sm" />
                        <input 
                            type="text" 
                            placeholder={`Search ${searchCategory === 'All' ? 'cars' : searchCategory + ' cars'}...`} 
                            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => query.length > 1 && setShowSuggestions(true)}
                        />
                    </div>
                </div>

                {/* SUGGESTIONS */}
                {showSuggestions && query.length > 1 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleSelectCar(car)}
                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-none"
                                >
                                    <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                                        <Image src={car.images?.[0] || car.image || car.imageUrls?.[0] || "/cars/placeholder.jpg"} alt={car.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{car.name}</p>
                                        <p className="text-[10px] text-gray-500">{car.category || "Car"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center">
                                <div className="text-gray-300 mb-2 flex justify-center">
                                    <FaCar className="text-2xl" />
                                </div>
                                <p className="text-sm font-semibold text-gray-600">No results found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-600 flex-shrink-0">
                
                {/* Language (Hidden on Mobile) */}
                <button className="hidden xl:flex items-center hover:text-blue-600 transition-colors">
                    English <FaChevronDown className="ml-1 text-xs" />
                </button>

                {/* ✅ NEW: WISHLIST ICON */}
                <Link href="/shortlisted" className="hidden md:flex items-center text-gray-700 hover:text-red-500 transition-colors" title="Shortlisted Vehicles">
                    <FaRegHeart className="text-xl" />
                </Link>

                {session ? (
                    // Account Link
                    <Link href="/profile" className="hidden md:flex items-center hover:text-blue-600 gap-2 transition-colors">
                        <FaRegUser className="text-lg"/> 
                        <span className="max-w-[100px] truncate">Hello {session.user.user_metadata.full_name?.split(' ')[0] || 'User'}</span>
                    </Link>
                ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-100 font-bold">
                        Login
                    </button>
                )}

                {/* Mobile Toggle */}
                <button className="lg:hidden text-gray-700 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 space-y-4">
                <div className="bg-gray-100 rounded-lg flex items-center px-3 py-2 mx-1">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Search cars..." 
                        className="bg-transparent w-full outline-none text-sm"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <Link href="/" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/new-cars" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>New Cars</Link>
                <Link href="/used-cars" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>Used Cars</Link>
                <Link href="/blog" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
                {/* Mobile Wishlist Link */}
                <Link href="/shortlisted" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>Shortlisted Vehicles</Link>
                
                <div className="border-t border-gray-100 pt-3 px-2">
                    {session ? (
                        <>
                            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center text-gray-700 w-full mb-3">
                                <FaRegUser className="mr-2" /> My Account
                            </Link>
                            <button onClick={handleLogout} className="text-red-500 font-medium w-full text-left">Logout</button>
                        </>
                    ) : (
                        <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="text-blue-600 font-bold w-full text-left">Login / Register</button>
                    )}
                </div>
            </div>
          )}

        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;