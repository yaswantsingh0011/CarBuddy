"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCar, FaRegUser, FaChevronDown, FaBars, FaTimes, FaSearch, FaRegHeart, FaMapMarkerAlt, FaSignOutAlt, FaHistory, FaPlusCircle } from 'react-icons/fa';
import AuthModal from './AuthModal';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useLocation } from '@/context/LocationContext';

const popularCities = ["Jaipur","New Delhi", "Gurgaon", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];

const Header: React.FC = () => {
  const router = useRouter();
  const { city, setCity } = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

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

  // Search Logic
  useEffect(() => {
    const searchSupabase = async () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length < 2) {
        setFilteredCars([]);
        setShowSuggestions(false);
        return;
      }

      const searchQuery = `%${trimmedQuery}%`;
      const fetchTable = async (tableName: string) => {
        const { data } = await supabase.from(tableName).select('id, name, slug, images, image_url, image_urls').ilike('name', searchQuery).limit(3);
        return data || [];
      };

      try {
        let results: any[] = [];
        if (searchCategory === "All") {
          const [electric, popular, upcoming, used] = await Promise.all([
            fetchTable('electric_cars'), fetchTable('most_searched_cars'), fetchTable('upcoming_cars'), fetchTable('used_cars')
          ]);
          results = [...electric, ...popular, ...upcoming, ...used];
        } else if (searchCategory === "New") {
          const [popular, upcoming] = await Promise.all([fetchTable('most_searched_cars'), fetchTable('upcoming_cars')]);
          results = [...popular, ...upcoming];
        } else {
          results = await fetchTable('used_cars');
        }

        const uniqueResults = Array.from(new Map(results.map(item => [item.name.toLowerCase(), item])).values()).slice(0, 6);
        setFilteredCars(uniqueResults);
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      }
    };

    const timeoutId = setTimeout(searchSupabase, 300);
    return () => clearTimeout(timeoutId);
  }, [query, searchCategory]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectCar = (car: any) => {
    router.push(`/car-details/${car.slug}`);
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

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 font-bold text-gray-700 text-sm uppercase tracking-wide h-full">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
              <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
              <Link href="/sell" className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-all">
                <FaPlusCircle /> Sell Car
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-xs xl:max-w-sm relative" ref={searchRef}>
              <div className="flex items-center w-full h-10 rounded-full border border-gray-300 bg-gray-50 hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all relative">
                <div
                  className="flex items-center px-3 border-r border-gray-300 h-full cursor-pointer hover:bg-gray-100 rounded-l-full transition-colors relative"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  <span className="text-xs font-bold text-gray-700 mr-1 w-8 text-center">{searchCategory}</span>
                  <FaChevronDown className="text-gray-500 text-[10px]" />
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] overflow-hidden">
                      {["All", "New", "Used"].map((cat) => (
                        <div
                          key={cat}
                          onClick={(e) => { e.stopPropagation(); setSearchCategory(cat); setShowCategoryDropdown(false); }}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center px-3 h-full">
                  <button type="submit" className="outline-none">
                    <FaSearch className="text-gray-400 mr-2 text-sm hover:text-blue-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search cars..."
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                  />
                </form>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && query.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {filteredCars.length > 0 ? (
                    <>
                      {filteredCars.map((car, index) => {
                        let rawImg = car.images || car.image_urls || car.image_url;
                        let finalImg = "/cars/placeholder.jpg";
                        if (typeof rawImg === 'string' && rawImg.startsWith('[')) {
                          try { rawImg = JSON.parse(rawImg)[0]; } catch {}
                        } else if (Array.isArray(rawImg)) {
                          rawImg = rawImg[0];
                        }
                        if (rawImg) finalImg = (rawImg.startsWith('/') || rawImg.startsWith('http')) ? rawImg : `/cars/${rawImg}`;

                        return (
                          <div
                            key={index}
                            onClick={() => handleSelectCar(car)}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0 group"
                          >
                            {/* ✅ FIXED: Next.js Image */}
                            <div className="relative w-10 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={finalImg}
                                alt={car.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">{car.name}</p>
                          </div>
                        );
                      })}
                      <div
                        onClick={handleSearchSubmit}
                        className="px-4 py-2 bg-gray-50 text-blue-600 text-[10px] font-bold text-center cursor-pointer hover:bg-blue-100"
                      >
                        VIEW ALL RESULTS
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-4 text-center text-sm text-gray-400">No suggestions found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 md:space-x-6 text-sm flex-shrink-0">
              <div
                className="hidden xl:flex items-center gap-1 cursor-pointer hover:text-blue-600 border-l border-gray-200 pl-4 h-10"
                onClick={() => setIsLocationModalOpen(true)}
              >
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="font-bold text-gray-700">{city}</span>
                <FaChevronDown className="text-gray-400 text-xs mt-1" />
              </div>

              <Link href="/shortlisted" className="text-gray-700 hover:text-red-500">
                <FaRegHeart className="text-xl" />
              </Link>

              {session ? (
                <Link href="/profile" className="hidden md:flex items-center hover:text-blue-600 gap-2 font-bold">
                  <FaRegUser className="text-lg" />
                  <span className="max-w-[100px] truncate">{session.user.user_metadata.full_name?.split(' ')[0]}</span>
                </Link>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
                  Login
                </button>
              )}

              <button className="lg:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 space-y-4">
              <div className="px-2">
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full px-4 py-2.5">
                  <FaSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    className="bg-transparent w-full outline-none text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>
              </div>
              <div
                className="bg-blue-50 rounded-lg flex items-center px-3 py-3 mx-2 text-blue-700 font-bold cursor-pointer"
                onClick={() => { setIsMobileMenuOpen(false); setIsLocationModalOpen(true); }}
              >
                <FaMapMarkerAlt className="mr-2" /> {city} (Change)
              </div>
              <Link href="/" className="block font-bold text-gray-800 px-4 py-2">Home</Link>
              <Link href="/sell" className="block font-bold text-blue-600 px-4 py-2">Sell Your Car</Link>
              <Link href="/news" className="block font-bold text-gray-800 px-4 py-2">News</Link>
              <Link href="/blogs" className="block font-bold text-gray-800 px-4 py-2">Blogs</Link>
              {session ? (
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 font-bold">Logout</button>
              ) : (
                <div className="px-2">
                  <button onClick={() => setIsAuthModalOpen(true)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Login</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Select City</h3>
              <button onClick={() => setIsLocationModalOpen(false)}><FaTimes /></button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {popularCities.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCitySelect(c)}
                  className={`text-sm py-2 rounded-lg border ${city === c ? "bg-blue-600 text-white" : "hover:border-blue-400"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;