"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Save, Car, Wrench, Image as ImageIcon, Upload, X, Loader2, Gauge } from 'lucide-react';

export default function AddUsedCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', fuelType: 'Petrol',
    kms: '', modelYear: '', owner: '1st Owner', location: 'Jaipur', sellerPhone: '',
    registrationYear: '', insurance: '', seats: '', rto: '', engineDisplacement: '', transmissionType: 'Manual',
    images: ['', '', '', ''],
    specs: { engine: '', power: '', torque: '', transmission: '', mileage: '', bootSpace: '', groundClearance: '' },
    features: ''
  });

  const handleInputChange = (e: any, section?: string, field?: string) => {
    const { name, value } = e.target;
    if (section && field) setFormData((prev: any) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
    const filePath = `used-cars/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('car-images').upload(filePath, file);
    if (uploadError) { alert(uploadError.message); setUploading(false); return; }
    const { data } = supabase.storage.from('car-images').getPublicUrl(filePath);
    if (data) {
      const newImages = [...formData.images];
      newImages[index] = data.publicUrl;
      setFormData({ ...formData, images: newImages });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return alert("Bhai Name aur Price bharo!");
    setLoading(true);

    const finalData = {
      name: formData.name,
      slug: formData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"),
      price: formData.price,
      brand: formData.brand,
      kms: formData.kms,
      model_year: formData.modelYear,
      fuel_type: formData.fuelType,
      owner: formData.owner,
      location: formData.location,
      seller_phone: formData.sellerPhone,
      registration_year: formData.registrationYear,
      insurance: formData.insurance,
      seats: formData.seats,
      rto: formData.rto,
      engine_displacement: formData.engineDisplacement,
      transmission_type: formData.transmissionType,
      images: formData.images.filter(img => img !== ''),
      specs: formData.specs,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ""),
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('used_cars').insert([finalData]);
    if (error) alert("Error: " + error.message);
    else { alert("Bhai, Nayi Table mein gaadi add ho gayi!"); router.push('/admin/cars/used-cars'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-400 font-bold uppercase text-xs flex items-center gap-2 transition-colors hover:text-black"><ArrowLeft size={18} /> Back</button>
          <button onClick={handleSubmit} disabled={loading || uploading} className="bg-[#0F172A] text-white px-10 py-4 rounded-[20px] font-bold flex items-center gap-2 shadow-xl active:scale-95 disabled:opacity-50 transition-all">{loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} Publish Car</button>
        </div>

        <h1 className="text-4xl font-black text-[#0F172A] mb-10 tracking-tight">Add New Used Car</h1>

        <div className="flex gap-3 mb-8 bg-white p-2 rounded-[24px] shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
          {[{ id: 'basic', label: 'Basic Info', icon: <Car size={18}/> }, { id: 'used', label: 'Used Specs', icon: <Gauge size={18}/> }, { id: 'images', label: 'Gallery', icon: <ImageIcon size={18}/> }, { id: 'tech', label: 'Technical', icon: <Wrench size={18}/> }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 min-h-[500px]">
          {activeTab === 'basic' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <Input label="Car Name" name="name" placeholder="Mahindra Thar LX" onChange={handleInputChange} />
              <Input label="Brand" name="brand" placeholder="Mahindra" onChange={handleInputChange} />
              <Input label="Asking Price" name="price" placeholder="₹ 14.50 Lakh" onChange={handleInputChange} />
              <Input label="Location" name="location" placeholder="Jaipur" onChange={handleInputChange} />
              <Input label="Seller Phone" name="sellerPhone" placeholder="9876543210" onChange={handleInputChange} />
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Fuel Type</label>
                <select name="fuelType" onChange={handleInputChange} className="p-4 bg-gray-50 rounded-2xl font-bold border-0 outline-none"><option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option></select>
              </div>
            </div>
          )}

          {activeTab === 'used' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <Input label="KMs Driven" name="kms" placeholder="18,000 KM" onChange={handleInputChange} />
              <Input label="Model Year" name="modelYear" placeholder="2022" onChange={handleInputChange} />
              <Input label="Owner Type" name="owner" placeholder="1st Owner" onChange={handleInputChange} />
              <Input label="Registration" name="registrationYear" placeholder="Feb 2022" onChange={handleInputChange} />
              <Input label="Insurance" name="insurance" placeholder="Zero Dep" onChange={handleInputChange} />
              <Input label="RTO" name="rto" placeholder="RJ14" onChange={handleInputChange} />
            </div>
          )}

          {activeTab === 'images' && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative group h-48 bg-gray-50 rounded-[30px] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                  {img ? (
                    <><img src={img} className="w-full h-full object-cover" alt="" /><button onClick={() => { const n = [...formData.images]; n[idx] = ''; setFormData({...formData, images: n}); }} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg"><X size={16}/></button></>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2"><Upload size={24} className="text-blue-500" /><span className="text-[10px] font-black uppercase text-gray-400">Upload Photo {idx + 1}</span><input type="file" className="hidden" onChange={(e) => handleFileUpload(e, idx)} /></label>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-2 gap-8">
                <Input label="Engine Specs" value={formData.specs.engine} onChange={(e:any) => handleInputChange(e, 'specs', 'engine')} placeholder="2184 cc" />
                <Input label="Transmission" name="transmissionType" placeholder="Manual / Automatic" onChange={handleInputChange} />
              </div>
              <textarea name="features" value={formData.features} onChange={handleInputChange} placeholder="Features (Comma Separated)" className="p-6 bg-gray-50 rounded-[30px] border-0 min-h-[120px] font-bold outline-none w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-2"><label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
  <input {...props} className="p-4 bg-gray-50 rounded-2xl border-0 outline-none font-bold text-black focus:ring-2 focus:ring-blue-100 transition-all" /></div>
);