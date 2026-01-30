import { createClient } from '@/utils/supabase/server';
import { FaEnvelope, FaUser, FaCalendarAlt, FaReply } from 'react-icons/fa';

export const revalidate = 0; // Taaki har baar naya data aaye (Real-time feel)

export default async function MessagesPage() {
  const supabase = await createClient();

  // 1. Database se messages fetch karo (Latest pehle)
  const { data: messages, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading messages: {error.message}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">User Messages</h1>
            <p className="text-gray-500 mt-1">Check what your users are saying.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold border border-blue-100">
            Total: {messages?.length || 0}
        </div>
      </div>

      {/* Agar koi message nahi hai */}
      {messages?.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
            <FaEnvelope className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No Messages Yet</h3>
            <p className="text-gray-500">Wait for users to contact you.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages?.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              
              {/* Header: Name, Email, Date */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-4 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                        {msg.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{msg.full_name}</h3>
                        <p className="text-sm text-blue-600 flex items-center gap-2">
                             {msg.email} 
                             <span className="text-gray-400">•</span> 
                             {msg.phone_number}
                        </p>
                    </div>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2 bg-gray-50 px-3 py-1 rounded">
                    <FaCalendarAlt />
                    {new Date(msg.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                </div>
              </div>

              {/* Body: Subject & Message */}
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Subject: {msg.subject}</h4>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {msg.message}
                </p>
              </div>

              {/* Footer: Action Buttons (Abhi sirf dikhawa hai) */}
              <div className="mt-4 flex justify-end">
                <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                    <FaReply /> Reply via Email
                </a>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}