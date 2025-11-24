// src/app/blog/page.tsx

import { supabase } from '@/lib/supabaseClient';
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from '@/types/index';
import BlogLayout from './BlogLayout';

// --- Data Fetching ---
async function getPosts(): Promise<Post[]> {
  // 'select' me '*' use kar rahe hain taaki saare columns aa jayein
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts from Supabase:', error.message);
    // Error aane par empty array return karein taaki page crash na ho
    return [];
  }

  // Data ko Safe Format me map karte hain (Null checks ke saath)
  const formattedData: Post[] = (data || []).map((item: any) => ({
    id: item.id,
    title: item.title || "Untitled Post",
    slug: item.slug,
    created_at: item.created_at,
    date: new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    content: item.content || "",
    excerpt: item.excerpt || "Click to read more...",
    featured_image_url: item.featured_image_url || "/blog/default-blog.jpg", // Fallback Image
    category: item.category || "General",
    author_name: item.author_name || "Admin",
    tags: Array.isArray(item.tags) ? item.tags : [], // Ensure tags is always an array
  }));

  return formattedData;
}

async function getSidebarData(posts: Post[]) {
  // 1. Latest Posts
  const latestPosts: SidebarLatestPost[] = posts.slice(0, 5).map(p => ({
    title: p.title,
    date: p.date || "",
    slug: p.slug,
  }));

  // 2. Categories
  const categoryCounts = new Map<string, number>();
  posts.forEach(p => {
    const cat = p.category;
    categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
  });
  const categories: SidebarCategory[] = Array.from(categoryCounts, ([name, count]) => ({ name, count }));

  // 3. Tags
  const allTags = new Set<string>();
  posts.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach((tag: string) => allTags.add(tag));
    }
  });
  const tags = Array.from(allTags);

  // 4. Authors
  const authorCounts = new Map<string, number>();
  posts.forEach(p => {
    const auth = p.author_name;
    authorCounts.set(auth, (authorCounts.get(auth) || 0) + 1);
  });
  const authors: SidebarAuthor[] = Array.from(authorCounts, ([name, count]) => ({
    name,
    posts: count,
    initial: name.charAt(0).toUpperCase()
  }));

  return { latestPosts, categories, tags, authors };
}

export default async function BlogPage() {
  const posts = await getPosts();
  const sidebarData = await getSidebarData(posts);

  return (
    <BlogLayout 
      initialPosts={posts}
      latestPosts={sidebarData.latestPosts}
      categories={sidebarData.categories}
      tags={sidebarData.tags}
      authors={sidebarData.authors}
    />
  );
}