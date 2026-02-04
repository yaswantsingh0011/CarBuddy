import { supabase } from '@/lib/supabaseClient';
import { 
  FaEnvelope, 
  FaCalendarAlt, 
  FaReply, 
  FaCar, 
  FaCommentDots, 
  FaHandshake, 
  FaUser 
} from 'react-icons/fa';

// Cache bypass karne ke liye
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MessagesPage() {
  
  // 1. Chaaron tables se parallel data fetch karna
  const [testDriveRes, contactRes, feedbackRes, partnerRes] = await Promise.all([
    supabase.from('test_drives').select('*'),
    supabase.from('contact_submissions').select('*'),
    supabase.from('feedback').select('*'),
    supabase.from('partner_inquiries').select('*'),
  ]);

  // 2. Data ko combine karna aur source identify karna
  const allMessages = [
    ...(testDriveRes.data || []).map(m => ({ 
      ...m, 
      source: 'Test Drive', 
      icon: <FaCar className="text-orange-500" />,
      color: 'bg-orange-50 text-orange-600 border-orange-100' 
    })),
    ...(contactRes.data || []).map(m => ({ 
      ...m, 
      source: 'Contact Us', 
      icon: <FaEnvelope className="text-blue-500" />,
      color: 'bg-blue-50 text-blue-600 border-blue-100' 
    })),
    ...(feedbackRes.data || []).map(m => ({ 
      ...m, 
      source: 'Feedback', 
      icon: <FaCommentDots className="text-green-500" />,
      color: 'bg-green-50 text-green-600 border-green-100' 
    })),
    ...(partnerRes.data || []).map(m => ({ 
      ...m, 
      source: 'Partnership', 
      icon: <FaHandshake className="text-purple-500" />,
      color: 'bg-purple-50 text-purple-600 border-purple-100' 
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Error logging
  if (testDriveRes.error || contactRes.error || feedbackRes.error || partnerRes.error) {
    console.error("Database Fetch Error:", { testDriveRes: testDriveRes.error, contactRes: contactRes.error });
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Unified Inbox</h1>
          <p className="text-slate-500 font-medium">Monitoring all 4 inquiry channels in real-time.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Inquiries</p>
            <p className="text-2xl font-black text-slate-800">{allMessages.length}</p>
          </div>
        </div>
      </div>

      {/* Main List */}
      {allMessages.length === 0 ? (
        <div className="bg-white py-24 text-center rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEnvelope className="text-slate-200 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">Abhi tak koi message nahi hai</h3>
          <p className="text-slate-400 mt-2 max-w-sm mx-auto text-sm">Jab bhi koi user form bharega, wo automatically yahan reflect hoga.</p>
        </div>
      ) : (
        <div className="grid gap-6 pb-12">
          {allMessages.map((msg, index) => (
            <div key={index} className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 relative">
              
              {/* Source Badge */}
              <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${msg.color} flex items-center gap-2`}>
                {msg.icon} {msg.source}
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* User Info & Avatar */}
                <div className="flex items-start gap-4 min-w-[240px]">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-[1.2rem] flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
                    {(msg.full_name || msg.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {msg.full_name || msg.name || 'Anonymous User'}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium mt-1 truncate max-w-[180px]">{msg.email}</p>
                    <p className="text-xs text-blue-500 font-bold mt-1 tracking-tight">{msg.phone_number || msg.phone || 'No Phone'}</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 text-[11px] font-bold text-slate-400">
                    <FaCalendarAlt />
                    {new Date(msg.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                  
                  <div className="bg-slate-50/80 rounded-[1.5rem] p-5 border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-all">
                    {msg.subject && (
                      <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest italic">
                        Subject: {msg.subject}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                      "{msg.message || msg.content || 'No message content provided.'}"
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <a 
                      href={`mailto:${msg.email}`} 
                      className="flex items-center gap-2 text-xs font-bold text-slate-600 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    >
                      <FaReply /> Reply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}