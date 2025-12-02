'use client';

import React from 'react';
import { 
  FaCalendarAlt, FaGasPump, FaRoad, FaUser, FaCogs, 
  FaShieldAlt, FaChair, FaBuilding, FaIdCard 
} from 'react-icons/fa';
import { MdOutlineAppRegistration } from "react-icons/md";
import { TbEngine } from "react-icons/tb";

// Props define kar rahe hain
interface CarOverviewProps {
  car: any;
}

const OverviewItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | undefined }) => {
  if (!value) return null; // Agar value nahi hai to mat dikhao
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
        <span className="text-lg text-gray-400">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-gray-900 font-semibold text-sm">{value}</span>
    </div>
  );
};

const CarOverviewGrid: React.FC<CarOverviewProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Car Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        
        {/* Left Column */}
        <div className="space-y-1">
          <OverviewItem icon={<FaCalendarAlt />} label="Registration Year" value={car.registrationYear || car.modelYear} />
          <OverviewItem icon={<FaGasPump />} label="Fuel Type" value={car.fuelType} />
          <OverviewItem icon={<FaRoad />} label="Kms Driven" value={car.kms} />
          <OverviewItem icon={<FaUser />} label="Ownership" value={car.owner} />
          <OverviewItem icon={<FaCogs />} label="Transmission" value={car.transmissionType || (car.specs?.transmission)} />
        </div>

        {/* Right Column */}
        <div className="space-y-1">
          <OverviewItem icon={<FaShieldAlt />} label="Insurance" value={car.insurance || "Expired"} />
          <OverviewItem icon={<FaChair />} label="Seats" value={car.seats || "5 Seats"} />
          <OverviewItem icon={<FaBuilding />} label="RTO" value={car.rto || "N/A"} />
          <OverviewItem icon={<TbEngine />} label="Engine Displacement" value={car.engineDisplacement || car.specs?.engine} />
          <OverviewItem icon={<MdOutlineAppRegistration />} label="Year of Manufacture" value={car.modelYear} />
        </div>

      </div>
    </div>
  );
};

export default CarOverviewGrid;