'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaArrowRight, FaStar } from 'react-icons/fa';
import { newsArticles } from '@/data/newsData'; // ✅ Updated Import

const NewsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      
      {/* Header Section */}
      <div className="bg-white shadow-sm py-8 mb-8">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Automotive News & Reviews</h1>
            <p className="text-gray-500 mt-2">Latest updates, expert reviews, and scoop from the car world.</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        
        {/* Featured Story (Hero Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* ✅ Main Big News Link */}
            <Link href={`/news/${newsArticles[0].id}`} className="lg:col-span-2 block">
                <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg h-[400px]">
                    <Image 
                        src={newsArticles[0].image} 
                        alt="Featured News" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-wide">
                            {newsArticles[0].category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight group-hover:underline decoration-white underline-offset-4">
                            {newsArticles[0].title}
                        </h2>
                        <div className="flex items-center text-gray-300 text-sm gap-4">
                            <span className="flex items-center gap-1"><FaUser /> {newsArticles[0].author}</span>
                            <span className="flex items-center gap-1"><FaCalendarAlt /> {newsArticles[0].date}</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Sidebar / Trending */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <FaStar className="text-yellow-400"/> Trending Now
                </h3>
                <div className="space-y-6">
                    {newsArticles.slice(1, 4).map((item, idx) => (
                        // ✅ Sidebar Link Added
                        <Link href={`/news/${item.id}`} key={idx} className="flex gap-4 group cursor-pointer">
                            <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                                <span className="text-xs text-gray-500 mt-1 block">{item.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <button className="w-full mt-6 py-2 text-blue-600 font-semibold text-sm border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                    View All Trending
                </button>
            </div>
        </div>

        {/* Latest Articles Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">Latest Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                            src={article.image} 
                            alt={article.title} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded">
                            {article.category}
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center text-gray-400 text-xs mb-3 gap-3">
                            <span className="flex items-center gap-1"><FaCalendarAlt /> {article.date}</span>
                        </div>
                        {/* ✅ Title Click Link */}
                        <Link href={`/news/${article.id}`}>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">
                                {article.title}
                            </h3>
                        </Link>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {article.excerpt}
                        </p>
                        {/* ✅ Read Full Story Link */}
                        <Link href={`/news/${article.id}`} className="inline-flex items-center text-blue-600 font-semibold text-sm hover:underline">
                            Read Full Story <FaArrowRight className="ml-1 text-xs" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default NewsPage;