// src/data/cars.ts

import { Car, KeySpec } from "@/types";

// --- KeySpec and Utility Data Blocks are omitted for brevity in this response but are assumed to be complete ---
// NOTE: I am reusing the KeySpec and Utility blocks from the previous successful update.

const LC300_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '3.3L Twin-Turbo Diesel' }, { label: 'Max Power', value: '304 hp' },
    { label: 'Max Torque', value: '700 Nm' }, { label: 'Seating Capacity', value: '7' },
    { label: 'Transmission', value: '10 Speed Automatic' }, { label: 'Drive Type', value: '4x4 Full-time' },
    { label: 'Mileage (Est.)', value: '8.8 kmpl' }, { label: 'Fuel Tank', value: '110 Litres' },
    { label: 'Safety Rating', value: '5 Star ANCAP' },
];

const DEFENDER_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '3.0L Turbo Petrol' }, { label: 'Max Power', value: '394 hp' },
    { label: 'Max Torque', value: '550 Nm' }, { label: 'Seating Capacity', value: '5 / 7' },
    { label: 'Transmission', value: '8 Speed Automatic' }, { label: 'Drive Type', value: '4x4 Full-time' },
    { label: 'Wading Depth', value: '900 mm' }, { label: 'Safety Rating', value: '5 Star Euro NCAP' },
];

const G63_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '4.0L V8 Bi-turbo AMG' }, { label: 'Max Power', value: '577 hp' },
    { label: 'Max Torque', value: '850 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: '9 Speed AMG SPEEDSHIFT' }, { label: 'Drive Type', value: '4ETS Full-time' },
    { label: '0-100 km/h', value: '4.5s' }, { label: 'Fuel Type', value: 'Petrol' },
];

const RRS_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '3.0L Mild-Hybrid Diesel' }, { label: 'Max Power', value: '346 hp' },
    { label: 'Max Torque', value: '700 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: '8 Speed AT' }, { label: 'Suspension', value: 'Electronic Air' },
    { label: 'Infotainment', value: '13.1-inch Pivi Pro' }, { label: 'Safety Rating', value: '5 Star Euro NCAP' },
];

const BE6E_SPECS: KeySpec[] = [
    { label: 'Drivetrain', value: 'All-Wheel Drive (AWD)' }, { label: 'Range (Est.)', value: '450 - 500 km' },
    { label: 'Battery', value: '80 kWh (Est.)' }, { label: 'Max Power', value: '280 hp (Est.)' },
    { label: 'Seating Capacity', value: '5' }, { label: 'Charging', value: '150kW DC Fast' },
];

const OCTAVIA_RS_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.0L TSI Petrol' }, { label: 'Max Power', value: '245 hp' },
    { label: 'Max Torque', value: '370 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: '7 Speed DSG' }, { label: '0-100 km/h', value: '6.6s' },
];

const SIERRA_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.5L Turbo Petrol (Est.)' }, { label: 'Range (EV Est.)', value: '450 km' },
    { label: 'Max Power', value: '170 hp (Est.)' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Design Highlight', value: 'Iconic Rear Design' }, { label: 'Safety Rating', value: '5 Star Target' },
];

const CRETA_EV_SPECS: KeySpec[] = [
    { label: 'Range (Est.)', value: '400 - 450 km' }, { label: 'Battery', value: '45 kWh (Est.)' },
    { label: 'Max Power', value: '138 hp (Est.)' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: 'Automatic (Single Speed)' }, { label: 'Charging', value: '100kW DC Fast' },
];

const Q5_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.0L Turbo Petrol' }, { label: 'Max Power', value: '265 hp' },
    { label: 'Max Torque', value: '370 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: '7 Speed S Tronic' }, { label: 'Drive Type', value: 'Quattro All-Wheel Drive' },
];

