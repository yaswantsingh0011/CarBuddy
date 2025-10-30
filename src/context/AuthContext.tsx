// src/context/AuthContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  wishlist: string[]; // कारों के नाम का ऐरे
  loading: boolean;
  addToWishlist: (carName: string) => Promise<void>;
  removeFromWishlist: (carName: string) => Promise<void>;
  isInWishlist: (carName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Wishlist लाने का फंक्शन
  const fetchWishlist = async (userId: string) => {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('car_name')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    } else {
      setWishlist(data.map(item => item.car_name));
    }
  };

  useEffect(() => {
    // Session को शुरू में लाने की कोशिश करें
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchWishlist(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Auth state बदलने पर सुनें
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setLoading(true);
          await fetchWishlist(session.user.id);
          setLoading(false);
        } else {
          setWishlist([]); // Logout होने पर Wishlist खाली करें
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Wishlist में जोड़ना
  const addToWishlist = async (carName: string) => {
    if (!user) return; 
    if (wishlist.includes(carName)) return; 

    const { error } = await supabase
      .from('wishlist_items')
      .insert({ user_id: user.id, car_name: carName });

    if (error) {
      console.error('Error adding to wishlist:', error);
    } else {
      setWishlist([...wishlist, carName]); 
    }
  };

  // Wishlist से हटाना
  const removeFromWishlist = async (carName: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .match({ user_id: user.id, car_name: carName });

    if (error) {
      console.error('Error removing from wishlist:', error);
    } else {
      setWishlist(wishlist.filter(name => name !== carName)); 
    }
  };
  
  const isInWishlist = (carName: string): boolean => {
    return wishlist.includes(carName);
  };


  const value = {
    session,
    user,
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
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