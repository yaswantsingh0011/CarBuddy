'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function NewsSection() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3);

      if (data) setNews(data);
      if (error) console.error('News Error:', error.message);
    };

    fetchNews();
  }, []);

  if (!news.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Car News
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Latest launches & auto industry updates
          </p>
        </div>

        <Link
          href="/news"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image_url || '/placeholder-news.jpg'}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <span className="text-xs uppercase font-bold text-green-600">
                {item.category}
              </span>

              <h3 className="mt-2 font-bold text-lg text-gray-900 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {item.excerpt}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                By {item.author} · {item.published_date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
