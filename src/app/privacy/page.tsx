// src/app/privacy/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CarBuddy',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Privacy Policy</h1>
      <div className="space-y-6 text-base text-gray-700">
        <p>
          Your privacy is important to us. This policy describes how CarBuddy collects, uses, and shares your personal information.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Information Collection</h2>
        <p>
          We collect personal identification information, such as your name, email address, and phone number, when you register on our site, place an order, or fill out a form (like a Test Drive booking).
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Use of Data</h2>
        <p>
          The data we collect is used to personalize your experience, improve our website, process transactions, and send periodic emails regarding your inquiries or services.
        </p>
      </div>
    </div>
  );
}