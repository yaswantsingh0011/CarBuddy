import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// ✅ 1. SEO Metadata (Database se)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  
  const { data: blog } = await supabase
    .from('blogs')
    .select('title, content, image_url')
    .eq('slug', slug)
    .single();

  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: `${blog.title} - CarBuddy`,
    description: blog.content?.substring(0, 160),
    openGraph: { images: [blog.image_url || '/cars/placeholder.jpg'] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();

  // ✅ 2. Current Blog Fetch Karo
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!blog) notFound();

  // ✅ 3. Sidebar Data (Database se Latest Reads)
  const { data: latestPosts } = await supabase
    .from('blogs')
    .select('id, title, slug, image_url, published_date')
    .neq('id', blog.id) // Current post ko chhod kar
    .neq('category', 'News')
    .order('published_date', { ascending: false })
    .limit(5);

  // ✅ 4. Categories count (Dynamic)
  const { data: allCategories } = await supabase
    .from('blogs')
    .select('category');

  const categoryCounts = allCategories?.reduce((acc: any, curr: any) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const popularTags = ['Used Car', 'EV', 'Budget', 'Luxury', 'Safety', 'Mileage', 'Sedan', 'SUV'];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 text-gray-800">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Main Content (70%) */}
          <div className="lg:w-2/3">
            <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 font-sans">
              
              <header className="mb-8">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">
                  {blog.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <span>By <span className="text-gray-900 font-bold">{blog.author || 'Admin'}</span></span>
                  <span className="mx-3">•</span>
                  <time>
                    {blog.published_date 
                      ? new Date(blog.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                      : 'Archive'}
                  </time>
                </div>
              </header>

              <div className="relative w-full h-[300px] md:h-[450px] mb-10 rounded-xl overflow-hidden shadow-inner">
                <Image 
                  src={blog.image_url || '/cars/placeholder.jpg'} 
                  alt={blog.title} 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>

              {/* ✅ SOLUTION 1: whitespace-pre-line se normal text paragraphs dikhenge */}
              <div 
                className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed 
                prose-headings:text-gray-900 prose-headings:font-bold prose-strong:text-gray-900
                whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

            </article>
          </div>

          {/* RIGHT: Sidebar (30%) */}
          <div className="lg:w-1/3 space-y-8">
            
            {/* Widget 1: More To Read */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">More To Read</h3>
              <div className="space-y-5">
                {latestPosts?.map(post => (
                  <Link href={`/blogs/${post.slug}`} key={post.id} className="flex gap-4 group items-center">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-50 shadow-sm">
                      <Image 
                        src={post.image_url || '/cars/placeholder.jpg'} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                        {post.published_date ? new Date(post.published_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 2: Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 font-sans">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categoryCounts && Object.entries(categoryCounts).map(([cat, count]) => (
                  <li key={cat} className="flex justify-between items-center text-gray-600 text-sm py-2 border-b last:border-0 border-gray-50">
                    <span className="font-medium hover:text-blue-600 cursor-pointer transition-colors">{cat}</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">{count as number}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Widget 3: Popular Tags */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-sans">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <span key={tag} className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300 uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Widget 4: CTA */}
            <div className="bg-slate-900 p-8 rounded-2xl text-white text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Ready to Buy?</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed font-medium">Compare prices, features, and find the perfect car for you.</p>
              <Link href="/explore" className="block w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
                Explore Cars
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}