"use client";

import React from 'react';
import Link from 'next/link';
import { FaExchangeAlt, FaGasPump, FaCogs } from 'react-icons/fa';

interface Variant {
  name: string;
  price: string;
  engine?: string;
  transmission?: string;
  fuelType?: string;
}

interface Props {
  variants: Variant[];
  carName: string;
}

const VariantsTable = ({ variants, carName }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900">
          Variants & Price List <span className="text-gray-500 text-sm font-normal ml-2">({variants.length} Variants)</span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <th className="p-4 font-bold border-b">Variant</th>
              <th className="p-4 font-bold border-b">Engine & Trans.</th>
              <th className="p-4 font-bold border-b">Price (Ex-Showroom)</th>
              <th className="p-4 font-bold border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {variants.map((variant, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition-colors group">
                
                {/* Variant Name */}
                <td className="p-4">
                  <p className="font-bold text-gray-900">{variant.name}</p>
                  <span className="text-xs text-gray-500">{variant.fuelType || "Petrol/Diesel"}</span>
                </td>

                {/* Specs */}
                <td className="p-4 text-sm text-gray-600">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1"><FaGasPump size={10} className="text-gray-400"/> {variant.engine || "N/A"}</span>
                    <span className="flex items-center gap-1"><FaCogs size={10} className="text-gray-400"/> {variant.transmission || "Manual"}</span>
                  </div>
                </td>

                {/* Price */}
                <td className="p-4">
                  <p className="font-bold text-gray-900 text-lg">{variant.price}</p>
                  <p className="text-xs text-blue-600 cursor-pointer hover:underline">Calculate EMI</p>
                </td>

                {/* ✅ COMPARE BUTTON (Detailed Comparison) */}
                <td className="p-4 text-center">
                  <Link 
                    // Yahan hum URL me data bhej rahe hain taaki Compare page par pakad sakein
                    href={`/compare?car1=${encodeURIComponent(carName)}&variant1=${encodeURIComponent(variant.name)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 text-xs font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <FaExchangeAlt /> Compare
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantsTable;