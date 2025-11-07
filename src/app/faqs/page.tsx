// src/app/faqs/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs | CarBuddy',
};

// Dummy FAQ data for structure
const faqs = [
    { 
        q: "How can I book a test drive?", 
        a: "You can book a test drive directly from any car detail page by clicking the 'Book Your Test Drive Now' button and filling out the short form." 
    },
    { 
        q: "Is the price negotiable?", 
        a: "Prices for new cars are generally fixed, but final on-road prices depend on taxes and insurance. Used car prices are negotiable with the seller." 
    },
    { 
        q: "How reliable are the ratings?", 
        a: "Our ratings are based on expert reviews, consumer feedback, safety scores (like GNCAP), and overall ownership costs." 
    },
];

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Frequently Asked Questions (FAQs)</h1>
      <div className="space-y-6">
        {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">{item.q}</h2>
                <p className="text-base text-gray-600 mt-2">{item.a}</p>
            </div>
        ))}
      </div>
    </div>
  );
}