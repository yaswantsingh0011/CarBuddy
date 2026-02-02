import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
   "https://tcxrcnmxzjsrvnscifhy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHJjbm14empzcnZuc2NpZmh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI4NjgxMSwiZXhwIjoyMDc1ODYyODExfQ.gd1KWXCQ2zADCvVyRubO7ZEy04e_iMfD-jF9thjwcnc",
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
            // Server actions ya middleware se call hone par ye ignore ho sakta h
          }
        },
      },
    }
  )
}