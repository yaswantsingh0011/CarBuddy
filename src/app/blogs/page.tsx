"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaSearch, FaArrowRight, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function PublicBlogsPage() {
  const supabase = createClient();
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data: dbBlogs, error } = await supabase
          .from("blogs")
          .select("id, title, slug, category, image_url, author, published_date, excerpt, content")
          .order("published_date", { ascending: false });

        if (error) throw error;

        const formattedBlogs = (dbBlogs || []).map((blog) => ({
          id: blog.id,
          title: blog.title,
          category: blog.category,
          image: blog.image_url || "/cars/placeholder.jpg",
          date: blog.published_date 
            ? new Date(blog.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
            : "Archive",
          author: blog.author || 'Admin',
          excerpt: blog.excerpt && blog.excerpt.trim() !== "" 
            ? blog.excerpt 
            : (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 95) + "..." : "Read more..."),
          slug: blog.slug
        }));

        setAllBlogs(formattedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [supabase]);

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Guides", "Safety", "Maintenance", "Reviews", "Expert Review"];

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="w-full px-4 md:px-8 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">CarBuddy Blog</h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto font-medium">Expert insights, maintenance tips, and the latest automotive trends.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT: BLOG GRID --- */}
          <div className="lg:w-2/3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-[380px] bg-gray-200 rounded-3xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              // Change: Gap thoda kam kiya (8 -> 6)
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                    
                    {/* CHANGE: Height kam ki (h-64 -> h-48) */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={blog.image} 
                        alt={blog.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    {/* CHANGE: Padding kam ki (p-8 -> p-5) */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-blue-500" /> {blog.date}</span>
                        <span className="flex items-center gap-1.5"><FaUser className="text-blue-500" /> {blog.author}</span>
                      </div>
                      
                      {/* CHANGE: Title size normal kiya (text-2xl -> text-lg) */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      
                      {/* CHANGE: Margin kam kiya (mb-8 -> mb-4) */}
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1 font-medium">
                        {blog.excerpt}
                      </p>

                      <Link href={`/blogs/${blog.slug}`} className="group flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-widest mt-auto">
                        Read Full Article <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: SIDEBAR --- */}
          <aside className="lg:w-1/3 space-y-6">
            
            {/* Widget 1: Search */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Search Articles</h4>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full bg-gray-50 border-none rounded-xl p-3.5 pl-10 text-xs focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Widget 2: Categories */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Browse Categories</h4>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: Newsletter Box */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-2">Join the Club</h4>
                <p className="text-blue-100 text-[11px] mb-6 font-medium leading-relaxed">Get maintenance tips and exclusive car deals monthly.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Your Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder:text-blue-200 outline-none focus:bg-white/20 transition-all" />
                  <button className="w-full bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest py-3 rounded-xl hover:shadow-2xl transition-all active:scale-95">Subscribe</button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Widget 4: Social Media */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Follow CarBuddy</h4>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-blue-100 transition-all group">
                  <FaFacebookF className="text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-pink-100 transition-all group">
                  <FaInstagram className="text-pink-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Instagram</span>
                </a>
              </div>
            </div>

            {/* Widget 5: Popular Tags */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['SUV', 'EVs', 'Luxury', 'Budget', 'Maintenance', 'Safety', 'Mileage', 'Hatchback'].map((tag) => (
                  <span key={tag} className="text-[9px] font-bold bg-gray-50 text-gray-400 px-3 py-2 rounded-full border border-gray-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer transition-all uppercase tracking-tighter">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}   

