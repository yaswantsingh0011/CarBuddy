// src/components/BookingForm.tsx

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface BookingFormProps {
  car: { name: string; priceRange: string; };
  onClose: () => void;
}
const SuccessIcon = () => ( <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> );

const BookingForm: React.FC<BookingFormProps> = ({ car, onClose }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', city: '' });
  const [errors, setErrors] = useState({ name: '', mobile: '', email: '', city: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const tempErrors = { name: '', mobile: '', email: '', city: '' };

    let isValid = true;
    if (!formData.name.trim()) { tempErrors.name = 'Name is required.'; isValid = false; }
    if (!/^\d{10}$/.test(formData.mobile)) { tempErrors.mobile = 'Please enter a valid 10-digit mobile number.'; isValid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { tempErrors.email = 'Please enter a valid email address.'; isValid = false; }
    if (!formData.city.trim()) { tempErrors.city = 'City is required.'; isValid = false; }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsLoading(true);

    const submissionData = {
      ...formData,
      car_name: car.name,
    };

    try {
      const { data, error } = await supabase
        .from('test_drives') // Changed to your table name
        .insert([submissionData]);

      if (error) {
        throw error;
      }

      console.log('Data saved successfully:', data);
      setIsSubmitted(true);

    } catch (error) {
      console.error('Error saving data to Supabase:', error);
      alert('Sorry, there was an error submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Book a Test Drive</h2>
            <p className="text-lg text-gray-800 mb-6">You are booking for: <span className="font-semibold">{car.name}</span></p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter your full name" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter your 10-digit mobile number" />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter your email address" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter your city" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <SuccessIcon />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Your test drive booked successfully!</h2>
            <p className="text-gray-700">We will contact you on <strong>{formData.mobile}</strong> shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;