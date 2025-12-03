'use client';

import React from 'react';
import { FaGasPump, FaCogs } from 'react-icons/fa';

interface VariantsTableProps {
  variants?: { name: string; price: string; engine: string; transmission: string }[];
  carName: string;
}

const VariantsTable: React.FC<VariantsTableProps> = ({ variants, carName }) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{carName} Variants & Price List</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">Variant</th>
              <th className="px-6 py-3">Price (Ex-Showroom)</th>
              <th className="px-6 py-3 hidden md:table-cell">Specifications</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {variants.map((variant, index) => (
              <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 font-bold text-gray-800">{variant.name}</td>
                <td className="px-6 py-4 text-blue-600 font-bold">{variant.price}</td>
                <td className="px-6 py-4 hidden md:table-cell text-gray-500">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><FaGasPump className="text-gray-400"/> {variant.engine}</span>
                        <span className="flex items-center gap-1"><FaCogs className="text-gray-400"/> {variant.transmission}</span>
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-orange-500 font-bold border border-orange-500 px-4 py-1.5 rounded hover:bg-orange-500 hover:text-white transition-all text-xs uppercase">
                        View Offers
                    </button>
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