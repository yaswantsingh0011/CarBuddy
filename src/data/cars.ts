// src/data/cars.ts

import { Car, KeySpec } from "@/types";

// --- 1. SPECS CONSTANTS ---

const LC300_SPECS: KeySpec[] = [{ label: 'Engine', value: '3.3L V6 Diesel' }, { label: 'Power', value: '304 hp' }, { label: 'Torque', value: '700 Nm' }, { label: 'Trans', value: '10AT' }];
const LC300_UTILITY: KeySpec[] = [{ label: 'Boot', value: '1131 L' }, { label: 'G.Clearance', value: '235 mm' }];

const DEFENDER_SPECS: KeySpec[] = [{ label: 'Engine', value: '3.0L Petrol' }, { label: 'Power', value: '394 hp' }, { label: 'Torque', value: '550 Nm' }, { label: 'Wading', value: '900 mm' }];
const DEFENDER_UTILITY: KeySpec[] = [{ label: 'Boot', value: '857 L' }, { label: 'G.Clearance', value: '291 mm' }];

const G63_SPECS: KeySpec[] = [{ label: 'Engine', value: '4.0L V8 AMG' }, { label: 'Power', value: '577 hp' }, { label: '0-100', value: '4.5s' }, { label: 'Drive', value: 'AWD' }];
const G63_UTILITY: KeySpec[] = [{ label: 'Boot', value: '667 L' }, { label: 'G.Clearance', value: '241 mm' }];

const RRS_SPECS: KeySpec[] = [{ label: 'Engine', value: '3.0L Diesel' }, { label: 'Power', value: '346 hp' }, { label: 'Suspension', value: 'Air' }, { label: 'Screen', value: '13.1"' }];
const RRS_UTILITY: KeySpec[] = [{ label: 'Boot', value: '835 L' }, { label: 'G.Clearance', value: '274 mm' }];

const Q5_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.0L Turbo' }, { label: 'Power', value: '265 hp' }, { label: 'Drive', value: 'Quattro' }, { label: 'Trans', value: 'DCT' }];
const Q5_UTILITY: KeySpec[] = [{ label: 'Boot', value: '550 L' }, { label: 'G.Clearance', value: '200 mm' }];

const PUNCH_SPECS: KeySpec[] = [{ label: 'Engine', value: '1.2L Petrol' }, { label: 'Power', value: '88 hp' }, { label: 'Safety', value: '5 Star' }, { label: 'Trans', value: 'AMT' }];
const PUNCH_UTILITY: KeySpec[] = [{ label: 'Boot', value: '366 L' }, { label: 'G.Clearance', value: '187 mm' }];

const FORTUNER_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.8L Diesel' }, { label: 'Power', value: '201 hp' }, { label: 'Torque', value: '500 Nm' }, { label: 'Drive', value: '4x4' }];
const FORTUNER_UTILITY: KeySpec[] = [{ label: 'Boot', value: '296 L' }, { label: 'G.Clearance', value: '225 mm' }];

const CRETA_SPECS: KeySpec[] = [{ label: 'Engine', value: '1.5L Petrol' }, { label: 'Power', value: '113 hp' }, { label: 'Screen', value: '10.25"' }, { label: 'Roof', value: 'Pano' }];
const CRETA_UTILITY: KeySpec[] = [{ label: 'Boot', value: '433 L' }, { label: 'G.Clearance', value: '190 mm' }];

const SCORPIO_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.2L Diesel' }, { label: 'Power', value: '172 hp' }, { label: 'Drive', value: '4x4' }, { label: 'Seats', value: '7' }];
const SCORPIO_UTILITY: KeySpec[] = [{ label: 'Boot', value: '460 L' }, { label: 'G.Clearance', value: '187 mm' }];

const SELTOS_SPECS: KeySpec[] = [{ label: 'Engine', value: '1.5L Turbo' }, { label: 'Power', value: '158 hp' }, { label: 'Tech', value: 'ADAS 2' }, { label: 'Screen', value: 'Dual' }];
const SELTOS_UTILITY: KeySpec[] = [{ label: 'Boot', value: '433 L' }, { label: 'G.Clearance', value: '190 mm' }];

const XUV700_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.0L Turbo' }, { label: 'Power', value: '200 hp' }, { label: 'Tech', value: 'ADAS' }, { label: 'Roof', value: 'Skyroof' }];
const XUV700_UTILITY: KeySpec[] = [{ label: 'Boot', value: '480 L' }, { label: 'G.Clearance', value: '200 mm' }];

const HARRIER_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.0L Diesel' }, { label: 'Power', value: '168 hp' }, { label: 'Tech', value: 'ADAS' }, { label: 'Screen', value: '12.3"' }];
const HARRIER_UTILITY: KeySpec[] = [{ label: 'Boot', value: '445 L' }, { label: 'G.Clearance', value: '205 mm' }];

const WRANGLER_SPECS: KeySpec[] = [{ label: 'Engine', value: '2.0L Turbo' }, { label: 'Power', value: '268 hp' }, { label: 'Drive', value: '4x4' }, { label: 'Roof', value: 'Open' }];
const WRANGLER_UTILITY: KeySpec[] = [{ label: 'Boot', value: '548 L' }, { label: 'G.Clearance', value: '232 mm' }];

const VIRTUS_SPECS: KeySpec[] = [{ label: 'Engine', value: '1.5L TSI' }, { label: 'Power', value: '148 hp' }, { label: 'Safety', value: '5 Star' }, { label: 'Trans', value: 'DSG' }];
const VIRTUS_UTILITY: KeySpec[] = [{ label: 'Boot', value: '521 L' }, { label: 'G.Clearance', value: '179 mm' }];

const KIGER_SPECS: KeySpec[] = [{ label: 'Engine', value: '1.0L Turbo' }, { label: 'Power', value: '99 hp' }, { label: 'Safety', value: '4 Star' }, { label: 'Mode', value: 'Sport' }];
const KIGER_UTILITY: KeySpec[] = [{ label: 'Boot', value: '405 L' }, { label: 'G.Clearance', value: '205 mm' }];


// --- 2. MAIN CARS DATA ARRAY ---

