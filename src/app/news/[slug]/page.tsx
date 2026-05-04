import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import type { Metadata } from 'next';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaCheckCircle, FaShareAlt } from 'react-icons/fa';

interface Props {
  params: Promise<{ slug: string }>;
}

// ✅ SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const { data: news } = await supabase.from('news').select('title, excerpt, image_url').eq('slug', slug).single();
  
  if (!news) return { title: 'News Not Found' };
  return {
    title: `${news.title} - CarBuddy News`,
    description: news.excerpt,
    openGraph: { images: [news.image_url || '/cars/placeholder.jpg'] },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();

  // News fetch karo database se slug use karke
  const { data: news, error } = await supabase.from('news').select('*').eq('slug', slug).single();
  
  if (error || !news) {
    console.error("News fetch error:", error);
    notFound();
  }

  // Sidebar: Trending News (Recent 4)
  const { data: trendingNews } = await supabase
    .from('news')
    .select('title, slug, image_url, published_date')
    .neq('id', news.id)
    .order('published_date', { ascending: false })
    .limit(4);

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Top Navigation */}
      <nav className="container mx-auto px-4 max-w-5xl py-6 flex justify-between items-center border-b mb-8">
        <Link href="/news" className="flex items-center gap-2 text-gray-500 hover:text-black text-xs font-bold transition-colors uppercase tracking-widest">
          <FaArrowLeft /> Back to News
        </Link>
        <div className="flex gap-4 text-gray-400">
          <FaShareAlt className="cursor-pointer hover:text-blue-600 transition-colors" />
        </div>
      </nav>

      {/* Header Section */}
      <header className="container mx-auto px-4 max-w-4xl text-center mb-10">
        <div className="flex justify-center gap-4 mb-6">
          <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-md uppercase tracking-widest">{news.category}</span>
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" /> 
            {new Date(news.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
          {news.title}
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-black text-lg border shadow-sm">
            {news.author?.[0] || 'A'}
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-gray-900">{news.author || 'Admin'}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">CarBuddy News Desk</p>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <div className="container mx-auto px-4 max-w-5xl mb-12">
        <div className="relative h-[300px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
          <Image src={news.image_url || '/cars/placeholder.jpg'} alt={news.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: Article Content */}
          <div className="lg:w-2/3">
            {/* Excerpt Box */}
            <div className="bg-blue-50/70 border-l-4 border-blue-600 p-8 rounded-r-2xl mb-10">
              <p className="text-gray-700 text-xl font-medium italic leading-relaxed">
                "{news.excerpt}"
              </p>
            </div>
            
            {/* Main Body (Using whitespace-pre-line for normal text formatting) */}
            <div 
              className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed font-medium whitespace-pre-line 
              prose-headings:text-gray-900 prose-headings:font-black prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* RIGHT: Sidebar (Only Relevant Content) */}
          <aside className="lg:w-1/3 space-y-10">
            
            {/* Trending News Widget */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-6 border-b pb-4">Trending Now</h3>
              <div className="space-y-6">
                {trendingNews?.map((item) => (
                  <Link href={`/news/${item.slug}`} key={item.slug} className="flex gap-4 group">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-white">
                      <Image src={item.image_url || '/cars/placeholder.jpg'} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">{item.title}</h4>
                      <p className="text-[9px] font-black text-gray-400 uppercase mt-2 tracking-tighter">
                        {new Date(item.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Tags */}
            <div className="bg-gray-50 p-6 rounded-[2rem]">
              <h4 className="font-black text-gray-400 uppercase text-[10px] tracking-widest mb-4">Related Topics</h4>
              <div className="flex flex-wrap gap-2">
                {['#SUV', '#FutureCars', '#ElectricIndia', '#CarBuddyExclusive'].map(tag => (
                  <span key={tag} className="bg-white text-gray-500 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-gray-100 hover:text-blue-600 cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>
          
        </div>
      </div>
    </div>
  );
}