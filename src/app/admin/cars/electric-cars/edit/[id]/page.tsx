'use client';
import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaBolt, FaCloudUploadAlt, FaPlus, FaMinus, FaStar, FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function EditElectricCar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // States for images
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<(File | null)[]>([null, null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);

  // States for dynamic sections
  const [variants, setVariants] = useState([{ name: '', price: '', engine: '', transmission: 'Automatic' }]);
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);

  const [formData, setFormData] = useState<any>({
    name: '', price_range: '', battery: '', power: '', torque: '',
    transmission: 'Automatic', range: '', bootSpace: '', groundClearance: '',
    features: '', verdict: '', perfReview: '', interiorReview: ''
  });

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await supabase.from('electric_cars').select('*').eq('id', id).single();
      if (data) {
        setFormData({
          name: data.name,
          price_range: data.price_range,
          battery: data.specs?.battery || '',
          power: data.specs?.power || '',
          torque: data.specs?.torque || '',
          transmission: data.specs?.transmission || 'Automatic',
          range: data.specs?.range || '',
          bootSpace: data.specs?.bootSpace || '',
          groundClearance: data.specs?.groundClearance || '',
          features: data.features?.join(', ') || '',
          verdict: data.expert_review?.verdict || '',
          perfReview: data.expert_review?.performance || '',
          interiorReview: data.expert_review?.interior || ''
        });
        setExistingImages(data.image_urls || []);
        setVariants(data.variants || [{ name: '', price: '', engine: '', transmission: 'Automatic' }]);
        setPros(data.pros || ['']);
        setCons(data.cons || ['']);
      }
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  // 2. Image Selection Handler
  const handleImageChange = (index: number, file: File) => {
    const nextImages = [...newImages]; nextImages[index] = file; setNewImages(nextImages);
    const nextPreviews = [...previews]; nextPreviews[index] = URL.createObjectURL(file); setPreviews(nextPreviews);
  };

  // 3. Update & Upload Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      let finalImageUrls = [...existingImages];

      // Upload only new images selected
      for (let i = 0; i < newImages.length; i++) {
        if (newImages[i]) {
          const file = newImages[i]!;
          const path = `electric-cars/${Date.now()}-${file.name}`;
          await supabase.storage.from('car-images').upload(path, file);
          const { data } = supabase.storage.from('car-images').getPublicUrl(path);
          
          // Replace specific index or append
          if (finalImageUrls[i]) finalImageUrls[i] = data.publicUrl;
          else finalImageUrls.push(data.publicUrl);
        }
      }

      const { error } = await supabase.from('electric_cars').update({
        name: formData.name,
        price_range: formData.price_range,
        image_urls: finalImageUrls,
        features: formData.features.split(',').map((f: string) => f.trim()).filter((f: any) => f !== ""),
        pros: pros.filter(p => p !== ''),
        cons: cons.filter(c => c !== ''),
        variants: variants,
        expert_review: {
          verdict: formData.verdict,
          performance: formData.perfReview,
          interior: formData.interiorReview
        },
        specs: {
          battery: formData.battery, power: formData.power, torque: formData.torque,
          transmission: formData.transmission, range: formData.range,
          bootSpace: formData.bootSpace, groundClearance: formData.groundClearance
        }
      }).eq('id', id);

      if (!error) router.push('/admin/cars/electric-cars');
    } catch (err) { alert("Update failed!"); }
    finally { setUpdating(false); }
  };

  if (loading) return <div className="p-20 text-center font-black text-gray-300 animate-pulse uppercase">Fetching EV Data...</div>;

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/cars/electric-cars" className="flex items-center gap-2 text-gray-400 font-bold text-xs mb-8 hover:text-black">
          <FaArrowLeft /> CANCEL EDITING
        </Link>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* 1. BASIC & SPECS OVERVIEW */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-8">
            <h2 className="font-black text-xl flex items-center gap-2"><FaBolt className="text-yellow-400"/> Update Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Car Name" value={formData.name} onChange={(v:any) => setFormData({...formData, name: v})} />
              <InputGroup label="Price Range" value={formData.price_range} onChange={(v:any) => setFormData({...formData, price_range: v})} />
              <InputGroup label="Battery Pack" value={formData.battery} onChange={(v:any) => setFormData({...formData, battery: v})} />
              <InputGroup label="Power" value={formData.power} onChange={(v:any) => setFormData({...formData, power: v})} />
              <InputGroup label="Range" value={formData.range} onChange={(v:any) => setFormData({...formData, range: v})} />
              <InputGroup label="Torque" value={formData.torque} onChange={(v:any) => setFormData({...formData, torque: v})} />
              <InputGroup label="Boot Space" value={formData.bootSpace} onChange={(v:any) => setFormData({...formData, bootSpace: v})} />
              <InputGroup label="Ground Clearance" value={formData.groundClearance} onChange={(v:any) => setFormData({...formData, groundClearance: v})} />
            </div>
          </div>

          {/* 2. PHOTO UPLOAD GRID (UNDER OVERVIEW) */}
          <div className="grid grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <label key={i} className="relative aspect-[16/9] bg-white border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden group">
                {previews[i] || existingImages[i] ? (
                  <img src={previews[i] || existingImages[i]} className="w-full h-full object-cover" />
                ) : (
                  <> <FaCloudUploadAlt className="text-blue-500 text-2xl mb-2" /> <span className="text-[10px] font-black uppercase text-gray-400">Replace Photo {i+1}</span> </>
                )}
                <input type="file" className="hidden" onChange={(e) => e.target.files && handleImageChange(i, e.target.files[0])} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase">Change Image</div>
              </label>
            ))}
          </div>

          {/* 3. VARIANTS SECTION */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm">
            <h2 className="font-black text-xl mb-6 flex items-center gap-2">Variants & Price List</h2>
            {variants.map((v, i) => (
              <div key={i} className="flex gap-4 mb-4 bg-gray-50 p-4 rounded-2xl">
                <input value={v.name} placeholder="Variant Name" className="flex-1 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].name = e.target.value; setVariants(newV);
                }} />
                <input value={v.engine} placeholder="Range/Engine" className="w-48 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].engine = e.target.value; setVariants(newV);
                }} />
                <input value={v.price} placeholder="Price" className="w-48 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].price = e.target.value; setVariants(newV);
                }} />
                <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="text-red-500 p-2"><FaMinus /></button>
              </div>
            ))}
            <button type="button" onClick={() => setVariants([...variants, {name:'', price:'', engine:'', transmission:'Automatic'}])} className="text-blue-600 font-black text-xs uppercase mt-2">+ Add Variant</button>
          </div>

          {/* 4. EXPERT REVIEW & PROS/CONS */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-8">
            <h2 className="font-black text-xl flex items-center gap-2"><FaStar className="text-orange-400"/> Edit Expert Review</h2>
            <textarea value={formData.verdict} placeholder="CarBuddy Verdict..." className="w-full p-5 bg-gray-50 rounded-2xl h-24 outline-none font-bold text-sm" onChange={e => setFormData({...formData, verdict: e.target.value})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <textarea value={formData.perfReview} placeholder="Performance Review..." className="p-5 bg-gray-50 rounded-2xl h-24 outline-none font-bold text-sm" onChange={e => setFormData({...formData, perfReview: e.target.value})} />
              <textarea value={formData.interiorReview} placeholder="Interior Review..." className="p-5 bg-gray-50 rounded-2xl h-24 outline-none font-bold text-sm" onChange={e => setFormData({...formData, interiorReview: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <p className="text-xs font-black text-green-600 uppercase flex items-center gap-2"><FaThumbsUp/> Things We Like</p>
                  {pros.map((p, i) => (
                    <input key={i} value={p} className="w-full p-3 bg-green-50/50 rounded-xl outline-none text-sm font-bold border border-green-100" onChange={e => {
                      let newP = [...pros]; newP[i] = e.target.value; setPros(newP);
                    }} />
                  ))}
                  <button type="button" onClick={() => setPros([...pros, ''])} className="text-[10px] font-black text-green-700">+ ADD PRO</button>
               </div>
               <div className="space-y-4">
                  <p className="text-xs font-black text-red-600 uppercase flex items-center gap-2"><FaThumbsDown/> Things To Improve</p>
                  {cons.map((c, i) => (
                    <input key={i} value={c} className="w-full p-3 bg-red-50/50 rounded-xl outline-none text-sm font-bold border border-red-100" onChange={e => {
                      let newC = [...cons]; newC[i] = e.target.value; setCons(newC);
                    }} />
                  ))}
                  <button type="button" onClick={() => setCons([...cons, ''])} className="text-[10px] font-black text-red-700">+ ADD CON</button>
               </div>
            </div>
          </div>

          <button disabled={updating} className="w-full py-6 bg-blue-600 text-white font-black rounded-[32px] shadow-2xl uppercase tracking-widest text-xs">
            {updating ? "UPDATING EV DATA..." : "SAVE CHANGES"}
          </button>
        </form>
      </div>
    </div>
  );
}

const InputGroup = ({ label, value, placeholder, onChange }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
    <input required type="text" value={value} placeholder={placeholder} className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all shadow-sm" onChange={(e) => onChange(e.target.value)} />
  </div>
);