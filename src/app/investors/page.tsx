// src/app/investors/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaChartLine, FaGlobeAsia, FaUsers, FaHandHoldingUsd, FaFilePdf, FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Investor Relations | CarBuddy',
  description: 'Track CarBuddy\'s financial performance, stock information, corporate governance, and long-term growth strategy.',
};

export default function InvestorsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Investor Relations</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Driving sustainable growth and maximizing shareholder value through technological innovation and market leadership.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">

        {/* 2. KEY METRICS (Stats Grid) */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Performance at a Glance</h2>
            <p className="text-gray-600 mt-2">Key highlights from the last fiscal year.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine size={20} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">40%</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">YoY Revenue Growth</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobeAsia size={20} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">120+</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Cities Covered</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={20} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">2M+</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Monthly Active Users</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandHoldingUsd size={20} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">15%</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">Market Share (Used Cars)</p>
            </div>
          </div>
        </section>

        {/* 3. INVESTMENT HIGHLIGHTS & STRATEGY */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Investment Highlights</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why Invest in CarBuddy?</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CarBuddy is positioned at the intersection of automotive retail and digital transformation. With India's used car market projected to double by 2027, our full-stack technology platform ensures we capture a significant portion of this value chain.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700">Proprietary AI Pricing Engine providing accurate valuations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700">Asset-light business model with high scalability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700">Strong partnerships with major banks and OEMs.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Strategy</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-200">01</span>
                  <p className="text-gray-700 font-medium">Expand offline presence via Franchise Model.</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-200">02</span>
                  <p className="text-gray-700 font-medium">Invest in EV infrastructure and listings.</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-200">03</span>
                  <p className="text-gray-700 font-medium">Enhance Fintech offerings (Loans & Insurance).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINANCIAL REPORTS (Downloadable Style) */}
        <section>
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Financial Reports & Presentations</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Report 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <FaFilePdf className="text-red-500 text-3xl" />
                <div>
                  <h4 className="font-bold text-gray-900">Annual Report 2024</h4>
                  <p className="text-xs text-gray-500">PDF • 4.5 MB</p>
                </div>
              </div>
              <FaArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>

            {/* Report 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <FaFilePdf className="text-red-500 text-3xl" />
                <div>
                  <h4 className="font-bold text-gray-900">Q3 FY25 Earnings</h4>
                  <p className="text-xs text-gray-500">PDF • 2.1 MB</p>
                </div>
              </div>
              <FaArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>

            {/* Report 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <FaFilePdf className="text-red-500 text-3xl" />
                <div>
                  <h4 className="font-bold text-gray-900">Investor Presentation</h4>
                  <p className="text-xs text-gray-500">PDF • 8.2 MB</p>
                </div>
              </div>
              <FaArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </section>

        {/* 5. CONTACT IR */}
        <div className="bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Investor Contacts</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            For detailed inquiries regarding financial statements, stock information, or corporate governance, please contact our Investor Relations team.
          </p>
          <a href="mailto:ir@carbuddy.com" className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
            Email IR Team
          </a>
        </div>

      </div>
    </div>
  );
}