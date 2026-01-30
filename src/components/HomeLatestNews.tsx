'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function HomeLatestNews() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3); 
      
      if (data) setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Stories</h2>
            <Link href="/news" className="text-blue-600 font-bold flex items-center gap-1 text-sm md:text-base hover:underline">
                View All <FaArrowRight size={12} />
            </Link>
        </div>

        {/* Grid: 3 Cards (Vertical) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col">
                    {/* Image Top */}
                    <div className="relative h-48 w-full">
                        <Image 
                            src={item.image_url || "/placeholder.jpg"} 
                            alt={item.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-[10px] font-bold px-2 py-1 rounded uppercase shadow-sm">
                            {item.category || "News"}
                        </span>
                    </div>

                    {/* Content Bottom */}
                    <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase mb-2">
                            <FaCalendarAlt className="text-orange-500" /> 
                            {item.published_date ? new Date(item.published_date).toLocaleDateString() : 'Recent'}
                        </div>
                        
                        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600">
                            {item.title}
                        </h3>
                        
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                            {item.excerpt}
                        </p>

                        <span className="text-blue-600 font-bold text-[11px] flex items-center gap-1 uppercase tracking-wide mt-auto">
                            Read Story <FaArrowRight />
                        </span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}