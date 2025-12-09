// src/app/terms/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaFileContract, FaShieldAlt, FaUserCheck, FaGavel } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Terms & Conditions | CarBuddy',
  description: 'Read the Terms and Conditions for using CarBuddy. Understand your rights, responsibilities, and our policies regarding car buying, selling, and content usage.',
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By accessing CarBuddy, you agree to be bound by these conditions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* 2. INTRODUCTION CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 hidden md:block">
              <FaFileContract size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to CarBuddy. These Terms and Conditions ("Terms") govern your use of our website, mobile application, and services (collectively, the "Platform"). By accessing or using the Platform, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                CarBuddy reserves the right to modify these Terms at any time. Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </div>
        </div>

        {/* 3. USER RESPONSIBILITIES */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600 hidden md:block">
              <FaUserCheck size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Responsibilities & Account</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
                <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</li>
                <li><strong>Accurate Information:</strong> When listing a car for sale or booking a test drive, you agree to provide accurate, current, and complete information. Misrepresentation of vehicle condition or ownership is strictly prohibited.</li>
                <li><strong>Prohibited Conduct:</strong> You agree not to use the Platform for any unlawful purpose, to harass others, or to interfere with the proper working of the Platform (e.g., introducing viruses or scraping data).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. CONTENT & INTELLECTUAL PROPERTY */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600 hidden md:block">
              <FaShieldAlt size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Content & Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on CarBuddy, including text, graphics, logos, images, and software, is the property of CarBuddy or its content suppliers and is protected by Indian and international copyright laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>User-Generated Content:</strong> By posting reviews, comments, or car listings, you grant CarBuddy a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content. You represent that you own or control all rights to the content you post.
              </p>
            </div>
          </div>
        </div>

        {/* 5. DISCLAIMERS & LIMITATION OF LIABILITY */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600 hidden md:block">
              <FaGavel size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimers & Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>"As Is" Basis:</strong> The Platform and all information, content, materials, and services included on or otherwise made available to you through the Platform are provided on an "as is" and "as available" basis.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>No Warranty:</strong> CarBuddy does not warrant that the vehicle descriptions, pricing, or other content on the Platform is accurate, complete, reliable, current, or error-free. We act as an intermediary connecting buyers and sellers and do not guarantee the quality or safety of any vehicle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, CarBuddy shall not be liable for any direct, indirect, incidental, punitive, or consequential damages arising from your use of the Platform.
              </p>
            </div>
          </div>
        </div>

        {/* 6. GOVERNING LAW */}
        <div className="bg-gray-100 rounded-xl p-6 text-sm text-gray-600">
          <h3 className="font-bold text-gray-800 mb-2">5. Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan.
          </p>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: December 12, 2025</p>
        </div>

      </div>
    </div>
  );
}