// src/utils/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // यह सुनिश्चित करता है कि हम पर्यावरण चर (Environment Variables) का उपयोग करें
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}