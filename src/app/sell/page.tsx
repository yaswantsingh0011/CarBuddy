"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Camera, Car, IndianRupee, Loader2, X, MapPin,
  CheckCircle2, Info, TrendingUp, ChevronDown
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Valuation Data ───────────────────────────────────────────────────────────
const CAR_MODELS: Record<string, { name: string; base: number }[]> = {
  "Maruti Suzuki": [
    { name: "Alto K10", base: 450000 },
    { name: "Swift", base: 780000 },
    { name: "Baleno", base: 870000 },
    { name: "Brezza", base: 1050000 },
    { name: "Dzire", base: 750000 },
    { name: "Ertiga", base: 980000 },
    { name: "WagonR", base: 580000 },
  ],
  Hyundai: [
    { name: "i10 Grand", base: 650000 },
    { name: "i20", base: 870000 },
    { name: "Venue", base: 1000000 },
    { name: "Creta", base: 1400000 },
    { name: "Verna", base: 1100000 },
    { name: "Alcazar", base: 1700000 },
  ],
  Tata: [
    { name: "Tiago", base: 600000 },
    { name: "Tigor", base: 720000 },
    { name: "Nexon", base: 950000 },
    { name: "Harrier", base: 1550000 },
    { name: "Safari", base: 1700000 },
    { name: "Punch", base: 680000 },
  ],
  Mahindra: [
    { name: "Bolero", base: 1000000 },
    { name: "Scorpio N", base: 1400000 },
    { name: "XUV 3XO", base: 1050000 },
    { name: "XUV700", base: 1900000 },
    { name: "Thar", base: 1400000 },
  ],
  Honda: [
    { name: "Amaze", base: 780000 },
    { name: "City", base: 1150000 },
    { name: "Elevate", base: 1250000 },
    { name: "Jazz", base: 850000 },
  ],
  Toyota: [
    { name: "Glanza", base: 800000 },
    { name: "Urban Cruiser Hyryder", base: 1200000 },
    { name: "Fortuner", base: 3800000 },
    { name: "Innova Crysta", base: 2000000 },
    { name: "Camry", base: 4500000 },
  ],
  Kia: [
    { name: "Sonet", base: 1000000 },
    { name: "Seltos", base: 1350000 },
    { name: "Carens", base: 1200000 },
    { name: "EV6", base: 6000000 },
  ],
  Volkswagen: [
    { name: "Polo", base: 900000 },
    { name: "Vento", base: 1050000 },
    { name: "Virtus", base: 1200000 },
    { name: "Taigun", base: 1300000 },
  ],
  Skoda: [
    { name: "Slavia", base: 1250000 },
    { name: "Kushaq", base: 1200000 },
    { name: "Octavia", base: 2800000 },
    { name: "Superb", base: 4200000 },
  ],
  Renault: [
    { name: "Kwid", base: 420000 },
    { name: "Triber", base: 650000 },
    { name: "Kiger", base: 700000 },
  ],
};

const BRANDS = Object.keys(CAR_MODELS);

// ─── Valuation Logic ──────────────────────────────────────────────────────────
function calculateValuation(
  brand: string,
  modelName: string,
  year: number,
  kmDriven: number,
  fuelType: string,
  ownerType: string
): { low: number; high: number; breakdown: Record<string, string> } | null {
  const modelList = CAR_MODELS[brand];
  if (!modelList) return null;
  const modelData = modelList.find((m) => m.name === modelName);
  if (!modelData || !year) return null;

  const base = modelData.base;
  const age = new Date().getFullYear() - year;

  // Age depreciation (max 70%)
  const depRate = Math.min(age * 0.15, 0.7);
  const afterAge = base * (1 - depRate);

  // KM penalty
  let kmPenalty = 0;
  if (kmDriven > 120000) kmPenalty = 0.2;
  else if (kmDriven > 70000) kmPenalty = 0.1;
  else if (kmDriven > 30000) kmPenalty = 0.05;
  const afterKm = afterAge * (1 - kmPenalty);

  // Owner penalty
  const ownerMap: Record<string, number> = {
    "1st Owner": 0,
    "2nd Owner": 0.05,
    "3rd Owner": 0.1,
    "4th + Owner": 0.15,
  };
  const ownerPenalty = ownerMap[ownerType] ?? 0;
  const afterOwner = afterKm * (1 - ownerPenalty);

  // Fuel adjustment
  const fuelMap: Record<string, number> = {
    Petrol: 0,
    Diesel: 0.03,
    CNG: -0.05,
    Electric: 0.05,
  };
  const fuelBonus = fuelMap[fuelType] ?? 0;
  const final = afterOwner * (1 + fuelBonus);

  const fmt = (n: number) => {
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
    return "₹" + Math.round(n).toLocaleString("en-IN");
  };

  return {
    low: Math.round(final * 0.93),
    high: Math.round(final * 1.07),
    breakdown: {
      base: fmt(base),
      age: `-${Math.round(depRate * 100)}% (${age} yr old)`,
      km: kmPenalty > 0 ? `-${Math.round(kmPenalty * 100)}%` : "No deduction",
      owner: ownerPenalty > 0 ? `-${Math.round(ownerPenalty * 100)}%` : "No deduction",
      fuel:
        fuelBonus > 0
          ? `+${Math.round(fuelBonus * 100)}%`
          : fuelBonus < 0
          ? `${Math.round(fuelBonus * 100)}%`
          : "No adjustment",
    },
  };
}

