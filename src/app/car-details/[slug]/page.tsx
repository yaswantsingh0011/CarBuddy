"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { 
  FaGasPump, FaCogs, FaBolt, FaTachometerAlt, FaRoad, FaSuitcase, 
  FaStar, FaCheckCircle, FaInfoCircle, FaTimes, FaCalendarAlt, FaUser, FaShieldAlt, FaMapMarkerAlt, FaWhatsapp 
} from 'react-icons/fa';

// Import your Modals
import OnRoadPriceModal from "@/components/OnRoadPriceModal";
import EMICalculatorModal from "@/components/EMICalculatorModal";

const TABLES = ["most_searched_cars", "used_cars", "upcoming_cars", "electric_cars"] as const;

export default function CarDetailsPage() {
  const params = useParams();
  const slugParam = params.slug as string;

  const [car, setCar] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // States for Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showEmiModal, setShowEmiModal] = useState(false);

  // ✅ FIX: Ab ye function bas '₹' hatayega. Unit (Lakh/Cr) ko touch nahi karega.
  const formatPrice = (p: any) => {
    if (!p) return "";
    // Sirf '₹' aur comma hatao, text (Lakh/Cr) rehne do
    return p.toString().replace(/[₹]/g, '').trim(); 
  };

  useEffect(() => {
    async function loadCar() {
      if (!slugParam) return;
      setLoading(true);
      const decodedSlug = decodeURIComponent(slugParam).trim().toLowerCase().replace(/-+$/, '');

      for (const table of TABLES) {
        const { data } = await supabase.from(table).select("*").eq("slug", decodedSlug).limit(1);
        if (data && data.length > 0) {
          const singleCarData = data[0];
          setCar({ ...singleCarData, __table: table });
          const imgList = singleCarData.image_urls || singleCarData.images || [];
          setActiveImage(imgList[0] ?? "");
          setSelectedVariant(singleCarData.variants?.[0] ?? null);
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    }
    loadCar();
  }, [slugParam]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-red-600 text-2xl animate-pulse italic tracking-widest">CARBUDDY LOADING...</div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500 text-xl">Car Not Found. Check slugs in DB.</div>;

  const isUsedCar = car.__table === "used_cars"; 
  const currentPrice = selectedVariant?.price || car.price_range || car.price;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <div className="w-full px-4 md:px-8 lg:px-12 py-8 space-y-8 text-gray-900">
        
        {/* HERO SECTION */}
        <section className="bg-white border border-gray-100 rounded-[24px] p-6 lg:p-8 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-[65%]">
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
                {isUsedCar && <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg">Used Car</span>}
                <img src={activeImage} className="w-full h-full object-cover transition-all duration-500" alt={car.name} />
              </div>
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {(car.image_urls || car.images || []).map((img: string, idx: number) => (
                  <div key={idx} onClick={() => setActiveImage(img)} className={`w-28 h-20 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? "border-blue-600 shadow-md scale-105" : "border-gray-100 grayscale hover:grayscale-0"}`}>
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-[35%] flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">{car.name}</h1>
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={14}/>)}
                  <span className="text-gray-400 text-[10px] ml-2 font-black uppercase tracking-widest">4.8 / 5 | {car.reviews_count || "42"} Reviews</span>
                </div>

                <div className="space-y-6">
                  {!isUsedCar && car.variants && car.variants.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Selected Variant</p>
                      <select className="w-full bg-white border border-gray-200 p-3 rounded-xl font-bold text-sm outline-none cursor-pointer" value={selectedVariant?.name} onChange={(e) => setSelectedVariant(car.variants?.find((v:any)=>v.name === e.target.value))}>
                        {car.variants?.map((v:any, i: number) => <option key={i} value={v.name}>{v.name}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="px-2">
                    {/* ✅ FIX: Yahan se hardcoded 'Lakh' hata diya hai */}
                    <span className="text-4xl font-black leading-none tracking-tighter">₹ {formatPrice(currentPrice)}</span>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{isUsedCar ? "*Asking Price (Negotiable)" : "*Ex-showroom price"}</p>
                    {!isUsedCar && (
                      <div onClick={() => setShowPriceModal(true)} className="flex items-center gap-1 text-blue-600 text-[11px] font-black cursor-pointer hover:underline mt-2 uppercase tracking-wide">
                          <FaInfoCircle size={12} /> <span>Get On-Road Price Breakdown</span>
                      </div>
                    )}
                  </div>

                  <div className={`${isUsedCar ? 'bg-green-50/50 border-green-100' : 'bg-blue-50/30 border-blue-100'} p-6 rounded-[2rem] border shadow-sm`}>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Insight</p>
                      <button onClick={() => setShowEmiModal(true)} className="text-blue-600 font-black text-[9px] bg-white px-3 py-1.5 rounded-full shadow-sm uppercase border border-blue-50 hover:scale-105 transition-all">Calc EMI</button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-700 font-bold"><FaCheckCircle className={isUsedCar ? "text-green-500" : "text-blue-500"} size={14} /><span>Best in Class Safety</span></div>
                      <div className="flex items-center gap-2 text-xs text-gray-700 font-bold"><FaCheckCircle className={isUsedCar ? "text-green-500" : "text-blue-500"} size={14} /><span>CarBuddy Certified</span></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  {isUsedCar ? (
                    <>
                      <div className="flex gap-4">
                        <button className="flex-1 bg-white border-2 border-red-500 text-red-500 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-red-50 transition-all">Inspection Report</button>
                        <button className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 transition-all">Call Dealer</button>
                      </div>
                      <button className="w-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#C8E6C9] transition-all"><FaWhatsapp size={18}/> Chat on WhatsApp</button>
                    </>
                  ) : (
                    <div className="flex gap-4">
                      <button className="flex-1 bg-white border-2 border-red-500 text-red-500 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-red-50 transition-all">Get Offer</button>
                      <button onClick={() => setShowBookingModal(true)} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 transition-all">Book Test Drive</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABS SECTION */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden mt-10">
            <div className="flex border-b border-gray-100 bg-white overflow-x-auto scrollbar-hide">
                {(isUsedCar ? ["Overview", "Features"] : ["Overview", "Features", "Variants", "Review"]).map((t) => (
                <button key={t} onClick={() => setActiveTab(t.toLowerCase())} className={`flex-1 min-w-[130px] py-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === t.toLowerCase() ? "text-red-600 border-b-4 border-red-600 bg-red-50/10" : "text-gray-400 hover:text-gray-600"}`}>{t}</button>
                ))}
            </div>
             <div className="p-8 lg:p-12">
                {activeTab === "overview" && (
                  isUsedCar ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-2">
                      <UsedCarSpecItem icon={<FaCalendarAlt/>} label="Reg. Year" value={car.registration_year || "2024"} />
                      <UsedCarSpecItem icon={<FaShieldAlt/>} label="Insurance" value={car.insurance_type || "Valid"} />
                      <UsedCarSpecItem icon={<FaGasPump/>} label="Fuel Type" value={car.fuel_type || "Petrol"} />
                      <UsedCarSpecItem icon={<FaUser/>} label="Seats" value={car.seats || "5"} />
                      <UsedCarSpecItem icon={<FaRoad/>} label="Kms Driven" value={car.kms_driven || "12,000"} />
                      <UsedCarSpecItem icon={<FaMapMarkerAlt/>} label="RTO" value={car.rto || "DL8C"} />
                      <UsedCarSpecItem icon={<FaUser/>} label="Owner" value={car.ownership || "1st Owner"} />
                      <UsedCarSpecItem icon={<FaCogs/>} label="Transmission" value={car.transmission || "Manual"} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-10">
                        <OverviewItem icon={<FaGasPump/>} label={car.fuel_type === "Electric" ? "BATTERY PACK" : "ENGINE"} value={car.specs?.battery_pack || car.specs?.engine} />
                        <OverviewItem icon={<FaBolt/>} label="POWER" value={car.specs?.power} />
                        <OverviewItem icon={<FaCogs/>} label="TRANSMISSION" value={car.specs?.transmission} />
                        <OverviewItem icon={<FaRoad/>} label={car.fuel_type === "Electric" ? "RANGE" : "MILEAGE"} value={car.specs?.range || car.specs?.mileage} />
                        <OverviewItem icon={<FaTachometerAlt/>} label="TORQUE" value={car.specs?.torque} />
                        <OverviewItem icon={<FaSuitcase/>} label="BOOT SPACE" value={car.specs?.boot_space || car.specs?.bootSpace} />
                        <OverviewItem icon={<FaRoad/>} label="GROUND CLEARANCE" value={car.specs?.ground_clearance || car.specs?.groundClearance} />
                        <OverviewItem icon={<FaStar/>} label="SAFETY RATING" value="5 Star (GNCAP)" />
                    </div>
                  )
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(car.features || ["Sunroof", "Touchscreen", "360 Camera", "Air Purifier", "Ventilated Seats"]).map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all">
                        <FaCheckCircle className="text-green-500 shrink-0" size={18} />
                        <span className="font-bold text-gray-800 text-sm tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "variants" && !isUsedCar && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black tracking-tight">Available Variants</h3>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-black uppercase">{car.variants?.length || 0} Options</span>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <thead><tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest"><th className="p-6">Variant Name</th><th className="p-6">Specifications</th><th className="p-6">Price</th><th className="p-6 text-right">Action</th></tr></thead>
                          <tbody className="divide-y divide-gray-50">
                            {car.variants?.map((v: any, idx: number) => (
                              <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                                <td className="p-6 font-black text-gray-900">{v.name}<br/><span className="text-[10px] text-blue-600 uppercase font-black tracking-widest">{car.fuel_type}</span></td>
                                <td className="p-6 text-xs font-bold text-gray-600">{v.specs || `${v.engine} • ${v.transmission}`}</td>
                                {/* ✅ FIX: Yahan se bhi hardcoded 'Lakh' hata diya hai */}
                                <td className="p-6 font-black text-gray-900">₹ {formatPrice(v.price)}</td>
                                <td className="p-6 text-right"><button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-full text-[10px] font-black uppercase hover:bg-gray-900 hover:text-white transition-all shadow-sm">View More</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                )}

                {activeTab === "review" && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10">
                        <div>
                          <h3 className="text-3xl font-black text-gray-900 tracking-tight">Expert Verdict</h3>
                          <p className="text-gray-500 font-medium mt-1 italic">What our experts think about the {car.name}</p>
                        </div>
                        <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-3xl border border-yellow-100">
                          <div className="text-center">
                            <p className="text-[9px] font-black text-yellow-700 uppercase tracking-widest">CarBuddy Score</p>
                            <p className="text-3xl font-black text-yellow-800">4.5<span className="text-lg opacity-50">/5</span></p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Pros */}
                        <div className="bg-green-50/40 rounded-[2.5rem] p-10 border border-green-100">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="bg-green-600 text-white p-2.5 rounded-full shadow-lg shadow-green-100"><FaCheckCircle size={20}/></div>
                            <h4 className="text-xl font-black text-green-900 uppercase tracking-tighter">What We Loved</h4>
                          </div>
                          <ul className="space-y-5">
                            {(car.pros || ["Premium Cabin Experience", "Best-in-class Ride Quality", "Extensive Safety Suite", "Smooth Engine Refinement"]).map((pro: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-4 text-gray-700 font-bold text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons */}
                        <div className="bg-red-50/40 rounded-[2.5rem] p-10 border border-red-100">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="bg-red-600 text-white p-2.5 rounded-full shadow-lg shadow-red-100"><FaTimes size={18}/></div>
                            <h4 className="text-xl font-black text-red-900 uppercase tracking-tighter">Needs Improvement</h4>
                          </div>
                          <ul className="space-y-5">
                            {(car.cons || ["Wait Times are High", "Limited Service Network", "Interior Piano Black scratches easily", "Pricey top-end variants"]).map((con: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-4 text-gray-700 font-bold text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-[#121a2a] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                          <h5 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Summary Verdict</h5>
                          <p className="text-xl font-medium leading-relaxed opacity-90 max-w-3xl italic">
                            The {car.name} stands out as a balanced package. If you prioritize {car.pros?.[0] || 'luxury'} and long-term reliability, it&apos;s hard to find a better alternative in this price bracket. Perfect for city commutes and highway cruising.
                          </p>
                        </div>
                        <FaStar className="absolute -right-10 -bottom-10 text-white/5 rotate-12" size={240} />
                      </div>
                    </div>
                )}
             </div>
        </div>
      </div>

      {/* MODALS - REPLACED WITH NEW COMPONENTS */}
      <OnRoadPriceModal 
        isOpen={showPriceModal} 
        onClose={() => setShowPriceModal(false)} 
        carName={car.name} 
        price={currentPrice} 
        city="Jaipur" 
        onOpenEMI={() => { setShowPriceModal(false); setShowEmiModal(true); }}
        onOpenBooking={() => { setShowPriceModal(false); setShowBookingModal(true); }}
        onOpenOffers={() => {}} 
      />

      <EMICalculatorModal
        isOpen={showEmiModal}
        onClose={() => setShowEmiModal(false)}
        price={currentPrice}
        carName={car.name}
        city="Jaipur"
      />

      {showBookingModal && <InlineBookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} car={car} />}
      
    </div>
  );
}

// --- HELPER COMPONENTS ---

function UsedCarSpecItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0 group">
      <div className="flex items-center gap-5">
        <span className="text-gray-400 p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">{icon}</span>
        <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-black text-gray-900">{value}</span>
    </div>
  );
}

function OverviewItem({ icon, label, value }: any) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
        <span className="text-gray-300 group-hover:scale-110 transition-transform">{icon}</span> {label}
      </div>
      <p className="text-xl font-black text-gray-900 leading-tight tracking-tight">{value}</p>
    </div>
  );
}

function InlineBookingModal({ isOpen, onClose, car }: any) {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '' });
    if (!isOpen) return null;
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      setSubmitting(true);
      const { error } = await supabase.from('test_drives').insert([{ ...formData, car_name: car.name }]);
      if (error) alert(error.message); else { alert('Booking Request Sent! Our executive will call you soon.'); onClose(); }
      setSubmitting(false);
    };
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative border border-gray-100 shadow-2xl">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition-colors"><FaTimes size={20}/></button>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Book a Test Drive</h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">{car.name}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <input type="text" placeholder="Full Name" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm outline-none focus:border-blue-500 transition-all" onChange={(e)=>setFormData({...formData, name: e.target.value})}/>
            </div>
            <div className="space-y-1">
              <input type="tel" placeholder="Phone Number" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm outline-none focus:border-blue-500 transition-all" onChange={(e)=>setFormData({...formData, phone: e.target.value})}/>
            </div>
            <div className="space-y-1">
              <input type="email" placeholder="Email Address" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm outline-none focus:border-blue-500 transition-all" onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
            </div>
            <div className="space-y-1">
              <input type="text" placeholder="Preferred City" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm outline-none focus:border-blue-500 transition-all" onChange={(e)=>setFormData({...formData, city: e.target.value})}/>
            </div>
            <button type="submit" disabled={submitting} className="w-full py-5 bg-green-600 text-white font-black uppercase text-xs rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all tracking-[0.2em] mt-4">{submitting ? 'SENDING REQUEST...' : 'CONFIRM BOOKING'}</button>
            <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest mt-4">By clicking confirm, you agree to our privacy policy</p>
          </form>
        </div>
      </div>
    );
}