import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 🛡️ Build Safety Check: 
  // Agar build ke time keys nahi milti, toh ye crash hone ke bajaye error console karega.
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Supabase keys are missing! Check your .env.local file.");
    // Build fail na ho isliye ek dummy client ya error handle karne ka option:
    throw new Error("Supabase credentials not found.");
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component mein cookies.set call karne par error aa sakta hai, 
            // isliye ise try-catch mein rakha hai. Middleware handles the actual setting.
          }
        },
      },
    }
  )
}