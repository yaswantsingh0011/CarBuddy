import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '@/data/blogs';
import type { Metadata } from 'next';

// ✅ Change 1: Params ab Promise hai
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ Change 2: Await lagaya taaki slug mile
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} - CarBuddy`,
    description: blog.excerpt,
    openGraph: { images: [blog.image] },
  };
}

// ✅ Change 3: Component ko async banaya
export default async function BlogPostPage({ params }: Props) {
  // ✅ Change 4: Params ko await kiya (Sabse zaroori line)
  const { slug } = await params;
  
  const blog = blogs.find((b) => b.slug === slug);

  // Agar blog nahi mila toh 404
  if (!blog) {
    notFound();
  }

  // Sidebar Data
  const latestPosts = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

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

          {/* RIGHT: Sidebar (30%) */}
          <div className="lg:w-1/3 space-y-8">
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Latest Reads</h3>
              <div className="space-y-5">
                {latestPosts.filter(p => p.id !== blog.id).map(post => (
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
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

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