export const carsData: Car[] = [
  {
    name: 'Toyota Land Cruiser 300', 
    rating: 4.9, 
    reviews: 45, 
    priceRange: '₹ 2.10 - 2.35 Cr*', 
    location: 'Jaipur',
    imageUrls: ['/cars/landcruiser.jpg', '/cars/landcruiser-side.jpg', '/cars/landcruiser-rear.jpg'],
    features: ['3.3L V6 Diesel', '12.3" Screen', 'JBL Audio'], 
    offers: ['5 Year Service Free', 'Accessories Kit'],
    keySpecifications: LC300_SPECS, utilitySpecs: LC300_UTILITY, 
  },
  {
    name: 'Land Rover Defender', 
    rating: 4.9, 
    reviews: 60, 
    priceRange: '₹ 97.00 Lakh - 2.35 Cr*', 
    location: 'Jaipur',
    imageUrls: ['/cars/defender.jpg', '/cars/defender-side.jpg', '/cars/defender-rear.jpg'],
    features: ['Pivi Pro', 'Air Suspension', '3D Camera'], 
    offers: ['50% Off Off-Road Exp', 'Free Extended Warranty'],
    keySpecifications: DEFENDER_SPECS, utilitySpecs: DEFENDER_UTILITY,
  },
  {
    name: 'Mercedes-Benz G 63', 
    rating: 4.9, 
    reviews: 55, 
    priceRange: '₹ 4.17 - 4.43 Cr*', 
    location: 'Jaipur',
    imageUrls: ['/cars/g63.jpg', '/cars/g63-side.jpg', '/cars/g63-rear.jpg'],
    features: ['AMG V8', 'Burmester Audio', 'Massage Seats'], 
    offers: ['AMG Academy Free', 'PPF Package'],
    keySpecifications: G63_SPECS, utilitySpecs: G63_UTILITY,
  },
  {
    name: 'Range Rover Sport',
    rating: 4.9, 
    reviews: 40, 
    priceRange: '₹ 1.69 - 2.80 Cr*', 
    location: 'Jaipur',
    imageUrls: ['/cars/range-rover.jpg', '/cars/range-rover-side.jpg', '/cars/range-rover-rear.jpg'],
    features: ['Pixel LED', 'Air Suspension', 'Meridian Sound'], 
    offers: ['Loyalty Bonus', 'Low Rate Finance'],
    keySpecifications: RRS_SPECS, utilitySpecs: RRS_UTILITY,
  },
  {
    name: 'Audi Q5', 
    rating: 4.7, 
    reviews: 20, 
    priceRange: '₹ 64.74 - 69.86 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/q5.jpg', '/cars/q5-side.jpg', '/cars/q5-rear.jpg'],
    features: ['Quattro', 'B&O Sound', 'Virtual Cockpit'], 
    offers: ['3 Year Service', 'Low EMI'],
    keySpecifications: Q5_SPECS, utilitySpecs: Q5_UTILITY,
  },
  {
    name: 'Tata Punch',
    rating: 4.8, 
    reviews: 42, 
    priceRange: '₹ 6.13 - 10.20 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/punch.jpg', '/cars/punch-side.jpg', '/cars/punch-rear.jpg'],
    features: ['5 Star Safety', '7" Screen', 'Harman Audio'],
    offers: ['Cash Discount', 'Free Service'],
    keySpecifications: PUNCH_SPECS, utilitySpecs: PUNCH_UTILITY,
  },
  {
    name: 'Toyota Fortuner',
    rating: 4.7, 
    reviews: 35, 
    priceRange: '₹ 33.43 - 51.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/fortuner.jpg', '/cars/fortuner-side.jpg', '/cars/fortuner-rear.jpg'],
    features: ['4x4', 'Ventilated Seats', 'JBL Sound'],
    offers: ['Low Interest Rate', 'Free Accessories'],
    keySpecifications: FORTUNER_SPECS, utilitySpecs: FORTUNER_UTILITY,
  },
  {
    name: 'Hyundai Creta',
    rating: 4.7, 
    reviews: 88, 
    priceRange: '₹ 11.00 - 20.15 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/creta.jpg', '/cars/creta-side.jpg', '/cars/creta-rear.jpg'],
    features: ['Pano Sunroof', 'Bose Sound', 'Ventilated Seats'],
    offers: ['Exchange Bonus', 'Ext Warranty'],
    keySpecifications: CRETA_SPECS, utilitySpecs: CRETA_UTILITY,
  },
  {
    name: 'Mahindra Scorpio-N',
    rating: 4.9, 
    reviews: 150, 
    priceRange: '₹ 13.60 - 24.54 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/scorpio.jpg', '/cars/scorpio-side.jpg', '/cars/scorpio-rear.jpg'],
    features: ['4XPLOR', 'Sony 3D Audio', '6 Airbags'],
    offers: ['3 Year Service', 'Accessories'],
    keySpecifications: SCORPIO_SPECS, utilitySpecs: SCORPIO_UTILITY,
  },
  {
    name: 'Kia Seltos',
    rating: 4.6, 
    reviews: 75, 
    priceRange: '₹ 10.90 - 20.35 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/seltos.jpg', '/cars/seltos-side.jpg', '/cars/seltos-rear.jpg'],
    features: ['ADAS 2', 'Pano Sunroof', 'Dual Screen'],
    offers: ['Exchange Bonus', 'Festive Offer'],
    keySpecifications: SELTOS_SPECS, utilitySpecs: SELTOS_UTILITY,
  },
  {
    name: 'Mahindra XUV700',
    rating: 4.9, 
    reviews: 200, 
    priceRange: '₹ 13.99 - 26.99 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/xuv700.jpg', '/cars/xuv700-side.jpg', '/cars/xuv700-rear.jpg'],
    features: ['Skyroof', 'ADAS', 'Dual HD Screen'],
    offers: ['Priority Delivery', 'Accessories'],
    keySpecifications: XUV700_SPECS, utilitySpecs: XUV700_UTILITY,
  },
  {
    name: 'Tata Harrier',
    rating: 4.8, 
    reviews: 110, 
    priceRange: '₹ 15.49 - 26.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/harrier.jpg', '/cars/harrier-side.jpg', '/cars/harrier-rear.jpg'],
    features: ['ADAS', '12.3" Screen', 'JBL Sound'],
    offers: ['Cash Discount', 'Ext Warranty'],
    keySpecifications: HARRIER_SPECS, utilitySpecs: HARRIER_UTILITY,
  },
  {
    name: 'Jeep Wrangler',
    rating: 4.5, 
    reviews: 60, 
    priceRange: '₹ 67.14 - 78.35 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/wrangler.jpg', '/cars/wrangler-side.jpg', '/cars/wrangler-rear.jpg'],
    features: ['4x4', 'Removeable Roof', 'Washable Interior'],
    offers: ['Off-Road Training', '0% Dep Insurance'],
    keySpecifications: WRANGLER_SPECS, utilitySpecs: WRANGLER_UTILITY,
  },
  {
    name: 'Volkswagen Virtus',
    rating: 4.8, 
    reviews: 50, 
    priceRange: '₹ 11.56 - 19.41 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/virtus.jpg', '/cars/virtus-side.jpg', '/cars/virtus-rear.jpg'],
    features: ['5 Star Safety', 'Ventilated Seats', '1.5 TSI'],
    offers: ['Service Pack Offer', 'Corporate Discount'],
    keySpecifications: VIRTUS_SPECS, utilitySpecs: VIRTUS_UTILITY,
  },
  {
    name: 'Renault Kiger',
    rating: 4.5, 
    reviews: 17, 
    priceRange: '₹ 5.76 - 10.34 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/cars/kiger.jpg', '/cars/kiger-side.jpg', '/cars/kiger-rear.jpg'],
    features: ['Wireless Charge', 'Turbo Engine', '4 Star Safety'],
    offers: ['Cash Discount', 'Loyalty Bonus'],
    keySpecifications: KIGER_SPECS, utilitySpecs: KIGER_UTILITY,
  },
];