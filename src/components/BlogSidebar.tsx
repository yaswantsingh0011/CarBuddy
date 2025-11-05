// src/components/BlogSidebar.tsx
import { Calendar, FolderOpen, Tag, Users } from "lucide-react";
import { SidebarAuthor, SidebarCategory, SidebarLatestPost } from "@/types/index";
import Link from "next/link";

// Dummy components
const Card = ({ className, children }: any) => <div className={`${className} bg-white rounded-lg border border-gray-200 shadow-sm`}>{children}</div>
const CardHeader = ({ className, children }: any) => <div className={`${className} p-6`}>{children}</div>
const CardTitle = ({ className, children }: any) => <h3 className={`${className} text-lg font-semibold text-gray-900`}>{children}</h3>
const CardContent = ({ className, children }: any) => <div className={`${className} p-6 pt-0`}>{children}</div>
const Badge = ({ className, children, ...props }: any) => <span className={`${className} px-2 py-1 text-xs font-medium rounded-full`} {...props}>{children}</span>

interface SidebarProps {
  latestPosts: SidebarLatestPost[];
  categories: SidebarCategory[];
  tags: string[];
  authors: SidebarAuthor[];
}

export const BlogSidebar = ({ latestPosts, categories, tags, authors }: SidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Latest Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
            Latest Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestPosts.map((post, index) => (
            <div key={index}>
              <Link href={`/blog/${post.slug}`}>
                <h4 className="text-sm font-medium leading-tight text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                  {post.title}
                </h4>
              </Link>
              <p className="text-xs text-gray-600">{post.date}</p>
              {index < latestPosts.length - 1 && <div className="h-px bg-gray-200 mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FolderOpen className="h-5 w-5 text-blue-600" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                {category.name}
              </span>
              <span className="text-sm text-gray-600">{category.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="h-5 w-5 text-blue-600" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Authors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-blue-600" />
            Authors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {authors.map((author) => (
            <div key={author.name} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-medium">
                {author.initial}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                  {author.name}
                </h4>
                <p className="text-xs text-gray-600">{author.posts} posts</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};