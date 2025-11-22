// src/app/blog/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from '@/types/index';
import BlogLayout from './BlogLayout';

// --- Data Fetching ---
async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*') // Saare columns lelo
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
  
  // Data ko Post type me map karna (Agar zaroorat ho)
  // Yahan hum assume kar rahe hain ki Supabase columns aur Post type same hain
  return data || [];
}

async function getSidebarData(posts: Post[]) {
  // Latest Posts (Title, Date, Slug)
  const latestPosts = posts.slice(0, 5).map(p => ({
    title: p.title,
    date: new Date(p.created_at).toLocaleDateString(), // Date format fix
    slug: p.slug,
  }));

  // Categories Count
  const categoryCounts = new Map<string, number>();
  posts.forEach(p => {
    const cat = p.category || 'Uncategorized';
    categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
  });
  const categories = Array.from(categoryCounts, ([name, count]) => ({ name, count }));

  // Tags (Unique)
  const allTags = new Set<string>();
  posts.forEach(p => {
    if (Array.isArray(p.tags)) { // Check if array
        p.tags.forEach((tag: string) => allTags.add(tag));
    }
  });
  const tags = Array.from(allTags);

  // Authors
  const authorCounts = new Map<string, number>();
  posts.forEach(p => {
    const auth = p.author_name || 'Admin';
    authorCounts.set(auth, (authorCounts.get(auth) || 0) + 1);
  });
  const authors = Array.from(authorCounts, ([name, posts]) => ({
    name,
    posts,
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