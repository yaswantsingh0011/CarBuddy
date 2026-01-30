"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft, Scale } from "lucide-react"; // Icons ke liye

export default function ComparisonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const supabase = createClient();
  
  const [car1, setCar1] = useState<any>(null);
  const [car2, setCar2] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComparisonData() {
      if (!slug) return;
      setLoading(true);
      setErrorMsg(null);

      const slugs = slug.split("-vs-");
      
      try {
        const { data, error } = await supabase
          .from("most_searched_cars")
          .select("*")
          .in("slug", slugs);

        if (error) throw error;

        if (data) {
          const foundCar1 = data.find(c => c.slug === slugs[0]);
          const foundCar2 = data.find(c => c.slug === slugs[1]);

          if (!foundCar1 || !foundCar2) {
            setErrorMsg(`Data mismatch! Found: ${data.map(c => c.slug).join(", ")}. Expected: ${slugs.join(", ")}`);
          }

          setCar1(foundCar1);
          setCar2(foundCar2);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setErrorMsg("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchComparisonData();
  }, [slug, supabase]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <p className="text-gray-500 font-medium">Comparing Best Cars for You...</p>
    </div>
  );

  if (errorMsg || !car1 || !car2) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Comparison Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">{errorMsg || "We couldn't find the data for these specific models. Please check the slugs in your database."}</p>
      <button 
        onClick={() => router.back()}
        className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <main className="bg-[#f8f9fb] min-h-screen pb-20 pt-6">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Back Button */}
        <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-blue-600 mb-8 font-medium transition">
          <ChevronLeft size={20} /> Back to Search
        </button>

        {/* --- Top Header: Premium Visuals --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
                
                {/* Car 1 */}
                <div className="flex-1 w-full text-center group">
                    <div className="relative h-56 w-full mb-6 transition-transform duration-500 group-hover:scale-105">
                    <Image 
                        src={car1.images?.[0] || car1.image_url || "/cars/placeholder.jpg"} 
                        alt={car1.name} 
                        fill 
                        className="object-contain" 
                    />
                    </div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{car1.brand || "Brand"}</span>
                    <h1 className="text-3xl font-black text-gray-900 mt-1">{car1.name}</h1>
                    <p className="text-xl font-bold text-gray-700 mt-2">{car1.price}</p>
                </div>

                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                    <div className="bg-gradient-to-br from-red-500 to-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center font-black border-[6px] border-[#f8f9fb] shadow-xl italic text-xl">
                        VS
                    </div>
                </div>
                <div className="md:hidden bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm">VS</div>

                {/* Car 2 */}
                <div className="flex-1 w-full text-center group">
                    <div className="relative h-56 w-full mb-6 transition-transform duration-500 group-hover:scale-105">
                    <Image 
                        src={car2.images?.[0] || car2.image_url || "/cars/placeholder.jpg"} 
                        alt={car2.name} 
                        fill 
                        className="object-contain" 
                    />
                    </div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{car2.brand || "Brand"}</span>
                    <h1 className="text-3xl font-black text-gray-900 mt-1">{car2.name}</h1>
                    <p className="text-xl font-bold text-gray-700 mt-2">{car2.price}</p>
                </div>
            </div>
        </div>

        {/* --- Specs Table --- */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
             <Scale className="text-blue-600" size={24} />
             <h3 className="font-extrabold text-gray-800 text-lg">Detailed Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                <tr className="bg-gray-50/50">
                    <th className="p-6 text-[11px] uppercase tracking-[0.2em] font-black text-gray-400 w-1/3">Feature</th>
                    <th className="p-6 text-base font-extrabold text-gray-900">{car1.name}</th>
                    <th className="p-6 text-base font-extrabold text-gray-900">{car2.name}</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                {[
                    { label: "Fuel Type", v1: car1.fuel_type, v2: car2.fuel_type },
                    { label: "Engine Capacity", v1: car1.specs?.engine, v2: car2.specs?.engine },
                    { label: "Max Power", v1: car1.specs?.power, v2: car2.specs?.power },
                    { label: "Mileage (ARAI)", v1: car1.specs?.mileage, v2: car2.specs?.mileage },
                    { label: "Transmission", v1: car1.specs?.transmission, v2: car2.specs?.transmission },
                    { label: "Body Type", v1: car1.category, v2: car2.category },
                    { label: "Ground Clearance", v1: car1.specs?.groundclearance, v2: car2.specs?.groundclearance },
                    { label: "Seating Capacity", v1: car1.specs?.seating, v2: car2.specs?.seating },
                ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="p-6 font-bold text-gray-500 text-xs uppercase tracking-tight group-hover:text-blue-600">{row.label}</td>
                    <td className="p-6 text-gray-900 font-semibold text-sm">{row.v1 || "—"}</td>
                    <td className="p-6 text-gray-900 font-semibold text-sm">{row.v2 || "—"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}