"use client";

import { useEffect, useState } from "react";
// ✅ FIXED: Correct Import
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaPlus, FaEllipsisV, FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";

// ❌ Purana static import hata diya (Ab file delete kar paoge)

export default function AdminNewsPage() {
  // ❌ Removed: const supabase = createClient();
  
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  // ✅ Sirf fetch logic ko call karenge
  useEffect(() => {
    fetchNewsFromSupabase();
  }, []);

  // ✅ Migration logic ko delete karke sirf fetch rakha hai
  const fetchNewsFromSupabase = async () => {
    setLoading(true);
    try {
      const { data: dbNews, error } = await supabase
        .from("news")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      setNews(dbNews || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (confirm("Bhai, pakka delete karna hai?")) {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (!error) {
        alert("News deleted successfully!");
        // ✅ State update karo taaki refresh na karna pade
        setNews(news.filter(item => item.id !== id));
      } else {
        alert("Error deleting news: " + error.message);
      }
    }
    setOpenMenuId(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">News Dashboard</h1>
          <p className="text-sm text-gray-500 font-medium">Managing {news.length} automotive news stories from Database.</p>
        </div>
        <Link href="/admin/news/add" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm hover:bg-slate-800 transition">
          <FaPlus size={12} /> Add New News
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-16 text-center">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Title & Author</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400 font-bold italic text-base">Fetching live data from Supabase...</td></tr>
              ) : news.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No news found in database.</td></tr>
              ) : (
                news.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-400 text-center">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">By {item.author || 'Admin'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-50 text-orange-600 border border-orange-100">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-center font-bold">
                      {item.published_date ? new Date(item.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <FaEllipsisV />
                      </button>

                      {openMenuId === item.id && (
                        <div className="absolute right-10 top-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-[999] py-1 text-left overflow-hidden">
                          <Link href={`/news/${item.slug}`} target="_blank" className="flex items-center gap-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-bold transition-colors">
                            <FaExternalLinkAlt size={10} /> View News
                          </Link>
                          <Link href={`/admin/news/edit/${item.id}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold transition-colors border-t">
                            <FaEdit size={12} /> Edit News
                          </Link>
                          <button onClick={() => handleDelete(item.id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors border-t">
                            <FaTrash size={12} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {openMenuId && <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)}></div>}
    </div>
  );
}