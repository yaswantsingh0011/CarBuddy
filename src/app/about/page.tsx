// src/app/about/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | CarBuddy',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">About CarBuddy</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          CarBuddy is India's rapidly growing online auto portal, founded with the mission to revolutionize the car buying and selling experience. We provide a platform that offers transparent information, trusted reviews, and a wide selection of new and used cars.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Our Vision</h2>
        <p>
          To be the most trusted and comprehensive automotive platform, empowering every user to make informed decisions about their travel companion.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Unbiased Expert Reviews and Ratings.</li>
          <li>Verified Listings for both New and Used Cars.</li>
          <li>Easy comparison tools to decode the right car for you.</li>
        </ul>
      </div>
    </div>
  );
}