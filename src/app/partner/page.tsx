"use client";

import React, { useState } from 'react';
import { FaHandshake, FaChartLine, FaLaptopCode, FaUserTie, FaCheckCircle, FaBuilding, FaSpinner, FaTimesCircle } from 'react-icons/fa';

export default function PartnerPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    mobileNumber: '',
    businessType: 'Used Car Dealer',
    city: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // --- Data Formatting ---
    // Extra fields ko message mein jod rahe hain
    const formattedMessage = `
      BUSINESS DETAILS:
      ------------------
      Business Name: ${formData.businessName}
      Type: ${formData.businessType}
      City: ${formData.city}
      
      REQUEST:
      Looking to partner with CarBuddy.
    `;

    const apiData = {
      full_name: formData.contactPerson,
      email: 'partner@request.com', // Partner form mein email nahi tha, toh placeholder ya add kar sakte ho
      phone_number: formData.mobileNumber,
      subject: "New Partner Registration Request", // <--- Subject set kiya
      message: formattedMessage // <--- Formatted message bheja
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) throw new Error('Failed');

      setFormStatus('success');
      setFormData({ businessName: '', contactPerson: '', mobileNumber: '', businessType: 'Used Car Dealer', city: '' });

    } catch (err) {
      console.error("Submission failed:", err);
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Grow Your Business with CarBuddy</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">Join India's fastest-growing automotive network.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            <div className="p-10 bg-blue-900 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6">Join Our Network</h3>
              <p className="text-blue-100 mb-8 text-lg">Fill out the form to begin your registration.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Car Dealerships</span></div>
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Rental Agencies</span></div>
                <div className="flex items-center gap-3"><FaCheckCircle className="text-green-400 text-xl" /><span className="font-medium">Service Centers</span></div>
              </div>
            </div>

            <div className="p-10">
              {(formStatus === 'success' || formStatus === 'error') ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${formStatus === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {formStatus === 'success' ? <FaHandshake size={32} /> : <FaTimesCircle size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{formStatus === 'success' ? 'Request Received!' : 'Submission Failed!'}</h3>
                  <button onClick={() => setFormStatus('idle')} className="mt-6 text-blue-600 font-bold hover:underline">Submit another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Partner Registration</h3>
                  
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-gray-400"><FaBuilding /></span>
                      <input type="text" id="businessName" name="businessName" required placeholder="e.g. Royal Motors" 
                        value={formData.businessName} onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-1">Contact Person</label>
                      <input type="text" id="contactPerson" name="contactPerson" required placeholder="Full Name" 
                        value={formData.contactPerson} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                      <input type="tel" id="mobileNumber" name="mobileNumber" required placeholder="+91 98..." 
                        value={formData.mobileNumber} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 mb-1">Business Type</label>
                    <select id="businessType" name="businessType" value={formData.businessType} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option>Used Car Dealer</option>
                      <option>New Car Franchise</option>
                      <option>Service Center</option>
                      <option>Finance / Insurance Agent</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <input type="text" id="city" name="city" required placeholder="e.g. Jaipur" 
                      value={formData.city} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <button type="submit" disabled={formStatus === 'submitting'}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                    {formStatus === 'submitting' ? <><FaSpinner className="animate-spin" /> Submitting...</> : 'Register Now'}
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