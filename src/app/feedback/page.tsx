// src/app/feedback/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback | CarBuddy',
};

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Share Your Feedback</h1>
      <div className="space-y-4 text-base text-gray-700">
        <p>
          We value your opinion! Your feedback helps us improve our services and platform.
          Please use the form below to tell us about your experience with CarBuddy.
        </p>
        
        {/* Placeholder for Feedback Form */}
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Feedback Form Placeholder</h3>
            <p className="text-sm text-gray-600">
                (A simple form with Name, Email, and a large Message field will go here, potentially saving to Supabase 'feedback' table.)
            </p>
        </div>
        
        <p className="pt-4">
          Thank you for taking the time to help us grow!
        </p>
      </div>
    </div>
  );
}