const VICTORIS_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.5L Strong Hybrid' }, { label: 'Mileage (Est.)', value: '27.9 kmpl' },
    { label: 'Features', value: 'ADAS Level 2' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Sunroof', value: 'Panoramic' }, { label: 'Transmission', value: 'e-CVT' },
];

const PUNCH_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.2L Revotron Petrol' }, { label: 'Max Power', value: '88 hp' },
    { label: 'Max Torque', value: '115 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: 'Manual / AMT' }, { label: 'Safety Rating', value: '5 Star Global NCAP' },
];

const FORTUNER_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.8L Diesel / 2.7L Petrol' }, { label: 'Max Power (D)', value: '201 hp' },
    { label: 'Max Torque (D)', value: '500 Nm' }, { label: 'Seating Capacity', value: '7' },
    { label: 'Drive Type', value: '4x2 / 4x4' }, { label: 'Transmission', value: 'Manual / Automatic' },
];

const CRETA_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.5L Petrol / Diesel / Turbo' }, { label: 'Max Power (P)', value: '113 hp' },
    { label: 'Max Torque (D)', value: '250 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Touchscreen', value: '10.25-inch' }, { label: 'Sunroof', value: 'Panoramic' },
];

const SCORPIO_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.2L Diesel / 2.0L Petrol' }, { label: 'Max Power (D)', value: '172 hp' },
    { label: 'Max Torque (D)', value: '400 Nm' }, { label: 'Seating Capacity', value: '6 / 7' },
    { label: 'Transmission', value: 'Manual / Automatic' }, { label: 'Drive Type', value: '4XPLOR' },
];

const SELTOS_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.5L Petrol / Diesel / Turbo' }, { label: 'Max Power (T)', value: '158 hp' },
    { label: 'Max Torque (D)', value: '250 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: 'iMT / IVT / DCT' }, { label: 'Features', value: 'ADAS Level 2' },
];

const XUV700_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.2L Diesel / 2.0L Petrol' }, { label: 'Max Power (D)', value: '182 hp' },
    { label: 'Max Torque (D)', value: '450 Nm' }, { label: 'Seating Capacity', value: '5 / 7' },
    { label: 'Features', value: 'ADAS Features' }, { label: 'Touchscreen', value: 'Dual HD Superscreen' },
];

const HARRIER_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.0L Kryotec Diesel' }, { label: 'Max Power', value: '168 hp' },
    { label: 'Max Torque', value: '350 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: 'Manual / Automatic' }, { label: 'Features', value: 'ADAS' },
];

const WRANGLER_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '2.0L Turbo Petrol' }, { label: 'Max Power', value: '268 hp' },
    { label: 'Max Torque', value: '400 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Drive Type', value: 'Legendary 4x4' }, { label: 'Feature', value: 'Removable Doors & Roof' },
];

const VIRTUS_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.0L TSI / 1.5L TSI' }, { label: 'Max Power (1.5L)', value: '148 hp' },
    { label: 'Max Torque (1.5L)', value: '250 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: 'Manual / Automatic / DSG' }, { label: 'Safety Rating', value: '5 Star GNCAP' },
];

const SLAVIA_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.0L TSI / 1.5L TSI' }, { label: 'Max Power (1.5L)', value: '148 hp' },
    { label: 'Max Torque (1.5L)', value: '250 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Touchscreen', value: '10-inch' }, { label: 'Safety', value: '6 Airbags' },
];

const VERNA_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.5L MPi / 1.5L Turbo' }, { label: 'Max Power (T)', value: '158 hp' },
    { label: 'Max Torque (T)', value: '253 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Features', value: 'ADAS Level 2' }, { label: 'Cooling', value: 'Ventilated & Heated Seats' },
];

const KIGER_SPECS: KeySpec[] = [
    { label: 'Engine Type', value: '1.0L Energy / 1.0L Turbo' }, { label: 'Max Power (T)', value: '99 hp' },
    { label: 'Max Torque (T)', value: '160 Nm' }, { label: 'Seating Capacity', value: '5' },
    { label: 'Transmission', value: 'Manual / AMT / CVT' }, { label: 'Safety Rating', value: '4 Star GNCAP' },
];


