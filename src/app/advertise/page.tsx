// src/app/advertise/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaBullhorn, FaUsers, FaChartPie, FaHandshake, FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Advertise with Us | CarBuddy',
  description: 'Reach millions of car buyers and enthusiasts. Advertise on CarBuddy to drive high-intent leads and brand awareness.',
};

export default function AdvertisePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Grow Your Brand with CarBuddy</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with India's most engaged automotive audience. Drive leads, sales, and awareness with our targeted advertising solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-20">

        {/* 2. AUDIENCE STATS */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Audience Impact</h2>
            <p className="text-gray-600 mt-3">High intent, high engagement, high conversion.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaUsers />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">5M+</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Monthly Unique Visitors</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaBullhorn />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">12M+</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Monthly Page Views</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaChartPie />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">18-45</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Core Age Demographics</p>
            </div>
          </div>
        </section>

        {/* 3. ADVERTISING SOLUTIONS */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Advertising Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Display & Banner Ads</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                High-visibility placements on our homepage, car detail pages, and search results. Perfect for building brand recall and launching new products.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><FaArrowRight className="text-blue-500" size={12}/> Leaderboard & MPU Banners</li>
                <li className="flex items-center gap-2"><FaArrowRight className="text-blue-500" size={12}/> Homepage Takeovers</li>
                <li className="flex items-center gap-2"><FaArrowRight className="text-blue-500" size={12}/> Native In-Feed Ads</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Lead Generation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Get high-quality, verified leads for test drives, insurance quotes, and loan applications. We filter users based on intent to ensure high conversion rates.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><FaArrowRight className="text-green-500" size={12}/> Cost Per Lead (CPL) Models</li>
                <li className="flex items-center gap-2"><FaArrowRight className="text-green-500" size={12}/> Dealer Enquiry Forms</li>
                <li className="flex items-center gap-2"><FaArrowRight className="text-green-500" size={12}/> Targeted SMS/Email Campaigns</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. PARTNERSHIP CTA */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-10 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 opacity-10">
             <FaHandshake size={200} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Drive Results?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Partner with CarBuddy today. Request our media kit or schedule a call with our ad sales experts to discuss a custom campaign.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:sales@carbuddy.com" className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                Contact Sales Team
              </a>
              <a href="/media-kit.pdf" className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
                Download Media Kit
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}