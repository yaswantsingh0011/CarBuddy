// src/components/BlogCard.tsx
import { Calendar, User } from "lucide-react";
import { Post } from "@/types/index";
import Link from "next/link";
import Image from "next/image";

// Dummy components (Styling Helpers)
const Card = ({ className, children }: any) => <div className={className}>{children}</div>
const CardHeader = ({ className, children }: any) => <div className={className}>{children}</div>
const CardContent = ({ className, children }: any) => <div className={className}>{children}</div>
const CardFooter = ({ className, children }: any) => <div className={className}>{children}</div>
const Badge = ({ className, children, ...props }: any) => <span className={`${className} px-2 py-1 text-xs font-medium rounded-full`} {...props}>{children}</span>

export const BlogCard = ({ post }: { post: Post }) => {
  // Fallback Image Logic
  const imageUrl = post.featured_image_url || "/blog/default-blog.jpg"; 

  return (
    <Card className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      
      {/* Image Section */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <CardHeader className="p-6 space-y-3 pb-2">
        <div className="flex items-center justify-between">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
            {post.category || "General"}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {/* Date Formatting agar string raw aayi to */}
            <span>{post.date ? new Date(post.date).toLocaleDateString() : "Recent"}</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 line-clamp-2">
            {post.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="px-6 pb-4 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">
            {post.excerpt || "Click to read full article..."}
        </p>
      </CardContent>

      <CardFooter className="flex-col items-start gap-4 border-t border-gray-100 p-6 pt-4 bg-gray-50/50 mt-auto">
        <div className="flex items-center gap-2 text-sm w-full">
          <div className="bg-gray-200 p-1 rounded-full">
             <User className="h-3 w-3 text-gray-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs">{post.author_name || "Admin"}</span>
        </div>
        
        {/* Safe Tag Mapping */}
        {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 w-full">
            {post.tags.slice(0, 3).map((tag) => ( // Limit tags to 3 to avoid overflow
                <span key={tag} className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">
                #{tag}
                </span>
            ))}
            </div>
        )}
      </CardFooter>
    </Card>
  );
};