'use client';
import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaBolt, FaCloudUploadAlt, FaPlus, FaMinus, FaStar, FaThumbsUp, FaThumbsDown, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

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
  const [featuresList, setFeaturesList] = useState(['']); // ✅ Added Features State

  const [formData, setFormData] = useState<any>({
    name: '', price_range: '', battery: '', power: '', torque: '',
    transmission: 'Automatic', range: '', bootSpace: '', groundClearance: '',
    verdict: '', perfReview: '', interiorReview: '' // ✅ These will hold review text
  });

  // 1. Fetch Existing Data & Fix Verdict Loading
  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabase.from('electric_cars').select('*').eq('id', id).single();
      
      if (data) {
        // ✅ Structure fix: extracting from expert_review object
        const review = data.expert_review || {};
        
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
          // ✅ FIX: Mapping nested DB data to flat form state
          verdict: review.verdict || '', 
          perfReview: review.performance || '',
          interiorReview: review.interior || ''
        });

        setExistingImages(data.image_urls || []);
        setVariants(data.variants || [{ name: '', price: '', engine: '', transmission: 'Automatic' }]);
        setPros(data.pros || ['']);
        setCons(data.cons || ['']);
        setFeaturesList(Array.isArray(data.features) ? data.features : ['']); // ✅ Features Load Fix
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

      // Upload new images if any
      for (let i = 0; i < newImages.length; i++) {
        if (newImages[i]) {
          const file = newImages[i]!;
          const path = `electric-cars/${Date.now()}-${file.name}`;
          await supabase.storage.from('car-images').upload(path, file);
          const { data } = supabase.storage.from('car-images').getPublicUrl(path);
          if (finalImageUrls[i]) finalImageUrls[i] = data.publicUrl;
          else finalImageUrls.push(data.publicUrl);
        }
      }

      const { error } = await supabase.from('electric_cars').update({
        name: formData.name,
        price_range: formData.price_range,
        image_urls: finalImageUrls,
        features: featuresList.filter(f => f.trim() !== ''), // ✅ Features Save Fix
        pros: pros.filter(p => p !== ''),
        cons: cons.filter(c => c !== ''),
        variants: variants,
        expert_review: {
          verdict: formData.verdict, // ✅ Mapping flat state back to DB object
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
    } catch (err) { 
      console.error(err);
      alert("Update failed!"); 
    } finally { 
      setUpdating(false); 
    }
  };

  if (loading) return <div className="p-20 text-center font-black text-gray-300 animate-pulse text-2xl uppercase">Fetching EV Data...</div>;

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/cars/electric-cars" className="flex items-center gap-2 text-gray-400 font-bold text-xs mb-8 hover:text-black">
          <FaArrowLeft /> CANCEL EDITING
        </Link>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* 1. BASIC & SPECS OVERVIEW */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-8 border border-gray-100">
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

          {/* 2. DYNAMIC FEATURES BLOCK ✅ */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-6 border border-gray-100">
            <h2 className="font-black text-xl flex items-center gap-2 text-blue-600"><FaCheckCircle /> Edit Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuresList.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input 
                    placeholder="e.g. ADAS Level 2" 
                    value={feature}
                    className="flex-1 p-3 bg-gray-50 rounded-xl outline-none text-sm font-bold border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all shadow-sm" 
                    onChange={e => {
                      let newF = [...featuresList]; newF[i] = e.target.value; setFeaturesList(newF);
                    }} 
                  />
                  {featuresList.length > 1 && (
                    <button type="button" onClick={() => setFeaturesList(featuresList.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                      <FaMinus size={12}/>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={() => setFeaturesList([...featuresList, ''])} 
              className="flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-full font-black text-[10px] uppercase hover:bg-blue-100 transition-all border border-blue-100"
            >
              <FaPlus size={10}/> Add Another Feature
            </button>
          </div>

          {/* 3. PHOTO UPLOAD GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <label key={i} className="relative aspect-square bg-white border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden group shadow-sm">
                {previews[i] || existingImages[i] ? (
                  <Image src={previews[i] || existingImages[i]} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 50vw, 200px" />
                ) : (
                  <> <FaCloudUploadAlt className="text-blue-500 text-3xl mb-2" /> <span className="text-[10px] font-black uppercase text-gray-400">Add Photo {i+1}</span> </>
                )}
                <input type="file" className="hidden" onChange={(e) => e.target.files && handleImageChange(i, e.target.files[0])} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-center">
                  <span className="text-[10px] font-black uppercase tracking-tighter">Replace Image</span>
                </div>
              </label>
            ))}
          </div>

          {/* 4. VARIANTS SECTION */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h2 className="font-black text-xl mb-6 flex items-center gap-2">Variants & Price List</h2>
            {variants.map((v, i) => (
              <div key={i} className="flex flex-wrap md:flex-nowrap gap-4 mb-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <input value={v.name} placeholder="Variant Name" className="flex-1 p-3 bg-white rounded-xl outline-none text-sm font-bold min-w-[200px]" onChange={e => {
                  let newV = [...variants]; newV[i].name = e.target.value; setVariants(newV);
                }} />
                <input value={v.engine} placeholder="Range/Engine" className="w-full md:w-48 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].engine = e.target.value; setVariants(newV);
                }} />
                <input value={v.price} placeholder="Price" className="w-full md:w-48 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].price = e.target.value; setVariants(newV);
                }} />
                <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><FaMinus /></button>
              </div>
            ))}
            <button type="button" onClick={() => setVariants([...variants, {name:'', price:'', engine:'', transmission:'Automatic'}])} className="text-blue-600 font-black text-xs uppercase mt-4 flex items-center gap-2 hover:underline">
              <FaPlus size={10}/> Add Variant
            </button>
          </div>

          {/* 5. EXPERT REVIEW ✅ (Fix Applied Here) */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-8 border border-gray-100">
            <h2 className="font-black text-xl flex items-center gap-2"><FaStar className="text-orange-400"/> Edit Expert Review</h2>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Verdict (Main Review)</label>
               <textarea 
                  value={formData.verdict} // ✅ Corrected Binding
                  placeholder="CarBuddy Verdict..." 
                  className="w-full p-5 bg-gray-50 rounded-2xl h-32 outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all shadow-sm" 
                  onChange={e => setFormData({...formData, verdict: e.target.value})} 
               />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Performance Review</label>
                <textarea 
                   value={formData.perfReview} // ✅ Corrected Binding
                   placeholder="Performance Review..." 
                   className="w-full p-5 bg-gray-50 rounded-2xl h-32 outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all shadow-sm" 
                   onChange={e => setFormData({...formData, perfReview: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Interior Review</label>
                <textarea 
                   value={formData.interiorReview} // ✅ Corrected Binding
                   placeholder="Interior Review..." 
                   className="w-full p-5 bg-gray-50 rounded-2xl h-32 outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all shadow-sm" 
                   onChange={e => setFormData({...formData, interiorReview: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
               <div className="space-y-4">
                  <p className="text-xs font-black text-green-600 uppercase flex items-center gap-2"><FaThumbsUp/> Things We Like</p>
                  {pros.map((p, i) => (
                    <input key={i} value={p} className="w-full p-3 bg-green-50/50 rounded-xl outline-none text-sm font-bold border border-green-100 focus:bg-white transition-all" onChange={e => {
                      let newP = [...pros]; newP[i] = e.target.value; setPros(newP);
                    }} />
                  ))}
                  <button type="button" onClick={() => setPros([...pros, ''])} className="text-[10px] font-black text-green-700 hover:underline uppercase tracking-widest">+ ADD PRO</button>
               </div>
               <div className="space-y-4">
                  <p className="text-xs font-black text-red-600 uppercase flex items-center gap-2"><FaThumbsDown/> Things To Improve</p>
                  {cons.map((c, i) => (
                    <input key={i} value={c} className="w-full p-3 bg-red-50/50 rounded-xl outline-none text-sm font-bold border border-red-100 focus:bg-white transition-all" onChange={e => {
                      let newC = [...cons]; newC[i] = e.target.value; setCons(newC);
                    }} />
                  ))}
                  <button type="button" onClick={() => setCons([...cons, ''])} className="text-[10px] font-black text-red-700 hover:underline uppercase tracking-widest">+ ADD CON</button>
               </div>
            </div>
          </div>

          <button type="submit" disabled={updating} className="w-full py-6 bg-blue-600 text-white font-black rounded-[32px] shadow-2xl uppercase tracking-widest text-xs hover:bg-blue-700 transition-all active:scale-95 disabled:bg-gray-400">
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
    <input required type="text" value={value || ''} placeholder={placeholder} className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all shadow-sm" onChange={(e) => onChange(e.target.value)} />
  </div>
);