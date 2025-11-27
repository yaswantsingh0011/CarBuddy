"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  FaBox, 
  FaHeart, 
  FaHistory, 
  FaCar, 
  FaWarehouse, 
  FaCog, 
  FaUserEdit, 
  FaChevronRight, 
  FaSignOutAlt 
} from 'react-icons/fa';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Menu Items Config
  const menuItems = [
    { icon: <FaBox />, label: "My Orders", action: () => console.log("Orders") },
    { icon: <FaHeart />, label: "Shortlisted Vehicles", action: () => console.log("Shortlist") },
    { icon: <FaHistory />, label: "My Activity", action: () => console.log("Activity") },
    { icon: <FaCar />, label: "My Vehicles", action: () => console.log("Vehicles") },
    { icon: <FaWarehouse />, label: "My Garage", action: () => console.log("Garage") },
    { icon: <FaCog />, label: "Manage Consents", action: () => console.log("Consents") },
    { icon: <FaUserEdit />, label: "Profile Settings", action: () => console.log("Settings") },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/'); 
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // User Info Extraction
  const fullName = user?.user_metadata?.full_name || 'Guest User';
  const firstLetter = fullName.charAt(0).toUpperCase();
  const email = user?.email;
  const phone = user?.user_metadata?.phone || '';

  return (
    // Main Container: Reduced padding (py-6 instead of py-12) and centered vertically (items-center)
    <div className="min-h-[80vh] bg-gray-50 py-6 px-4 flex justify-center items-center">
      
      {/* Profile Card: Reduced max-width slightly and removed large top margin */}
      <div className="bg-white w-full max-w-[400px] rounded-xl shadow-lg border border-gray-100 overflow-hidden relative z-10">
        
        {/* --- HEADER SECTION --- */}
        {/* Reduced padding: py-5 px-4 */}
        <div className="bg-slate-50 py-5 px-4 flex flex-col items-center text-center border-b border-gray-100">
            
            {/* Avatar: Reduced size (w-16 h-16) and margin (mb-2) */}
            <div className="w-16 h-16 rounded-full bg-slate-400 flex items-center justify-center mb-2 text-white text-2xl font-bold shadow-sm border-4 border-white">
                {firstLetter}
            </div>

            {/* User Details: Smaller fonts */}
            <h1 className="text-lg font-bold text-gray-900 capitalize">
                {fullName}
            </h1>
            
            <div className="mt-1 flex flex-col items-center">
                {phone && <p className="text-xs text-gray-600 font-medium">{phone}</p>}
                <p className="text-xs text-gray-500">{email}</p>
                
                {/* Verified Badge: Smaller and less margin */}
                <span className="mt-2 text-green-600 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wide">
                    Verified Account
                </span>
            </div>
        </div>

        {/* --- MENU LIST --- */}
        <div className="py-1">
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={item.action}
                    // Reduced padding significantly: px-5 py-2.5
                    className="w-full flex items-center justify-between px-5 py-2.5 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0 group cursor-pointer"
                >
                    <div className="flex items-center gap-3 text-gray-600 group-hover:text-orange-600">
                        {/* Smaller Icon Size */}
                        <span className="text-lg text-gray-400 group-hover:text-orange-600 transition-colors">
                            {item.icon}
                        </span>
                        {/* Smaller Font Size */}
                        <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900">
                            {item.label}
                        </span>
                    </div>
                    <FaChevronRight className="text-gray-300 text-[10px] group-hover:text-orange-600 transition-colors" />
                </button>
            ))}
        </div>

        {/* --- LOGOUT BUTTON --- */}
        {/* Reduced padding: p-4 */}
        <div className="p-4 bg-white border-t border-gray-100">
            <button 
                onClick={handleLogout}
                // Smaller button padding and font size
                className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2.5 rounded-lg font-bold text-sm hover:bg-red-50 transition-all uppercase tracking-wider"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;