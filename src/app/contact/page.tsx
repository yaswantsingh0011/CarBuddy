"use client";

import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 

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
  subject: 'General Inquiry', // Default Subject
  message: '',
};

export default function ContactUsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle'); 
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Isme Subject already dropdown se aa raha hai
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      setFormStatus('success');
      setFormData(initialFormData); 
    } catch (e) {
      console.error('Submission error:', e);
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">We are here to help.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border"><FaPhoneAlt className="text-blue-600 text-xl"/><div><p className="font-bold">Sales & Support</p><p>+91 98765 43210</p></div></div>
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border"><FaEnvelope className="text-orange-600 text-xl"/><div><p className="font-bold">Email Us</p><p>support@carbuddy.com</p></div></div>
              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border"><FaMapMarkerAlt className="text-green-600 text-xl"/><div><p className="font-bold">Head Office</p><p>Jaipur, Rajasthan</p></div></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <button onClick={() => setFormStatus('idle')} className="mt-4 text-sm font-bold underline">Send another message</button>
              </div>
            ) : formStatus === 'error' ? (
               <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl text-center">
                 <h4 className="text-xl font-bold mb-2">Error</h4>
                 <button onClick={() => setFormStatus('idle')} className="mt-4 text-sm font-bold underline">Try again</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-1">Your Name</label><input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-semibold mb-1">Phone Number</label><input type="tel" name="phone_number" required value={formData.phone_number} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="+91..." /></div>
                </div>
                <div><label className="block text-sm font-semibold mb-1">Email Address</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="john@example.com" /></div>
                
                {/* Subject Dropdown - Ye API mein 'subject' banke jayega */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white">
                    <option>General Inquiry</option>
                    <option>Car Sales</option>
                    <option>Used Car Valuation</option>
                    <option>Partnership / Dealership</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div><label className="block text-sm font-semibold mb-1">Message</label><textarea name="message" required rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="How can we help?"></textarea></div>

                <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md disabled:opacity-70">
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