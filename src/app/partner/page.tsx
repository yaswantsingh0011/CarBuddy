// src/app/partner/page.tsx

"use client";

import React, { useState } from 'react';
import { 
  FaHandshake, 
  FaChartLine, 
  FaLaptopCode, 
  FaUserTie, 
  FaCheckCircle, 
  FaBuilding, 
  FaSpinner, 
  FaTimesCircle 
} from 'react-icons/fa';

// Supabase Client Import: 
// सुनिश्चित करें कि यह पाथ आपके 'src/utils/supabase/client.ts' फ़ाइल को पॉइंट कर रहा है।
import { createClient } from '@/utils/supabase/client'; 

// ---------------------------------------------------------------------------------

export default function PartnerPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    mobileNumber: '',
    businessType: 'Used Car Dealer', // Default value
    city: '',
  });

  // 1. इनपुट वैल्यू को हैंडल करने का फ़ंक्शन
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 2. Supabase में डेटा भेजने के लिए मुख्य फ़ंक्शन
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // क्लाइंट को इनिशियलाइज़ करें
    const supabase = createClient(); 

    try {
      // NOTE: 'partner_inquiries' को अपनी वास्तविक Table के नाम से बदलें!
      const { error } = await supabase
        .from('partner_inquiries')
        .insert({
            business_name: formData.businessName, 
            contact_person: formData.contactPerson,
            mobile_number: formData.mobileNumber,
            business_type: formData.businessType,
            city: formData.city,
        });

      if (error) {
        console.error("Supabase Error:", error);
        setFormStatus('error');
      } else {
        setFormStatus('success');
        // सफलतापूर्वक सबमिशन के बाद फ़ॉर्म रीसेट करें
        setFormData({ businessName: '', contactPerson: '', mobileNumber: '', businessType: 'Used Car Dealer', city: '' });
      }

    } catch (err) {
      console.error("Submission failed due to network or unexpected error:", err);
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Grow Your Business with CarBuddy</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join India's fastest-growing automotive network. We connect dealerships, service centers, and insurers with millions of high-intent buyers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
        {/* 2. BENEFITS SECTION */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Partner With Us?</h2>
            <p className="text-gray-600 mt-2">Tools and reach designed to accelerate your sales.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><FaUserTie /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High-Quality Leads</h3>
              <p className="text-gray-600">Stop chasing cold calls. Access verified, high-intent leads from buyers who are ready to purchase.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><FaLaptopCode /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partner Dashboard</h3>
              <p className="text-gray-600">Manage your inventory, track leads, and analyze performance in real-time with our dedicated dealer panel.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><FaChartLine /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Insights</h3>
              <p className="text-gray-600">Get exclusive market trends, pricing insights, and buyer preference analytics to stock the right inventory.</p>
            </div>
          </div>
        </section>

        {/* 3. PARTNER FORM SECTION */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Side: Info */}
            <div className="p-10 bg-blue-900 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6">Join Our Network</h3>
              <p className="text-blue-100 mb-8 text-lg">
                Fill out the form to begin your registration. Our onboarding team will verify your business details and get you started within 48 hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Car Dealerships (New/Used)</span></div>
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Car Rental Agencies</span></div>
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Insurance & Finance Agents</span></div>
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Auto Service Centers</span></div>
              </div>
            </div>

            {/* Right Side: Form / Status Messages */}
            <div className="p-10">
              
              {/* Submission Success/Error Message */}
              {(formStatus === 'success' || formStatus === 'error') ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${formStatus === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {formStatus === 'success' ? <FaHandshake size={32} /> : <FaTimesCircle size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {formStatus === 'success' ? 'Request Received!' : 'Submission Failed!'}
                  </h3>
                  <p className="text-gray-600">
                    {formStatus === 'success' 
                      ? 'Thank you for your interest. Our partner success team will contact you shortly to complete the verification.'
                      : 'An error occurred while submitting your request. Please check your network or try again.'
                    }
                  </p>
                  <button onClick={() => setFormStatus('idle')} className="mt-6 text-blue-600 font-bold hover:underline">Submit another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Partner Registration</h3>
                  
                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400"><FaBuilding /></span>
                      <input 
                        type="text" 
                        id="businessName"
                        name="businessName"
                        required 
                        placeholder="e.g. Royal Motors" 
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Contact Person */}
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-1">Contact Person</label>
                      <input 
                        type="text" 
                        id="contactPerson"
                        name="contactPerson"
                        required 
                        placeholder="Full Name" 
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    {/* Mobile Number */}
                    <div>
                      <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                      <input 
                        type="tel" 
                        id="mobileNumber"
                        name="mobileNumber"
                        required 
                        placeholder="+91 98..." 
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 mb-1">Business Type</label>
                    <select 
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option>Used Car Dealer</option>
                      <option>New Car Franchise</option>
                      <option>Service Center</option>
                      <option>Finance / Insurance Agent</option>
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      id="city"
                      name="city"
                      required 
                      placeholder="e.g. Jaipur" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <FaSpinner className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}