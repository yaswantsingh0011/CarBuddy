// src/components/ContactSellerModal.tsx
"use client";

import React, { useState } from 'react';
import { Car } from '@/data/cars'; 
import { UsedCar } from '@/types'; 
import { supabase } from '@/lib/supabaseClient';
import { FaTimes } from 'react-icons/fa';

interface ContactSellerModalProps {
	isOpen: boolean;
	onClose: () => void;
	car: Car | UsedCar; 
}

// Helper component taaki car type check ho sake
function isUsedCar(car: Car | UsedCar): car is UsedCar {
	return (car as UsedCar).sellerPhone !== undefined;
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({ isOpen, onClose, car }) => {
	
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		city: '',
		message: '', 
	});
	
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); 
	const [submitError, setSubmitError] = useState(''); 

	if (!isOpen) return null;

	const handleFormResetAndClose = () => {
		setFormData({ name: '', phone: '', email: '', city: '', message: '' });
		setIsSubmitted(false);
		setSubmitError('');
		onClose();
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true); 
		setSubmitError(''); 

		try {
			const { data, error } = await supabase
				.from('seller_inquiries') // **REQUIRED: Ensure this table exists in Supabase**
				.insert([
					{ 
						name: formData.name, 
						phone: formData.phone,
						email: formData.email,
						city: formData.city,
						message: formData.message, 
						car_name: car.name, 
					}
				]);

			if (error) {
				console.error('Supabase error:', error);
				// Display database error message to aid debugging
				setSubmitError(`Submission failed. Check Console for details. Error: ${error.message}`);
			} else {
				console.log('Data saved:', data);
				setIsSubmitted(true); // Success!
			}
		} catch (networkError) {
			console.error('Network or client error:', networkError);
			setSubmitError('A network error occurred. Check your connection or Supabase URL.');
		} finally {
			// Ensure submitting state is always reset
			setIsSubmitting(false); 
		}
	};

	// Input change ko handle karne ka function
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[id]: value,
		}));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleFormResetAndClose}>
			<div className="bg-white p-8 rounded-lg max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
				<button onClick={handleFormResetAndClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
					<FaTimes size={20} />
				</button>

				{isSubmitted ? (
					// --- SUCCESS VIEW (Phone Number ke saath) ---
					<div>
						<h2 className="text-2xl font-bold mb-4 text-green-600">Request Sent!</h2>
						<p className="text-lg text-gray-800">
							Thank you for your inquiry. Here is the seller's contact number:
						</p>
						
						<div className="my-4 p-3 bg-gray-100 border border-gray-300 rounded-md text-center">
							<p className="text-2xl font-bold text-gray-900">
								{isUsedCar(car) ? car.sellerPhone : 'N/A'}
							</p>
						</div>
						
						<p className="text-sm text-gray-600">
							Please mention 'CarBuddy' when you call.
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
					// --- FORM VIEW ---
					<>
						<h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Seller</h2>
						<p className="text-lg mb-4 text-gray-800">Car: <span className="font-semibold">{car.name}</span></p>

						<form onSubmit={handleSubmit}>
							{/* --- Name --- */}
							<div className="mb-4">
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
								<input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.name} onChange={handleInputChange} />
							</div>
							{/* --- Phone --- */}
							<div className="mb-4">
								<label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
								<input type="tel" id="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.phone} onChange={handleInputChange} />
							</div>
							{/* --- Email --- */}
							<div className="mb-4">
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
								<input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.email} onChange={handleInputChange} />
							</div>
							{/* --- City --- */}
							<div className="mb-4">
								<label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
								<input type="text" id="city" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.city} onChange={handleInputChange} />
							</div>
							{/* --- Message --- */}
							<div className="mb-4">
								<label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
								<textarea id="message" rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={formData.message} onChange={handleInputChange} />
							</div>
							{submitError && (<p className="text-sm text-red-600 mb-4 font-medium">{submitError}</p>)}
							{/* --- Buttons --- */}
							<div className="flex justify-end space-x-4 mt-6">
								<button type="button" onClick={handleFormResetAndClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 font-semibold">Cancel</button>
								<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 font-semibold" disabled={isSubmitting}>
									{isSubmitting ? 'Submitting...' : 'Get Seller Number'}
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default ContactSellerModal;