"use client";

import { useState, useEffect } from 'react';
// ✅ FIXED: Correct Import
import { supabase } from '@/lib/supabaseClient';
import { FaSave, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function WebsiteSettings() {
  // ❌ Removed: const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form ka data
  const [formData, setFormData] = useState({
    id: null,
    site_name: '',
    contact_email: '',
    contact_phone: '',
    address: ''
  });

  // Page load hote hi data fetch karo
  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (data) {
        setFormData(data);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  // Update function
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('site_settings')
      .update({
        site_name: formData.site_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        address: formData.address,
        updated_at: new Date().toISOString()
      })
      .eq('id', formData.id);

    if (error) {
      alert('Error updating settings: ' + error.message);
    } else {
      alert('Settings updated successfully! 🎉');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Website Settings</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
          Global Configuration
        </span>
      </div>
      
      <form onSubmit={handleSave} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        
        {/* Site Name Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaGlobe className="text-blue-500"/> Website Name
            </label>
            <input 
              type="text" 
              value={formData.site_name}
              onChange={(e) => setFormData({...formData, site_name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="e.g. CarBuddy"
            />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
               <FaEnvelope className="text-orange-500"/> Contact Email
              </label>
              <input 
              type="email" 
              value={formData.contact_email}
              onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaPhone className="text-green-500"/> Phone Number
            </label>
            <input 
              type="text" 
              value={formData.contact_phone}
              onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
               <FaMapMarkerAlt className="text-red-500"/> Office Address
              </label>
              <input 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t pt-6 flex justify-end">
            <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition disabled:opacity-70"
            >
                {saving ? 'Saving...' : <><FaSave /> Save Changes</>}
            </button>
        </div>
      </form>
    </div>
  );
}