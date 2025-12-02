'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  FaBox, FaHeart, FaHistory, FaCar, FaWarehouse, FaCog, FaUserEdit, 
  FaChevronRight, FaSignOutAlt, FaPhoneAlt, FaEnvelope, FaArrowLeft, 
  FaRegFolderOpen, FaBoxOpen, FaParachuteBox, FaGhost 
} from 'react-icons/fa';

// ✅ NEW IMPORTS (Functionality ke liye)
import { useShortlist } from '@/context/ShortlistContext';
import ElectricCarCard from '@/components/ElectricCarCard';
import OffersModal from '@/components/OffersModal';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [offerCar, setOfferCar] = useState<any>(null); // ✅ Offers Modal State
  
  // ✅ Context se Shortlisted Data nikala
  const { shortlist } = useShortlist();

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

  // ✅ Navigation & Offers Logic
  const handleCardClick = (carName: string) => {
    const slug = carName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
  };

  const getOffersList = (car: any) => {
    return ["Exchange Bonus up to ₹25,000", "Free Insurance for 1st Year", "Corporate Discount Available"];
  };

  const carForModal = offerCar ? { ...offerCar, offers: getOffersList(offerCar) } : null;

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

  const isPanelOpen = activeView !== 'menu';

  const menuItems = [
    { icon: <FaBox />, label: "My Orders", action: () => setActiveView('orders') },
    { icon: <FaHeart />, label: "Shortlisted Vehicles", action: () => setActiveView('shortlisted') },
    { icon: <FaHistory />, label: "My Activity", action: () => console.log("Activity") },
    { icon: <FaCar />, label: "My Vehicles", action: () => setActiveView('my-vehicles') },
    { icon: <FaWarehouse />, label: "My Garage", action: () => setActiveView('garage') },
    { icon: <FaCog />, label: "Manage Consents", action: () => console.log("Consents") },
    { icon: <FaUserEdit />, label: "Profile Settings", action: () => setActiveView('profile-settings') },
  ];

  return (
    <div className="min-h-[85vh] bg-gray-50 py-10 px-4 flex justify-center items-start">
      
      <div className={`flex flex-col md:flex-row gap-6 w-full transition-all duration-300 ease-in-out ${isPanelOpen ? 'max-w-7xl' : 'max-w-[380px]'}`}>
        
        {/* === LEFT CARD (Menu) === */}
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit flex-shrink-0 transition-all duration-300 ${isPanelOpen ? 'w-full md:w-[320px]' : 'w-full'}`}>
            <div className="bg-slate-50 py-6 px-4 flex flex-col items-center text-center border-b border-gray-100">
                <div className="w-20 h-20 rounded-full bg-slate-400 flex items-center justify-center mb-3 text-white text-3xl font-bold shadow-sm border-4 border-white">
                    {firstLetter}
                </div>
                <h1 className="text-xl font-bold text-gray-900 capitalize">{fullName}</h1>
                <div className="mt-2 flex flex-col items-center gap-1">
                    <p className="text-sm text-gray-600">{email}</p>
                    <span className="mt-1 text-green-700 text-[10px] font-bold bg-green-100 px-3 py-1 rounded-full uppercase tracking-wide">Verified Account</span>
                </div>
            </div>

            <div className="py-2">
                {menuItems.map((item, index) => {
                    const isActive = (activeView === 'shortlisted' && item.label === "Shortlisted Vehicles") ||
                                     (activeView === 'garage' && item.label === "My Garage");
                    return (
                        <button key={index} onClick={item.action} className={`w-full flex items-center justify-between px-6 py-3.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group cursor-pointer ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                            <div className={`flex items-center gap-4 group-hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                                <span className="text-lg opacity-70">{item.icon}</span>
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            <FaChevronRight className={`text-[12px] group-hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-300'}`} />
                        </button>
                    )
                })}
            </div>

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
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800"><FaArrowLeft className="mr-1"/> Back</button>
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
                            <div><p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p><p className="text-gray-900 font-medium">{phone}</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"><FaEnvelope /></div>
                            <div><p className="text-xs text-gray-500 font-bold uppercase">Email Address</p><p className="text-gray-900 font-medium">{email}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* 2. ✅ SHORTLISTED VEHICLES (NOW WORKING) */}
        {activeView === 'shortlisted' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800"><FaArrowLeft className="mr-1"/> Back</button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Shortlisted Vehicles ({shortlist.length})</h2>
                </div>
                
                {shortlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shortlist.map((car: any, index: number) => {
                            const displayImage = car.images ? car.images[0] : (car.imageUrl || "/cars/placeholder.jpg");
                            return (
                                <div key={index} className="cursor-pointer transition-transform hover:scale-105">
                                    <div className="h-full pointer-events-auto">
                                        <ElectricCarCard 
                                            id={car.id} name={car.name} priceRange={car.priceRange || car.price} 
                                            imageUrl={displayImage} fuelType={car.fuelType}
                                            specs={car.specs} features={car.features} images={car.images}
                                            onOfferClick={() => setOfferCar(car)}
                                            onDetailClick={() => handleCardClick(car.name)} 
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                        <div className="w-40 h-32 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-300"><FaRegFolderOpen size={60} /></div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No shortlist Found</h3>
                        <p className="text-gray-500 mb-8 max-w-sm">Start shortlisting for quick access, any time you want to revisit your favorite cars.</p>
                        <button onClick={() => router.push('/new-cars')} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-md">Browse Vehicles</button>
                    </div>
                )}
            </div>
        )}

        {/* 3. MY ORDERS */}
        {activeView === 'orders' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800"><FaArrowLeft className="mr-1"/> Back</button>
                <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-32 h-32 bg-blue-50 rounded-full mb-6 flex items-center justify-center text-blue-200"><FaBoxOpen size={60} /></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
                    <button onClick={() => router.push('/new-cars')} className="bg-orange-500 text-white font-bold py-3 px-10 rounded-lg hover:bg-orange-600 transition-colors shadow-md mt-4">Browse Vehicles</button>
                </div>
            </div>
        )}

        {/* 4. MY VEHICLES */}
        {activeView === 'my-vehicles' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800"><FaArrowLeft className="mr-1"/> Back</button>
                <h2 className="text-2xl font-bold text-gray-900">My Vehicles</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-40 h-32 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-gray-300"><FaParachuteBox size={70} /></div>
                    <p className="text-gray-500 mb-8 text-sm font-medium">You have not added any car yet</p>
                    <button onClick={() => router.push('/')} className="bg-orange-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-orange-600 transition-colors shadow-md">Go to Home Page</button>
                </div>
            </div>
        )}

        {/* 5. ✅ MY GARAGE (WORKING) */}
        {activeView === 'garage' && (
            <div className="flex-1 space-y-4 animate-fadeIn w-full">
                <button onClick={() => setActiveView('menu')} className="md:hidden flex items-center text-gray-500 mb-2 font-medium text-sm hover:text-gray-800"><FaArrowLeft className="mr-1"/> Back</button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Garage</h2>
                    <p className="text-sm text-gray-500">Manage your owned vehicles here</p>
                </div>
                
                {/* Abhi ke liye empty state (Future me yahan bhi shortlist jaisa data dikha sakte hain) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-40 h-32 bg-gray-100 rounded-xl mb-6 flex items-center justify-center text-gray-300 relative">
                        <FaBoxOpen size={70} className="text-gray-300" />
                        <FaGhost size={20} className="absolute -top-2 right-8 text-gray-400 rotate-12" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! You have not added any vehicle yet</h3>
                    <p className="text-gray-500 mb-8 max-w-sm text-sm">Add the vehicles you own to get personalised updates and alerts</p>
                    <button onClick={() => router.push('/new-cars')} className="bg-orange-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-orange-600 transition-colors shadow-md">Add your vehicle</button>
                </div>
            </div>
        )}

      </div>

      {/* Modal */}
      {offerCar && <OffersModal isOpen={!!offerCar} onClose={() => setOfferCar(null)} car={carForModal} />}
    </div>
  );
};

export default ProfilePage;