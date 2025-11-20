// src/data/newlaunchcars.ts

import { Car, KeySpec } from "@/types";

// --- 1. SPECS CONSTANTS ---

// Tesla
const TESLA_Y_SPECS: KeySpec[] = [{ label: 'Range', value: '530 km' }, { label: '0-100', value: '3.5s' }, { label: 'Launch', value: 'Dec 2025' }];
const TESLA_Y_UTILITY: KeySpec[] = [{ label: 'Boot Space', value: '854 L' }];

// Carnival
const CARNIVAL_SPECS: KeySpec[] = [{ label: 'Seating', value: '7/9 VIP' }, { label: 'Engine', value: '2.2L Diesel' }, { label: 'Launch', value: 'Jan 2026' }];
const CARNIVAL_UTILITY: KeySpec[] = [{ label: 'Boot Space', value: '627 L' }];

// Octavia RS
const OCTAVIA_RS_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.0L TSI' }, { label: 'Power', value: '245 hp' }, { label: 'Launch', value: 'Nov 2025' }];
const OCTAVIA_RS_UTILITY: KeySpec[] = [{ label: 'Boot Space', value: '600 L' }];

// Sierra
const SIERRA_SPECS: KeySpec[] = [{ label: 'Range', value: '500 km' }, { label: 'Roof', value: 'Glass' }, { label: 'Launch', value: 'Feb 2026' }];
const SIERRA_UTILITY: KeySpec[] = [{ label: 'Boot Space', value: '450 L' }];

// New Additions (Generic Specs for now)
const EV_SPECS: KeySpec[] = [{ label: 'Powertrain', value: 'Electric' }, { label: 'Range', value: '450+ km' }, { label: 'Launch', value: 'Dec 2025' }];
const SEDAN_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.0L Turbo' }, { label: 'Power', value: '190 hp' }, { label: 'Launch', value: 'Dec 2025' }];
const GENERIC_UTILITY: KeySpec[] = [{ label: 'Boot Space', value: 'TBA' }];


// --- 2. MAIN ARRAY (Total 8 Cars) ---

export const newLaunchCars: Car[] = [
  // --- PURANI 4 CARS ---
  {
    id: 901,
    name: "Tesla Model Y",
    rating: 5.0,
    reviews: 500,
    priceRange: "₹ 60 - 70 Lakh*",
    location: "Dec 15, 2025",
    imageUrls: ["/cars/tesla.jpg"], // Image: tesla-y.jpg
    features: [], offers: [], keySpecifications: TESLA_Y_SPECS, utilitySpecs: TESLA_Y_UTILITY,
  },
  {
    id: 902,
    name: "Kia Carnival 2025",
    rating: 4.8,
    reviews: 80,
    priceRange: "₹ 40 - 50 Lakh*",
    location: "Jan 10, 2026",
    imageUrls: ["/cars/carnival.jpg"], // Image: carnival.jpg
    features: [], offers: [], keySpecifications: CARNIVAL_SPECS, utilitySpecs: CARNIVAL_UTILITY,
  },
  {
    id: 903,
    name: "Skoda Octavia RS",
    rating: 4.8,
    reviews: 120,
    priceRange: "₹ 35 - 40 Lakh*",
    location: "Nov 25, 2025",
    imageUrls: ["/cars/octaviars.jpg"], // Image: octaviars.jpg
    features: [], offers: [], keySpecifications: OCTAVIA_RS_SPECS, utilitySpecs: OCTAVIA_RS_UTILITY,
  },
  {
    id: 904,
    name: "Tata Sierra EV",
    rating: 4.9,
    reviews: 50,
    priceRange: "₹ 25 - 30 Lakh*",
    location: "Feb 01, 2026",
    imageUrls: ["/cars/sierra.jpg"], // Image: sierra.jpg
    features: [], offers: [], keySpecifications: SIERRA_SPECS, utilitySpecs: SIERRA_UTILITY,
  },

  // --- NAYI 4 CARS (Updated from Screenshot) ---
  {
    id: 905,
    name: "Mahindra XEV 9S",
    rating: 4.8,
    reviews: 10,
    priceRange: "₹ 35 - 40 Lakh*",
    location: "Nov 27, 2025",
    imageUrls: ["/cars/xev9s.jpg"], // Image: xev9s.jpg
    features: [], offers: [], keySpecifications: EV_SPECS, utilitySpecs: GENERIC_UTILITY,
  },
  {
    id: 906,
    name: "Skoda Superb 2025",
    rating: 4.8,
    reviews: 5,
    priceRange: "₹ 50.00 Lakh*",
    location: "Dec 13, 2025",
    imageUrls: ["/cars/superb-new.jpg"], // Image: superb-new.jpg
    features: [], offers: [], keySpecifications: SEDAN_SPECS, utilitySpecs: GENERIC_UTILITY,
  },
  {
    id: 907,
    name: "BMW iX 2025",
    rating: 4.9,
    reviews: 12,
    priceRange: "₹ 1.45 Cr*",
    location: "Dec 14, 2025",
    imageUrls: ["/cars/bmw-ix-new.jpg"], // Image: bmw-ix-new.jpg
    features: [], offers: [], keySpecifications: EV_SPECS, utilitySpecs: GENERIC_UTILITY,
  },
  {
    id: 908,
    name: "Audi A5",
    rating: 4.7,
    reviews: 8,
    priceRange: "₹ 50.00 Lakh*",
    location: "Dec 15, 2025",
    imageUrls: ["/cars/audi-a5-new.jpg"], // Image: audi-a5-new.jpg
    features: [], offers: [], keySpecifications: SEDAN_SPECS, utilitySpecs: GENERIC_UTILITY,
  },
];