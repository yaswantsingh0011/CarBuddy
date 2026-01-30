"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
// ✅ Icon wapas add kiya
import { FaPlus, FaEllipsisV, FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";

export default function BlogsPage() {
  const supabase = createClient();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .neq('category', 'News')
      .order("published_date", { ascending: false });

    if (!error) setBlogs(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bhai, pakka delete karna hai?")) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (!error) {
        alert("Blog deleted!");
        fetchBlogs();
      }
    }
    setOpenMenuId(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Blog Library</h1>
          <p className="text-sm text-gray-500">Total {blogs.length} articles in Database.</p>
        </div>
        <Link href="/admin/blogs/add" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 text-sm hover:bg-slate-800 transition">
          <FaPlus size={12} /> Create New Blog
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-16 text-center">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title & Author</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400 font-bold text-lg">Loading Library...</td></tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-400 text-center">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{blog.title}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tight">By {blog.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-center font-medium">
                      {blog.published_date ? new Date(blog.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button onClick={() => setOpenMenuId(openMenuId === blog.id ? null : blog.id)} className="p-2 text-gray-400 hover:text-gray-600">
                        <FaEllipsisV />
                      </button>

                      {openMenuId === blog.id && (
                        <div className="absolute right-10 top-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-[999] py-1 text-left overflow-hidden">
                          
                          {/* ✅ View Live Option (New Window mein khulega) */}
                          <Link 
                            href={`/blogs/${blog.slug}`} 
                            target="_blank"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                          >
                            <FaExternalLinkAlt size={11} /> View Live
                          </Link>

                          <Link 
                            href={`/admin/blogs/edit/${blog.id}`} 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium border-t border-gray-50"
                          >
                            <FaEdit size={12} /> Edit Post
                          </Link>
                          
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50 font-medium"
                          >
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