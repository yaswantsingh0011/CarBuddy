// src/data/newCarsData.ts

import { Car, KeySpec } from "@/types";

// ==========================================
// 1. SPECS & UTILITY CONSTANTS
// ==========================================
// --- B. NEW 2025 LAUNCHES (e-Vitara, Kylaq, Amaze) ---

// Maruti Suzuki e-Vitara (Updated)
const EVITARA_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'Electric (Dual Motor)' },
    { label: 'Range (Est.)', value: '550 km' },
    { label: 'Battery', value: '60 kWh' },
    { label: 'Power', value: '180 hp - 200 hp' },
    { label: 'Charging', value: 'Fast Charge Supported' },
    { label: 'Drivetrain', value: 'AWD' },
];
const EVITARA_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '190 mm' },
    { label: 'Boot Space', value: '430 Litres' },
    { label: 'Length', value: '4320 mm' },
    { label: 'Wheelbase', value: '2700 mm' },
];

// Skoda Kylaq Specs
const KYLAQ_SPECS: KeySpec[] = [
    { label: 'Engine', value: '1.0L TSI Turbo Petrol' },
    { label: 'Mileage', value: '19.8 kmpl' },
    { label: 'Power', value: '114 hp' },
    { label: 'Torque', value: '178 Nm' },
    { label: 'Transmission', value: '6-Speed MT / AT' },
    { label: '0-100 km/h', value: '10.5 Seconds' },
];
const KYLAQ_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '189 mm' },
    { label: 'Boot Space', value: '380 Litres' },
    { label: 'Length', value: '3995 mm (Sub-4m)' },
    { label: 'Safety', value: '6 Airbags Standard' },
];

// Honda Amaze 2025 Specs
const AMAZE_SPECS: KeySpec[] = [
    { label: 'Engine', value: '1.2L i-VTEC Petrol' },
    { label: 'Mileage', value: '18.6 kmpl' },
    { label: 'Power', value: '90 hp' },
    { label: 'Transmission', value: 'CVT / 5-MT' },
    { label: 'Tech', value: 'ADAS Level 1' },
    { label: 'Fuel Tank', value: '35 Litres' },
];
const AMAZE_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '170 mm' },
    { label: 'Boot Space', value: '420 Litres' },
    { label: 'Length', value: '3995 mm' },
    { label: 'Wheels', value: '15-inch Alloys' },
];
// --- A. ORIGINAL CARS (BE.6e, Creta EV, Victoris) ---

// Mahindra BE.6e Specs
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

// Hyundai Creta EV Specs
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



// ==========================================
// 2. MAIN DATA ARRAY (MERGED)
// ==========================================

export const newCarsData: Car[] = [

  // --- ORIGINAL 3 CARS ---
   {
    id: 201,
    name: 'Maruti Suzuki e-Vitara',
    rating: 4.9,
    reviews: 45,
    priceRange: '₹ 16.00 - 22.00 Lakh*',
    location: 'Delhi',
    imageUrls: [
      '/cars/e-vitara.jpg',
      '/cars/e-vitara-side.jpg',
      '/cars/e-vitara-rear.jpg',
      '/cars/e-vitara-interior.jpg'
    ],
    features: [
      'Born Electric SUV',
      '12-inch Floating Touchscreen',
      '360 Degree Camera',
      'Panoramic Sunroof',
      'ADAS Level 2'
    ],
    offers: [
      'Early Bird Discount ₹40,000',
      'Free Home Charger Installation'
    ],
    keySpecifications: EVITARA_SPECS,
    utilitySpecs: EVITARA_UTILITY,
  },

  {
    id: 202,
    name: 'Skoda Kylaq',
    rating: 4.7,
    reviews: 32,
    priceRange: '₹ 8.50 - 14.00 Lakh*',
    location: 'Mumbai',
    imageUrls: [
      '/cars/kylaq.jpg',
      '/cars/kylaq-side.jpg',
      '/cars/kylaq-rear.jpg',
      '/cars/kylaq-interior.jpg'
    ],
    features: ['Ventilated Seats', 'Electric Sunroof', '10-inch Infotainment', 'Powered Driver Seat'],
    offers: ['4 Year Maintenance Package', 'Corporate Discount ₹ 15,000'],
    keySpecifications: KYLAQ_SPECS,
    utilitySpecs: KYLAQ_UTILITY,
  },

  {
    id: 204,
    name: 'Honda Amaze',
    rating: 4.6,
    reviews: 25,
    priceRange: '₹ 7.50 - 10.50 Lakh*',
    location: 'Chennai',
    imageUrls: [
      '/cars/amaze.jpg',
      '/cars/amaze-side.jpg',
      '/cars/amaze-rear.jpg',
      '/cars/amaze-interior.jpg'
    ],
    features: ['ADAS Safety Suite', 'Premium Dual Tone Interior', 'Wireless Charger', 'LED Projector Headlamps'],
    offers: ['Loyalty Bonus ₹ 20,000', 'Exchange Bonus ₹ 10,000'],
    keySpecifications: AMAZE_SPECS,
    utilitySpecs: AMAZE_UTILITY,
  },
  
  {
    id: 101,
    name: 'Mahindra BE6e',
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
  }

  // --- NEW 2025 LAUNCHES ---
 

];
