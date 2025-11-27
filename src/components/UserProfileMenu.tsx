"use client";

import React from 'react';
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
} from 'react-icons/fa'; // npm install react-icons

interface UserProfileMenuProps {
  user: {
    name: string;
    email: string;
    phone: string;
    isVerified?: boolean;
  };
  onClose: () => void;
  onLogout: () => void;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ user, onClose, onLogout }) => {
  
  // Menu Items ka data taaki code clean rahe
  const menuItems = [
    { icon: <FaBox />, label: "My Orders" },
    { icon: <FaHeart />, label: "Shortlisted Vehicles" },
    { icon: <FaHistory />, label: "My Activity" },
    { icon: <FaCar />, label: "My Vehicles" },
    { icon: <FaWarehouse />, label: "My Garage" },
    { icon: <FaCog />, label: "Manage Consents" },
    { icon: <FaUserEdit />, label: "Profile Settings" },
  ];

  return (
    // Background Overlay (Darken background)
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50" onClick={onClose}>
      
      {/* Sidebar Container */}
      <div 
        className="w-full max-w-sm h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()} // Sidebar pe click karne se band na ho
      >
        
        {/* --- 1. HEADER SECTION (Gray Background) --- */}
        <div className="bg-slate-100 py-8 px-6 flex flex-col items-center text-center border-b border-gray-200">
          
          {/* Avatar Circle */}
          <div className="w-20 h-20 rounded-full bg-slate-400 flex items-center justify-center mb-4 text-white text-3xl font-bold shadow-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* User Details */}
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
          
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.isVerified && (
              <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded">
                Verified
              </span>
            )}
          </div>
        </div>

        {/* --- 2. MENU LIST SECTION --- */}
        <div className="py-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group"
              onClick={() => console.log(`Clicked ${item.label}`)}
            >
              <div className="flex items-center gap-4 text-gray-700 group-hover:text-orange-600">
                <span className="text-lg text-gray-500 group-hover:text-orange-600">
                    {item.icon}
                </span>
                <span className="font-medium text-sm md:text-base">
                    {item.label}
                </span>
              </div>
              <FaChevronRight className="text-gray-400 text-sm group-hover:text-orange-600" />
            </button>
          ))}
        </div>

        {/* --- 3. LOGOUT BUTTON (Bottom) --- */}
        <div className="p-6 mt-4">
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfileMenu;