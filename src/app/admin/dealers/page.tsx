"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  MoreVertical, 
  Plus, 
  Phone, 
  MapPin, 
  Building2, 
  Trash2, 
  Edit2, 
  Filter, 
  X,
  Search
} from 'lucide-react';

export default function AdminDealers() {
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', brand: '', city: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filter States
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDealers = async () => {
    const { data } = await supabase.from('dealers').select('*').order('id', { ascending: false });
    if (data) {
      setDealers(data);
      setFilteredDealers(data);
    }
  };

  useEffect(() => { fetchDealers(); }, []);

  // Filter & Search Logic combined
  useEffect(() => {
    let result = dealers;
    
    if (selectedCity) {
      result = result.filter(d => d.city === selectedCity);
    }
    if (selectedBrand) {
      result = result.filter(d => d.brand === selectedBrand);
    }
    if (searchTerm) {
      result = result.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDealers(result);
  }, [selectedCity, selectedBrand, searchTerm, dealers]);

  // Unique Cities and Brands for Dropdowns
  const cities = Array.from(new Set(dealers.map(d => d.city))).sort();
  const brands = Array.from(new Set(dealers.map(d => d.brand))).sort();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('dealers').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('dealers').insert([formData]);
    }
    setFormData({ name: '', brand: '', city: '', phone: '', address: '' });
    setShowForm(false);
    fetchDealers();
  };

  const deleteDealer = async (id: number) => {
    if (confirm("Bhai, pakka delete karna hai?")) {
      await supabase.from('dealers').delete().eq('id', id);
      fetchDealers();
      setActiveMenu(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dealer Management</h1>
          <p className="text-gray-500 text-sm">Manage your network of {dealers.length} dealers across India</p>
        </div>
        <button 
          onClick={() => {setShowForm(!showForm); setEditingId(null); setFormData({ name: '', brand: '', city: '', phone: '', address: '' });}}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-medium"
        >
          <Plus size={18} /> Add New Dealer
        </button>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by dealer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        
        <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>

        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-gray-50 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] cursor-pointer"
        >
          <option value="">All Cities</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>

        <select 
          value={selectedBrand} 
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="bg-gray-50 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] cursor-pointer"
        >
          <option value="">All Brands</option>
          {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </select>

        {(selectedCity || selectedBrand || searchTerm) && (
          <button 
            onClick={() => {setSelectedCity(''); setSelectedBrand(''); setSearchTerm('');}}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            title="Clear Filters"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Add/Edit Form Overlay */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-50 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Dealer Details' : 'Register New Dealer'}</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">DEALER NAME</label>
              <input className="w-full border rounded-xl p-3 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder="e.g. Sunny Toyota" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">BRAND</label>
              <input className="w-full border rounded-xl p-3 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder="e.g. Toyota" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">CITY</label>
              <input className="w-full border rounded-xl p-3 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder="e.g. Jaipur" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">CONTACT NUMBER</label>
              <input className="w-full border rounded-xl p-3 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder="e.g. 98290XXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="space-y-1 lg:col-span-2">
              <label className="text-xs font-semibold text-gray-500 ml-1">FULL ADDRESS</label>
              <input className="w-full border rounded-xl p-3 text-sm outline-none focus:border-blue-500 bg-gray-50" placeholder="Street, Area, Landmark..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="lg:col-span-3 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">Discard</button>
                <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-md">
                  {editingId ? 'Update Information' : 'Confirm & Add'}
                </button>
            </div>
          </form>
        </div>
      )}

      {/* Dealers List Section */}
      <div className="space-y-3">
        {filteredDealers.length > 0 ? (
          filteredDealers.map((dealer: any, index: number) => (
            <div key={dealer.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
              <div className="flex items-center gap-5">
                {/* Serial Number */}
                <div className="text-xs font-bold text-gray-300 w-5">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Brand Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-base shadow-inner">
                  {dealer.brand.substring(0, 1).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{dealer.name}</h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1">
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Building2 size={13} className="text-blue-400"/> {dealer.brand}</span>
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><MapPin size={13} className="text-blue-400"/> {dealer.city}</span>
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Phone size={13} className="text-blue-400"/> {dealer.phone || 'NO CONTACT'}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === dealer.id ? null : dealer.id)}
                  className="p-2 hover:bg-gray-50 rounded-xl transition text-gray-400 hover:text-gray-600 border border-transparent hover:border-gray-100"
                >
                  <MoreVertical size={20} />
                </button>

                {activeMenu === dealer.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 py-1.5 animate-in fade-in zoom-in duration-150">
                      <button 
                        onClick={() => {setEditingId(dealer.id); setFormData(dealer); setShowForm(true); setActiveMenu(null);}}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-3 transition-colors font-medium"
                      >
                        <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Edit2 size={14} /></div>
                        Edit Dealer
                      </button>
                      <div className="h-[1px] bg-gray-50 my-1 mx-2"></div>
                      <button 
                        onClick={() => deleteDealer(dealer.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"
                      >
                        <div className="w-7 h-7 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><Trash2 size={14} /></div>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search size={24} className="text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-semibold">No dealers found</h3>
            <p className="text-gray-400 text-sm mt-1">Bhai, is search ya filter ke liye koi data nahi mila.</p>
            <button onClick={() => {setSelectedCity(''); setSelectedBrand(''); setSearchTerm('');}} className="mt-4 text-blue-600 font-medium text-sm hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}