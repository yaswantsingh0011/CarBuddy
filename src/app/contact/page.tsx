// src/app/contact/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact Us | CarBuddy',
};

export default function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Contact CarBuddy</h1>
      <div className="grid md:grid-cols-2 gap-8 text-base">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            We are here to answer any questions you may have about new cars, used cars, or partnerships.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FaPhone className="text-blue-600 h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Sales & Support</p>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaEnvelope className="text-blue-600 h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Email Us</p>
                <p className="text-gray-600">support@carbuddy.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-blue-600 h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Office Address</p>
                <p className="text-gray-600">CarBuddy HQ, Tower A, Business Park, Jaipur, Rajasthan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Inquiry Form</h3>
            <p className="text-sm text-gray-600">
                (A contact form with fields like Name, Email, Subject, and Message will go here, similar to the Booking Form structure.)
            </p>
        </div>
      </div>
    </div>
  );
}