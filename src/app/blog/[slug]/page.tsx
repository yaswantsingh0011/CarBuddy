import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} - CarBuddy`,
    description: blog.excerpt,
    openGraph: { images: [blog.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  // Sidebar Data Logic
  const latestPosts = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                               .filter(p => p.id !== blog.id) // Current post ko hata diya
                               .slice(0, 4); // Top 4 posts
  
  const categories = Array.from(new Set(blogs.map(b => b.category)));
  
  // Dummy tags design ke liye
  const popularTags = ['Used Car', 'EV', 'Budget', 'Luxury', 'Safety', 'Mileage', 'Sedan', 'SUV'];


  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Main Content (70%) */}
          <div className="lg:w-2/3">
            <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              
              <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6">
                ← Back to Blog
              </Link>

              <header className="mb-8">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                  {blog.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>By <span className="text-gray-900 font-semibold">{blog.author}</span></span>
                  <span className="mx-3">•</span>
                  <time>{blog.date}</time>
                </div>
              </header>

              <div className="relative w-full h-[300px] md:h-[450px] mb-10 rounded-xl overflow-hidden">
                <Image 
                  src={blog.image || '/cars/placeholder.jpg'} 
                  alt={blog.title} 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>

              <div 
                className="prose prose-lg prose-blue max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

            </article>
          </div>

          {/* RIGHT: Sidebar (30%) - Content Yahan Aayega */}
          <div className="lg:w-1/3 space-y-8">
            
            {/* Widget 1: Latest Reads (Current post ko chodkar) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">More To Read</h3>
              <div className="space-y-5">
                {latestPosts.map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="flex gap-4 group">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image 
                        src={post.image || '/cars/placeholder.jpg'} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 2: Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat} className="flex justify-between items-center text-gray-600 text-sm py-2 border-b last:border-0 border-gray-50">
                    <span>{cat}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{blogs.filter(b => b.category === cat).length}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Widget 3: Tags (Design consistency ke liye) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Widget 4: Call to Action */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to Buy?</h3>
              <p className="text-blue-100 mb-6 text-sm">Compare prices, features, and find the perfect car for you.</p>
              <Link href="/explore" className="block w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Explore Cars
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}