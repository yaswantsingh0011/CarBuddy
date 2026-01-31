import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Build ke waqt crash na ho isliye condition check
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Warning: Supabase environment variables are missing. " +
    "Make sure they are set in .env.local or your deployment dashboard."
  );
}

// Client initialize karte waqt empty string fallback de do
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);