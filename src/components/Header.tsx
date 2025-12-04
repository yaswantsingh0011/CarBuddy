'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCar, FaRegUser, FaChevronDown, FaBars, FaTimes, FaSearch, FaRegHeart, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa'; 
import AuthModal from './AuthModal';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useLocation } from '@/context/LocationContext'; 

// Data Imports
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';
import { newCarsData } from '@/data/newCarsData';
import { usedCarsData } from '@/data/usedCarsData';

const popularCities = ["New Delhi", "Gurgaon", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"];

const Header: React.FC = () => {
  const router = useRouter();
  
  // Context & States
  const { city, setCity } = useLocation(); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [session, setSession] = useState<Session | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Search States
  const [query, setQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  // Search Logic (Local Filtering for Suggestions)
  useEffect(() => {
    let sourceData: any[] = [];
    if (searchCategory === "All") {
        sourceData = [...electricCars, ...mostSearchedCars, ...newCarsData, ...newLaunchCars, ...usedCarsData];
    } else if (searchCategory === "New") {
        sourceData = [...newCarsData, ...newLaunchCars, ...electricCars]; 
    } else if (searchCategory === "Used") {
        sourceData = [...usedCarsData]; 
    }

    if (query.length > 1) {
      const results = sourceData.filter((car) => car.name.toLowerCase().includes(query.toLowerCase()));
      // Remove duplicates
      const uniqueResults = Array.from(new Set(results.map(a => a.name))).map(name => results.find(a => a.name === name));
      setFilteredCars(uniqueResults.slice(0, 5)); // Show top 5
      setShowSuggestions(true);
    } else {
      setFilteredCars([]);
      setShowSuggestions(false);
    }
  }, [query, searchCategory]);

  // ✅ NEW: Handle Enter Key or "View All" click
  const handleSearchSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
        setShowSuggestions(false);
        setIsMobileMenuOpen(false);
        // Redirect to Global Search Page
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectCar = (car: any) => {
    const slug = car.slug || car.name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
    setShowSuggestions(false);
    setQuery("");
    setIsMobileMenuOpen(false); 
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setIsLocationModalOpen(false);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          
          <div className="flex justify-between items-center h-16 md:h-20 gap-2 md:gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <FaCar className="text-2xl md:text-4xl text-blue-600" />
              <div className="leading-tight">
                <span className="text-xl md:text-2xl font-bold text-blue-600 block">CarBuddy</span>
                <span className="hidden lg:block text-[10px] text-gray-500 uppercase tracking-wider font-medium">Your Travel Companion</span>
              </div>
            </Link>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-8 font-bold text-gray-700 text-sm uppercase tracking-wide h-full">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">Blogs</Link>
            </nav>

            {/* --- DESKTOP SEARCH BAR --- */}
            <div className="hidden md:block flex-1 max-w-xs xl:max-w-sm relative" ref={searchRef}>
                <div className="flex items-center w-full h-10 rounded-full border border-gray-300 bg-gray-50 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all relative">
                    {/* Category Selector */}
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
                    
                    {/* Input Field with Form for Enter Key Support */}
                    <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center px-3 h-full">
                        <button type="submit" className="outline-none">
                             <FaSearch className="text-gray-400 mr-2 text-sm hover:text-blue-600 cursor-pointer" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Search cars..." 
                            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 h-full"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => query.length > 1 && setShowSuggestions(true)}
                        />
                    </form>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && query.length > 1 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                        {filteredCars.length > 0 ? (
                            <>
                                {filteredCars.map((car, index) => (
                                    <div key={index} onClick={() => handleSelectCar(car)} className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50">
                                        <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                                            <Image src={car.images?.[0] || car.image || "/cars/placeholder.jpg"} alt={car.name} fill className="object-cover" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{car.name}</p>
                                    </div>
                                ))}
                                {/* ✅ ADDED: Link to Global Search Page */}
                                <div 
                                    onClick={(e) => handleSearchSubmit(e)}
                                    className="px-4 py-3 bg-gray-50 text-blue-600 text-sm font-bold text-center cursor-pointer hover:bg-blue-100 transition-colors"
                                >
                                    View all results for "{query}"
                                </div>
                            </>
                        ) : (
                            // ✅ No direct match? Show search button
                            <div 
                                onClick={(e) => handleSearchSubmit(e)}
                                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
                            >
                                <p className="text-sm font-semibold text-gray-600">No suggestions found.</p>
                                <p className="text-xs text-blue-600 mt-1 font-bold">Search globally for "{query}" &rarr;</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Location Selector (Desktop) */}
            <div 
                className="hidden xl:flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors border-l border-gray-200 pl-4 h-10"
                onClick={() => setIsLocationModalOpen(true)}
            >
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="text-sm font-bold text-gray-700">{city}</span>
                <FaChevronDown className="text-gray-400 text-xs mt-1" />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4 md:space-x-6 text-sm font-medium text-gray-600 flex-shrink-0">
                <Link href="/shortlisted" className="flex items-center text-gray-700 hover:text-red-500 transition-colors" title="Shortlisted Vehicles">
                    <FaRegHeart className="text-xl md:text-xl" />
                </Link>

                {session ? (
                    <Link href="/profile" className="hidden md:flex items-center hover:text-blue-600 gap-2 transition-colors">
                        <FaRegUser className="text-lg"/> 
                        <span className="max-w-[100px] truncate">Hello {session.user.user_metadata.full_name?.split(' ')[0] || 'User'}</span>
                    </Link>
                ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 font-bold">
                        Login
                    </button>
                )}

                <button className="lg:hidden text-gray-700 p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
          </div>

          {/* ✅ MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 space-y-4 animate-fadeIn">
                
                {/* 1. Mobile Search */}
                <div className="px-2 relative">
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full px-4 py-2.5">
                        <button type="submit"><FaSearch className="text-gray-400 mr-2" /></button>
                        <input 
                            type="text" 
                            placeholder="Search cars..." 
                            className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>

                    {/* Mobile Suggestions */}
                    {query.length > 1 && (
                        <div className="absolute top-full left-2 right-2 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                            {filteredCars.length > 0 ? (
                                <>
                                    {filteredCars.map((car, index) => (
                                        <div key={index} onClick={() => handleSelectCar(car)} className="px-4 py-3 border-b border-gray-50 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded relative overflow-hidden flex-shrink-0">
                                                <Image src={car.images?.[0] || car.image || "/cars/placeholder.jpg"} alt={car.name} fill className="object-cover" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{car.name}</span>
                                        </div>
                                    ))}
                                    <div 
                                        onClick={(e) => handleSearchSubmit(e)}
                                        className="px-4 py-3 bg-gray-50 text-blue-600 text-sm font-bold text-center"
                                    >
                                        View all results
                                    </div>
                                </>
                            ) : (
                                <div onClick={(e) => handleSearchSubmit(e)} className="p-3 text-center text-sm text-gray-500 cursor-pointer">
                                    Search for "{query}"
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* 2. Mobile Location */}
                <div className="bg-blue-50 rounded-lg flex items-center px-3 py-3 mx-2 text-blue-700 font-semibold cursor-pointer" onClick={() => {setIsMobileMenuOpen(false); setIsLocationModalOpen(true);}}>
                     <FaMapMarkerAlt className="mr-2" /> {city} (Change City)
                </div>

                {/* 3. Links */}
                <Link href="/" className="block font-medium text-gray-800 px-4 py-2 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/news" className="block font-medium text-gray-800 px-4 py-2 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>News & Reviews</Link>
                <Link href="/blog" className="block font-medium text-gray-800 px-4 py-2 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
                
                {/* 4. Mobile Profile */}
                <div className="border-t border-gray-100 mt-2 pt-2">
                    {session ? (
                        <>
                            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-blue-600 font-bold hover:bg-blue-50">
                                <FaRegUser /> My Profile
                            </Link>
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 text-left">
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="px-2">
                            <button onClick={() => {setIsAuthModalOpen(true); setIsMobileMenuOpen(false);}} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-md">
                                Login / Register
                            </button>
                        </div>
                    )}
                </div>

            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Select City</h3>
                    <button onClick={() => setIsLocationModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">Popular Cities</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {popularCities.map((c) => (
                            <button 
                                key={c}
                                onClick={() => handleCitySelect(c)}
                                className={`text-sm py-2 px-3 rounded-lg border transition-all ${
                                    city === c 
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Header;