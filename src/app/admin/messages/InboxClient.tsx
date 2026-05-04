'use client'; // 👈 Ye zaroori hai interactivity ke liye

import { useState } from 'react';
import { 
  FaEnvelope, FaCalendarAlt, FaReply, FaCar, 
  FaCommentDots, FaHandshake, FaFilter 
} from 'react-icons/fa';

export default function InboxClient({ messages }: { messages: any[] }) {
  const [activeTab, setActiveTab] = useState('All');

  // Filters List
  const tabs = [
    { name: 'All', count: messages.length },
    { name: 'Test Drive', count: messages.filter(m => m.source === 'Test Drive').length },
    { name: 'Contact Us', count: messages.filter(m => m.source === 'Contact Us').length },
    { name: 'Feedback', count: messages.filter(m => m.source === 'Feedback').length },
    { name: 'Partnership', count: messages.filter(m => m.source === 'Partnership').length },
  ];

  // Filtering Logic
  const filteredMessages = activeTab === 'All' 
    ? messages 
    : messages.filter(msg => msg.source === activeTab);

  // Helper for Icons & Colors
  const getSourceStyles = (source: string) => {
    switch (source) {
      case 'Test Drive': return { icon: <FaCar />, color: 'bg-orange-50 text-orange-600 border-orange-100' };
      case 'Contact Us': return { icon: <FaEnvelope />, color: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'Feedback': return { icon: <FaCommentDots />, color: 'bg-green-50 text-green-600 border-green-100' };
      case 'Partnership': return { icon: <FaHandshake />, color: 'bg-purple-50 text-purple-600 border-purple-100' };
      default: return { icon: <FaEnvelope />, color: 'bg-gray-50 text-gray-600 border-gray-100' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Unified Inbox</h1>
          <p className="text-slate-500 font-medium">Manage all your inquiries in one place.</p>
        </div>
        <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm flex flex-col items-end">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Messages</p>
          <p className="text-2xl font-black text-slate-800">{messages.length}</p>
        </div>
      </div>

      {/* 🔥 TABS / FILTERS SECTION */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab.name
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-transparent text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.name}
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.name ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="grid gap-6 pb-12 animate-in fade-in duration-500">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-300">
             <p className="text-slate-400 font-medium">No messages found in "{activeTab}"</p>
          </div>
        ) : (
          filteredMessages.map((msg: any, index: number) => {
            const style = getSourceStyles(msg.source);
            return (
              <div key={index} className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative">
                
                {/* Source Badge */}
                <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${style.color} flex items-center gap-2`}>
                  {style.icon} {msg.source}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-[1rem] flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                    {(msg.full_name || 'U').charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                       <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                        {msg.full_name}
                      </h4>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mt-1 sm:mt-0">
                        <FaCalendarAlt />
                        {msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-IN', {
                           day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                        }) : 'N/A'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 font-medium mb-3">{msg.email} • {msg.phone || 'No Phone'}</p>
                    
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      {msg.subject && (
                        <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">
                          Subject: {msg.subject}
                        </p>
                      )}
                      <p className="text-slate-600 text-sm italic font-medium">"{msg.message}"</p>
                    </div>

                    <div className="mt-4 flex justify-end">
                       <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all">
                         <FaReply /> Reply
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}