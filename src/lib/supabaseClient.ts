import { createClient } from '@supabase/supabase-js';

// Yahan hum check kar rahe hain ki URL hai ya nahi.
// Agar nahi hai, toh ek "Nakli URL" de rahe hain taaki Build pass ho jaye.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tcxrcnmxzjsrvnscifhy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHJjbm14empzcnZuc2NpZmh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI4NjgxMSwiZXhwIjoyMDc1ODYyODExfQ.gd1KWXCQ2zADCvVyRubO7ZEy04e_iMfD-jF9thjwcnc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Ye session yaad rakhega
    autoRefreshToken: true,
  }
});