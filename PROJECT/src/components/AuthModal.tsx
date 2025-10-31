// src/components/AuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
// 'useRouter' यहाँ से हटा दिया गया है

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFullName('');
      setMobileNumber('');
      setIsLoginView(true);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let error = null;
      if (isLoginView) {
        // --- Login Logic ---
        const isEmailInput = email.includes('@');
        const isPhoneInput = !isEmailInput && /^\d{10}$/.test(email);

        let phoneLogin = email;
        if (isPhoneInput) {
          phoneLogin = `+91${email}`;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword(
          isEmailInput
            ? { email: email, password: password }
            : { phone: phoneLogin, password: password }
        );
        error = signInError;
      } else {
        // --- Sign Up Logic ---
        if (password !== confirmPassword) {
          setMessage('Passwords do not match.');
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName,
              phone: `+91${mobileNumber}`,
            },
          },
        });

        error = signUpError;
        if (!error) {
          setMessage('Account created successfully! Please log in.');
          setIsLoginView(true);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setFullName('');
          setMobileNumber('');
        }
      }

      if (error) {
        setMessage(error.message);
      } else if (isLoginView && !message) {
        
        // --- ✅ फिक्स: router.push हटा दिया गया है ---
        
        setMessage('Login successful!');
        setTimeout(() => {
          onClose(); // बस Modal बंद करें
        }, 1000);

        // --- एंड ---
      }
    } catch (err: any) {
      setMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-[80]"
        >
          <FaTimes size={20} />
        </button>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => {
              setIsLoginView(true);
              setMessage('');
            }}
            className={`py-2 px-4 w-1/2 ${
              isLoginView
                ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLoginView(false);
              setMessage('');
            }}
            className={`py-2 px-4 w-1/2 ${
              !isLoginView
                ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {isLoginView ? 'Login to CarBuddy' : 'Create your Account'}
        </h2>

        {/* Message bar */}
        {message && (
          <p
            className={`text-sm text-center mb-4 ${
              message.includes('successfully')
                ? 'text-green-600'
                : message.includes('successful!')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleAuth}>
          <div className="space-y-4">
            {/* --- Full Name (Sign Up Only) --- */}
            {!isLoginView && (
              <div>
                <label
                  htmlFor="auth-fullname"
                  className="block text-sm font-medium text-gray-800"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="auth-fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                />
              </div>
            )}

            {/* --- Email / Email or Mobile --- */}
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-medium text-gray-800"
              >
                {isLoginView ? 'Email or Mobile Number' : 'Email Address'}
              </label>
              <input
                type={isLoginView ? 'text' : 'email'}
                id="auth-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  isLoginView
                    ? 'Enter your email or 10-digit mobile'
                    : 'Enter your email'
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
              />
            </div>

            {/* --- Mobile Number (Sign Up Only) --- */}
            {!isLoginView && (
              <div>
                <label
                  htmlFor="auth-mobile"
                  className="block text-sm font-medium text-gray-800"
                >
                  Mobile Number (10 Digits)
                </label>
                <input
                  type="tel"
                  id="auth-mobile"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your 10-digit mobile number"
                  required
                  pattern="\d{10}"
                  title="Please enter a 10-digit mobile number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                />
              </div>
            )}

            {/* --- Password --- */}
            <div>
              <label
                htmlFor="auth-password"
                className="block text-sm font-medium text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
              />
              {!isLoginView && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long.
                </p>
              )}
            </div>

            {/* --- Confirm Password (Sign Up Only) --- */}
            {!isLoginView && (
              <div>
                <label
                  htmlFor="auth-confirm-password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="auth-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password again"
                  required
                  minLength={6}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading
                ? 'Processing...'
                : isLoginView
                ? 'Login'
                : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;