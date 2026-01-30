"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCommentAlt, FaCheckCircle } from 'react-icons/fa';

interface ContactSellerModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: any; 
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({ isOpen, onClose, car }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        message: `I'm interested in your ${car?.name}. Please contact me.`, 
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
            // ✅ Mapping strictly to your table columns
            const { error } = await supabase
                .from('seller_inquiries')
                .insert([
                    { 
                        name: formData.name,       // Match column 'name'
                        phone: formData.phone,     // Match column 'phone'
                        email: formData.email,     // Match column 'email'
                        city: formData.city,       // Match column 'city'
                        message: formData.message, // Match column 'message'
                        car_name: car.name,        // Match column 'car_name'
                    }
                ]);

            if (error) {
                setSubmitError(`Bhai error aa gaya: ${error.message}`);
            } else {
                setIsSubmitted(true); 
            }
        } catch (networkError) {
            setSubmitError('Network error! Connection check karo bhai.');
        } finally {
            setIsSubmitting(false); 
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={handleFormResetAndClose}>
            <div className="bg-white rounded-[32px] max-w-md w-full relative shadow-2xl overflow-hidden animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
                
                <button onClick={handleFormResetAndClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 z-10">
                    <FaTimes size={20} />
                </button>

                {isSubmitted ? (
                    <div className="p-10 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-green-600 text-4xl" />
                        </div>
                        <h2 className="text-2xl font-black text-[#0F172A] mb-2">Request Sent!</h2>
                        <p className="text-gray-500 text-sm mb-8 font-medium">Inquiry save ho gayi hai. Seller ka number niche hai:</p>
                        
                        <div className="bg-blue-50 p-6 rounded-[24px] border border-blue-100 mb-8">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Seller Contact</p>
                            <p className="text-3xl font-black text-blue-700 tracking-tighter">
                                {car.seller_phone || car.sellerPhone || '919929087878'}
                            </p>
                        </div>
                        
                        <button onClick={handleFormResetAndClose} className="w-full py-4 bg-[#0F172A] text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-lg">Done</button>
                    </div>
                ) : (
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-[#0F172A]">Contact Seller</h2>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Car: {car.name}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputGroup id="name" label="Name" icon={<FaUser/>} placeholder="Enter Name" value={formData.name} onChange={handleInputChange} />
                            <InputGroup id="phone" label="Phone" icon={<FaPhone/>} placeholder="Enter Phone" value={formData.phone} onChange={handleInputChange} />
                            <InputGroup id="email" label="Email" icon={<FaEnvelope/>} placeholder="Enter Email" value={formData.email} onChange={handleInputChange} />
                            <InputGroup id="city" label="City" icon={<FaMapMarkerAlt/>} placeholder="Enter City" value={formData.city} onChange={handleInputChange} />
                            
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Message</label>
                                <div className="relative">
                                    <FaCommentAlt className="absolute left-4 top-4 text-gray-300 text-sm" />
                                    <textarea id="message" rows={3} className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-0 outline-none font-bold text-sm focus:ring-2 focus:ring-blue-100" value={formData.message} onChange={handleInputChange} />
                                </div>
                            </div>

                            {submitError && (<p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl">{submitError}</p>)}

                            <button type="submit" className="w-full py-5 bg-red-600 text-white font-black rounded-2xl shadow-xl hover:bg-red-700 uppercase text-xs tracking-widest mt-4" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Get Seller Number'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const InputGroup = ({ id, label, icon, placeholder, value, onChange }: any) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-[10px] font-black uppercase text-gray-400 ml-1">{label}</label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">{icon}</span>
            <input type="text" id={id} required className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-0 outline-none font-bold text-sm focus:ring-2 focus:ring-blue-100" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    </div>
);

export default ContactSellerModal;