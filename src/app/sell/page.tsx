"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import { Camera, Car, IndianRupee, Loader2, X, MapPin, CheckCircle2, Info, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SellCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // 1. Image Selection & Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        alert("You can only upload up to 5 photos.");
        return;
      }
      setImages((prev) => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // 2. Submit Logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // ✅ FormData capture early to avoid 'Argument 1 is not an object' error
    const currentForm = e.currentTarget;
    const formData = new FormData(currentForm);
    
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert("Please login first to list your car!");
        setLoading(false);
        return;
      }

      if (images.length === 0) {
        alert("Please upload at least one photo.");
        setLoading(false);
        return;
      }

      const uploadedUrls: string[] = [];

      // Upload Images to Supabase Storage
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('car-photos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('car-photos')
          .getPublicUrl(filePath);
        
        uploadedUrls.push(publicUrl);
      }

      // Final Insert with NEW Fields
      const { error: dbError } = await supabase.from("car_listings").insert([{
        seller_id: session.user.id,
        brand: formData.get("brand"),
        model: formData.get("model"),
        year: parseInt(formData.get("year") as string),
        price: parseFloat(formData.get("price") as string),
        fuel_type: formData.get("fuel_type"),
        location: formData.get("location"),
        km_driven: parseInt(formData.get("km") as string),
        transmission: formData.get("transmission"),
        owner_type: formData.get("owner_type"), // Added
        insurance_status: formData.get("insurance_status"), // Added
        registration_no: formData.get("registration_no"), // Added
        description: formData.get("description"), // Added
        images: uploadedUrls,
        status: 'available'
      }]);

      if (dbError) throw dbError;

      alert("Car Listed Successfully! 🚀");
      router.push("/"); 
      router.refresh();

    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
          
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 flex items-center justify-center md:justify-start gap-3">
              <Car className="text-blue-600" size={36} /> List Your Vehicle
            </h1>
            <p className="text-slate-500 font-medium font-sans">Provide accurate details to get genuine inquiries faster.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SECTION 1: BASIC INFO */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                <Info size={18} className="text-blue-600" /> Basic Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="brand" placeholder="Brand (e.g. Honda)" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" required />
                <input name="model" placeholder="Model (e.g. City i-VTEC)" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" required />
                <input name="year" type="number" placeholder="Manufacturing Year" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" required />
                <input name="km" type="number" placeholder="Kilometers Driven" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" required />
              </div>
            </div>

            {/* SECTION 2: TECHNICAL & OWNERSHIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Fuel Type</label>
                <select name="fuel_type" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                  <option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">No. of Owners</label>
                <select name="owner_type" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                  <option>1st Owner</option><option>2nd Owner</option><option>3rd Owner</option><option>4th + Owner</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Transmission</label>
                <select name="transmission" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                  <option>Manual</option><option>Automatic</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Insurance Status</label>
                <select name="insurance_status" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                  <option>Comprehensive</option><option>Third Party</option><option>Zero Dep</option><option>Expired</option>
                </select>
              </div>
            </div>

            {/* SECTION 3: REGISTRATION & PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="registration_no" placeholder="Reg. No (e.g. RJ14 CB 0001)" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none uppercase" required />
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="location" placeholder="City" className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none" required />
              </div>
            </div>

            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input name="price" type="number" placeholder="Your Asking Price" className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none font-black text-blue-600 text-xl" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Detailed Description</label>
              <textarea name="description" placeholder="Write about car condition, service history, recent repairs..." className="w-full p-4 bg-slate-50 rounded-2xl outline-none min-h-[120px] focus:bg-white border-2 border-transparent focus:border-blue-500" required />
            </div>

            {/* SECTION 4: PHOTOS */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Car Photos</h2>
              <label className="block border-2 border-dashed border-slate-200 rounded-[2.5rem] p-10 text-center hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all group">
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                <Camera className="mx-auto mb-2 text-slate-300 group-hover:text-blue-500 transition-colors" size={48} />
                <p className="text-sm font-bold text-slate-500">Upload up to 5 clear photos</p>
              </label>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border shadow-sm group">
                    <Image src={src} alt="preview" fill className="object-cover" sizes="(max-width: 768px) 33vw, 150px" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] text-xl flex justify-center items-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-xl shadow-blue-100"
            >
              {loading ? <><Loader2 className="animate-spin" /> Publishing Ad...</> : <>List My Car <CheckCircle2 size={24} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}