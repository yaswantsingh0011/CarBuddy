// src/app/blog/BlogLayout.tsx
"use client";

import { useState } from "react";
import { Grid, List } from "lucide-react";
import { BlogCard } from "@/components/BlogCard"; // Ensure ye component sahi ho
import { BlogSidebar } from "@/components/BlogSidebar"; // Ensure ye component sahi ho
import { Post, SidebarAuthor, SidebarCategory, SidebarLatestPost } from "@/types/index";

const Button = ({ children, className, ...props }: any) => (
    <button className={`flex items-center justify-center rounded-md transition-colors ${className}`} {...props}>{children}</button>
);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-3 text-gray-900">
            CarBuddy Blog
          </h1>
          <p className="text-center text-gray-500 max-w-2xl mx-auto">
            Expert advice, tips, and insights for your automotive journey
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          
          {/* Blog Posts Area */}
          <div>
            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-900"}`}
                    >
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-900"}`}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
              </div>
            </div>

            {/* Grid Logic */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "space-y-8"}>
              {initialPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="hidden lg:block">
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