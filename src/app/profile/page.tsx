"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  FaBox, FaHeart, FaHistory, FaCar, FaWarehouse, FaCog, FaUserEdit, FaChevronRight, FaSignOutAlt, FaPhoneAlt, FaEnvelope, FaArrowLeft, FaRegFolderOpen, FaBoxOpen, FaParachuteBox, FaGhost
} from 'react-icons/fa';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ 1. State updated to include 'garage'
  const [activeView, setActiveView] = useState<'menu' | 'profile-settings' | 'shortlisted' | 'orders' | 'my-vehicles' | 'garage'>('menu');

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

  // Helper to check if ANY right panel is active
  const isPanelOpen = activeView !== 'menu';

  const menuItems = [
    { 
      icon: <FaBox />, 
      label: "My Orders", 
      action: () => setActiveView('orders') 
    },
    { 
      icon: <FaHeart />, 
      label: "Shortlisted Vehicles", 
      action: () => setActiveView('shortlisted') 
    },
    { icon: <FaHistory />, label: "My Activity", action: () => console.log("Activity") },
    { 
      icon: <FaCar />, 
      label: "My Vehicles", 
      action: () => setActiveView('my-vehicles') 
    },
    { 
      icon: <FaWarehouse />, 
      label: "My Garage", 
      action: () => setActiveView('garage') // ✅ Activates Garage View
    },
    { icon: <FaCog />, label: "Manage Consents", action: () => console.log("Consents") },
    { 
      icon: <FaUserEdit />, 
      label: "Profile Settings", 
      action: () => setActiveView('profile-settings') 
    },
  ];

  return (
    <div className="min-h-[85vh] bg-gray-50 py-10 px-4 flex justify-center items-start">
      
      {/* Wrapper expands when any panel is open */}
      <div className={`flex flex-col md:flex-row gap-6 w-full transition-all duration-300 ease-in-out ${isPanelOpen ? 'max-w-6xl' : 'max-w-[380px]'}`}>
        
        {/* === LEFT CARD (Menu) === */}
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit flex-shrink-0 transition-all duration-300 ${isPanelOpen ? 'w-full md:w-[350px]' : 'w-full'}`}>
            
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
                {menuItems.map((item, index) => {
                    const isActive = (activeView === 'profile-settings' && item.label === "Profile Settings") || 
                                     (activeView === 'shortlisted' && item.label === "Shortlisted Vehicles") ||
                                     (activeView === 'orders' && item.label === "My Orders") ||
                                     (activeView === 'my-vehicles' && item.label === "My Vehicles") ||
                                     (activeView === 'garage' && item.label === "My Garage");

                    return (
                        <button
                            key={index}
                            onClick={item.action}
                            className={`w-full flex items-center justify-between px-6 py-3.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group cursor-pointer ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                            <div className={`flex items-center gap-4 group-hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                                <span className="text-lg opacity-70">{item.icon}</span>
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            <FaChevronRight className={`text-[12px] group-hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-300'}`} />
                        </button>
                    )
                })}
            </div>

            {/* Logout */}
            <div className="p-5 bg-white border-t border-gray-100">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2.5 rounded-lg font-bold text-sm hover:bg-red-50 transition-all uppercase tracking-wider">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>

        {/* ================= RIGHT PANEL AREA ================= */}
        
        {/* 1. PROFILE SETTINGS */}
        {activeView === 'profile-settings' && (
            <div className="flex-1 space-y-6 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800">
                    <FaArrowLeft className="mr-1"/> Back
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>

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
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"><FaPhoneAlt /></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p>
                                <p className="text-gray-900 font-medium">{phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"><FaEnvelope /></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                                <p className="text-gray-900 font-medium">{email}</p>
                            </div>
                        </div>
                    </div>
                </div>

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

        {/* 2. SHORTLISTED */}
        {activeView === 'shortlisted' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800">
                    <FaArrowLeft className="mr-1"/> Back
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Shortlisted</h2>
                    <p className="text-sm text-gray-500">No shortlisted vehicles to show here</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-40 h-32 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-300">
                        <FaRegFolderOpen size={60} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No shortlist Found</h3>
                    <p className="text-gray-500 mb-8 max-w-sm">Start shortlisting for quick access, any time you want to revisit your favorite cars.</p>
                    <button onClick={() => router.push('/new-cars')} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-100">
                        Browse Vehicles
                    </button>
                </div>
            </div>
        )}

        {/* 3. MY ORDERS */}
        {activeView === 'orders' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800">
                    <FaArrowLeft className="mr-1"/> Back
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px] relative">
                    <div className="absolute top-4 right-4 text-yellow-400 text-2xl opacity-50 rotate-12">🐝</div>
                    <div className="w-32 h-32 bg-blue-50 rounded-full mb-6 flex items-center justify-center text-blue-200">
                        <FaBoxOpen size={60} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
                    <p className="text-gray-500 mb-8 max-w-sm text-sm">No order yet, Start your auto explore journey and many more</p>
                    <button onClick={() => router.push('/new-cars')} className="bg-orange-500 text-white font-bold py-3 px-10 rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-100 uppercase tracking-wide text-sm">
                        Browse Vehicles
                    </button>
                </div>
            </div>
        )}

        {/* 4. MY VEHICLES */}
        {activeView === 'my-vehicles' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800">
                    <FaArrowLeft className="mr-1"/> Back
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Vehicles</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-40 h-32 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-gray-300">
                        <FaParachuteBox size={70} className="text-gray-300 opacity-80" />
                    </div>
                    <p className="text-gray-500 mb-8 text-sm font-medium">You have not added any car yet</p>
                    <button onClick={() => router.push('/')} className="bg-orange-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-100 uppercase tracking-wide text-sm">
                        Go to Home Page
                    </button>
                </div>
            </div>
        )}

        {/* 5. ✅ MY GARAGE VIEW (NEW) */}
        {activeView === 'garage' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800">
                    <FaArrowLeft className="mr-1"/> Back
                </button>
                
                {/* Title */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Garage</h2>
                    <p className="text-sm text-gray-500">No vehicles added in garage</p>
                </div>

                {/* Empty State Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                    
                    {/* Illustration */}
                    <div className="w-40 h-32 bg-gray-100 rounded-xl mb-6 flex items-center justify-center text-gray-300 relative">
                        <FaBoxOpen size={70} className="text-gray-300" />
                        {/* Adding a small ghost/sad face to mimic the image */}
                        <FaGhost size={20} className="absolute -top-2 right-8 text-gray-400 rotate-12" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! You have not added any vehicle yet</h3>
                    <p className="text-gray-500 mb-8 max-w-sm text-sm">
                        Add the vehicles you own to get personalised updates and alerts
                    </p>

                    <button 
                        onClick={() => router.push('/new-cars')}
                        className="bg-orange-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-100 uppercase tracking-wide text-sm"
                    >
                        Add your vehicle
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;