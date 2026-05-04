
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Active link highlight karne ke liye
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import {
  FaHome,
  FaSignOutAlt,
  FaCog,
  FaEnvelope,
  FaCar,
  FaNewspaper,
  FaPenNib,
  FaImages,
  FaTags,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  // Active Link check karne ke liye function
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/admin", icon: <FaHome />, label: "Dashboard" },
    { href: "/admin/messages", icon: <FaEnvelope />, label: "User Messages" },
    { href: "/admin/cars", icon: <FaCar />, label: "Manage Cars" },
    { href: "/admin/brands", icon: <FaTags />, label: "Manage Brands" },
    { href: "/admin/dealers", icon: <FaMapMarkerAlt />, label: "Manage Dealers" },
    { href: "/admin/news", icon: <FaNewspaper />, label: "Manage News" },
    { href: "/admin/blogs", icon: <FaPenNib />, label: "Manage Blogs" },
    { href: "/admin/visual-stories", icon: <FaImages />, label: "Visual Stories" },
  ];

  return (
    <div className="h-screen bg-[#F1F5F9] flex overflow-hidden font-sans">
      
      {/* ===== Sidebar ===== */}
      <aside className="w-72 bg-[#0F172A] text-slate-300 hidden md:flex flex-col fixed inset-y-0 z-50 shadow-2xl">
        {/* Logo Section */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <FaCar size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                CarBuddy<span className="text-blue-500">.</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[2px] text-slate-500 font-bold">Admin Central</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold text-slate-500 px-4 mb-2 uppercase tracking-widest">Main Menu</p>
          
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(link.href) 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <span className={`${isActive(link.href) ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}>
                {link.icon}
              </span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}

          <div className="pt-6 mt-6 border-t border-slate-800/50">
            <p className="text-[10px] font-bold text-slate-500 px-4 mb-2 uppercase tracking-widest">System</p>
            <Link 
              href="/admin/settings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive('/admin/settings') ? "bg-blue-600 text-white" : "hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <FaCog className={isActive('/admin/settings') ? "" : "text-slate-500"} />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </nav>

        {/* User / Logout Section */}
        <div className="p-4 mt-auto">
          <button 
            onClick={handleSignOut}
            className="flex items-center justify-center gap-3 px-4 py-3 w-full rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold text-sm"
          >
            <FaSignOutAlt /> Logout Account
          </button>
        </div>
      </aside>

      {/* ===== Main Content Area ===== */}
      <div className="flex-1 md:ml-72 flex flex-col">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div>
            <h3 className="text-slate-800 font-bold text-lg">
              {navLinks.find(l => isActive(l.href))?.label || "Settings"}
            </h3>
            <p className="text-xs text-slate-500">Manage your car kingdom from here.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Administrator</p>
              <p className="text-[10px] text-blue-600 font-medium">Online</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-white shadow-md flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}