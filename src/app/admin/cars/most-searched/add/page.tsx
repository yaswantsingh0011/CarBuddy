"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Save, Car, Wrench, Star, Image as ImageIcon, Upload, X, Loader2, Plus, ListTree } from 'lucide-react';

export default function AddCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', category: 'SUV', fuelType: '', section: 'most-searched',
    launchDate: new Date().toISOString().split('T')[0],
    images: ['', '', '', ''],
    specs: { engine: '', power: '', torque: '', transmission: '', mileage: '', bootSpace: '', groundClearance: '' },
    variants: [{ name: '', price: '', engine: '', transmission: '' }], 
    features: '', pros: '', cons: ''
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
    const filePath = `cars/${fileName}`;
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

  const addVariant = () => {
    setFormData({ ...formData, variants: [...formData.variants, { name: '', price: '', engine: '', transmission: '' }] });
  };

  const removeVariant = (index: number) => {
    setFormData({ ...formData, variants: formData.variants.filter((_, i) => i !== index) });
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...formData.variants];
    (newVariants[index] as any)[field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const handleInputChange = (e: any, section?: string, field?: string) => {
    const { name, value } = e.target;
    if (section && field) {
      setFormData((prev: any) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert("Car Name toh dalo bhai!");
    setLoading(true);
    const finalData = {
      name: formData.name, brand: formData.brand, price: formData.price, category: formData.category,
      fuel_type: formData.fuelType, section: formData.section,
      images: formData.images.filter(img => img !== ''),
      specs: formData.specs, variants: formData.variants,
      features: formData.features.split(',').map(item => item.trim()).filter(i => i !== ""),
      pros: formData.pros.split(',').map(item => item.trim()).filter(i => i !== ""),
      cons: formData.cons.split(',').map(item => item.trim()).filter(i => i !== ""),
      created_at: formData.launchDate
    };
    const { error } = await supabase.from('most_searched_cars').insert([finalData]);
    if (error) alert(error.message);
    else { alert("Car Added!"); router.push('/admin/cars/most-searched'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-400 font-bold uppercase text-xs flex items-center gap-2 transition-colors hover:text-black"><ArrowLeft size={18} /> Back</button>
          <button onClick={handleSubmit} disabled={loading || uploading} className="bg-[#0F172A] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl transition-all"><Save size={20} /> {loading ? 'Saving...' : 'Publish Car'}</button>
        </div>
        <h1 className="text-4xl font-black text-[#0F172A] mb-10 tracking-tight">Add New Car</h1>
        
        <div className="flex gap-3 mb-8 bg-white p-2 rounded-[24px] shadow-sm border border-gray-100 overflow-x-auto">
          {[
            { id: 'basic', label: 'Basic Info', icon: <Car size={18}/> },
            { id: 'images', label: 'Gallery', icon: <ImageIcon size={18}/> },
            { id: 'variants', label: 'Variants', icon: <ListTree size={18}/> },
            { id: 'specs', label: 'Technical', icon: <Wrench size={18}/> },
            { id: 'extra', label: 'Features', icon: <Star size={18}/> }
          ].map(tab => (
            <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 min-h-[450px]">
          {activeTab === 'basic' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-500">
              <Input label="Car Name" name="name" placeholder="e.g. Hyundai Exter" onChange={handleInputChange} />
              <Input label="Brand" name="brand" placeholder="e.g. Hyundai" onChange={handleInputChange} />
              <Input label="Price Range" name="price" placeholder="₹ 6.13 - 10.28 Lakh*" onChange={handleInputChange} />
              <Input label="Fuel Type" name="fuelType" placeholder="Petrol / Diesel" onChange={handleInputChange} />
              <Input label="Publish Date" name="launchDate" type="date" value={formData.launchDate} onChange={handleInputChange} />
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Category</label>
                <select name="category" onChange={handleInputChange} className="p-4 bg-gray-50 rounded-2xl border-0 font-bold outline-none"><option>SUV</option><option>MUV</option><option>Sedan</option><option>Luxury</option><option>Hatchback</option></select>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
              {formData.images.map((url, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Photo {idx + 1}</label>
                  <div className="relative group h-40">
                    {url ? (
                      <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">
                        <img src={url} className="w-full h-full object-cover" alt="" />
                        <button type="button" onClick={() => { const n = [...formData.images]; n[idx] = ''; setFormData({...formData, images: n}); }} className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                      </div>
                    ) : (
                      <label className="w-full h-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all">
                        {uploading ? <Loader2 className="animate-spin text-gray-400" /> : <Upload className="text-gray-400" />}
                        <span className="text-[10px] font-bold mt-2 text-gray-400 uppercase">Upload</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, idx)} />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'variants' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Car Variants</p>
                <button type="button" onClick={addVariant} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all"><Plus size={14} /> Add Variant</button>
              </div>
              {formData.variants.map((variant, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-[24px] relative border border-gray-100 grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => removeVariant(idx)} className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 shadow-sm"><X size={14}/></button>
                  <input placeholder="Variant Name" className="bg-white p-3 rounded-xl border-0 text-sm font-bold outline-none text-black" value={variant.name} onChange={(e) => handleVariantChange(idx, 'name', e.target.value)} />
                  <input placeholder="Price" className="bg-white p-3 rounded-xl border-0 text-sm font-bold outline-none text-black" value={variant.price} onChange={(e) => handleVariantChange(idx, 'price', e.target.value)} />
                  <input placeholder="Engine" className="bg-white p-3 rounded-xl border-0 text-sm font-bold outline-none text-black" value={variant.engine} onChange={(e) => handleVariantChange(idx, 'engine', e.target.value)} />
                  <input placeholder="Transmission" className="bg-white p-3 rounded-xl border-0 text-sm font-bold outline-none text-black" value={variant.transmission} onChange={(e) => handleVariantChange(idx, 'transmission', e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
              {Object.keys(formData.specs).map((key) => (
                <Input key={key} label={key.replace(/([A-Z])/g, ' $1')} placeholder={`Enter ${key}`} value={(formData.specs as any)[key]} onChange={(e:any) => handleInputChange(e, 'specs', key)} />
              ))}
            </div>
          )}

          {activeTab === 'extra' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <Textarea label="Features (Comma separated)" name="features" placeholder="Sunroof, Dashcam, 6 Airbags..." onChange={handleInputChange} />
              <div className="grid grid-cols-2 gap-6">
                <Textarea label="Pros" name="pros" placeholder="Smooth engine..." onChange={handleInputChange} bg="bg-green-50/50" />
                <Textarea label="Cons" name="cons" placeholder="Boxy rear design..." onChange={handleInputChange} bg="bg-red-50/50" />
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
    <input {...props} className="p-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-100 outline-none font-bold transition-all text-black" />
  </div>
);

const Textarea = ({ label, bg = "bg-gray-50", ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
    <textarea {...props} rows={3} className={`p-4 ${bg} rounded-2xl border-0 outline-none font-bold transition-all text-black`} />
  </div>
);