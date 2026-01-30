import { createClient } from '@supabase/supabase-js';

// Ye values tumhe apne Supabase Dashboard -> Settings -> API se milengi
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcxrcnmxzjsrvnscifhy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHJjbm14empzcnZuc2NpZmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODY4MTEsImV4cCI6MjA3NTg2MjgxMX0.bScMCF25ZXEaI2g5OQ-WcIjiOH96YgzTnXQK5SL8mT4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);