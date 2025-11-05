// src/app/blog/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from '@/types/index';
import BlogLayout from './BlogLayout';

// --- Data Fetching Functions ---

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    // === BADLAAV: Saare fields, including SLUG, fetch kiye gaye hain ===
    .select('id, created_at, title, excerpt, slug, featured_image_url, category, date, author_name, tags, content') 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
  return data || [];
}

async function getSidebarData(posts: Post[]): Promise<{
  latestPosts: SidebarLatestPost[];
  categories: SidebarCategory[];
  tags: string[];
  authors: SidebarAuthor[];
}> {
  // Logic to structure sidebar data from fetched posts
  const latestPosts = posts
    .slice(0, 5)
    .map(post => ({
      title: post.title,
      date: post.date,
      slug: post.slug, // <-- Ab yeh safe hai
    }));

  const categoryCounts = new Map<string, number>();
  posts.forEach(post => {
    categoryCounts.set(post.category, (categoryCounts.get(post.category) || 0) + 1);
  });
  const categories: SidebarCategory[] = Array.from(categoryCounts, ([name, count]) => ({ name, count }));

  const allTags = new Set<string>();
  posts.forEach(post => {
    if(post.tags) {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });
  const tags = Array.from(allTags);

  const authorCounts = new Map<string, number>();
  posts.forEach(post => {
    authorCounts.set(post.author_name, (authorCounts.get(post.author_name) || 0) + 1);
  });
  const authors: SidebarAuthor[] = Array.from(authorCounts, ([name, posts]) => ({ 
    name, 
    posts,
    initial: name.charAt(0).toUpperCase()
  }));

  return { latestPosts, categories, tags, authors };
}


// --- Main Blog Page (Server Component) ---
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