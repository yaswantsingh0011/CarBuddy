import { createServerSupabaseClient } from '@/lib/supabaseServer';
import InboxClient from './InboxClient'; // 👈 Import the client component

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MessagesPage() {
  const supabase = createServerSupabaseClient();
  
  // 1. Fetch Data form Server
  const [testDriveRes, contactRes, feedbackRes, partnerRes] = await Promise.all([
    supabase.from('test_drives').select('*').order('created_at', { ascending: false }),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
    supabase.from('feedback').select('*').order('created_at', { ascending: false }),
    supabase.from('partner_inquiries').select('*').order('created_at', { ascending: false }),
  ]);

  // 2. Normalize Data (Sabka structure same banao taaki Client component mein dikkat na aaye)
  const allMessages = [
    ...(testDriveRes.data || []).map(m => ({ 
      ...m, 
      id: m.id,
      source: 'Test Drive', 
      full_name: m.full_name || m.name, 
      email: m.email || 'No Email',
      phone: m.phone || m.phone_number,
      message: m.message || `Request for ${m.car_name}`,
    })),
    ...(contactRes.data || []).map(m => ({ 
      ...m, 
      id: m.id,
      source: 'Contact Us', 
      full_name: m.name || m.full_name,
      message: m.message || m.inquiry,
    })),
    ...(feedbackRes.data || []).map(m => ({ 
      ...m, 
      id: m.id,
      source: 'Feedback', 
      full_name: m.name || 'Anonymous',
      message: m.message || m.feedback_text || m.comment,
    })),
    ...(partnerRes.data || []).map(m => ({ 
      ...m, 
      id: m.id,
      source: 'Partnership', 
      full_name: m.company_name || m.name,
      message: m.proposal || m.message,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // 3. Pass data to Client Component
  return <InboxClient messages={allMessages} />;
}