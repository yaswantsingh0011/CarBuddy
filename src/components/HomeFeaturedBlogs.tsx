'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function HomeFeaturedBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      // ✅ Fetch Latest 3 Blogs
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3); 

      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Articles</h2>
            <Link href="/blogs" className="text-blue-600 font-bold flex items-center gap-1 text-sm md:text-base hover:underline">
                View All <FaArrowRight size={12} />
            </Link>
        </div>

        {/* Grid: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <div key={blog.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    
                    {/* ✅ Image on LEFT (Fixed Size) */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                        <Image 
                            src={blog.image_url || "/placeholder.jpg"} 
                            alt={blog.title} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* ✅ Content on RIGHT */}
                    <div className="flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {blog.excerpt || "Read more about this topic in our full article..."}
                            </p>
                        </div>
                        
                        <div className="mt-2">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                                Read Article <FaArrowRight size={10} />
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}