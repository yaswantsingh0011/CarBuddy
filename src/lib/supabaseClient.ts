import { createClient } from '@supabase/supabase-js'

// Aapke project URL aur anon key yahan daalein
// (Yeh aapko Supabase > Project Settings > API mein milenge)
const supabaseUrl = 'https://tcxrcnmxzjsrvnscifhy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHJjbm14empzcnZuc2NpZmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODY4MTEsImV4cCI6MjA3NTg2MjgxMX0.bScMCF25ZXEaI2g5OQ-WcIjiOH96YgzTnXQK5SL8mT4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)