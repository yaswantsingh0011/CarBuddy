// src/app/blog/BlogLayout.tsx
"use client";

import { useState } from "react";
import { Grid, List } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from "@/types/index";

// Dummy components
const Button = ({ children, ...props }: any) => <button {...props}>{children}</button>;

interface BlogLayoutProps {
  initialPosts: Post[];
  latestPosts: SidebarLatestPost[];
  categories: SidebarCategory[];
  tags: string[];
  authors: SidebarAuthor[];
}

const BlogLayout = ({
  initialPosts,
  latestPosts,
  categories,
  tags,
  authors
}: BlogLayoutProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [blogPosts, setBlogPosts] = useState(initialPosts);

  return (
    // === BADLAAV 1: 'bg-background' ko 'bg-white' kiya ===
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-border py-12">
        <div className="container mx-auto px-4">
          {/* === BADLAAV 2: Text ko dark kiya === */}
          <h1 className="text-4xl font-bold text-center mb-3 text-gray-900">
            CarBuddy Blog
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Expert advice, tips, and insights for your automotive journey
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Blog Posts Section */}
          <div>
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                
                <select 
                  defaultValue="newest" 
                  className="w-[180px] bg-white text-gray-900 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
                
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border rounded-md ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border-gray-300"}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`p-2 border rounded-md ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border-gray-300"}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Blog Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" : "space-y-6 mb-8"}>
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <BlogSidebar
              latestPosts={latestPosts}
              categories={categories}
              tags={tags}
              authors={authors}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;