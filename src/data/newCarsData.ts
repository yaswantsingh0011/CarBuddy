// src/data/newCarsData.ts

import { Car, KeySpec } from "@/types";

// ==========================================
// 1. SPECS & UTILITY CONSTANTS
// ==========================================

// --- B. NEW 2025 LAUNCHES (e-Vitara, Kylaq, Amaze, Sierra, Octavia RS) ---

// ... (Baaki purane constants same rahenge: EVITARA, KYLAQ, AMAZE, SIERRA, OCTAVIA_RS) ...

// Maruti Suzuki e-Vitara
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

// --- NEW ADDITIONS: SIERRA & OCTAVIA RS ---

// Tata Sierra EV Specs
const SIERRA_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'Electric (AWD Optional)' },
    { label: 'Range (Est.)', value: '500+ km' },
    { label: 'Battery', value: '60 - 75 kWh' },
    { label: 'Power', value: '174 bhp (Est)' },
    { label: 'Charging', value: 'Fast Charge Supported' },
    { label: 'Drivetrain', value: 'FWD / AWD' },
];
const SIERRA_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '205 mm' },
    { label: 'Boot Space', value: '622 Litres' }, 
    { label: 'Length', value: '4340 mm' },
    { label: 'Wheelbase', value: '2730 mm' },
];

// Skoda Octavia RS Specs
const OCTAVIA_RS_SPECS: KeySpec[] = [
    { label: 'Engine', value: '2.0L TSI Turbo Petrol' },
    { label: '0-100 km/h', value: '6.6 Seconds' },
    { label: 'Power', value: '265 PS' },
    { label: 'Torque', value: '370 Nm' },
    { label: 'Transmission', value: '7-Speed DSG' },
    { label: 'Top Speed', value: '250 km/h' },
];
const OCTAVIA_RS_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '128 mm (Sport)' },
    { label: 'Boot Space', value: '600 Litres' },
    { label: 'Airbags', value: '10 Airbags' },
    { label: 'Wheels', value: '19-inch Alloy' },
];

// ✅ NEW ADDITION: MAHINDRA XEV 9S Specs
const XEV9S_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'Electric (RWD)' },
    { label: 'Range', value: '679 km (Claimed)' },
    { label: 'Battery', value: '79 kWh LFP' },
    { label: 'Power', value: '282 bhp' },
    { label: 'Charging', value: '20-80% in 20 min' },
    { label: 'Seating', value: '7 Seater' },
];
const XEV9S_UTILITY: KeySpec[] = [
    { label: 'Ground Clearance', value: '207 mm' },
    { label: 'Boot Space', value: 'Expandable (3rd Row)' },
    { label: 'Length', value: '4790 mm' },
    { label: 'Screen', value: 'Triple Screen Setup' },
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

  
  {
    id: 104, // Unique ID
    name: 'Mahindra XEV 9S',
    rating: 4.8,
    reviews: 25,
    priceRange: '₹ 19.95 - 29.45 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/xev9s.jpg',
      '/cars/xev9s-side.jpg',
      '/cars/xev9s-rear.jpg',
      '/cars/xev9s-interior.jpg'
    ],
    features: ['7 Seater EV', 'Triple Screen Dashboard', 'Panoramic Sunroof', 'ADAS Level 2', 'Ventilated Seats'],
    offers: ['Introductory Price', 'Free Fast Charger for first 1000 bookings'],
    keySpecifications: XEV9S_SPECS,
    utilitySpecs: XEV9S_UTILITY,
  },


  {
    id: 205,
    name: "Tata Sierra EV",
    rating: 4.8,
    reviews: 18,
    priceRange: "₹ 11.49 - 13.70 Lakh*",
    location: "jaipur",
    imageUrls: [
      "/cars/sierra.jpg", 
      "/cars/sierra-side.jpg", 
      "/cars/sierra-rear.jpg", 
      "/cars/sierra-interior.jpg"
    ],
    features: ["Lounge Style Rear Seating", "Panoramic Glass Roof", "Connected Car Tech", "Flush Door Handles"],
    offers: ["Pre-booking Benefit ₹20,000", "Extended Battery Warranty"],
    keySpecifications: SIERRA_SPECS,
    utilitySpecs: SIERRA_UTILITY,
  },

  {
    id: 206,
    name: "Skoda Octavia RS",
    rating: 4.9,
    reviews: 10,
    priceRange: "₹ 49.99 Lakh*",
    location: "jaipur",
    imageUrls: [
      "/cars/octaviars.jpg", 
      "/cars/octaviars-side.jpg", 
      "/cars/octaviars-rear.jpg", 
      "/cars/octaviars-interior.jpg"
    ],
    features: ["vRS Sport Seats", "Matrix LED Headlamps", "Canton Sound System", "10 Airbags"],
    offers: ["Exclusive RS Merchandise Kit", "Service Package @ 50% Off"],
    keySpecifications: OCTAVIA_RS_SPECS,
    utilitySpecs: OCTAVIA_RS_UTILITY,
  }, 
  
  {
    id: 201,
    name: 'Maruti Suzuki e-Vitara',
    rating: 4.9,
    reviews: 45,
    priceRange: '₹ 16.00 - 22.00 Lakh*',
    location: 'jaipur',
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
    location: 'jaipur',
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
    location: 'jaipur',
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

  // ✅ NEW ADDED CAR: MAHINDRA XEV 9S
  
];