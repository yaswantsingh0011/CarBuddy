'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { newsArticles } from '@/data/newsData';

const LatestStories = () => {
  // Sirf pehli 3 news dikhayenge Homepage ke liye
  const displayedStories = newsArticles.slice(0, 3);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Heading with "View All" button */}
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-500 pl-3">
                Latest Stories
            </h2>
            <Link href="/news" className="text-blue-600 font-semibold hover:underline text-sm hidden md:block">
                View All News
            </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStories.map((article) => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group flex flex-col h-full">
              
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                  {article.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-xs mb-3 gap-3">
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {article.date}</span>
                </div>
                
                <Link href={`/news/${article.id}`} className="block mb-2">
                    <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                    </h3>
                </Link>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                  {article.excerpt}
                </p>

                <Link href={`/news/${article.id}`} className="inline-flex items-center text-blue-600 font-semibold text-sm hover:underline mt-auto">
                  Read Full Story <FaArrowRight className="ml-1 text-xs" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
            <Link href="/news" className="inline-block px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100">
                View All News
            </Link>
        </div>

      </div>
    </section>
  );
};

export default LatestStories;