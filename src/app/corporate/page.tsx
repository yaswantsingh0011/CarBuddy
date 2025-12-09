// src/app/corporate/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaBuilding, FaGavel, FaShieldAlt, FaLeaf, FaUserTie } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Corporate Policies | CarBuddy',
  description: 'Explore CarBuddy\'s corporate policies, including data governance, code of ethics, and our commitment to sustainable business practices.',
};

export default function CorporatePoliciesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Corporate Policies</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Integrity, Transparency, and Responsibility are the cornerstones of our business. We are committed to maintaining the highest standards of governance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* 2. INTRO TEXT */}
        <div className="text-center mb-12">
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            At CarBuddy, we believe that how we do business is just as important as what we do. Our corporate policies provide a framework for ethical decision-making and operational excellence for all our employees, partners, and stakeholders.
          </p>
        </div>

        {/* 3. POLICY CARDS */}
        <div className="space-y-6">

          {/* Policy 1: Data Governance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600 hidden md:block flex-shrink-0">
                <FaShieldAlt size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Governance & Security</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We treat user data with the utmost sanctity. Our governance framework ensures strict compliance with data protection laws (like the DPDP Act).
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li><strong>Access Control:</strong> Data access is restricted on a strict 'need-to-know' basis.</li>
                  <li><strong>Encryption:</strong> Sensitive customer information is encrypted both in transit and at rest.</li>
                  <li><strong>No Third-Party Sharing:</strong> We do not sell customer data to unauthorized third parties.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Policy 2: Ethics & Anti-Corruption */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-red-100 rounded-full text-red-600 hidden md:block flex-shrink-0">
                <FaGavel size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Code of Conduct & Anti-Corruption</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  CarBuddy maintains a zero-tolerance policy towards bribery and corruption. All business dealings must be transparent and accurately reflected in our records.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li><strong>Fair Competition:</strong> We compete vigorously but fairly, complying with all antitrust laws.</li>
                  <li><strong>Conflict of Interest:</strong> Employees must avoid situations where personal interests conflict with company duties.</li>
                  <li><strong>Gift Policy:</strong> Strict limits are placed on the giving and receiving of corporate gifts.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Policy 3: Workplace Culture */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600 hidden md:block flex-shrink-0">
                <FaUserTie size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Workplace Culture & Diversity</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We are committed to creating a safe, inclusive, and diverse work environment where every employee feels valued and respected.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li><strong>Equal Opportunity:</strong> Hiring and promotion are based solely on merit and qualifications.</li>
                  <li><strong>Zero Harassment:</strong> We maintain strict policies against harassment, discrimination, and bullying.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Policy 4: Sustainability (ESG) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-5">
              <div className="p-3 bg-green-100 rounded-full text-green-600 hidden md:block flex-shrink-0">
                <FaLeaf size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Environmental Responsibility</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  As an automotive platform, we recognize our role in promoting sustainable mobility. We actively encourage the adoption of EVs and Hybrids through our content and tools.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li><strong>Paperless Operations:</strong> We strive for 100% digital documentation in our transactions.</li>
                  <li><strong>Green Advocacy:</strong> Prioritizing visibility for eco-friendly vehicles on our platform.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* 4. WHISTLEBLOWER SECTION */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4 text-blue-600">
            <FaBuilding size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Whistleblower Mechanism</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            We encourage employees and partners to report any unethical behavior or policy violations. Reports can be made anonymously and are investigated without fear of retaliation.
          </p>
          <a href="mailto:compliance@carbuddy.com" className="text-blue-700 font-bold hover:underline">
            Report to Compliance: compliance@carbuddy.com
          </a>
        </div>

      </div>
    </div>
  );
}