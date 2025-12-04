import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '@/data/blogs';

export const metadata = {
  title: 'CarBuddy Blog - Expert Advice & Reviews',
  description: 'Explore the latest automotive trends, buying guides, and expert reviews.',
};

export default function BlogListingPage() {
  // Sidebar Logic
  const categories = Array.from(new Set(blogs.map(b => b.category))); 
  const latestPosts = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  const popularTags = ['Used Car', 'EV', 'Budget', 'Luxury', 'Safety', 'Mileage', 'Sedan', 'SUV'];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            CarBuddy Blog
          </h1>
          <p className="text-gray-500 text-lg">
            Expert advice, tips, and insights for your automotive journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Blog Cards (70%) */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id} className="group h-full">
                  <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={blog.image || '/cars/placeholder.jpg'}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-gray-400 mb-3 font-medium uppercase">
                        <span>{blog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.author}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </p>
                      <div className="text-blue-600 text-sm font-semibold mt-auto flex items-center">
                        Read Article 
                        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Sidebar (30%) */}
          <div className="lg:w-1/3 space-y-8">
            
            {/* Widget: Recent Posts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Posts</h3>
              <div className="space-y-6">
                {latestPosts.map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="flex gap-4 group">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={post.image || '/cars/placeholder.jpg'} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform"/>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">{post.title}</h4>
                      <p className="text-xs text-gray-400">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget: Categories */}
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

            {/* Widget: Tags */}
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

          </div>
        </div>
      </div>
    </div>
  );
}