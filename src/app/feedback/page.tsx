"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Suggestion');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // --- Data Preparation ---
    // Subject hum khud set kar rahe hain taaki Admin panel mein pehchan sakein
    const feedbackData = {
      full_name: name || 'Anonymous', // Agar naam nahi diya to Anonymous
      email: email,
      phone_number: 'Not Provided',   // Feedback form mein phone nahi hota, isliye placeholder
      subject: `Website Feedback: ${topic}`, // Topic ko Subject mein jod diya
      message: message
    };

    try {
      // --- API Call ---
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Success
      setStatus('success');
      setName('');
      setEmail('');
      setTopic('Suggestion');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Failed to send feedback. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">Share Your Feedback</h1>
      
      {status === 'success' ? (
        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-300 max-w-2xl mx-auto">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-lg text-gray-700">Your feedback has been submitted successfully.</p>
        </div>
      ) : (
        <div className="space-y-4 text-base text-gray-700">
          <p>We value your opinion! Please tell us about your experience with CarBuddy.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6 pt-4 max-w-2xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (Optional)</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Required)</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
              <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-orange-500 focus:border-orange-500">
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>Praise / Compliment</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Required)</label>
              <textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tell us what's on your mind..." />
            </div>

            {status === 'error' && (
              <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <button type="submit" disabled={status === 'submitting'}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400">
              {status === 'submitting' ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</> : <><Send className="w-5 h-5 mr-2" /> Send Feedback</>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}