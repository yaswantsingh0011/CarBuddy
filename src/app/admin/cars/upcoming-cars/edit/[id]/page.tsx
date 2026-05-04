'use client';
import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCar, FaCloudUploadAlt, FaTrash, FaSave, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function EditUpcomingCar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // States for images
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<any>({
    name: '', price_range: '', location: '', engine: '', power: '',
    torque: '', transmission: '', mileage: '', bootSpace: '',
    groundClearance: '', features: ''
  });

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await supabase.from('upcoming_cars').select('*').eq('id', id).single();
      if (data) {
        setFormData({
          name: data.name,
          price_range: data.price_range,
          location: data.location,
          engine: data.specs?.engine || '',
          power: data.specs?.power || '',
          torque: data.specs?.torque || '',
          transmission: data.specs?.transmission || '',
          mileage: data.specs?.mileage || '',
          bootSpace: data.specs?.bootSpace || '',
          groundClearance: data.specs?.groundClearance || '',
          features: data.features?.join(', ') || ''
        });
        setExistingImages(data.image_urls || []);
      }
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  // 2. Handle New Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...files].slice(0, 4 - existingImages.length));
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...urls].slice(0, 4 - existingImages.length));
    }
  };

  // 3. Upload Logic
  const uploadNewImages = async () => {
    const uploadedUrls = [];
    for (const file of newImages) {
      const fileName = `upcoming-cars/${Date.now()}-${file.name}`;
      const { data } = await supabase.storage.from('car-images').upload(fileName, file);
      if (data) {
        const { data: urlData } = supabase.storage.from('car-images').getPublicUrl(fileName);
        uploadedUrls.push(urlData.publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const newlyUploadedUrls = await uploadNewImages();
      const finalImageUrls = [...existingImages, ...newlyUploadedUrls];

      const { error } = await supabase.from('upcoming_cars').update({
        name: formData.name,
        price_range: formData.price_range,
        location: formData.location,
        image_urls: finalImageUrls,
        features: formData.features.split(',').map((f: string) => f.trim()).filter((f: any) => f !== ""),
        specs: { // Matches Overview UI
          engine: formData.engine,
          power: formData.power,
          torque: formData.torque,
          transmission: formData.transmission,
          mileage: formData.mileage,
          bootSpace: formData.bootSpace,
          groundClearance: formData.groundClearance
        }
      }).eq('id', id);

      if (!error) router.push('/admin/cars/upcoming-cars');
      else alert(error.message);
    } catch (err) {
      alert("Update failed!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-black text-gray-300 animate-pulse">Fetching Car Data...</div>;

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-black">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/cars/upcoming-cars" className="inline-flex items-center gap-2 text-gray-400 font-bold text-xs uppercase mb-8 hover:text-black transition-all">
          <FaArrowLeft /> Cancel Editing
        </Link>
        
        <div className="bg-white rounded-[48px] p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-orange-500 p-4 rounded-3xl text-white shadow-lg shadow-orange-100">
              <FaSave size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#0F172A]">Edit: {formData.name}</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* 1. Basic Info */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InputGroup label="Car Name" value={formData.name} onChange={(v:any) => setFormData({...formData, name: v})} />
              <InputGroup label="Price Range" value={formData.price_range} onChange={(v:any) => setFormData({...formData, price_range: v})} />
              <InputGroup label="Launch Date" value={formData.location} onChange={(v:any) => setFormData({...formData, location: v})} />
            </section>

            {/* 2. Specs Overview */}
            <section className="bg-gray-50/50 p-10 rounded-[40px] border border-gray-100">
              <h2 className="text-xs font-black uppercase text-orange-600 tracking-[0.2em] mb-8 flex items-center gap-2">
                <FaCar /> Engine & Specs (Overview)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <InputGroup label="Engine" value={formData.engine} onChange={(v:any) => setFormData({...formData, engine: v})} />
                <InputGroup label="Power" value={formData.power} onChange={(v:any) => setFormData({...formData, power: v})} />
                <InputGroup label="Transmission" value={formData.transmission} onChange={(v:any) => setFormData({...formData, transmission: v})} />
                <InputGroup label="Mileage/Range" value={formData.mileage} onChange={(v:any) => setFormData({...formData, mileage: v})} />
                <InputGroup label="Torque" value={formData.torque} onChange={(v:any) => setFormData({...formData, torque: v})} />
                <InputGroup label="Boot Space" value={formData.bootSpace} onChange={(v:any) => setFormData({...formData, bootSpace: v})} />
                <InputGroup label="Ground Clearance" value={formData.groundClearance} onChange={(v:any) => setFormData({...formData, groundClearance: v})} />
              </div>
            </section>

            {/* 3. Image Management */}
            <section>
              <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-6">Manage Vehicle Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {/* Existing Images */}
                {existingImages.map((src, i) => (
                  <div key={`exist-${i}`} className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-4 border-white shadow-sm group">
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
                    <button type="button" onClick={() => setExistingImages(existingImages.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <FaTrash size={12}/>
                    </button>
                  </div>
                ))}
                {/* New Previews */}
                {previews.map((src, i) => (
                  <div key={`new-${i}`} className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-4 border-blue-100 shadow-sm">
                    <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-[8px] px-2 py-1 rounded-full font-black uppercase">New</div>
                  </div>
                ))}
                {/* Upload Button */}
                {(existingImages.length + newImages.length < 4) && (
                  <label className="aspect-[4/3] bg-white border-4 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/30 transition-all group">
                    <FaCloudUploadAlt className="text-gray-200 text-3xl mb-2 group-hover:text-blue-400" />
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </section>

            {/* 4. Features */}
            <section className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Features (Comma Separated)</label>
              <textarea value={formData.features} className="p-6 bg-gray-50 rounded-[32px] outline-none font-bold text-sm h-32 border-2 border-transparent focus:bg-white focus:border-orange-100 transition-all" onChange={(e) => setFormData({...formData, features: e.target.value})} />
            </section>

            <button disabled={updating} className="w-full py-6 bg-blue-600 text-white font-black rounded-[32px] shadow-2xl hover:bg-blue-700 transition-all uppercase tracking-[0.2em] text-xs">
              {updating ? "Updating Data..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputGroup = ({ label, value, onChange }: any) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">{label}</label>
    <input required type="text" value={value} className="p-5 bg-gray-50 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all shadow-sm" onChange={(e) => onChange(e.target.value)} />
  </div>
);