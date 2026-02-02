'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { FaCalendarAlt, FaUser } from 'react-icons/fa'; // Icons add kiye better look ke liye

export default function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3);

      if (data) setBlogs(data);
      if (error) console.error('Blogs Error:', error.message);
    };

    fetchBlogs();
  }, []);

  if (!blogs.length) return null;

  return (
    // CHANGE 1: max-w-7xl hata diya, w-full aur padding badha di
    <section className="w-full px-4 md:px-8 lg:px-12 py-14 bg-white">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Latest Blogs
          </h2>
          <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
            Expert reviews, tips & car guides
          </p>
        </div>

        <Link
          href="/blogs"
          className="text-blue-600 text-sm font-bold hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Cards */}
      {/* CHANGE 2: Gap badhaya (gap-8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-full"
          >
            <div className="relative overflow-hidden w-full">
              {/* CHANGE 3: Image height badhai (h-64) aur zoom effect lagaya */}
              <img
                src={blog.image_url || '/placeholder-blog.jpg'}
                alt={blog.title}
                className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              <span className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase shadow-md">
                {blog.category || 'Guide'}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* CHANGE 4: Fonts bade aur bold kiye */}
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                   <FaUser className="text-gray-400" />
                   {blog.author || 'CarBuddy Team'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                   <FaCalendarAlt className="text-gray-400" />
                   {blog.published_date}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
