import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import {
  Car, MapPin, Fuel, Gauge, IndianRupee,
  Calendar, ShieldCheck, ChevronLeft
} from "lucide-react";
import MarketplaceGallery from "./MarketplaceGallery";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;

  // ✅ Server client
  const supabase = createServerSupabaseClient();
  const { data: car, error } = await supabase
    .from("car_listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !car) return notFound();

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all">
          <ChevronLeft size={20} /> Back to Marketplace
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ✅ Gallery — Client Component (image switching ke liye) */}
        <MarketplaceGallery images={car.images || []} model={car.model} />

        {/* Right Side: Car Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                {car.year} Model
              </span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={12} /> Verified Listing
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              {car.brand} <span className="text-blue-600">{car.model}</span>
            </h1>
            <div className="flex items-center gap-4 text-slate-500 font-bold">
              <span className="flex items-center gap-1"><MapPin size={18} /> {car.location}</span>
              <span className="flex items-center gap-1"><Gauge size={18} /> {car.km_driven?.toLocaleString()} km</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[2.5rem] p-8">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">Expected Price</p>
            <div className="flex items-center gap-2 text-4xl font-black text-slate-900">
              <IndianRupee size={32} className="text-blue-600" />
              {car.price?.toLocaleString()}
              <span className="text-lg text-slate-400 font-medium ml-2">Fixed Price</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border border-slate-100 p-6 rounded-3xl text-center hover:bg-blue-50 transition-colors">
              <Fuel className="mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-slate-400 font-bold uppercase">Fuel Type</p>
              <p className="font-black text-slate-800">{car.fuel_type}</p>
            </div>
            <div className="border border-slate-100 p-6 rounded-3xl text-center hover:bg-blue-50 transition-colors">
              <Calendar className="mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-slate-400 font-bold uppercase">Year</p>
              <p className="font-black text-slate-800">{car.year}</p>
            </div>
            <div className="border border-slate-100 p-6 rounded-3xl text-center hover:bg-blue-50 transition-colors">
              <Car className="mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-slate-400 font-bold uppercase">Transmission</p>
              <p className="font-black text-slate-800">{car.transmission}</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xl shadow-xl shadow-blue-200 transition-all active:scale-95">
            Contact Seller for Details
          </button>
        </div>
      </div>
    </div>
  );
}