const LC300_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '1131 Litres' }, { label: 'Ground Clearance', value: '235 mm' },
    { label: 'Overall Length', value: '4985 mm' }, { label: 'Wheelbase', value: '2850 mm' },
];
const DEFENDER_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '857 Litres' }, { label: 'Ground Clearance', value: '291 mm' },
    { label: 'Overall Length', value: '5018 mm' }, { label: 'Wading Depth', value: '900 mm' },
];
const G63_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '667 Litres' }, { label: 'Ground Clearance', value: '241 mm' },
    { label: 'Overall Length', value: '4873 mm' }, { label: 'Fuel Tank', value: '100 Litres' },
];
const RRS_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '835 Litres' }, { label: 'Ground Clearance', value: '274 mm' },
    { label: 'Overall Length', value: '4946 mm' }, { label: 'Wheel Size', value: 'R22 Alloys' },
];
const BE6E_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space (Est.)', value: '450 Litres' }, { label: 'Ground Clearance', value: '200 mm (Est.)' },
    { label: 'Overall Length', value: '4365 mm (Est.)' }, { label: 'Wheelbase', value: '2775 mm' },
];
const OCTAVIA_RS_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '600 Litres' }, { label: 'Ground Clearance', value: '141 mm' },
    { label: 'Overall Length', value: '4702 mm' }, { label: 'Wheel Size', value: 'R18 Alloys' },
];
const SIERRA_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space (Est.)', value: '480 Litres' }, { label: 'Ground Clearance', value: '200 mm (Est.)' },
    { label: 'Overall Length', value: '4450 mm (Est.)' }, { label: 'Wheelbase', value: '2750 mm' },
];
const CRETA_EV_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space (Est.)', value: '410 Litres' }, { label: 'Ground Clearance', value: '170 mm (Est.)' },
    { label: 'Overall Length', value: '4330 mm' }, { label: 'Tyre Size', value: 'R17' },
];
const Q5_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '550 Litres' }, { label: 'Ground Clearance', value: '207 mm' },
    { label: 'Overall Length', value: '4682 mm' }, { label: 'Wheel Size', value: 'R19 Alloys' },
];
const VICTORIS_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space (Est.)', value: '400 Litres' }, { label: 'Ground Clearance', value: '175 mm (Est.)' },
    { label: 'Overall Length', value: '4365 mm' }, { label: 'Wheelbase', value: '2600 mm' },
];
const PUNCH_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '366 Litres' }, { label: 'Ground Clearance', value: '187 mm' },
    { label: 'Overall Length', value: '3827 mm' }, { label: 'Wheel Size', value: 'R16' },
];
const FORTUNER_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '296 Litres' }, { label: 'Ground Clearance', value: '225 mm' },
    { label: 'Overall Length', value: '4795 mm' }, { label: 'Fuel Tank', value: '80 Litres' },
];
const CRETA_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '433 Litres' }, { label: 'Ground Clearance', value: '190 mm' },
    { label: 'Overall Length', value: '4300 mm' }, { label: 'Wheel Size', value: 'R17' },
];
const SCORPIO_N_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '460 Litres' }, { label: 'Ground Clearance', value: '187 mm' },
    { label: 'Overall Length', value: '4662 mm' }, { label: 'Wheelbase', value: '2750 mm' },
];
const SELTOS_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '433 Litres' }, { label: 'Ground Clearance', value: '190 mm' },
    { label: 'Overall Length', value: '4365 mm' }, { label: 'Wheel Size', value: 'R17' },
];
const XUV700_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '480 Litres' }, { label: 'Ground Clearance', value: '200 mm' },
    { label: 'Overall Length', value: '4695 mm' }, { label: 'Wheelbase', value: '2750 mm' },
];
const HARRIER_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '445 Litres' }, { label: 'Ground Clearance', value: '205 mm' },
    { label: 'Overall Length', value: '4605 mm' }, { label: 'Fuel Tank', value: '50 Litres' },
];
const WRANGLER_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '548 Litres' }, { label: 'Ground Clearance', value: '232 mm' },
    { label: 'Overall Length', value: '4882 mm' }, { label: 'Wading Depth', value: '762 mm' },
];
const VIRTUS_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '521 Litres' }, { label: 'Ground Clearance', value: '179 mm' },
    { label: 'Overall Length', value: '4561 mm' }, { label: 'Wheelbase', value: '2651 mm' },
];
const SLAVIA_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '521 Litres' }, { label: 'Ground Clearance', value: '179 mm' },
    { label: 'Overall Length', value: '4541 mm' }, { label: 'Wheelbase', value: '2651 mm' },
];
const VERNA_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '528 Litres' }, { label: 'Ground Clearance', value: '170 mm' },
    { label: 'Overall Length', value: '4535 mm' }, { label: 'Fuel Tank', value: '45 Litres' },
];
const KIGER_UTILITY_SPECS: KeySpec[] = [
    { label: 'Boot Space', value: '405 Litres' }, { label: 'Ground Clearance', value: '205 mm' },
    { label: 'Overall Length', value: '3991 mm' }, { label: 'Wheel Size', value: 'R16' },
];


