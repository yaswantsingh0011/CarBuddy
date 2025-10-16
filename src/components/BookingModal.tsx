// src/components/BookingModal.tsx

import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient'; // 1. हमारा Supabase client इम्पोर्ट करें

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, carName }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', city: '' });
  const [errors, setErrors] = useState({ name: '', mobile: '', email: '', city: '' });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submissionError, setSubmissionError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    // ... (वैलिडेशन का कोड वैसा ही रहेगा)
    const newErrors = { name: '', mobile: '', email: '', city: '' };
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = 'Name is required.'; isValid = false; }
    if (!formData.mobile.trim()) { newErrors.mobile = 'Mobile number is required.'; isValid = false; } else if (!/^\d{10}$/.test(formData.mobile)) { newErrors.mobile = 'Please enter a valid 10-digit mobile number.'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Email is required.'; isValid = false; } else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Please enter a valid email address.'; isValid = false; }
    if (!formData.city.trim()) { newErrors.city = 'City is required.'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  // 2. handleSubmit को async बनाएं और Supabase में डेटा भेजें
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    if (validateForm()) {
      setSubmissionStatus('submitting');
      
      const { error } = await supabase.from('test_drives').insert([
        { 
          name: formData.name, 
          mobile: formData.mobile,
          email: formData.email,
          city: formData.city,
          car_name: carName, // कार का नाम भी भेजें
        }
      ]);

      if (error) {
        console.error('Supabase error:', error.message);
        setSubmissionError('Sorry, something went wrong. Please try again.');
        setSubmissionStatus('error');
      } else {
        setSubmissionStatus('success');
      }
    }
  };
  
  const resetFormAndClose = () => {
    setFormData({ name: '', mobile: '', email: '', city: '' });
    setSubmissionStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={resetFormAndClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
        
        {submissionStatus === 'success' ? (
          <div className="text-center">
            {/* ... (Success Message code) ... */}
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Test Drive Booked Successfully!</h2>
            <p className="text-gray-600 mt-2">Our team will contact you shortly on {formData.mobile}.</p>
            <button onClick={resetFormAndClose} className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Done</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Book a Test Drive</h2>
            <p className="text-gray-700 mb-6">You've selected: <span className="font-semibold text-gray-900">{carName}</span></p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {/* ... (Input fields code) ... */}
                <div><label htmlFor="name" className="block text-sm font-medium text-gray-800">Full Name</label><input type="text" id="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}</div>
                <div><label htmlFor="mobile" className="block text-sm font-medium text-gray-800">Mobile Number</label><input type="tel" id="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Enter your 10-digit mobile number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />{errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}</div>
                <div><label htmlFor="email" className="block text-sm font-medium text-gray-800">Email Address</label><input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}</div>
                <div><label htmlFor="city" className="block text-sm font-medium text-gray-800">City</label><input type="text" id="city" value={formData.city} onChange={handleInputChange} placeholder="Enter your city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" />{errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}</div>
                
                <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                  {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
                {/* 3. एरर दिखाने के लिए मैसेज */}
                {submissionStatus === 'error' && <p className="text-red-500 text-xs mt-2 text-center">{submissionError}</p>}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;