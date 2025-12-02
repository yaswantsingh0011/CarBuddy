'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCar, FaRegUser, FaChevronDown, FaBars, FaTimes, FaSearch, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa'; 
import AuthModal from './AuthModal';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

// --- Data Imports ---
import { mostSearchedCars } from '@/data/mostSearchedCars';
import { electricCars } from '@/data/electricCars';
import { newLaunchCars } from '@/data/newlaunchcars';
import { newCarsData } from '@/data/newCarsData';
import { usedCarsData } from '@/data/usedCarsData';

const popularCities = ["New Delhi", "Gurgaon", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"];

const Header: React.FC = () => {
  const router = useRouter();
  
  // --- States ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [session, setSession] = useState<Session | null>(null);

  // Location States (Default: Jaipur)
  const [location, setLocation] = useState("Jaipur"); 
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // --- Search States ---
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

  // --- SEARCH LOGIC ---
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
      const uniqueResults = Array.from(new Set(results.map(a => a.name))).map(name => results.find(a => a.name === name));
      setFilteredCars(uniqueResults.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setFilteredCars([]);
      setShowSuggestions(false);
    }
  }, [query, searchCategory]);

  const handleSelectCar = (car: any) => {
    const slug = car.slug || car.name.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setIsLocationModalOpen(false);
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

            {/* ✅ NAVIGATION LINKS (Cleaned - Removed New/Used Cars) */}
            <nav className="hidden lg:flex items-center space-x-8 font-bold text-gray-700 text-sm uppercase tracking-wide h-full">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">Blogs</Link>
            </nav>

            {/* --- SEARCH BAR --- */}
            <div className="hidden md:block flex-1 max-w-xs xl:max-w-sm relative" ref={searchRef}>
                <div className="flex items-center w-full h-10 rounded-full border border-gray-300 bg-gray-50 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all relative">
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
                                <p className="text-sm font-semibold text-gray-600">No results found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Location Selector */}
            <div 
                className="hidden xl:flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors border-l border-gray-200 pl-4 h-10"
                onClick={() => setIsLocationModalOpen(true)}
            >
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="text-sm font-bold text-gray-700">{location}</span>
                <FaChevronDown className="text-gray-400 text-xs mt-1" />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-600 flex-shrink-0">
                <Link href="/shortlisted" className="hidden md:flex items-center text-gray-700 hover:text-red-500 transition-colors" title="Shortlisted Vehicles">
                    <FaRegHeart className="text-xl" />
                </Link>

                {session ? (
                    <Link href="/profile" className="hidden md:flex items-center hover:text-blue-600 gap-2 transition-colors">
                        <FaRegUser className="text-lg"/> 
                        <span className="max-w-[100px] truncate">Hello {session.user.user_metadata.full_name?.split(' ')[0] || 'User'}</span>
                    </Link>
                ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-100 font-bold">
                        Login
                    </button>
                )}

                <button className="lg:hidden text-gray-700 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
          </div>

          {/* Mobile Menu (Updated) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 space-y-4">
                <div className="bg-blue-50 rounded-lg flex items-center px-3 py-2 mx-2 text-blue-700 font-semibold" onClick={() => {setIsMobileMenuOpen(false); setIsLocationModalOpen(true);}}>
                     <FaMapMarkerAlt className="mr-2" /> {location} (Change)
                </div>

                <Link href="/" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/news" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>News & Reviews</Link>
                <Link href="/blog" className="block font-medium text-gray-800 px-2" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
                
                {/* Mobile Login Button if not logged in */}
                {!session && (
                    <button onClick={() => {setIsAuthModalOpen(true); setIsMobileMenuOpen(false);}} className="w-full text-left font-bold text-blue-600 px-2 mt-4">
                        Login / Register
                    </button>
                )}
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
                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg mb-4">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input type="text" placeholder="Type your city" className="bg-transparent w-full outline-none text-sm" />
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">Popular Cities</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {popularCities.map((city) => (
                            <button 
                                key={city}
                                onClick={() => handleCitySelect(city)}
                                className={`text-sm py-2 px-3 rounded-lg border transition-all ${
                                    location === city 
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                                }`}
                            >
                                {city}
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