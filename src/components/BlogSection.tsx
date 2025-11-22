"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';

interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  slug: string;
  content: any;
  featured_image_url?: string;
  image_url?: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        // ✅ FIX: 'ascending: true' kar diya (Purane pehle aayenge)
        .order('created_at', { ascending: true }) 
        .limit(3);

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const getExcerpt = (content: any) => {
    if (Array.isArray(content) && content[0]?.text) {
      return content[0].text.substring(0, 100) + "...";
    }
    if (typeof content === 'string') return content.substring(0, 100) + "...";
    return "Click to read full article.";
  };

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            <p className="text-gray-500 mt-2">Explore our foundational guides and reviews.</p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center text-blue-600 font-semibold hover:underline">
            View All Articles <FaArrowRight className="ml-2" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
             [1,2,3].map((i) => (
                <div key={i} className="h-80 bg-white rounded-xl animate-pulse border border-gray-200"></div>
             ))
          ) : (
             posts.map((blog) => {
                // Image Check Logic
                const imageSrc = blog.featured_image_url || blog.image_url || "https://placehold.co/600x400?text=CarBuddy+Blog";

                return (
                  <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      
                      <div className="relative h-52 w-full overflow-hidden bg-gray-200">
                        <Image 
                          src={imageSrc} 
                          alt={blog.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e: any) => {
                            e.target.src = "https://placehold.co/600x400?text=No+Image";
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Blog
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center text-xs text-gray-400 mb-3">
                          <FaCalendarAlt className="mr-2" /> {formatDate(blog.created_at)}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                          {getExcerpt(blog.content)}
                        </p>
                        
                        <span className="text-blue-600 font-semibold text-sm flex items-center mt-auto">
                          Read Full Story <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={12} />
                        </span>
                      </div>

                    </div>
                  </Link>
                );
             })
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center justify-center w-full px-6 py-3 text-blue-600 border border-blue-600 rounded-lg font-bold hover:bg-blue-50">
                View All Articles
            </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;