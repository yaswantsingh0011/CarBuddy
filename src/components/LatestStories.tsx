"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";

interface LatestStoriesProps {
  newsData: any[];
}

export default function LatestStories({ newsData }: LatestStoriesProps) {
  if (!newsData || newsData.length === 0) return null;

  return (
    // CHANGE 1: Gap badhaya (gap-6 -> gap-8) taaki cards khule-khule dikhein
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsData.map((item: any) => {
        const title = item.title || item.headline;
        const image =
          item.image_url ||
          item.thumbnail ||
          "/cars/placeholder.jpg";

        const slug = item.slug;
        const category = item.category || "Auto News";
        const date =
          item.published_date ||
          item.published_at ||
          item.created_at;

        if (!title || !slug) return null;

        return (
          <div
            key={item.id || slug}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group h-full"
          >
            {/* CHANGE 2: Image Height badhayi (h-40 -> h-60). Ab photo badi dikhegi */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* CHANGE 3: Badge ka font badhaya */}
              <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded uppercase shadow-md">
                {category}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
              {date && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-semibold uppercase">
                  <FaCalendarAlt className="text-orange-500" />
                  {new Date(date).toLocaleDateString()}
                </div>
              )}

              {/* CHANGE 4: Title ka font badhaya (text-[14px] -> text-xl) */}
              <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 min-h-[3.5rem]">
                {title}
              </h4>

              {/* CHANGE 5: Paragraph text badhaya (text-[10px] -> text-sm) */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                {item.excerpt ||
                  item.summary ||
                  "Read the latest updates about this car launch..."}
              </p>

              <Link
                href={`/news/${slug}`}
                // CHANGE 6: Link text bhi thoda bada aur prominent kiya
                className="text-blue-600 font-bold text-sm flex items-center gap-2 mt-auto border-t pt-4 group-hover:translate-x-1 transition-transform"
              >
                Read Story <span>→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}