"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

// आपके डेटाबेस और तस्वीरों के आधार पर तैयार की गई लिस्ट
const REAL_COMPARISONS = [
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
];

export default function CarComparisonSection() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* --- Header --- */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Compare to buy the right car
          </h2>
         
        
        </div>

        {/* --- Comparison Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REAL_COMPARISONS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
              
              {/* Image Section with VS Badge */}
              <div className="relative flex items-center justify-between p-6 bg-gray-50 h-40">
                <div className="w-[45%] h-full relative">
                  <Image src={item.car1.img} alt={item.car1.name} fill className="object-contain" />
                </div>
                
                {/* VS Badge Logic */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold w-9 h-9 rounded-full flex items-center justify-center border-4 border-white z-10">
                  VS
                </div>

                <div className="w-[45%] h-full relative">
                  <Image src={item.car2.img} alt={item.car2.name} fill className="object-contain" />
                </div>
              </div>

              {/* Data Labels */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 text-center border-r border-gray-100 pr-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{item.car1.brand}</p>
                    <p className="text-sm font-bold text-gray-900">{item.car1.name}</p>
                    <p className="text-xs font-bold text-gray-700 mt-1">₹ {item.car1.price} *</p>
                  </div>
                  <div className="flex-1 text-center pl-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{item.car2.brand}</p>
                    <p className="text-sm font-bold text-gray-900">{item.car2.name}</p>
                    <p className="text-xs font-bold text-gray-700 mt-1">₹ {item.car2.price} *</p>
                  </div>
                </div>

                {/* Orange/Red Action Button */}
                <Link 
                  href={`/compare/${item.car1.slug}-vs-${item.car2.slug}`}
                  className="mt-auto w-full border-2 border-red-500 text-red-500 text-center font-bold py-2 rounded-xl text-xs uppercase tracking-wider hover:bg-red-50 transition-all"
                >
                  {item.car1.name} vs {item.car2.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link --- */}
        <div className="mt-10">
          <Link href="/car-comparisons" className="text-red-600 font-extrabold text-sm flex items-center gap-2 hover:underline">
            View All Car Comparisons 
            <span className="bg-red-600 text-white rounded-full p-1 shadow-sm">
              <FaChevronRight size={8} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}