// src/app/api/contact/route.ts (Contact Form's dedicated API)

import { NextResponse } from 'next/server';
import { insertFormData } from '@/utils/supabase-server-api'; // Import the helper function

// POST request ko handle karega
export async function POST(request: Request) {
  const formData = await request.json();
  
  // 1. Validation: Agar koi field missing hai toh 400 error bhej do
  if (!formData.email || !formData.full_name || !formData.message) {
      return NextResponse.json({ message: 'Missing required fields: email, name, or message' }, { status: 400 });
  }

  // 2. Generic function ko call karke data save karo
  const result = await insertFormData('contact_submissions', formData);

  // 3. Client ko response bhej do
  return NextResponse.json({ message: result.message }, { status: result.status });
}