"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  FaBox, FaHeart, FaHistory, FaCar, FaWarehouse, FaCog, FaUserEdit, FaChevronRight, FaSignOutAlt, FaPhoneAlt, FaEnvelope, FaArrowLeft
} from 'react-icons/fa';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeView, setActiveView] = useState<'menu' | 'profile-settings'>('menu');

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

  const fullName = user?.user_metadata?.full_name || 'Guest User';
  const firstLetter = fullName.charAt(0).toUpperCase();
  const email = user?.email;
  const phone = user?.user_metadata?.phone || 'Not Added';

  const menuItems = [
    { icon: <FaBox />, label: "My Orders", action: () => console.log("Orders") },
    { icon: <FaHeart />, label: "Shortlisted Vehicles", action: () => router.push('/shortlisted') },
    { icon: <FaHistory />, label: "My Activity", action: () => console.log("Activity") },
    { icon: <FaCar />, label: "My Vehicles", action: () => console.log("Vehicles") },
    { icon: <FaWarehouse />, label: "My Garage", action: () => console.log("Garage") },
    { icon: <FaCog />, label: "Manage Consents", action: () => console.log("Consents") },
    { 
      icon: <FaUserEdit />, 
      label: "Profile Settings", 
      action: () => setActiveView('profile-settings') 
    },
  ];

  return (
    // Main Background
    <div className="min-h-[85vh] bg-gray-50 py-10 px-4 flex justify-center items-start">
      
      {/* CONTAINER LOGIC:
          - Agar 'menu' hai: Width choti (380px) rahegi.
          - Agar 'settings' hai: Width badi (1100px) hogi taaki dono side-by-side a sakein.
      */}
      <div className={`flex flex-col md:flex-row gap-6 w-full transition-all duration-300 ease-in-out ${activeView === 'profile-settings' ? 'max-w-5xl' : 'max-w-[380px]'}`}>
        
        {/* === LEFT CARD (Menu) === */}
        {/* Logic: Jab settings khule, to iski width fix kar do (md:w-[350px]), warna ye 100% rahe */}
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit flex-shrink-0 transition-all duration-300 ${activeView === 'profile-settings' ? 'w-full md:w-[350px]' : 'w-full'}`}>
            
            {/* Header */}
            <div className="bg-slate-50 py-6 px-4 flex flex-col items-center text-center border-b border-gray-100">
                <div className="w-20 h-20 rounded-full bg-slate-400 flex items-center justify-center mb-3 text-white text-3xl font-bold shadow-sm border-4 border-white">
                    {firstLetter}
                </div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{fullName}</h1>
                
                <div className="mt-2 flex flex-col items-center gap-1">
                    <p className="text-sm text-gray-600">{email}</p>
                    <span className="mt-1 text-green-700 text-[10px] font-bold bg-green-100 px-3 py-1 rounded-full uppercase tracking-wide">
                        Verified Account
                    </span>
                </div>
            </div>

            {/* Menu List */}
            <div className="py-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.action}
                        className={`w-full flex items-center justify-between px-6 py-3.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group cursor-pointer ${
                            activeView === 'profile-settings' && item.label === "Profile Settings" ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                    >
                        <div className={`flex items-center gap-4 group-hover:text-blue-600 ${activeView === 'profile-settings' && item.label === "Profile Settings" ? 'text-blue-600' : 'text-gray-600'}`}>
                            <span className="text-lg opacity-70">{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <FaChevronRight className={`text-[12px] group-hover:text-blue-600 ${activeView === 'profile-settings' && item.label === "Profile Settings" ? 'text-blue-600' : 'text-gray-300'}`} />
                    </button>
                ))}
            </div>

            {/* Logout */}
            <div className="p-5 bg-white border-t border-gray-100">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2.5 rounded-lg font-bold text-sm hover:bg-red-50 transition-all uppercase tracking-wider"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>

        {/* === RIGHT PANEL (Settings) === */}
        {/* Ye tabhi dikhega jab activeView 'profile-settings' ho */}
        {activeView === 'profile-settings' && (
            <div className="flex-1 space-y-6 animate-fadeIn">
                
                {/* Header with Mobile Back Button */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
                    {/* Mobile Only Back Button */}
                    <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 font-medium text-sm hover:text-gray-800">
                        <FaArrowLeft className="mr-1"/> Back
                    </button>
                </div>

                {/* Card 1: Personal Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">{fullName}</h3>
                            <p className="text-sm text-gray-500">Personal Information</p>
                        </div>
                        <button className="text-blue-600 text-sm font-bold hover:underline">Edit Profile</button>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p>
                                <p className="text-gray-900 font-medium">{phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                                <p className="text-gray-900 font-medium">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Address Book */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Address Book</h3>
                        <button className="text-blue-600 text-sm font-bold hover:underline">Add Address</button>
                    </div>
                    <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                        <p className="text-gray-400 text-sm font-medium">No Address Added Yet</p>
                    </div>
                </div>

            </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;