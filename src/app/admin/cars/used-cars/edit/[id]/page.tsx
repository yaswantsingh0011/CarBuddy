"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Save, Car, Wrench, Image as ImageIcon, Upload, X, Loader2, Gauge } from 'lucide-react';

export default function EditUsedCarPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState<any>({
    name: '', brand: '', price: '', fuelType: 'Petrol',
    kms: '', modelYear: '', owner: '1st Owner', location: 'Jaipur', sellerPhone: '',
    registrationYear: '', insurance: '', seats: '', rto: '', engineDisplacement: '', transmissionType: 'Manual',
    images: ['', '', '', ''],
    specs: { engine: '', power: '', torque: '', transmission: '', mileage: '', bootSpace: '', groundClearance: '' },
    features: ''
  });

  useEffect(() => {
    const fetchCarData = async () => {
      const { data, error } = await supabase.from('used_cars').select('*').eq('id', id).single();
      if (data) {
        setFormData({
          ...data,
          fuelType: data.fuel_type || 'Petrol',
          modelYear: data.model_year || '',
          sellerPhone: data.seller_phone || '',
          registrationYear: data.registration_year || '',
          engineDisplacement: data.engine_displacement || '',
          transmissionType: data.transmission_type || 'Manual',
          features: Array.isArray(data.features) ? data.features.join(', ') : '',
          images: data.images && data.images.length > 0 ? [...data.images, ...Array(4 - data.images.length).fill('')] : ['', '', '', ''],
          specs: data.specs || { engine: '', power: '', torque: '', transmission: '', mileage: '', bootSpace: '', groundClearance: '' }
        });
      }
      setLoading(false);
    };
    if (id) fetchCarData();
  }, [id]);

  const handleInputChange = (e: any, section?: string, field?: string) => {
    const { name, value } = e.target;
    if (section && field) {
      setFormData((prev: any) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
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
    setSaving(true);
    const updatedData = {
      name: formData.name, brand: formData.brand, price: formData.price,
      fuel_type: formData.fuelType, kms: formData.kms, owner: formData.owner, location: formData.location,
      model_year: formData.modelYear, seller_phone: formData.sellerPhone,
      registration_year: formData.registrationYear, insurance: formData.insurance, seats: formData.seats,
      rto: formData.rto, engine_displacement: formData.engineDisplacement,
      transmission_type: formData.transmissionType,
      images: formData.images.filter((img: string) => img !== ''),
      specs: formData.specs,
      features: formData.features.split(',').map((i: string) => i.trim()).filter((i: string) => i !== ""),
    };
    const { error } = await supabase.from('used_cars').update(updatedData).eq('id', id);
    if (error) alert("Bhai Update nahi hua: " + error.message);
    else { alert("Bhai, Details Update ho gayi!"); router.push('/admin/cars/used-cars'); }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading Used Car Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-400 font-bold uppercase text-xs flex items-center gap-2 hover:text-black">
            <ArrowLeft size={18} /> Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving || uploading} className="bg-[#0F172A] text-white px-10 py-4 rounded-[20px] font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Update Details
          </button>
        </div>

        <h1 className="text-4xl font-black text-[#0F172A] mb-10 tracking-tight">Edit {formData.name}</h1>

        {/* ✅ FIXED TABS UI */}
        <div className="flex gap-3 mb-8 bg-white p-2 rounded-[24px] shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
          {[
            { id: 'basic', label: 'Basic Info', icon: <Car size={18}/> },
            { id: 'used', label: 'Used Specs', icon: <Gauge size={18}/> },
            { id: 'images', label: 'Gallery', icon: <ImageIcon size={18}/> },
            { id: 'tech', label: 'Technical', icon: <Wrench size={18}/> }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 min-h-[500px]">
          {/* 1. Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <Input label="Car Name" name="name" value={formData.name} onChange={handleInputChange} />
              <Input label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} />
              <Input label="Asking Price" name="price" value={formData.price} onChange={handleInputChange} />
              <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} />
              <Input label="Seller Phone" name="sellerPhone" value={formData.sellerPhone} onChange={handleInputChange} />
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Fuel Type</label>
                <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="p-4 bg-gray-50 rounded-2xl font-bold border-0 outline-none">
                  <option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option>
                </select>
              </div>
            </div>
          )}

          {/* ✅ 2. Used Specs Tab (WAS EMPTY) */}
          {activeTab === 'used' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in">
              <Input label="KMs Driven" name="kms" value={formData.kms} onChange={handleInputChange} />
              <Input label="Model Year" name="modelYear" value={formData.modelYear} onChange={handleInputChange} />
              <Input label="Owner Type" name="owner" value={formData.owner} onChange={handleInputChange} />
              <Input label="Registration Date" name="registrationYear" value={formData.registrationYear} onChange={handleInputChange} />
              <Input label="Insurance Info" name="insurance" value={formData.insurance} onChange={handleInputChange} />
              <Input label="RTO Code" name="rto" value={formData.rto} onChange={handleInputChange} />
              <Input label="Seating Capacity" name="seats" value={formData.seats} onChange={handleInputChange} />
              <Input label="Transmission Type" name="transmissionType" value={formData.transmissionType} onChange={handleInputChange} />
            </div>
          )}

          {/* ✅ 3. Gallery Tab (WAS EMPTY) */}
          {activeTab === 'images' && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in">
              {formData.images.map((img: string, idx: number) => (
                <div key={idx} className="relative group h-48 bg-gray-50 rounded-[30px] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                  {img ? (
                    <>
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button onClick={() => { const n = [...formData.images]; n[idx] = ''; setFormData({...formData, images: n}); }} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg"><X size={16}/></button>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload size={24} className="text-blue-500" />
                      <span className="text-[10px] font-black uppercase text-gray-400">Update Photo {idx + 1}</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, idx)} />
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ✅ 4. Technical Tab (WAS EMPTY) */}
          {activeTab === 'tech' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-2 gap-8">
                <Input label="Engine Displacement" name="engineDisplacement" value={formData.engineDisplacement} onChange={handleInputChange} placeholder="e.g. 1998 cc" />
                <Input label="Max Power" value={formData.specs.power} onChange={(e:any) => handleInputChange(e, 'specs', 'power')} placeholder="e.g. 150 bhp" />
                <Input label="Max Torque" value={formData.specs.torque} onChange={(e:any) => handleInputChange(e, 'specs', 'torque')} placeholder="e.g. 250 Nm" />
                <Input label="Mileage" value={formData.specs.mileage} onChange={(e:any) => handleInputChange(e, 'specs', 'mileage')} placeholder="e.g. 15 kmpl" />
                <Input label="Boot Space" value={formData.specs.bootSpace} onChange={(e:any) => handleInputChange(e, 'specs', 'bootSpace')} />
                <Input label="Ground Clearance" value={formData.specs.groundClearance} onChange={(e:any) => handleInputChange(e, 'specs', 'groundClearance')} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Features (Comma Separated)</label>
                <textarea name="features" value={formData.features} onChange={handleInputChange} className="p-6 bg-gray-50 rounded-[30px] border-0 min-h-[120px] font-bold outline-none w-full" placeholder="Sunroof, Touchscreen, etc." />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
    <input {...props} className="p-4 bg-gray-50 rounded-2xl border-0 outline-none font-bold text-black focus:ring-2 focus:ring-blue-100 transition-all" />
  </div>
);