// ------------------------------------------------------------------

export const carsData: Car[] = [
  // --- NAYI CARS ---

  {
    name: 'Toyota Land Cruiser 300', 
    rating: 4.9, 
    reviews: 45, 
    priceRange: '₹ 2.10 - 2.35 Cr*', 
    location: 'Jaipur',
    imageUrls: [
      '/cars/landcruiser.jpg',
      '/cars/landcruiser-side.jpg',
      '/cars/landcruiser-rear.jpg',
      '/cars/landcruiser-interior.jpg'
    ],
    features: ['3.3L V6 Diesel Engine', '12.3-inch Touchscreen', 'JBL 14-speaker Audio', 'Multi-Terrain Select'], 
    // --- UNIQUE OFFERS ---
    offers: [
      'Complimentary 5 Year Service Package', 
      'Luxury Accessories Kit Worth ₹ 5 Lakh Free',
      'Special Corporate Discount of ₹ 2 Lakh', 
      'Assured 80% Buyback Value on Trade-in'
    ],
    // ----------------------
    keySpecifications: LC300_SPECS,
    utilitySpecs: LC300_UTILITY_SPECS, 
  },

  {
    name: 'Land Rover Defender', 
    rating: 4.9, 
    reviews: 60, 
    priceRange: '₹ 97.00 Lakh - 2.35 Cr*', 
    location: 'Jaipur',
    imageUrls: [
      '/cars/defender.jpg',
      '/cars/defender-side.jpg',
      '/cars/defender-rear.jpg',
      '/cars/defender-interior.jpg'
    ],
    features: ['11.4-inch Pivi Pro', '3D Surround Camera', 'Electronic Air Suspension', 'Terrain Response 2'], 
    // --- UNIQUE OFFERS ---
    offers: [
      '50% Discount on Off-Road Driving Experience', 
      'Complimentary Land Rover branded merchandise',
      'Free 3-Year Extended Warranty'
    ],
    // ----------------------
    keySpecifications: DEFENDER_SPECS,
    utilitySpecs: DEFENDER_UTILITY_SPECS,
  },
  {
    name: 'Mercedes-Benz G 63', 
    rating: 4.9, 
    reviews: 55, 
    priceRange: '₹ 4.17 - 4.43 Cr*', 
    location: 'Jaipur',
    imageUrls: [
      '/cars/g63.jpg',
      '/cars/g63-side.jpg',
      '/cars/g63-rear.jpg',
      '/cars/g63-interior.jpg'
    ],
    features: ['Handcrafted AMG 4.0L V8 biturbo', 'AMG RIDE CONTROL', 'MULTIBEAM LED headlamps', 'Surround View System'], 
    // --- UNIQUE OFFERS ---
    offers: [
      'Complimentary AMG Driving Academy enrollment', 
      'Bespoke Paint Protection Film (PPF) Package Free',
      'Preferential Interest Rate for up to 7 years'
    ],
    // ----------------------
    keySpecifications: G63_SPECS,
    utilitySpecs: G63_UTILITY_SPECS,
  },
  
  {
    name: 'Range Rover Sport',
    rating: 4.9, 
    reviews: 40, 
    priceRange: '₹ 1.69 - 2.80 Cr*', 
    location: 'Jaipur',
    imageUrls: [
      '/cars/range-rover.jpg',
      '/cars/range-rover-side.jpg',
      '/cars/range-rover-rear.jpg',
      '/cars/range-rover-interior.jpg'
    ],
    features: ['Pixel LED Headlights', 'Air Suspension', 'Meridian 3D Surround Sound', '22-inch Alloy Wheels'], 
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 5 Lakh Loyalty Bonus on Upgrade', 
      'Complimentary 3-Year Extended Warranty',
      'Low Rate Financing (8.25%)'
    ],
    // ----------------------
    keySpecifications: RRS_SPECS,
    utilitySpecs: RRS_UTILITY_SPECS,
  },
  {
    name: 'Mahindra BE6E',
    rating: 4.8, 
    reviews: 5, 
    priceRange: '₹ 28.00 - 35.00 Lakh*', 
    location: 'Jaipur',
    imageUrls: [
      '/cars/be6e.jpg',
      '/cars/be6e-side.jpg',
      '/cars/be6e-rear.jpg',
      '/cars/be6e-interior.jpg'
    ],
    features: ['Futuristic Design', 'Large Infotainment Screen', 'ADAS Level 2', 'Panoramic Sunroof'], 
    // --- UNIQUE OFFERS ---
    offers: [
      'Free Home Charging Unit Installation', 
      'First 500 bookings get a complimentary Smartwatch',
      'Free Annual Maintenance Contract (AMC) for 3 years'
    ],
    // ----------------------
    keySpecifications: BE6E_SPECS,
    utilitySpecs: BE6E_UTILITY_SPECS,
  },
  {
    name: 'Skoda Octavia RS',
    rating: 4.7,
    reviews: 25,
    priceRange: '₹ 30.00 - 35.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/octaviars.jpg',
      '/cars/octaviars-side.jpg',
      '/cars/octaviars-rear.jpg',
      '/cars/octaviars-interior.jpg'
    ],
    features: ['12-inch Touchscreen', 'Digital Cockpit', 'Sunroof', 'Wireless Charging'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 1 Lakh Cash Discount (Limited Period)', 
      'Complimentary Performance Tuning Check-up',
      '4-Year Service Pack included Free'
    ],
    // ----------------------
    keySpecifications: OCTAVIA_RS_SPECS,
    utilitySpecs: OCTAVIA_RS_UTILITY_SPECS,
  },

  {
    name: 'Tata Sierra',
    rating: 4.8,
    reviews: 15,
    priceRange: '₹ 20.00 - 25.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/sierra.jpg',
      '/cars/sierra-side.jpg',
      '/cars/sierra-rear.jpg',
      '/cars/sierra-interior.jpg'
    ],
    features: ['Iconic Rear Design', 'Panoramic Sunroof', 'EV and ICE Options', 'Large Touchscreen'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Priority Delivery Available on Pre-Booking', 
      '₹ 50,000 Exchange Bonus on any Tata Car',
      'Free Fast Charger Installation (EV Variant)'
    ],
    // ----------------------
    keySpecifications: SIERRA_SPECS,
    utilitySpecs: SIERRA_UTILITY_SPECS,
  },
  {
    name: 'Hyundai Creta Electric',
    rating: 4.6,
    reviews: 8,
    priceRange: '₹ 22.00 - 25.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/creta-electric.jpg',
      '/cars/creta-electric-side.jpg',
      '/cars/creta-electric-rear.jpg',
      '/cars/creta-electric-interior.jpg'
    ],
    features: ['400km Range (Est.)', 'Panoramic Sunroof', 'Level 2 ADAS', 'Ventilated Seats'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Free Home Charger Installation', 
      '₹ 30,000 Cash Discount on Top Variant',
      '5 Year / 1,00,000 km Extended Warranty'
    ],
    // ----------------------
    keySpecifications: CRETA_EV_SPECS,
    utilitySpecs: CRETA_EV_UTILITY_SPECS,
  },

  {
    name: 'Audi Q5', 
    rating: 4.7, 
    reviews: 20, 
    priceRange: '₹ 64.74 - 69.86 Lakh*', 
    location: 'Jaipur',
    imageUrls: [
      '/cars/q5.jpg',
      '/cars/q5-side.jpg',
      '/cars/q5-rear.jpg',
      '/cars/q5-interior.jpg'
    ],
    features: ['10-inch Touchscreen', '3D Premium Sound System', '8 Airbags', 'Quattro All-Wheel Drive'], 
    // --- UNIQUE OFFERS ---
    offers: [
      'Complimentary 3-Year Comprehensive Service Package', 
      'Low EMI @ 8.25% PA',
      '₹ 1 Lakh Corporate Discount'
    ],
    // ----------------------
    keySpecifications: Q5_SPECS,
    utilitySpecs: Q5_UTILITY_SPECS,
  },

  {
    name: 'Maruti Suzuki Victoris',
    rating: 4.5,
    reviews: 10,
    priceRange: '₹ 12.00 - 18.00 Lakh*',
    location: 'Jaipur',
    imageUrls: [
      '/cars/victoris.jpg',
      '/cars/victoris-side.jpg',
      '/cars/victoris-rear.jpg',
      '/cars/marutivictoris-interior.jpg'
    ],
    features: ['Panoramic Sunroof', 'ADAS Level 2', 'Ventilated Seats', '360 Camera'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Introductory Price Offer (Limited Stock)', 
      'Free 5-Year Extended Warranty',
      '₹ 25,000 Exchange Bonus'
    ],
    // ----------------------
    keySpecifications: VICTORIS_SPECS,
    utilitySpecs: VICTORIS_UTILITY_SPECS,
  },

  // --- PURANI CARS YAHAN SE SHURU ---
  {
    name: 'Tata Punch',
    rating: 4.8,
    reviews: 42,
    priceRange: '₹ 6.13 - 10.20 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/punch.jpg', '/cars/punch-side.jpg', '/cars/punch-rear.jpg', '/cars/punch-interior.jpg'],
    features: ['7-inch Touchscreen', 'Automatic Climate Control', 'Dual Airbags', 'ABS with EBD'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 10,000 Cash Discount on AMT variants', 
      '₹ 7,000 Corporate Discount',
      'Free 3rd Year Service Voucher'
    ],
    // ----------------------
    keySpecifications: PUNCH_SPECS,
    utilitySpecs: PUNCH_UTILITY_SPECS,
  },
  {
    name: 'Toyota Fortuner',
    rating: 4.7,
    reviews: 35,
    priceRange: '₹ 33.43 - 51.44 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/fortuner.jpg', '/cars/fortuner-side.jpg', '/cars/fortuner-rear.jpg', '/cars/fortuner-interior.jpg'],
    features: ['Ventilated Front Seats', 'JBL 11-speaker Sound System', '7 Airbags', '4x4 Capability'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Special Low Interest Rate @ 7.99%', 
      '₹ 25,000 Free Accessories',
      'Complimentary Underbody Anti-Rust Coating'
    ],
    // ----------------------
    keySpecifications: FORTUNER_SPECS,
    utilitySpecs: FORTUNER_UTILITY_SPECS,
  },
  {
    name: 'Hyundai Creta',
    rating: 4.7,
    reviews: 88,
    priceRange: '₹ 11.00 - 20.15 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/creta.jpg', '/cars/creta-side.jpg', '/cars/creta-rear.jpg', '/cars/creta-interior.jpg'],
    features: ['Panoramic Sunroof', '10.25-inch Touchscreen', 'Ventilated Seats', 'Bose Sound System'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 25,000 Exchange Bonus on SX Opt variant', 
      'Complimentary 4th Year Extended Warranty',
      'Special Discount for Educators & Doctors'
    ],
    // ----------------------
    keySpecifications: CRETA_SPECS,
    utilitySpecs: CRETA_UTILITY_SPECS,
  },
  {
    name: 'Mahindra Scorpio-N',
    rating: 4.9,
    reviews: 150,
    priceRange: '₹ 13.60 - 24.54 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/scorpio.jpg', '/cars/scorpio-side.jpg', '/cars/scorpio-rear.jpg', '/cars/scorpio-interior.jpg'],
    features: ['AdrenoX Infotainment', 'Sunroof', '4XPLOR Terrain Mode', '6 Airbags'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Complimentary 3rd Year Service Package', 
      '₹ 10,000 Accessories Voucher',
      'Low waiting period for Z8L Diesel AT variant'
    ],
    // ----------------------
    keySpecifications: SCORPIO_SPECS,
    utilitySpecs: SCORPIO_N_UTILITY_SPECS,
  },
  {
    name: 'Kia Seltos',
    rating: 4.6,
    reviews: 75,
    priceRange: '₹ 10.90 - 20.35 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/seltos.jpg', '/cars/seltos-side.jpg', '/cars/seltos-rear.jpg', '/cars/seltos-interior.jpg'],
    features: ['Dual 10.25-inch Screens', 'Ventilated Seats', 'ADAS Level 2', 'Bose Audio'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 30,000 Exchange Bonus on any old SUV', 
      'Special Festive Season Discount of ₹ 15,000',
      '50% off on Kia Connect Subscription'
    ],
    // ----------------------
    keySpecifications: SELTOS_SPECS,
    utilitySpecs: SELTOS_UTILITY_SPECS,
  },
  {
    name: 'Mahindra XUV700',
    rating: 4.9,
    reviews: 200,
    priceRange: '₹ 13.99 - 26.99 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/xuv700.jpg', '/cars/xuv700-side.jpg', '/cars/xuv700-rear.jpg', '/cars/xuv700-interior.jpg'],
    features: ['Dual HD Superscreen', 'ADAS Features', 'Panoramic Skyroof', 'Sony 3D Sound'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Priority Delivery Available (Select Variants)', 
      '₹ 15,000 Accessories Kit',
      'Special interest rate for women borrowers'
    ],
    // ----------------------
    keySpecifications: XUV700_SPECS,
    utilitySpecs: XUV700_UTILITY_SPECS,
  },
  {
    name: 'Tata Harrier',
    rating: 4.8,
    reviews: 110,
    priceRange: '₹ 15.49 - 26.44 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/harrier.jpg', '/cars/harrier-side.jpg', '/cars/harrier-rear.jpg', '/cars/harrier-interior.jpg'],
    features: ['12.3-inch Touchscreen', 'ADAS', 'Panoramic Sunroof', 'JBL Sound System'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 30,000 Cash Discount on Pre-facelift stock', 
      'Free 3-Year Extended Warranty',
      '75% off on Anti-Rust Coating'
    ],
    // ----------------------
    keySpecifications: HARRIER_SPECS,
    utilitySpecs: HARRIER_UTILITY_SPECS,
  },
  {
    name: 'Jeep Wrangler',
    rating: 4.5,
    reviews: 60,
    priceRange: '₹ 67.14 - 78.35 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/wrangler.jpg', '/cars/wrangler-side.jpg', '/cars/wrangler-rear.jpg', '/cars/wrangler-interior.jpg'],
    features: ['Legendary 4x4 Capability', 'Removable Doors & Roof', 'Uconnect Infotainment', 'Washable Interiors'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Complimentary Off-road Training Session', 
      '0% Depreciation Insurance (First Year)',
      'Free Hard Top (Select Variants)'
    ],
    // ----------------------
    keySpecifications: WRANGLER_SPECS,
    utilitySpecs: WRANGLER_UTILITY_SPECS,
  },
  {
    name: 'Volkswagen Virtus',
    rating: 4.8,
    reviews: 50,
    priceRange: '₹ 11.56 - 19.41 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/virtus.jpg', '/cars/virtus-side.jpg', '/cars/virtus-rear.jpg', '/cars/virtus-interior.jpg'],
    features: ['10-inch Touchscreen', 'Ventilated Seats', 'Sunroof', 'Wireless Charging'],
    // --- UNIQUE OFFERS ---
    offers: [
      '4-Year Service Package @ ₹20,000 (Discounted)', 
      '₹ 10,000 Corporate Discount',
      '2-Year Extended Warranty Free'
    ],
    // ----------------------
    keySpecifications: VIRTUS_SPECS,
    utilitySpecs: VIRTUS_UTILITY_SPECS,
  },
  {
    name: 'Skoda Slavia',
    rating: 4.7,
    reviews: 45,
    priceRange: '₹ 11.53 - 19.13 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/slavia.jpg', '/cars/slavia-side.jpg', '/cars/slavia-rear.jpg', '/cars/skodaslavia-interior.jpg'],
    features: ['10-inch Infotainment', 'Sunroof', 'Ventilated Front Seats', '6 Airbags'],
    // --- UNIQUE OFFERS ---
    offers: [
      'Complimentary 4-Year Service Package', 
      '₹ 15,000 Exchange Bonus',
      'Special Insurance Rates'
    ],
    // ----------------------
    keySpecifications: SLAVIA_SPECS,
    utilitySpecs: SLAVIA_UTILITY_SPECS,
  },
  {
    name: 'Hyundai Verna',
    rating: 4.6,
    reviews: 65,
    priceRange: '₹ 11.00 - 17.42 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/verna.jpg', '/cars/verna-side.jpg', '/cars/verna-rear.jpg', '/cars/verna-interior.jpg'],
    features: ['Dual Integrated Screens', 'ADAS Level 2', 'Ventilated & Heated Seats', 'Bose Sound System'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 10,000 Cash Discount on select variants', 
      '₹ 15,000 Exchange Bonus',
      'Special 1-year Roadside Assistance'
    ],
    // ----------------------
    keySpecifications: VERNA_SPECS,
    utilitySpecs: VERNA_UTILITY_SPECS,
  },
  {
    name: 'Renault Kiger',
    rating: 4.5,
    reviews: 17,
    priceRange: '₹ 5.76 - 10.34 Lakh*',
    location: 'Jaipur',
    imageUrls: ['/cars/kiger.jpg', '/cars/kiger-side.jpg', '/cars/kiger-rear.jpg', '/cars/kiger-interior.jpg'],
    features: ['8-inch Touchscreen', 'Wireless Charging', 'Air Purifier', 'Digital Instrument Cluster'],
    // --- UNIQUE OFFERS ---
    offers: [
      '₹ 10,000 Cash Discount', 
      '₹ 5,000 Loyalty Bonus',
      'Complimentary Accessories Pack'
    ],
    // ----------------------
    keySpecifications: KIGER_SPECS,
    utilitySpecs: KIGER_UTILITY_SPECS,
  },
];