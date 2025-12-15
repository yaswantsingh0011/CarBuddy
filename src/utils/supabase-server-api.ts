// src/utils/supabase-server-api.ts

import { createClient } from '@supabase/supabase-js';

// IMPORTANT: This uses the SECRET key (SUPABASE_SERVICE_KEY), 
// which should NOT have the NEXT_PUBLIC_ prefix in your .env.local file.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // Agar keys set nahi hain, toh application run nahi hogi.
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables. Check your .env.local file.");
}

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Ye function database mein data daalne ka kaam karega.
 * @param tableName Target Supabase table name (e.g., 'contact_submissions').
 * @param data Data object to insert.
 */
export async function insertFormData(tableName: string, data: Record<string, any>) {
  try {
    const { error } = await supabaseServer
      .from(tableName)
      .insert([data]);

    if (error) {
      console.error(`Supabase error inserting into ${tableName}:`, error);
      return { status: 500, message: `Database submission failed: ${error.message}` };
    }

    // You can add more logic here, like sending an internal email notification.
    
    return { status: 200, message: 'Form submitted successfully' };
  } catch (e) {
    console.error(`API processing error for ${tableName}:`, e);
    return { status: 500, message: 'Internal Server Error' };
  }
}