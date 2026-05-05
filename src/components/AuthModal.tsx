// src/components/AuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';

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
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setIsError(false);
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

  const showError = (msg: string) => { setMessage(msg); setIsError(true); };
  const showSuccess = (msg: string) => { setMessage(msg); setIsError(false); };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLoginView) {
        // ✅ FIX 1: Sirf email se login — phone se password login Supabase support nahi karta
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          // ✅ FIX 2: Friendly Hindi error messages
          if (
            error.message.toLowerCase().includes('invalid login credentials') ||
            error.message.toLowerCase().includes('invalid credentials')
          ) {
            showError('Email ya password galat hai. Dobara check karo.');
          } else if (error.message.toLowerCase().includes('email not confirmed')) {
            showError('Email confirm nahi hua. Inbox check karo.');
          } else {
            showError(error.message);
          }
        } else {
          // ✅ FIX 3: Success pe seedha modal band — koi delay nahi
          onClose();
        }

      } else {
        // --- Sign Up ---
        if (password !== confirmPassword) {
          showError('Dono passwords match nahi kar rahe.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          showError('Password kam se kam 6 characters ka hona chahiye.');
          setLoading(false);
          return;
        }
        if (!/^\d{10}$/.test(mobileNumber)) {
          showError('Valid 10-digit mobile number daalo.');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: `+91${mobileNumber}`,
            },
          },
        });

        if (error) {
          if (
            error.message.toLowerCase().includes('already registered') ||
            error.message.toLowerCase().includes('user already')
          ) {
            showError('Ye email pehle se registered hai. Login karo.');
          } else {
            showError(error.message);
          }
        } else if (data.session) {
          // ✅ Email confirmation OFF — session mil gayi, seedha close
          onClose();
        } else {
          // Email confirmation ON — user ko email confirm karna hoga
          showSuccess('Account ban gaya! Email check karo aur confirm link pe click karo.');
          setEmail(''); setPassword(''); setConfirmPassword('');
          setFullName(''); setMobileNumber('');
          setIsLoginView(true);
        }
      }
    } catch (err: any) {
      showError(err.message || 'Kuch gadbad ho gayi. Dobara try karo.');
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
            onClick={() => { setIsLoginView(true); setMessage(''); }}
            className={`py-2 px-4 w-1/2 ${
              isLoginView
                ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLoginView(false); setMessage(''); }}
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

        {/* Message */}
        {message && (
          <p className={`text-sm text-center mb-4 p-3 rounded-lg ${
            isError
              ? 'bg-red-50 text-red-600 border border-red-100'
              : 'bg-green-50 text-green-600 border border-green-100'
          }`}>
            {message}
          </p>
        )}

        <form onSubmit={handleAuth}>
          <div className="space-y-4">

            {/* Full Name — Signup only */}
            {!isLoginView && (
              <div>
                <label htmlFor="auth-fullname" className="block text-sm font-medium text-gray-800">Full Name</label>
                <input
                  type="text" id="auth-fullname" value={fullName} required
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-gray-800">
                Email Address
              </label>
              <input
                type="email" id="auth-email" value={email} required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            {/* Mobile — Signup only */}
            {!isLoginView && (
              <div>
                <label htmlFor="auth-mobile" className="block text-sm font-medium text-gray-800">
                  Mobile Number (10 Digits)
                </label>
                <input
                  type="tel" id="auth-mobile" value={mobileNumber} required
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter your 10-digit mobile number"
                  pattern="\d{10}"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-gray-800">Password</label>
              <input
                type="password" id="auth-password" value={password} required minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
              {!isLoginView && (
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long.</p>
              )}
            </div>

            {/* Confirm Password — Signup only */}
            {!isLoginView && (
              <div>
                <label htmlFor="auth-confirm-password" className="block text-sm font-medium text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password" id="auth-confirm-password" value={confirmPassword} required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password again"
                  className={`mt-1 block w-full border rounded-md p-2 text-gray-900 outline-none focus:ring-2 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-red-400 focus:ring-red-100'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-red-500 mt-1">Passwords match nahi kar rahe.</p>
                )}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : isLoginView ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;