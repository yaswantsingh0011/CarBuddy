'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCar, FaCloudUploadAlt, FaTrash, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function AddUpcomingCar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    price_range: '',
    location: '',
    engine: '',
    power: '',
    torque: '',
    transmission: '',
    mileage: '',
    bootSpace: '',
    groundClearance: '',
    features: '',
  });

  // --- Image Selection Logic ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 4);
      setImages(selectedFiles);
      const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // --- Upload to Supabase Storage (car-images/upcoming-cars) ---
  const uploadImages = async () => {
    const uploadedUrls = [];
    for (const file of images) {
      const fileName = `upcoming-cars/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(fileName, file);
      
      if (data) {
        const { data: urlData } = supabase.storage.from('car-images').getPublicUrl(fileName);
        uploadedUrls.push(urlData.publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = await uploadImages();
      const slug = formData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

      const { error } = await supabase.from('upcoming_cars').insert([{
        name: formData.name,
        slug: slug,
        price_range: formData.price_range,
        location: formData.location, // Launch Date
        image_urls: imageUrls,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ""),
        specs: { // Overview Mapping
          engine: formData.engine,
          power: formData.power,
          torque: formData.torque,
          transmission: formData.transmission,
          mileage: formData.mileage,
          bootSpace: formData.bootSpace,
          groundClearance: formData.groundClearance
        }
      }]);

      if (!error) router.push('/admin/cars/upcoming-cars');
      else alert("Error: " + error.message);
    } catch (err) {
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-black">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/cars/upcoming-cars" className="inline-flex items-center gap-2 text-gray-400 font-bold text-xs uppercase mb-8 hover:text-black transition-colors">
          <FaArrowLeft /> Back to List
        </Link>
        
        <div className="bg-white rounded-[48px] p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-blue-600 p-4 rounded-3xl text-white shadow-lg shadow-blue-100">
              <FaCar size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#0F172A]">Add New Upcoming Car</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* 1. Basic Info Section */}
            <section>
              <h2 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em] mb-8 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InputGroup label="Car Name" placeholder="e.g. Audi A5" onChange={(v) => setFormData({...formData, name: v})} />
                <InputGroup label="Price Range" placeholder="e.g. ₹ 50.00 Lakh*" onChange={(v) => setFormData({...formData, price_range: v})} />
                <InputGroup label="Expected Launch" placeholder="e.g. Jan 15, 2026" onChange={(v) => setFormData({...formData, location: v})} />
              </div>
            </section>

            {/* 2. Specs Overview Section */}
            <section className="bg-gray-50/50 p-10 rounded-[40px] border border-gray-100">
              <h2 className="text-xs font-black uppercase text-blue-600 tracking-[0.2em] mb-8 flex items-center gap-2">
                <FaCar /> Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <InputGroup label="Battery / Engine" placeholder="2.0L TFSI" onChange={(v) => setFormData({...formData, engine: v})} />
                <InputGroup label="Power" placeholder="204 hp" onChange={(v) => setFormData({...formData, power: v})} />
                <InputGroup label="Transmission" placeholder="7-Speed S-Tronic" onChange={(v) => setFormData({...formData, transmission: v})} />
                <InputGroup label="Mileage / Range" placeholder="14 kmpl" onChange={(v) => setFormData({...formData, mileage: v})} />
                <InputGroup label="Torque" placeholder="320 Nm" onChange={(v) => setFormData({...formData, torque: v})} />
                <InputGroup label="Boot Space" placeholder="465 L" onChange={(v) => setFormData({...formData, bootSpace: v})} />
                <InputGroup label="Ground Clearance" placeholder="135 mm" onChange={(v) => setFormData({...formData, groundClearance: v})} />
              </div>
            </section>

            {/* 3. Image Upload Section */}
            <section>
              <h2 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em] mb-6 ml-1">Car Images (Upload Up to 4)</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <label className="aspect-[4/3] bg-white border-4 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <FaCloudUploadAlt className="text-gray-200 text-4xl mb-3 group-hover:text-blue-400 transition-colors" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Click to Upload</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-4 border-white shadow-sm">
                    <img src={src} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => {
                        setPreviews(previews.filter((_, idx) => idx !== i));
                        setImages(images.filter((_, idx) => idx !== i));
                    }} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                      <FaTrash size={12}/>
                    </button>
                    <div className="absolute bottom-3 left-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
                      <FaCheckCircle size={14}/>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Features Section */}
            <section className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Key Features (Comma Separated)</label>
              <textarea 
                className="p-6 bg-gray-50 rounded-[32px] outline-none font-bold text-sm h-32 border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all placeholder:text-gray-300" 
                placeholder="Matrix LED Lights, Virtual Cockpit Plus, Quattro AWD..." 
                onChange={(e) => setFormData({...formData, features: e.target.value})} 
              />
            </section>

            <button 
              disabled={loading} 
              className="w-full py-6 bg-[#0F172A] text-white font-black rounded-[32px] shadow-2xl shadow-blue-900/10 hover:bg-black transition-all uppercase tracking-[0.2em] text-xs disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? "Processing..." : "Confirm & Add Car"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Component
const InputGroup = ({ label, placeholder, onChange }: any) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{label}</label>
    <input 
      required 
      type="text" 
      placeholder={placeholder} 
      className="p-5 bg-gray-50 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all placeholder:text-gray-300 shadow-sm shadow-black/[0.02]" 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);