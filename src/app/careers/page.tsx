// src/app/careers/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaLaptopCode, FaChartLine, FaPenNib, FaUsers, FaRocket, FaHandHoldingHeart } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Careers | CarBuddy',
  description: 'Join the team at CarBuddy and build the future of the automotive industry. Explore current job openings and our work culture.',
};

export default function CareersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Build the Future with Us</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join a team of dreamers, builders, and auto-enthusiasts who are redefining how India buys and sells cars.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-20">

        {/* 2. CULTURE & VALUES SECTION */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Work at CarBuddy?</h2>
            <p className="text-gray-600 mt-3">It's more than just a job. It's about impact, growth, and community.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaRocket />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast-Paced Growth</h3>
              <p className="text-gray-600">We are a startup at heart. You'll have the freedom to experiment, own your projects, and grow faster than anywhere else.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Team</h3>
              <p className="text-gray-600">Work alongside some of the brightest minds in tech and automotive. We believe in winning together.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaHandHoldingHeart />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Employee First</h3>
              <p className="text-gray-600">From competitive salaries to flexible work hours and health benefits, we take care of our own.</p>
            </div>
          </div>
        </section>

        {/* 3. CURRENT OPENINGS SECTION */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Current Openings</h2>
          
          <div className="space-y-6">
            
            {/* Job 1 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-1">
                  <FaLaptopCode className="text-blue-600 text-xl" />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Senior Frontend Developer</h3>
                </div>
                <p className="text-gray-600 text-sm">Tech Team • Remote / Bangalore</p>
                <p className="text-gray-500 mt-2 text-sm max-w-2xl">We are looking for a React/Next.js expert with 3+ years of experience to build scalable and high-performance web applications.</p>
              </div>
              <a href="mailto:careers@carbuddy.com?subject=Application for Senior Frontend Developer" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center">Apply Now</a>
            </div>

            {/* Job 2 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all group">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-1">
                  <FaPenNib className="text-orange-600 text-xl" />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Automotive Content Writer</h3>
                </div>
                <p className="text-gray-600 text-sm">Editorial Team • Jaipur / Hybrid</p>
                <p className="text-gray-500 mt-2 text-sm max-w-2xl">Passion for cars? We need a storyteller who can write engaging reviews, news, and scripts for our video content.</p>
              </div>
              <a href="mailto:careers@carbuddy.com?subject=Application for Content Writer" className="px-6 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors text-center">Apply Now</a>
            </div>

            {/* Job 3 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all group">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-1">
                  <FaChartLine className="text-green-600 text-xl" />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Digital Marketing Analyst</h3>
                </div>
                <p className="text-gray-600 text-sm">Marketing Team • Mumbai</p>
                <p className="text-gray-500 mt-2 text-sm max-w-2xl">Expert in SEO, SEM, and Analytics? Help us grow our user base and optimize our digital presence.</p>
              </div>
              <a href="mailto:careers@carbuddy.com?subject=Application for Digital Marketing Analyst" className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-center">Apply Now</a>
            </div>

          </div>

          <div className="mt-10 text-center bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 font-medium mb-2">Don't see a role that fits you?</p>
            <p className="text-gray-600 text-sm mb-4">We are always looking for talent. Send your resume and tell us how you can make a difference.</p>
            <a href="mailto:careers@carbuddy.com" className="text-blue-700 font-bold hover:underline">Email us at careers@carbuddy.com</a>
          </div>
        </section>

      </div>
    </div>
  );
}