// src/app/contact/page.tsx

"use client";

import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 
// Note: Ab humein yahaan se 'supabase' import karne ki zaroorat nahi hai!

// Define the shape of the form data
interface FormData {
  full_name: string;
  phone_number: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  full_name: '',
  phone_number: '',
  email: '',
  subject: 'General Inquiry',
  message: '',
};

export default function ContactUsPage() {
  // 'error' state ko bhi add kar diya hai
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle'); 
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Yahin woh naya logic aayega ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Step 1: Data ko secure API route par bhejte hain
      const response = await fetch('/api/contact', { // <--- Next.js API route ka path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // FormData ko JSON format mein bhejenge
      });

      if (!response.ok) {
        // Agar API se 400 ya 500 status aata hai (jaisa ki humne server mein set kiya tha)
        const errorData = await response.json();
        console.error('API Error:', errorData.message);
        setFormStatus('error');
        return; // Stop execution
      }

      // Step 2: Success hone par form clear aur status 'success'
      setFormStatus('success');
      setFormData(initialFormData); // Form fields ko reset karein
    } catch (e) {
      // Agar network ya koi anexpected error aata hai
      console.error('Network or unexpected error:', e);
      setFormStatus('error');
    }
  };
  // --- Naya logic yahin tak hai ---

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are here to help. Whether you have a question about a car, need support, or want to partner with us, reach out today.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* 2. CONTACT INFORMATION & MAP (No changes) */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 text-lg">
              Our team is available Mon-Sat, 9:00 AM to 7:00 PM to assist you with your automotive journey.
            </p>

            <div className="space-y-6">
              {/* Phone Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase">Sales & Support</p>
                  <p className="text-lg font-bold text-gray-900">+91 98765 43210</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase">Email Us</p>
                  <p className="text-lg font-bold text-gray-900">support@carbuddy.com</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase">Head Office</p>
                  <p className="text-lg font-bold text-gray-900">CarBuddy HQ, Business Park, Jaipur</p>
                </div>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative shadow-inner">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624477!2d75.65046970649679!3d26.88544791796718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1709635000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </div>

          {/* 3. CONTACT FORM */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p>Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-4 text-sm font-bold underline">Send another message</button>
              </div>
            ) : formStatus === 'error' ? ( // Error message display
               <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl text-center">
                 <h4 className="text-xl font-bold mb-2">Submission Error</h4>
                 <p>Message could not be sent. Please check your connection or try again later.</p>
                 <button onClick={() => setFormStatus('idle')} className="mt-4 text-sm font-bold underline">Try again</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      name="full_name"
                      required 
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone_number"
                      required 
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="+91 9876543210" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option>General Inquiry</option>
                    <option>Car Sales</option>
                    <option>Used Car Valuation</option>
                    <option>Partnership / Dealership</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}