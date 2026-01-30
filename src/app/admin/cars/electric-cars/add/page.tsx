'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaBolt, FaCloudUploadAlt, FaPlus, FaMinus, FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import Link from 'next/link';

export default function AddElectricCar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);

  // States for dynamic sections
  const [variants, setVariants] = useState([{ name: '', price: '', engine: '', transmission: 'Automatic' }]);
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);

  const [formData, setFormData] = useState({
    name: '', price_range: '', battery: '', power: '', torque: '',
    transmission: 'Automatic', range: '', bootSpace: '', groundClearance: '',
    features: '', verdict: '', perfReview: '', interiorReview: ''
  });

  // Image Upload Logic
  const handleImageChange = (index: number, file: File) => {
    const newImages = [...images]; newImages[index] = file; setImages(newImages);
    const newPreviews = [...previews]; newPreviews[index] = URL.createObjectURL(file); setPreviews(newPreviews);
  };

  const uploadAllImages = async () => {
    const urls = [];
    for (const file of images) {
      if (file) {
        const path = `electric-cars/${Date.now()}-${file.name}`;
        await supabase.storage.from('car-images').upload(path, file);
        const { data } = supabase.storage.from('car-images').getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls = await uploadAllImages();
      const { error } = await supabase.from('electric_cars').insert([{
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/ /g, '-'),
        price_range: formData.price_range,
        image_urls: imageUrls,
        features: formData.features.split(',').map(f => f.trim()),
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
      }]);
      if (!error) router.push('/admin/cars/electric-cars');
    } catch (err) { alert("Error saving data!"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/cars/electric-cars" className="flex items-center gap-2 text-gray-400 font-bold text-xs mb-8 hover:text-black">
          <FaArrowLeft /> BACK TO LIST
        </Link>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* 1. BASIC & SPECS */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-8">
            <h2 className="font-black text-xl flex items-center gap-2"><FaBolt className="text-yellow-400"/> Vehicle Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Car Name" onChange={v => setFormData({...formData, name: v})} />
              <InputGroup label="Price Range" onChange={v => setFormData({...formData, price_range: v})} />
              <InputGroup label="Battery Pack" placeholder="e.g. 45 kWh / 502km" onChange={v => setFormData({...formData, battery: v})} />
              <InputGroup label="Power" placeholder="165 bhp" onChange={v => setFormData({...formData, power: v})} />
              <InputGroup label="Range" placeholder="585 km (Range)" onChange={v => setFormData({...formData, range: v})} />
              <InputGroup label="Torque" placeholder="215 Nm" onChange={(v) => setFormData({...formData, torque: v})} />
              <InputGroup label="Boot Space" placeholder="500 L + Frunk" onChange={(v) => setFormData({...formData, bootSpace: v})} />
              <InputGroup label="Ground Clearance" placeholder="190 mm" onChange={(v) => setFormData({...formData, groundClearance: v})} />
            </div>
          </div>

          {/* 2. PHOTO UPLOAD GRID - Moved Here */}
          <div className="grid grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <label key={i} className="relative aspect-[16/9] bg-white border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                {previews[i] ? <img src={previews[i]!} className="w-full h-full object-cover" /> : (
                  <> <FaCloudUploadAlt className="text-blue-500 text-2xl mb-2" /> <span className="text-[10px] font-black uppercase text-gray-400">Upload Photo {i+1}</span> </>
                )}
                <input type="file" className="hidden" onChange={(e) => e.target.files && handleImageChange(i, e.target.files[0])} />
              </label>
            ))}
          </div>

          {/* 3. VARIANTS SECTION */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm">
            <h2 className="font-black text-xl mb-6">Variants & Price List</h2>
            {variants.map((v, i) => (
              <div key={i} className="flex gap-4 mb-4 bg-gray-50 p-4 rounded-2xl">
                <input placeholder="Variant Name" className="flex-1 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].name = e.target.value; setVariants(newV);
                }} />
                <input placeholder="Range/Engine" className="w-48 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].engine = e.target.value; setVariants(newV);
                }} />
                <input placeholder="Price" className="w-48 p-3 bg-white rounded-xl outline-none text-sm font-bold" onChange={e => {
                  let newV = [...variants]; newV[i].price = e.target.value; setVariants(newV);
                }} />
                <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="text-red-500 p-2"><FaMinus /></button>
              </div>
            ))}
            <button type="button" onClick={() => setVariants([...variants, {name:'', price:'', engine:'', transmission:'Automatic'}])} className="text-blue-600 font-black text-xs uppercase mt-2">+ Add Variant</button>
          </div>

          {/* 4. EXPERT REVIEW */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm space-y-8">
            <h2 className="font-black text-xl flex items-center gap-2"><FaStar className="text-orange-400"/> CarBuddy Expert Review</h2>
            <textarea placeholder="CarBuddy Verdict..." className="w-full p-5 bg-gray-50 rounded-2xl h-24 outline-none font-bold text-sm" onChange={e => setFormData({...formData, verdict: e.target.value})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <textarea placeholder="Performance Review..." className="p-5 bg-gray-50 rounded-2xl h-24 outline-none font-bold text-sm" onChange={e => setFormData({...formData, perfReview: e.target.value})} />
              <textarea placeholder="Interior Review..." className="p-5 bg-gray-50 rounded-2xl h-24 outline-none font-bold text-sm" onChange={e => setFormData({...formData, interiorReview: e.target.value})} />
            </div>
            
            {/* PROS & CONS */}
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <p className="text-xs font-black text-green-600 uppercase flex items-center gap-2"><FaThumbsUp/> Things We Like</p>
                  {pros.map((p, i) => (
                    <input key={i} className="w-full p-3 bg-green-50/50 rounded-xl outline-none text-sm font-bold border border-green-100" onChange={e => {
                      let newP = [...pros]; newP[i] = e.target.value; setPros(newP);
                    }} />
                  ))}
                  <button type="button" onClick={() => setPros([...pros, ''])} className="text-[10px] font-black text-green-700">+ ADD PRO</button>
               </div>
               <div className="space-y-4">
                  <p className="text-xs font-black text-red-600 uppercase flex items-center gap-2"><FaThumbsDown/> Things To Improve</p>
                  {cons.map((c, i) => (
                    <input key={i} className="w-full p-3 bg-red-50/50 rounded-xl outline-none text-sm font-bold border border-red-100" onChange={e => {
                      let newC = [...cons]; newC[i] = e.target.value; setCons(newC);
                    }} />
                  ))}
                  <button type="button" onClick={() => setCons([...cons, ''])} className="text-[10px] font-black text-red-700">+ ADD CON</button>
               </div>
            </div>
          </div>

          <button disabled={loading} className="w-full py-6 bg-[#0F172A] text-white font-black rounded-[32px] shadow-2xl uppercase tracking-widest text-xs">
            {loading ? "SAVING EV DATA..." : "PUBLISH ELECTRIC CAR"}
          </button>
        </form>
      </div>
    </div>
  );
}

const InputGroup = ({ label, placeholder, onChange }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
    <input required type="text" placeholder={placeholder} className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:bg-white focus:border-blue-100 transition-all" onChange={(e) => onChange(e.target.value)} />
  </div>
);