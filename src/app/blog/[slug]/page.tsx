// src/app/blog/[slug]/page.tsx

import { supabase } from '@/lib/supabaseClient';
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from '@/types/index';
import { BlogSidebar } from '@/components/BlogSidebar';
// import { ContentRenderer } from '@/components/ContentRenderer'; // Ensure ye component aapke paas ho
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Tag } from 'lucide-react';
import React from 'react';

// Helper to clean date
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// 1. Get Post Data
async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

// 2. Get Sidebar Data (Reusable)
async function getSidebarData() {
  const { data: posts } = await supabase.from('posts').select('*').limit(10);
  if (!posts) return { latestPosts: [], categories: [], tags: [], authors: [] };

  // ... (Same sidebar logic as main page, bas short me likha hai yahan) ...
  // Logic same rahega jo listing page par tha
  const latestPosts = posts.slice(0, 5).map(p => ({ title: p.title, date: formatDate(p.created_at), slug: p.slug }));
  return { latestPosts, categories: [], tags: [], authors: [] }; // Placeholder return for now to avoid big code block
}

// --- PAGE COMPONENT ---
export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // ✅ FIX: Await params
  const { slug } = await params; 

  const post = await getPostBySlug(slug);
  // Sidebar data bhi fetch kar sakte ho agar sidebar dikhana hai
  // const sidebarData = await getSidebarData();

  if (!post) return notFound();

  // Content Handling (JSON vs String)
  let contentText = "";
  if (Array.isArray(post.content)) {
      // Agar JSON array hai (Jaise Editor.js ya rich text se aata hai)
      contentText = post.content.map((block: any) => block.text || "").join("\n\n");
  } else if (typeof post.content === 'string') {
      contentText = post.content;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Article Header */}
          <div className="mb-8 text-center">
             <div className="flex items-center justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category || "Article"}
                </span>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
               {post.title}
             </h1>
             
             <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
               <div className="flex items-center gap-2">
                 <User size={16} /> <span>{post.author_name || "CarBuddy Team"}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Calendar size={16} /> <span>{formatDate(post.created_at)}</span>
               </div>
             </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
             <Image 
               src={post.featured_image_url || post.image_url || "/blog/default-blog.jpg"} 
               alt={post.title}
               fill
               className="object-cover"
               priority
             />
          </div>

          {/* Content Body */}
          <article className="prose prose-lg max-w-none text-gray-700">
             {/* Agar ContentRenderer component hai to wo use karo, nahi to ye simple text dikhayega */}
             {/* <ContentRenderer blocks={post.content} /> */}
             
             {/* Fallback Simple Text Display */}
             <div className="whitespace-pre-line leading-relaxed">
                {contentText}
             </div>
          </article>

          {/* Tags Footer */}
          {post.tags && (
             <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                   {Array.isArray(post.tags) && post.tags.map((tag: string) => (
                      <span key={tag} className="flex items-center gap-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                         <Tag size={12} /> {tag}
                      </span>
                   ))}
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}