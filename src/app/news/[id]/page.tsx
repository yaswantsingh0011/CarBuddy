'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaCheckCircle, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { newsArticles } from '@/data/newsData'; 

const NewsDetail = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const article = newsArticles.find((item) => item.id === Number(id));

  if (!article) return null;

  // ✅ NEW: Text formatting logic (Bold support + Paragraphs)
  const renderContent = (text: string) => {
    return text.split('\n').map((str, index) => {
      // Empty lines ko skip karein
      if (!str.trim()) return <br key={index} />;

      // **Bold** ko detect karke HTML <strong> me convert karna
      const formattedText = str.split(/(\*\*.*?\*\*)/).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-gray-900 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed text-lg">
          {formattedText}
        </p>
      );
    });
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-100 bg-white sticky top-20 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
            <Link href="/news" className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
            <FaArrowLeft className="mr-2" /> Back to News
            </Link>
            <div className="flex gap-4 text-gray-400">
                <FaFacebook className="cursor-pointer hover:text-blue-600 text-xl"/>
                <FaTwitter className="cursor-pointer hover:text-blue-400 text-xl"/>
                <FaWhatsapp className="cursor-pointer hover:text-green-500 text-xl"/>
            </div>
        </div>
      </div>

      {/* ✅ Container Width Badha Diya (max-w-7xl) */}
      <div className="container mx-auto px-4 max-w-7xl mt-8">
        
        {/* Header Section */}
        <div className="max-w-5xl mx-auto text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider">
                {article.category}
            </span>
            <span className="text-gray-500 text-sm flex items-center gap-2 font-medium">
                <FaCalendarAlt /> {article.date}
            </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article.title}
            </h1>

            <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    <FaUser />
                </div>
                <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">{article.author}</p>
                    <p className="text-xs text-gray-500 uppercase">CarBuddy Expert</p>
                </div>
            </div>
        </div>

        {/* Full Width Image */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image 
            src={article.image} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* ✅ Layout Grid (Text 8 cols : Sidebar 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Article Text (Wider Area) */}
            <div className="lg:col-span-8">
                {/* Excerpt Box */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
                    <p className="text-xl md:text-2xl font-serif font-medium text-gray-800 italic">
                        "{article.excerpt}"
                    </p>
                </div>

                {/* Main Body */}
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
                    {renderContent(article.content || "")}
                </div>
            </div>

            {/* Right: Sidebar (Sticky) */}
            <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                    
                    {/* Highlights Box */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 border-b pb-2">
                            KEY HIGHLIGHTS
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-700">
                                <FaCheckCircle className="text-green-500 mt-1.5 flex-shrink-0 text-lg" />
                                <span className="text-base font-medium">Launch expected by early 2026.</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <FaCheckCircle className="text-green-500 mt-1.5 flex-shrink-0 text-lg" />
                                <span className="text-base font-medium">Will rival Creta & Grand Vitara directly.</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <FaCheckCircle className="text-green-500 mt-1.5 flex-shrink-0 text-lg" />
                                <span className="text-base font-medium">ADAS Level 2 features confirmed.</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <FaCheckCircle className="text-green-500 mt-1.5 flex-shrink-0 text-lg" />
                                <span className="text-base font-medium">Est. Price: ₹ 15 - 22 Lakh.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Share / Tags Box */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                         <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Related Tags</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-blue-50 cursor-pointer">#SUV</span>
                            <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-blue-50 cursor-pointer">#Electric</span>
                            <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-blue-50 cursor-pointer">#CarReview</span>
                            <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-blue-50 cursor-pointer">#2025Launch</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default NewsDetail;