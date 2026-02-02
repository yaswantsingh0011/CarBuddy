import Link from 'next/link';
// ✅ FIXED: Correct Import
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ❌ Removed: const supabase = await createClient();

  async function signOut() {
    'use server';
    // ❌ Removed: const supabase = await createClient();
    
    await supabase.auth.signOut();
    redirect('/login');
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <div className="flex h-screen">

        {/* ===== Sidebar ===== */}
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed inset-y-0 shadow-xl">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-extrabold tracking-wide">
              Admin<span className="text-blue-500">Panel</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              CarBuddy Management
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaHome /> Dashboard
            </Link>

            <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaEnvelope /> User Messages
            </Link>

            <Link href="/admin/cars" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaCar /> Manage Cars
            </Link>

            <Link href="/admin/brands" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaTags /> Manage Brands
            </Link>

            <Link href="/admin/dealers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaMapMarkerAlt /> Manage Dealers
            </Link>

            <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaNewspaper /> Manage News
            </Link>

            <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaPenNib /> Manage Blogs
            </Link>

            <Link href="/admin/visual-stories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
              <FaImages /> Visual Stories
            </Link>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800">
                <FaCog /> Website Settings
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <form action={signOut}>
              <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 w-full text-left font-semibold">
                <FaSignOutAlt /> Logout
              </button>
            </form>
          </div>
        </aside>

        {/* ===== Main Content ===== */}
        <main className="flex-1 md:ml-64 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}