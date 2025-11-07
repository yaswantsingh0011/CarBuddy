// src/app/partner/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Partner | CarBuddy',
};

export default function PartnerPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Become a Partner/Dealer</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          CarBuddy invites dealerships, service centers, and financial institutions to join our growing network. Partnering with us grants you access to verified buyers and dedicated lead generation tools.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Benefits of Partnership</h2>
        <ul className="list-disc list-inside ml-4 space-y-2 text-base">
          <li>Priority listing placement and enhanced visibility.</li>
          <li>Dedicated Partner Dashboard for lead management.</li>
          <li>Exclusive access to buyer analytics.</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Join Our Network</h2>
        <p className="text-base">
          Fill out our partnership inquiry form or email us to begin the registration process:
          <a href="mailto:partners@carbuddy.com" className="text-blue-600 hover:underline block mt-2">partners@carbuddy.com</a>
        </p>
      </div>
    </div>
  );
}