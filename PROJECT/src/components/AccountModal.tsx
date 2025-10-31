// src/components/AccountModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(''); // For any messages like "Logged out successfully"

  useEffect(() => {
    // Reset state and fetch user when modal opens
    if (isOpen) {
      setLoading(true);
      setMessage('');
      const fetchUser = async () => {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
        setLoading(false);
      };
      fetchUser();
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render if not open

  const handleLogout = async () => {
    setLoading(true);
    setMessage('Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(`Logout failed: ${error.message}`);
    } else {
      setMessage('Logged out successfully!');
      setTimeout(() => {
        onClose(); // Close the modal
        router.push('/'); // Redirect to homepage after logout
      }, 500); // Give a small delay to show message
    }
    setLoading(false);
  };

  // If user is not logged in when this modal tries to open (shouldn't happen if called correctly)
  if (!loading && !user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]">
            <FaTimes size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Not Logged In</h2>
          <p className="text-gray-700 mb-6">Please log in to view account details.</p>
          <button
            onClick={() => {
              onClose();
              router.push('/'); // Or open AuthModal here if you have that functionality
            }}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Display loading state inside the modal
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative text-center">
          <p className="text-xl text-gray-700">Loading account info...</p>
        </div>
      </div>
    );
  }

  // User is loaded and available
  const fullName = user?.user_metadata?.full_name || 'Guest'; // Use 'Guest' if no name
  const phoneNumber = user?.user_metadata?.phone; // Get phone number from metadata

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]">
          <FaTimes size={20} />
        </button>

        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Welcome, {fullName}!
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          You are successfully logged in.
        </p>
        <p className="text-gray-600 mb-6">
          Your Email: {user?.email} <br />
          {phoneNumber && <span>Your Phone: {phoneNumber}</span>}
        </p>

        {message && ( // Show logout message
          <p className={`text-sm text-center mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleLogout}
          disabled={loading} // Disable button during loading/logout process
          className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default AccountModal;