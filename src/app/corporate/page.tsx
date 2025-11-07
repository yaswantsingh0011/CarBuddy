// src/app/corporate/page.tsx

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Policies | CarBuddy',
};

export default function CorporatePoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Corporate Policies</h1>
      <div className="space-y-6 text-base text-gray-700">
        <p>
          CarBuddy is committed to maintaining the highest standards of integrity and governance. Our corporate policies outline the ethical and operational standards for all employees and partners.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Data Governance Policy</h2>
        <p>
          We strictly adhere to data protection laws to ensure the confidentiality and security of all user data. Unauthorized access or sharing of customer information is strictly prohibited.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 pt-4">Anti-Bribery and Corruption</h2>
        <p>
          All business dealings conducted by CarBuddy and its representatives must be in compliance with anti-corruption laws. We maintain a zero-tolerance policy towards bribery in any form.
        </p>
      </div>
    </div>
  );
}