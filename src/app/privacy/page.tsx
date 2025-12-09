// src/app/privacy/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaUserSecret, FaDatabase, FaCookieBite, FaLock } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Privacy Policy | CarBuddy',
  description: 'Understand how CarBuddy collects, uses, and protects your personal information. Read our comprehensive Privacy Policy.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your privacy is critically important to us. This policy outlines how we collect, use, and safeguard your data.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* 2. INFORMATION COLLECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 hidden md:block">
              <FaDatabase size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information to provide better services to all our users. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and location when you register, book a test drive, or contact a dealer.</li>
                <li><strong>Vehicle Information:</strong> Details about your car interest, budget, and ownership status when you use our comparison tools or valuation services.</li>
                <li><strong>Usage Data:</strong> Information on how you access and use the Service, including your browser type, IP address, and pages visited.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. USE OF DATA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600 hidden md:block">
              <FaUserSecret size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The data we collect allows us to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                <li>Personalize your experience and deliver content relevant to your interests.</li>
                <li>Process your requests for test drives, car valuations, or dealer callbacks.</li>
                <li>Send periodic emails regarding your inquiries, new launches, or service updates.</li>
                <li>Improve our website functionality based on user behavior and feedback.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. COOKIES & TRACKING */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600 hidden md:block">
              <FaCookieBite size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies & Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </div>
          </div>
        </div>

        {/* 5. DATA SECURITY */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600 hidden md:block">
              <FaLock size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>
          </div>
        </div>

        {/* 6. CONTACT US */}
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Have Questions?</h3>
          <p className="text-gray-600 mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
          <a href="mailto:privacy@carbuddy.com" className="text-blue-600 font-semibold hover:underline">privacy@carbuddy.com</a>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: December 12, 2025</p>
        </div>

      </div>
    </div>
  );
}