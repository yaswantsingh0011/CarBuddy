// src/data/newCarsData.ts

import { Car, KeySpec } from "@/types";

// --- 1. SPECS & UTILITY CONSTANTS (Sirf 3 cars ke liye) ---

// Mahindra BE6E Specs
const BE6E_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'Electric (EV)' },
    { label: 'Range (Est.)', value: '450 - 500 km' },
    { label: 'Battery', value: '60-80 kWh' },
    { label: 'Power', value: '230 hp - 280 hp' },
    { label: 'Charging', value: '175kW DC Fast Charge' },
    { label: '0-100 km/h', value: '6 Seconds' },
];
const BE6E_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '205 mm' },
    { label: 'Boot Space', value: '450 Litres' },
    { label: 'Length', value: '4370 mm' },
    { label: 'Wheelbase', value: '2775 mm' },
];

// Hyundai Creta Electric Specs
const CRETA_EV_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'Electric (EV)' },
    { label: 'Range (Est.)', value: '400 - 450 km' },
    { label: 'Battery', value: '45 kWh' },
    { label: 'Motor Power', value: '138 hp' },
    { label: 'Charging', value: '50kW DC Fast Charge' },
    { label: 'Transmission', value: 'Single Speed Auto' },
];
const CRETA_EV_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '190 mm' },
    { label: 'Boot Space', value: '400 Litres' },
    { label: 'Length', value: '4300 mm' },
    { label: 'Tyre Size', value: 'R17 Aero' },
];

// Maruti Suzuki Victoris Specs
const VICTORIS_SPECS: KeySpec[] = [
    { label: 'Engine', value: '1.5L Strong Hybrid' },
    { label: 'Mileage', value: '27.97 kmpl' },
    { label: 'Power', value: '114 hp (Combined)' },
    { label: 'Transmission', value: 'e-CVT' },
    { label: 'Drive Mode', value: 'EV Mode / Hybrid' },
    { label: 'Seating', value: '7 Seater' },
];
const VICTORIS_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '210 mm' },
    { label: 'Boot Space', value: '300 Litres (3rd Row Folded)' },
    { label: 'Length', value: '4600 mm' },
    { label: 'Fuel Tank', value: '45 Litres' },
];

// --- 2. MAIN DATA ARRAY (ONLY 3 CARS) ---

export const newCarsData: Car[] = [
  {
    id: 101,
    name: 'Mahindra BE6E',
    rating: 4.8,
    reviews: 12,
    priceRange: '₹ 25.00 - 30.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/be6e.jpg',
      '/cars/be6e-side.jpg',
      '/cars/be6e-rear.jpg',
      '/cars/be6e-interior.jpg'
    ],
    features: ['Futuristic Design', 'Dual Screen Dashboard', 'ADAS Level 2', 'Glass Roof'],
    offers: ['Priority Delivery for First 500 Customers', 'Free Wallbox Charger'],
    keySpecifications: BE6E_SPECS,
    utilitySpecs: BE6E_UTILITY,
  },
  {
    id: 102,
    name: 'Hyundai Creta Electric',
    rating: 4.7,
    reviews: 20,
    priceRange: '₹ 20.00 - 28.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/creta-electric.jpg',
      '/cars/creta-electric-side.jpg',
      '/cars/creta-electric-rear.jpg',
      '/cars/creta-electric-interior.jpg'
    ],
    features: ['Digital Instrument Cluster', 'Voice Controlled Sunroof', '360 Camera', 'Ventilated Seats'],
    offers: ['Introductory Price Benefit', '3 Year Unlimited Km Warranty'],
    keySpecifications: CRETA_EV_SPECS,
    utilitySpecs: CRETA_EV_UTILITY,
  },
  {
    id: 103,
    name: 'Maruti Suzuki Victoris',
    rating: 4.6,
    reviews: 15,
    priceRange: '₹ 12.00 - 19.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/victoris.jpg',
      '/cars/victoris-side.jpg',
      '/cars/victoris-rear.jpg',
      '/cars/victoris-interior.jpg'
    ],
    features: ['7 Seater Layout', 'Panoramic Sunroof', 'Strong Hybrid Tech', 'Heads-Up Display'],
    offers: ['Exchange Bonus ₹ 25,000', 'Corporate Discount ₹ 10,000'],
    keySpecifications: VICTORIS_SPECS,
    utilitySpecs: VICTORIS_UTILITY,
  },
];