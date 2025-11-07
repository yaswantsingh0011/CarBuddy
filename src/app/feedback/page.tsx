// src/app/feedback/page.tsx
"use client"; // Form hai, isliye client component banaya

import React, { useState } from 'react'; // useState ko import kiya
// ⛔ Metadata ka import yahan se hata diya hai
import { supabase } from '@/lib/supabaseClient'; // Supabase client ko import kiya
import { Send, CheckCircle, Loader2, AlertTriangle } from 'lucide-react'; // Icons ko import kiya

// ⛔ 'export const metadata' block yahan se poora hata diya hai

export default function FeedbackPage() {
  // --- Form fields ke liye States ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Suggestion'); // Default topic
  const [message, setMessage] = useState('');

  // --- Form submission status ke liye State ---
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // --- Form submit hone par ye function chalega ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Page refresh hone se rokein
    setStatus('submitting');
    setErrorMessage('');

    // Supabase mein data insert karein
    const { error } = await supabase
      .from('feedback') // Aapki table ka naam
      .insert({ 
        name: name || null, // Agar naam khaali hai toh null bhejein
        email: email, 
        topic: topic, 
        message: message 
      });

    if (error) {
      // Agar Supabase se error aaye
      console.error('Error submitting feedback:', error.message);
      setErrorMessage('Failed to send feedback. Please try again later.');
      setStatus('error');
    } else {
      // Success!
      setStatus('success');
      // Form ko reset karein
      setName('');
      setEmail('');
      setTopic('Suggestion');
      setMessage('');
      // 5 second baad form ko waapas 'idle' state mein le aayein
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Share Your Feedback</h1>
      
      {/* === SUCCESS MESSAGE === */}
      {status === 'success' ? (
        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-300 max-w-2xl mx-auto">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-lg text-gray-700">Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.</p>
        </div>
      ) : (
        
        /* === FORM SECTION === */
        <div className="space-y-4 text-base text-gray-700">
          <p>
            We value your opinion! Your feedback helps us improve our services and platform.
            Please use the form below to tell us about your experience with CarBuddy.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 pt-4 max-w-2xl">
            
            {/* --- Name Field (Optional) --- */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            {/* --- Email Field (Required) --- */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email (Required)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* --- Topic Field (Select) --- */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>Praise / Compliment</option>
                <option>Other</option>
              </select>
            </div>

            {/* --- Message Field (Textarea) --- */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (Required)
              </label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {/* --- Error Message --- */}
            {status === 'error' && (
              <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* --- Submit Button --- */}
            <div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Feedback
                  </>
                )}
              </button>
            </div>
          </form>
          
          <p className="pt-4">
            Thank you for taking the time to help us grow!
          </p>
        </div>
      )}
    </div>
  );
}