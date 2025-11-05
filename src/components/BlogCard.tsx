// src/components/BlogCard.tsx
import { Calendar, User } from "lucide-react";
import { Post } from "@/types/index";
import Link from "next/link";
import Image from "next/image";

// Dummy components
const Card = ({ className, children }: any) => <div className={className}>{children}</div>
const CardHeader = ({ className, children }: any) => <div className={className}>{children}</div>
const CardContent = ({ className, children }: any) => <div className={className}>{children}</div>
const CardFooter = ({ className, children }: any) => <div className={className}>{children}</div>
const Badge = ({ className, children, ...props }: any) => <span className={`${className} px-2 py-1 text-xs font-medium rounded-full`} {...props}>{children}</span>

export const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Card className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-medium bg-gray-100 text-gray-800">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors hover:text-blue-600">
            {post.title}
          </h2>
        </Link>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 border-t border-gray-200 p-6 pt-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-800">{post.author_name}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border border-gray-300 text-gray-700">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};