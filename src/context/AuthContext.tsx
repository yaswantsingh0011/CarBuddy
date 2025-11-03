// src/context/AuthContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

// --- BADLAAV 1: Wishlist ko interface se hata diya ---
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  // Wishlist functions hata diye
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // const [wishlist, setWishlist] = useState<string[]>([]); // Hata diya
  const [loading, setLoading] = useState(true);

  // --- BADLAAV 2: Poora fetchWishlist function hata diya ---
  // const fetchWishlist = async (userId: string) => { ... };

  useEffect(() => {
    // Session ko shuru mein laane ki koshish karein
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      // --- BADLAAV 3: Yahan se fetchWishlist call hata diya ---
      setLoading(false); 
    });

    // Auth state badalne par sunein
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        // --- BADLAAV 4: Yahan se bhi fetchWishlist logic hata diya ---
        // if (session?.user) { ... } else { ... }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // --- BADLAAV 5: Poore Wishlist functions (add, remove, check) hata diye ---
  // const addToWishlist = async ...
  // const removeFromWishlist = async ...
  // const isInWishlist = ...

  // --- BADLAAV 6: Value object se wishlist hata diya ---
  const value = {
    session,
    user,
    // wishlist, // Hata diya
    loading,
    // addToWishlist, // Hata diya
    // removeFromWishlist, // Hata diya
    // isInWishlist, // Hata diya
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};