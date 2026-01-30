"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Updated list with Creta vs Seltos added
const ALL_COMPARISONS = [
  {
    id: 1,
    car1: { name: "Baleno", brand: "Maruti", price: "6.66 - 9.83 Lakh", img: "/cars/baleno.jpg", slug: "maruti-baleno" },
    car2: { name: "Altroz", brand: "Tata", price: "6.65 - 10.80 Lakh", img: "/cars/altroz.jpg", slug: "tata-altroz" },
  },
  {
    id: 2,
    car1: { name: "Land Cruiser", brand: "Toyota", price: "2.10 Cr", img: "/cars/landcruiser.jpg", slug: "toyota-land-cruiser" },
    car2: { name: "Vellfire", brand: "Toyota", price: "1.20 - 1.30 Cr", img: "/cars/vellfire.jpg", slug: "toyota-vellfire" },
  },
  {
    id: 3,
    car1: { name: "Virtus", brand: "Volkswagen", price: "11.56 - 19.41 Lakh", img: "/cars/virtus.jpg", slug: "volkswagen-virtus" },
    car2: { name: "Slavia", brand: "Skoda", price: "10.69 - 18.69 Lakh", img: "/cars/slavia.jpg", slug: "skoda-slavia" },
  },
  {
    id: 4,
    car1: { name: "XUV700", brand: "Mahindra", price: "13.99 - 26.99 Lakh", img: "/cars/xuv700.jpg", slug: "mahindra-xuv700" },
    car2: { name: "Scorpio-N", brand: "Mahindra", price: "13.85 - 24.54 Lakh", img: "/cars/scorpio-n.jpg", slug: "mahindra-scorpio-n" },
  },
  {
    id: 5,
    car1: { name: "City", brand: "Honda", price: "11.82 - 16.35 Lakh", img: "/cars/city.jpg", slug: "honda-city" },
    car2: { name: "Verna", brand: "Hyundai", price: "11.00 - 17.42 Lakh", img: "/cars/verna.jpg", slug: "hyundai-verna" },
  },
  {
    id: 6,
    car1: { name: "G-Class", brand: "Mercedes", price: "2.55 - 4.00 Cr", img: "/cars/g-class.jpg", slug: "mercedes-g-class" },
    car2: { name: "Range Rover", brand: "Land Rover", price: "2.39 - 4.17 Cr", img: "/cars/range-rover.jpg", slug: "land-rover-range-rover" },
  },
  {
    id: 7,
    car1: { name: "Syros", brand: "Kia", price: "10.00 - 15.00 Lakh", img: "/cars/syros.jpg", slug: "kia-syros" },
    car2: { name: "Kushaq", brand: "Skoda", price: "10.89 - 18.79 Lakh", img: "/cars/kushaq.jpg", slug: "skoda-kushaq" },
  },
  {
    id: 8,
    car1: { 
      name: "Creta", 
      brand: "Hyundai", 
      price: "11.00 - 20.15 Lakh", 
      img: "/cars/creta.jpg", 
      slug: "hyundai-creta" 
    },
    car2: { 
      name: "Seltos", 
      brand: "Kia", 
      price: "10.90 - 20.35 Lakh", 
      img: "/cars/seltos.jpg", 
      slug: "kia-seltos" 
    },
  },
];

export default function AllComparisonsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
                <Link href="/" className="flex items-center text-blue-600 font-bold mb-2 hover:underline text-sm">
                    <ChevronLeft size={18} /> Back to Home
                </Link>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">All Car Comparisons</h1>
                <p className="text-gray-500 mt-1 italic font-medium">Compare the best cars side-by-side</p>
            </div>
            <div className="bg-white px-5 py-2 rounded-2xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-400">
                {ALL_COMPARISONS.length} Total Comparisons
            </div>
        </div>

        {/* Comparisons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_COMPARISONS.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
              
              {/* Image Section */}
              <div className="relative flex items-center justify-between p-8 bg-gray-50/50 h-44">
                <div className="w-[45%] h-full relative transition-transform group-hover:scale-110 duration-500">
                  <Image src={item.car1.img} alt={item.car1.name} fill className="object-contain" />
                </div>
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-black w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 italic">
                  VS
                </div>

                <div className="w-[45%] h-full relative transition-transform group-hover:scale-110 duration-500">
                  <Image src={item.car2.img} alt={item.car2.name} fill className="object-contain" />
                </div>
              </div>

              {/* Data Labels */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex-1 text-center border-r border-gray-100 pr-3">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 leading-none">{item.car1.brand}</p>
                    <p className="text-base font-black text-gray-900 tracking-tight leading-tight">{item.car1.name}</p>
                    <p className="text-[11px] font-bold text-blue-600 mt-2 italic">₹ {item.car1.price} *</p>
                  </div>
                  <div className="flex-1 text-center pl-3">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 leading-none">{item.car2.brand}</p>
                    <p className="text-base font-black text-gray-900 tracking-tight leading-tight">{item.car2.name}</p>
                    <p className="text-[11px] font-bold text-blue-600 mt-2 italic">₹ {item.car2.price} *</p>
                  </div>
                </div>

                <Link 
                  href={`/compare/${item.car1.slug}-vs-${item.car2.slug}`}
                  className="mt-auto w-full bg-gray-900 text-white text-center font-black py-4.5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
                >
                  View Full Comparison
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}