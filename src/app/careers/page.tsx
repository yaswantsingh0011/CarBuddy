// src/app/careers/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | CarBuddy',
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Careers With Us</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Join the dynamic team at CarBuddy and help us shape the future of the automotive industry. We are constantly looking for passionate and talented individuals across various domains like tech, sales, marketing, and editorial.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Current Openings</h2>
        <p className="text-base text-gray-600">
          We currently have openings for:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-base">
          <li>Senior Frontend Developer (React/Next.js)</li>
          <li>Automotive Content Writer</li>
          <li>Digital Marketing Analyst</li>
        </ul>
        <p>
          Send your resume to <a href="mailto:careers@carbuddy.com" className="text-blue-600 hover:underline">careers@carbuddy.com</a> to apply!
        </p>
      </div>
    </div>
  );
}