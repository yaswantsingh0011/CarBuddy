"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { 
  FaGasPump, FaCogs, FaBolt, FaTachometerAlt, FaRoad, FaSuitcase, 
  FaStar, FaCheckCircle, FaInfoCircle, FaTimes, FaCalendarAlt, FaUser, FaShieldAlt, FaMapMarkerAlt, FaWhatsapp 
} from 'react-icons/fa';

const TABLES = ["most_searched_cars", "used_cars", "upcoming_cars", "electric_cars"] as const;

export default function CarDetailsPage() {
  const params = useParams();
  const slugParam = params.slug as string;

  const [car, setCar] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showEmiModal, setShowEmiModal] = useState(false);

  const formatPrice = (p: any) => {
    if (!p) return "";
    return p.toString().replace(/[₹\s,*]/g, '').replace(/Lakh/gi, '').trim();
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
                    <span className="text-4xl font-black leading-none tracking-tighter">₹ {formatPrice(currentPrice)} Lakh</span>
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
                                <td className="p-6 font-black text-gray-900">₹ {formatPrice(v.price)} Lakh</td>
                                <td className="p-6 text-right"><button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-full text-[10px] font-black uppercase hover:bg-gray-900 hover:text-white transition-all shadow-sm">View More</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </div>
                )}

                {/* 🔥 NEW REVIEW TAB: Pros & Cons Integrated */}
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

      {/* MODALS */}
      {showPriceModal && <InlineOnRoadModal isOpen={showPriceModal} onClose={() => setShowPriceModal(false)} carName={car.name} price={currentPrice} onOpenEMI={() => { setShowPriceModal(false); setShowEmiModal(true); }} onOpenBooking={() => { setShowPriceModal(false); setShowBookingModal(true); }} />}
      {showBookingModal && <InlineBookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} car={car} />}
      {showEmiModal && <InlineEMICalculator isOpen={showEmiModal} onClose={() => setShowEmiModal(false)} price={currentPrice} carName={car.name} />}
    </div>
  );
}

// --- HELPER COMPONENTS ---

function UsedCarSpecItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0 group">
      <div className="flex items-center gap-5">
        <span className="text-gray-400 p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">{icon}</span>
        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
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

function InlineOnRoadModal({ isOpen, onClose, carName, price, onOpenEMI, onOpenBooking }: any) {
    const parsePrice = (p: any) => {
        if(!p) return 0;
        const cleanStr = p.toString().replace(/[₹\s,]/g, '').replace(/Lakh/gi, '').trim();
        return parseFloat(cleanStr) * 100000;
    }
    const exShowroom = parsePrice(price);
    const rto = Math.round(exShowroom * 0.12); 
    const insurance = Math.round(exShowroom * 0.045);
    const other = 8500;
    const total = exShowroom + rto + insurance + other;
    const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative text-gray-900 border border-gray-100">
                <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{carName}</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">On-Road Est. Breakdown</p>
                  </div>
                  <button onClick={onClose} className="bg-white p-3 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-all"><FaTimes size={18}/></button>
                </div>
                <div className="p-8 space-y-5">
                    <div className="flex justify-between text-sm font-bold text-gray-500"><span>Ex-Showroom Price</span><span className="text-gray-900">{fmt(exShowroom)}</span></div>
                    <div className="flex justify-between text-sm font-bold text-gray-500"><span>RTO / Registration</span><span className="text-gray-900">{fmt(rto)}</span></div>
                    <div className="flex justify-between text-sm font-bold text-gray-500 border-b border-gray-100 pb-5"><span>Insurance (Comprehensive)</span><span className="text-gray-900">{fmt(insurance)}</span></div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-3xl flex flex-col items-center gap-1 shadow-xl">
                        <span className="font-black text-[10px] uppercase tracking-[0.3em] opacity-70">Total On-Road Price</span>
                        <span className="text-4xl font-black tracking-tighter">{fmt(total)}</span>
                    </div>
                </div>
                <div className="p-8 grid grid-cols-2 gap-4">
                    <button onClick={onOpenEMI} className="py-4 border-2 border-gray-100 text-gray-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">Check EMI</button>
                    <button onClick={onOpenBooking} className="py-4 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-200 transition-all">Book Visit</button>
                </div>
            </div>
        </div>
    )
}

