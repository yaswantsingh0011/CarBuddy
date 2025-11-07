// src/components/BookingForm.tsx
"use client";

import React, { useState } from 'react';
import { Car } from '@/data/cars'; 
import { UsedCar } from '@/types'; 
import { supabase } from '@/lib/supabaseClient'; 
import { FaTimes } from 'react-icons/fa';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | UsedCar; 
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose, car }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  // Price display logic: UsedCar has 'price', New Car has 'priceRange'
  const displayPrice = 'price' in car ? `₹ ${car.price}` : car.priceRange;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormResetAndClose = () => {
    // Reset form state and close modal
    setFormData({ name: '', phone: '', email: '', city: '' });
    setIsSubmitted(false);
    setSubmitError('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Simple phone validation
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
        setSubmitError("Please enter a valid 10-digit phone number.");
        setIsSubmitting(false);
        return;
    }

    const dataToSend = { 
        name: formData.name, 
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        car_name: car.name,
    };

    // --- DEBUGGING LINE: Check data being sent ---
    console.log("Attempting to send data to 'test_drives':", dataToSend);
    // ---------------------------------------------

    try {
        const { data, error } = await supabase
            .from('test_drives') // **REQUIRED: Ensure this table exists and column names match**
            .insert([dataToSend]);

        if (error) {
            console.error('Supabase error:', error);
            // Display specific database error message
            setSubmitError(`Submission failed. Supabase Error: ${error.message}. Check RLS/Column Names.`);
        } else {
            console.log('Data saved successfully.');
            setIsSubmitted(true);
        }
    } catch (networkError) {
        console.error('Network or client error:', networkError);
        setSubmitError('A network error occurred. Check your connection or Supabase URL.');
    } finally {
        // Ensure submitting state is always reset
        setIsSubmitting(false);
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleFormResetAndClose}>
      <div className="bg-white p-8 rounded-lg max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
         {/* Close Button */}
         <button onClick={handleFormResetAndClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <FaTimes size={20} />
         </button>
        
        {isSubmitted ? (
          // --- Success View ---
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Request Submitted!</h2>
            <p className="text-lg text-gray-800">Your request for {car.name} has been successfully submitted.</p>
            <p className="text-lg text-gray-800 mt-2">
              Our team will contact you shortly on <span className="font-semibold text-gray-900">{formData.phone}</span>
            </p>
            <div className="flex justify-end mt-6">
              <button 
                type="button" 
                onClick={handleFormResetAndClose} 
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          // --- Form View ---
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Book a Test Drive</h2>
            <p className="text-base text-gray-800 mb-2">Car: <span className="font-semibold">{car.name}</span></p>
            <p className="text-base text-gray-800 mb-6">Price: <span className="font-semibold">{displayPrice}</span></p>

            <form onSubmit={handleSubmit}>
              
              {/* Fields */}
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" id="name" placeholder="Name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.name} onChange={handleInputChange} />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input type="tel" id="phone" placeholder="Phone" required minLength={10} maxLength={10} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.phone} onChange={handleInputChange} />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" placeholder="Email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.email} onChange={handleInputChange} />
              </div>

              <div className="mb-4">
                <label htmlFor="city" className="sr-only">City</label>
                <input type="text" id="city" placeholder="City" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.city} onChange={handleInputChange} />
              </div>

              {submitError && (
                <p className="text-sm text-red-600 mb-4 font-medium">{submitError}</p>
              )}
              
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                    type="button" 
                    onClick={handleFormResetAndClose} 
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 font-semibold"
                  disabled={isSubmitting} 
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;