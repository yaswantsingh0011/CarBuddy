// src/app/blog/[slug]/page.tsx

import { supabase } from '@/lib/supabaseClient';
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from '@/types/index';
import { BlogSidebar } from '@/components/BlogSidebar';
import { ContentRenderer } from '@/components/ContentRenderer'; 
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import React from 'react';

// --- Data Fetching Functions (No Change) ---

async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single();
  if (error || !data) { return null; }
  return data;
}

async function getSidebarData(): Promise<{
  latestPosts: SidebarLatestPost[];
  categories: SidebarCategory[];
  tags: string[];
  authors: SidebarAuthor[];
}> {
  // ... (Aapka function bilkul theek hai, koi change nahi)
  const { data: posts, error } = await supabase.from('posts').select('title, date, slug, category, tags, author_name');
  if (error || !posts) { return { latestPosts: [], categories: [], tags: [], authors: [] }; }
  
  const latestPosts = posts.slice(0, 6).map(post => ({ title: post.title, date: post.date, slug: post.slug }));
  const categoryCounts = new Map<string, number>();
  posts.forEach(post => { categoryCounts.set(post.category, (categoryCounts.get(post.category) || 0) + 1); });
  const categories: SidebarCategory[] = Array.from(categoryCounts, ([name, count]) => ({ name, count }));
  const allTags = new Set<string>();
  posts.forEach(post => {
    if(post.tags) {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });
  const tags = Array.from(allTags);
  const authorCounts = new Map<string, number>();
  posts.forEach(post => { authorCounts.set(post.author_name, (authorCounts.get(post.author_name) || 0) + 1); });
  const authors: SidebarAuthor[] = Array.from(authorCounts, ([name, posts]) => ({ 
    name, 
    posts,
    initial: name.charAt(0).toUpperCase()
  }));
  
  return { latestPosts, categories, tags, authors };
}


// --- Main Blog Post Detail Page (Component) ---
export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  
  // ✅ FIX: Aapki 'await' wali line ko waapas daal diya hai.
  // Ye 'await params' error ko fix karne ke liye zaroori hai.
  const slug = await Promise.resolve(params.slug); 

  // Ab 'slug' ko safely use karenge.
  const [post, sidebarData] = await Promise.all([
    getPostBySlug(slug),
    getSidebarData()            
  ]);

  if (!post) {
    // Agar post Supabase mein nahi mila, ya slug galat hai, toh 404 dikhao.
    notFound();
  }

  // --- 💡 RUNTIME ERROR FIX (Ye pehle se theek hai) ---
  // Ye 'post.content' ko check karta hai
  let contentBlocks = []; 
  
  if (typeof post.content === 'string') {
    try {
      contentBlocks = JSON.parse(post.content);
    } catch (e) {
      console.error("Failed to parse content JSON string:", e);
      notFound();
    }
  } else if (Array.isArray(post.content)) {
    contentBlocks = post.content;
  } else {
    // YAHAN PAR AAPKA SERVER ERROR AA RAHA THA
    // Iska matlab 'post.content' null ya undefined hai.
    console.error("Post content is not a string or array, or it is null.");
    notFound(); 
  }
  // --- RUNTIME ERROR FIX END ---

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          
          <article className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden border mb-6">
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            
            <p className="text-xl italic text-gray-700 mb-6">{post.excerpt}</p>

            <ContentRenderer blocks={contentBlocks} />
            
            <div className="flex flex-wrap gap-2 mt-6 border-t border-gray-200 pt-6">
              {post.tags.map((tag) => (
                 <span
                  key={tag}
                  className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-8 h-fit">
            <BlogSidebar
              latestPosts={sidebarData.latestPosts}
              categories={sidebarData.categories}
              tags={sidebarData.tags}
              authors={sidebarData.authors}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}