// src/app/terms/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | CarBuddy',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Terms & Conditions</h1>
      <div className="space-y-6 text-base text-gray-700">
        <p>
          By using CarBuddy, you agree to be bound by these Terms and Conditions. Please read them carefully.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">1. Acceptance of Terms</h2>
        <p>
          Your access to and use of CarBuddy is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">2. User Responsibilities</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their computers, and they agree to accept responsibility for all activities that occur under their account or password.
        </p>
      </div>
    </div>
  );
}