function InlineEMICalculator({ isOpen, onClose, price, carName }: any) {
    const [tenure, setTenure] = useState(5);
    const [interestRate, setInterestRate] = useState(9.5);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    
    if(!isOpen) return null;

    const parsePrice = (p: any) => {
        if (!p) return 0;
        const cleanStr = p.toString().replace(/[₹\s,]/g, '').replace(/Lakh/gi, '').trim();
        return parseFloat(cleanStr) * 100000;
    };

    const exShowroom = parsePrice(price);
    const onRoadEst = Math.round(exShowroom * 1.15); 
    const downPaymentAmount = Math.round(onRoadEst * (downPaymentPercent / 100));
    const loanAmount = onRoadEst - downPaymentAmount;

    const calculateEMI = () => {
        const principal = loanAmount;
        const ratePerMonth = (interestRate / 100) / 12;
        const months = tenure * 12;
        if (principal <= 0) return 0;
        const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1);
        return Math.round(emi);
    };

    const monthlyEMI = calculateEMI();
    const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

    return (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full sm:max-w-xl sm:rounded-[3rem] rounded-t-[3rem] overflow-hidden shadow-2xl relative h-[95vh] sm:h-auto flex flex-col text-gray-900 border border-gray-100">
                <div className="bg-[#121a2a] text-white p-8 flex justify-between items-center shrink-0">
                    <div><h2 className="text-2xl font-black tracking-tight">EMI Calculator</h2><p className="text-blue-400 text-[10px] font-black uppercase mt-1 tracking-widest">{carName}</p></div>
                    <button onClick={onClose} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><FaTimes /></button>
                </div>
                
                <div className="p-8 space-y-10 overflow-y-auto flex-1 scrollbar-hide">
                    <div className="bg-gray-50 p-6 rounded-3xl flex justify-between items-center border border-gray-100 shadow-inner">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Est. On-Road Price</span>
                        <span className="text-xl font-black text-gray-900">{fmt(onRoadEst)}</span>
                    </div>

                    <div>
                        <div className="flex justify-between mb-4 items-end">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Loan Tenure</label>
                            <span className="text-blue-600 font-black text-xl">{tenure} <span className="text-xs opacity-50">Years</span></span>
                        </div>
                        <input type="range" min="1" max="7" step="1" value={tenure} onChange={(e)=>setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                    </div>

                    <div>
                        <div className="flex justify-between mb-4 items-end">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Down Payment ({downPaymentPercent}%)</label>
                            <span className="text-green-600 font-black text-xl">{fmt(downPaymentAmount)}</span>
                        </div>
                        <input type="range" min="10" max="80" step="5" value={downPaymentPercent} onChange={(e)=>setDownPaymentPercent(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600"/>
                    </div>

                    <div>
                        <div className="flex justify-between mb-4 items-end">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Interest Rate</label>
                            <span className="text-gray-900 font-black text-xl">{interestRate}%</span>
                        </div>
                        <input type="range" min="7" max="18" step="0.1" value={interestRate} onChange={(e)=>setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gray-900"/>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 flex flex-col items-center gap-1 shadow-sm">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">Estimated Monthly EMI</p>
                        <p className="text-5xl font-black text-gray-900 tracking-tighter">{fmt(monthlyEMI)}</p>
                    </div>
                </div>

                <div className="p-8 border-t bg-white shrink-0">
                    <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all tracking-[0.3em]">Check Finance Eligibility</button>
                </div>
            </div>
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