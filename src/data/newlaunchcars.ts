// src/data/newlaunchcars.ts

import { Car, KeySpec } from "@/types";

// --- SPECS CONSTANTS ---

const OCTAVIA_RS_SPECS: KeySpec[] = [
    { label: 'Engine', value: '2.0L TSI Petrol' }, { label: 'Power', value: '245 hp' },
    { label: 'Torque', value: '370 Nm' }, { label: '0-100 km/h', value: '6.7s' },
    { label: 'Transmission', value: '7 Speed DSG' }, { label: 'Top Speed', value: '250 km/h' },
];
const OCTAVIA_RS_UTILITY: KeySpec[] = [
    { label: 'Boot Space', value: '600 Litres' }, { label: 'Ground Clearance', value: '145 mm' },
    { label: 'Launch Date', value: 'Late 2025' }, { label: 'Safety', value: '5 Star Euro NCAP' },
];

const SIERRA_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'EV & Turbo Petrol' }, { label: 'Range (EV)', value: '500 km (Est.)' },
    { label: 'Seating', value: '5 Seater' }, { label: 'Features', value: 'Lounge Mode' },
    { label: 'Touchscreen', value: '12.3-inch' }, { label: 'Sunroof', value: 'Panoramic Glass' },
];
const SIERRA_UTILITY: KeySpec[] = [
    { label: 'Boot Space', value: '450 Litres' }, { label: 'Ground Clearance', value: '190 mm' },
    { label: 'Launch Date', value: 'Mid 2025' }, { label: 'Platform', value: 'Gen 2 Architecture' },
];

const TESLA_Y_SPECS: KeySpec[] = [
    { label: 'Powertrain', value: 'Dual Motor AWD' }, { label: 'Range', value: '530 km' },
    { label: '0-100 km/h', value: '3.5s' }, { label: 'Top Speed', value: '250 km/h' },
    { label: 'Charging', value: 'Supercharger V3' }, { label: 'Autopilot', value: 'Standard' },
];
const TESLA_Y_UTILITY: KeySpec[] = [
    { label: 'Boot Space', value: '854 Litres' }, { label: 'Frunk', value: '117 Litres' },
    { label: 'Launch Date', value: 'Coming Soon' }, { label: 'Warranty', value: '4 Years / 80k km' },
];

const CARNIVAL_SPECS: KeySpec[] = [
    { label: 'Engine', value: '2.2L Diesel / 1.6L Hybrid' }, { label: 'Power', value: '190 hp' },
    { label: 'Torque', value: '440 Nm' }, { label: 'Seating', value: '7 / 9 Seater' },
    { label: 'Features', value: 'Dual Sunroof, ADAS 2' }, { label: 'Doors', value: 'Power Sliding' },
];
const CARNIVAL_UTILITY: KeySpec[] = [
    { label: 'Boot Space', value: '627 Litres' }, { label: 'Ground Clearance', value: '180 mm' },
    { label: 'Launch Date', value: 'Early 2025' }, { label: 'Length', value: '5155 mm' },
];


// --- MAIN ARRAY (Reordered: Last 2 moved to Top) ---

export const newLaunchCars: Car[] = [
  {
    id: 903,
    name: "Tesla Model Y",
    rating: 5.0,
    reviews: 500,
    priceRange: "₹ 60.00 - 70.00 Lakh*",
    location: "Coming Soon",
    imageUrls: [
        "/cars/tesla.jpg", 
        "/cars/tesla-side.jpg", 
        "/cars/tesla-rear.jpg",
        "/cars/tesla-interior.jpg"
    ],
    features: ['Autopilot', 'Minimalist Interior', '15-inch Touchscreen', 'Glass Roof'],
    offers: ['Registration Open', 'Supercharger Access included'],
    keySpecifications: TESLA_Y_SPECS,
    utilitySpecs: TESLA_Y_UTILITY,
  },
  {
    id: 904,
    name: "Kia Carnival 2025",
    rating: 4.8,
    reviews: 80,
    priceRange: "₹ 40.00 - 50.00 Lakh*",
    location: "Coming 2025",
    imageUrls: [
        "/cars/carnival.jpg",  
        "/cars/carnival-side.jpg", 
        "/cars/carnival-rear.jpg",
        "/cars/carnival-interior.jpg"
    ],
    features: ['VIP Lounge Seating', '12.3-inch Dual Screens', 'Digital Rear View Mirror', 'Fingerprint Auth'],
    offers: ['Loyalty Bonus for existing Kia owners', 'Corporate Booking Benefits'],
    keySpecifications: CARNIVAL_SPECS,
    utilitySpecs: CARNIVAL_UTILITY,
  },
  {
    id: 901,
    name: "Skoda Octavia RS",
    rating: 4.8,
    reviews: 120,
    priceRange: "₹ 35.00 - 40.00 Lakh*",
    location: "Coming 2025", 
    imageUrls: [
        "/cars/octaviars.jpg", 
        "/cars/octaviars-side.jpg", 
        "/cars/octaviars-rear.jpg",
        "/cars/octaviars-interior.jpg"
    ],
    features: ['2.0L TSI Engine', 'Sporty Bucket Seats', 'Blacked-out Exterior', 'Virtual Cockpit'],
    offers: ['Pre-Booking Open soon', 'Priority Delivery for Enthusiasts'],
    keySpecifications: OCTAVIA_RS_SPECS,
    utilitySpecs: OCTAVIA_RS_UTILITY,
  },
  {
    id: 902,
    name: "Tata Sierra EV",
    rating: 4.9,
    reviews: 50,
    priceRange: "₹ 25.00 - 30.00 Lakh*",
    location: "Coming 2025",
    imageUrls: [
        "/cars/sierra.jpg", 
        "/cars/sierra-side.jpg", 
        "/cars/sierra-rear.jpg",
        "/cars/sierra-interior.jpg"
    ],
    features: ['Iconic Glass Roof', 'Futuristic Lounge Interior', 'V2L Technology', 'Level 2 ADAS'],
    offers: ['Launch Offer Coming Soon', 'Early Bird EV Benefits'],
    keySpecifications: SIERRA_SPECS,
    utilitySpecs: SIERRA_UTILITY,
  },
];