function fmtLakh(n: number) {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SellCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Form state for valuation
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [kmDriven, setKmDriven] = useState<number | "">("");
  const [ownerType, setOwnerType] = useState("1st Owner");

  // Valuation result
  const [valuation, setValuation] = useState<ReturnType<typeof calculateValuation>>(null);
  const [showValuation, setShowValuation] = useState(false);

  const availableModels = brand ? CAR_MODELS[brand] ?? [] : [];

  // Reset model when brand changes
  useEffect(() => {
    setModelName("");
    setValuation(null);
    setShowValuation(false);
  }, [brand]);

  useEffect(() => {
    setValuation(null);
    setShowValuation(false);
  }, [modelName, year, fuelType, kmDriven, ownerType]);

  const handleGetValuation = () => {
    if (!brand || !modelName || !year || kmDriven === "") return;
    const result = calculateValuation(
      brand,
      modelName,
      Number(year),
      Number(kmDriven),
      fuelType,
      ownerType
    );
    setValuation(result);
    setShowValuation(true);
  };

  const canValuate = brand && modelName && year && kmDriven !== "";

  // 1. Image Selection & Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        alert("You can only upload up to 5 photos.");
        return;
      }
      setImages((prev) => [...prev, ...filesArray]);
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
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
    const currentForm = e.currentTarget;
    const formData = new FormData(currentForm);
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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

      for (const file of images) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("car-photos")
          .upload(filePath, file);
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("car-photos").getPublicUrl(filePath);
        uploadedUrls.push(publicUrl);
      }

      const { error: dbError } = await supabase.from("car_listings").insert([
        {
          seller_id: session.user.id,
          brand: formData.get("brand"),
          model: formData.get("model"),
          year: parseInt(formData.get("year") as string),
          price: parseFloat(formData.get("price") as string),
          fuel_type: formData.get("fuel_type"),
          location: formData.get("location"),
          km_driven: parseInt(formData.get("km") as string),
          transmission: formData.get("transmission"),
          owner_type: formData.get("owner_type"),
          insurance_status: formData.get("insurance_status"),
          registration_no: formData.get("registration_no"),
          description: formData.get("description"),
          images: uploadedUrls,
          status: "available",
        },
      ]);

      if (dbError) throw dbError;

      alert("Car Listed Successfully! 🚀");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">

          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 flex items-center justify-center md:justify-start gap-3">
              <Car className="text-blue-600" size={36} /> List Your Vehicle
            </h1>
            <p className="text-slate-500 font-medium font-sans">
              Provide accurate details to get genuine inquiries faster.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* SECTION 1: BASIC INFO */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                <Info size={18} className="text-blue-600" /> Basic Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Brand</label>
                  <div className="relative">
                    <select
                      name="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none appearance-none font-semibold"
                      required
                    >
                      <option value="">Select Brand</option>
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Model</label>
                  <div className="relative">
                    <select
                      name="model"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      disabled={!brand}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none appearance-none font-semibold disabled:opacity-50"
                      required
                    >
                      <option value="">Select Model</option>
                      {availableModels.map((m) => (
                        <option key={m.name} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Year</label>
                  <div className="relative">
                    <select
                      name="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : "")}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none appearance-none font-semibold"
                      required
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* KM Driven */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Kilometers Driven</label>
                  <input
                    name="km"
                    type="number"
                    placeholder="e.g. 45000"
                    value={kmDriven}
                    onChange={(e) => setKmDriven(e.target.value ? parseInt(e.target.value) : "")}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: TECHNICAL & OWNERSHIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Fuel Type</label>
                <select
                  name="fuel_type"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold"
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>CNG</option>
                  <option>Electric</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">No. of Owners</label>
                <select
                  name="owner_type"
                  value={ownerType}
                  onChange={(e) => setOwnerType(e.target.value)}
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold"
                >
                  <option>1st Owner</option>
                  <option>2nd Owner</option>
                  <option>3rd Owner</option>
                  <option>4th + Owner</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Transmission</label>
                <select name="transmission" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Insurance Status</label>
                <select name="insurance_status" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold">
                  <option>Comprehensive</option>
                  <option>Third Party</option>
                  <option>Zero Dep</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>

            {/* ── VALUATION SECTION ──────────────────────────────────────── */}
            <div className="rounded-3xl border-2 border-blue-100 bg-blue-50/40 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold text-slate-800">Get Car Valuation</h2>
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">Free</span>
              </div>
              <p className="text-sm text-slate-500">
                Fill Brand, Model, Year & KM above — then click below to get an estimated market value before setting your price.
              </p>

              <button
                type="button"
                onClick={handleGetValuation}
                disabled={!canValuate}
                className="w-full py-4 rounded-2xl font-black text-base transition-all active:scale-95
                  bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                <TrendingUp size={20} /> Get Estimated Value
              </button>

              {/* Valuation Result */}
              {showValuation && valuation && (
                <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Estimated Market Value</p>
                    <p className="text-3xl font-black text-blue-600">
                      {fmtLakh(valuation.low)}{" "}
                      <span className="text-slate-400 text-xl font-bold">–</span>{" "}
                      {fmtLakh(valuation.high)}
                    </p>
                  </div>

                  {/* Breakdown Pills */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "Base Price", val: valuation.breakdown.base, color: "text-slate-700" },
                      { label: "Age Deduction", val: valuation.breakdown.age, color: "text-red-500" },
                      { label: "KM Deduction", val: valuation.breakdown.km, color: "text-red-500" },
                      { label: "Owner Deduction", val: valuation.breakdown.owner, color: "text-red-500" },
                      { label: "Fuel Adjustment", val: valuation.breakdown.fuel, color: valuation.breakdown.fuel.startsWith("+") ? "text-green-600" : valuation.breakdown.fuel.startsWith("-") ? "text-red-500" : "text-slate-500" },
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                        <p className={`text-sm font-bold ${item.color}`}>{item.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Smart Advice */}
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <p className="text-sm text-green-700 font-medium">
                      💡{" "}
                      {(() => {
                        const age = currentYear - Number(year);
                        if (age <= 2) return "Your car is nearly new — you can ask closer to the higher end of the range.";
                        if (age <= 5) return "Good age bracket. Buyers prefer cars under 5 years — you have strong leverage.";
                        if (age <= 8) return "Mid-range demand. Pricing slightly below midpoint will attract faster inquiries.";
                        return "Older vehicles sell faster when priced competitively. Consider pricing at or below the midpoint.";
                      })()}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    * Estimated range based on market depreciation formula. Actual price may vary.
                  </p>
                </div>
              )}
            </div>
            {/* ── END VALUATION ──────────────────────────────────────────── */}

            {/* SECTION 3: REGISTRATION & PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="registration_no"
                placeholder="Reg. No (e.g. RJ14 CB 0001)"
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none uppercase"
                required
              />
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="location"
                  placeholder="City"
                  className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Your Asking Price</label>
              {valuation && (
                <p className="text-xs text-blue-600 font-semibold ml-2">
                  Suggested range: {fmtLakh(valuation.low)} – {fmtLakh(valuation.high)}
                </p>
              )}
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  name="price"
                  type="number"
                  placeholder="Enter your asking price"
                  className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none font-black text-blue-600 text-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Detailed Description</label>
              <textarea
                name="description"
                placeholder="Write about car condition, service history, recent repairs..."
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none min-h-[120px] focus:bg-white border-2 border-transparent focus:border-blue-500"
                required
              />
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
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
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
              {loading ? (
                <><Loader2 className="animate-spin" /> Publishing Ad...</>
              ) : (
                <>List My Car <CheckCircle2 size={24} /></>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}