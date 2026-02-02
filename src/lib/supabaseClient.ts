import { createClient } from '@supabase/supabase-js';

// Yahan hum check kar rahe hain ki URL hai ya nahi.
// Agar nahi hai, toh ek "Nakli URL" de rahe hain taaki Build pass ho jaye.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Ye session yaad rakhega
    autoRefreshToken: true,
  }
});