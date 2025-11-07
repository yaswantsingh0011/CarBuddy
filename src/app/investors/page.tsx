// src/app/investors/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investors | CarBuddy',
};

export default function InvestorsPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Investor Relations</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Welcome to the CarBuddy Investor Relations page. We are focused on long-term growth and maximizing shareholder value through technological innovation and market expansion.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Key Highlights</h2>
        <ul className="list-disc list-inside ml-4 space-y-2 text-base">
          <li>Strong year-over-year revenue growth.</li>
          <li>Dominant market share in the used car listing segment.</li>
          <li>Investments focused on AI-driven vehicle valuation.</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Financial Reports</h2>
        <p className="text-base">
          For detailed quarterly and annual financial reports, please contact our IR team directly.
          <a href="mailto:ir@carbuddy.com" className="text-blue-600 hover:underline block mt-2">Contact IR Team</a>
        </p>
      </div>
    </div>
  );
}