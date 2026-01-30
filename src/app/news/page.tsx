"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function AutomotiveNewsPage() {
  const supabase = createClient();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Database se News fetch karne ka logic
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_date", { ascending: false });

      if (!error) {
        setNews(data || []);
      }
      setLoading(false);
    };
    fetchNews();
  }, [supabase]);

  // Featured News (Pehli news badi wali)
  const featuredNews = news[0];
  // Baki news grid ke liye
  const latestStories = news.slice(1);
  // Trending Section (Top 3)
  const trendingNews = news.slice(0, 3);

  if (loading) return <div className="text-center py-20 font-bold text-gray-400">Loading Latest News...</div>;

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* CHANGE 1: 'container' aur 'max-w-7xl' hataya, 'w-full' lagaya */}
      <div className="w-full px-4 md:px-8 lg:px-12">
        
        <header className="py-10 border-b mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Automotive News & Reviews</h1>
          <p className="text-gray-500 text-sm">Latest updates, expert reviews, and scoops from the car world.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* ✅ BIG FEATURED CARD */}
          {featuredNews && (
            // CHANGE 2: Height badhai (h-450px -> h-[550px]) taaki image badi dikhe
            <div className="lg:w-2/3 relative h-[550px] rounded-3xl overflow-hidden group shadow-lg">
              <Image src={featuredNews.image_url} alt={featuredNews.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase w-fit mb-3">{featuredNews.category}</span>
                <Link href={`/news/${featuredNews.slug}`}>
                  <h2 className="text-4xl font-bold text-white mb-3 hover:underline cursor-pointer leading-tight">{featuredNews.title}</h2>
                </Link>
                <div className="flex items-center gap-4 text-gray-300 text-xs">
                    <span>By {featuredNews.author}</span>
                    <span>•</span>
                    <span>{new Date(featuredNews.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          )}

          {/* TRENDING SIDEBAR */}
          <aside className="lg:w-1/3 bg-gray-50/50 rounded-3xl p-6 border border-gray-100 h-fit">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">⭐ Trending Now</h3>
            <div className="space-y-6">
              {trendingNews.map((item) => (
                <Link href={`/news/${item.slug}`} key={item.id} className="flex gap-4 group items-center">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image_url} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">{new Date(item.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border rounded-xl text-xs font-bold text-blue-600 hover:bg-white transition-all">View All Trending</button>
          </aside>
        </div>

        {/* ✅ LATEST STORIES GRID */}
        <div className="mb-10">
          <h3 className="text-2xl font-black text-gray-900 mb-8 border-l-4 border-orange-600 pl-4">Latest Stories</h3>
          
          {/* CHANGE 3: Gap badhaya gap-8 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestStories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                
                {/* CHANGE 4: Card Image height badhai (h-48 -> h-64) */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={story.image_url} alt={story.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded uppercase">{story.category}</span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-tighter">{new Date(story.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  
                  {/* CHANGE 5: Title font size badhaya */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{story.title}</h4>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">{story.excerpt}</p>
                  
                  <Link href={`/news/${story.slug}`} className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-100">
                    Read Full Story <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}