import { createClient } from '@supabase/supabase-js';

// Client ko cache karne ke liye variable
let supabaseServerClient: any = null;

export async function insertFormData(tableName: string, data: Record<string, any>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  // Check 1: Keys hain ya nahi (Ab ye function call hone par hi check hoga)
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ CRITICAL ERROR: Missing Supabase Environment Variables");
    console.error(`SUPABASE_URL Status: ${supabaseUrl ? '✅ Found' : '❌ Missing'}`);
    console.error(`SUPABASE_SERVICE_KEY Status: ${supabaseServiceKey ? '✅ Found' : '❌ Missing'}`);
    
    return { status: 500, message: "Server Configuration Error: Missing API Keys" };
  }

  try {
    // Check 2: Agar client pehle se nahi bana, toh ab banao (Lazy Init)
    if (!supabaseServerClient) {
      supabaseServerClient = createClient(supabaseUrl, supabaseServiceKey);
    }

    const { error } = await supabaseServerClient
      .from(tableName)
      .insert([data]);

    if (error) {
      console.error(`Supabase error inserting into ${tableName}:`, error);
      return { status: 500, message: `Database submission failed: ${error.message}` };
    }

    return { status: 200, message: 'Form submitted successfully' };
  } catch (e) {
    console.error(`API processing error for ${tableName}:`, e);
    return { status: 500, message: 'Internal Server Error' };
  }
}