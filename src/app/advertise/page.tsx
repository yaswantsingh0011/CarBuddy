// src/app/advertise/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertise with Us | CarBuddy',
};

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Advertise with CarBuddy</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Reach millions of highly engaged car buyers and enthusiasts. CarBuddy offers various advertising opportunities tailored to meet your marketing objectives.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Our Audience</h2>
        <ul className="list-disc list-inside ml-4 space-y-2 text-base">
          <li>Over 5 million unique visitors per month.</li>
          <li>High conversion rate on automotive leads.</li>
          <li>Targeted audience segmentation (New vs. Used, City, Price Range).</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Contact Sales</h2>
        <p className="text-base">
          To receive our media kit and discuss custom campaign options, please email our Sales team:
          <a href="mailto:sales@carbuddy.com" className="text-blue-600 hover:underline block mt-2">sales@carbuddy.com</a>
        </p>
      </div>
    </div>
  );
}