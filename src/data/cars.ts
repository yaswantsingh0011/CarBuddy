// src/data/cars.ts

export interface Car {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrls: string[];
  features?: string[];
  offers?: string[]; // 1. Offers का ऐरे यहाँ जोड़ें
}

export const carsData: Car[] = [
  { 
    name: 'Tata Punch', 
    rating: 4.8, 
    reviews: 42, 
    priceRange: '₹ 6.13 - 10.20 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/punch.jpg', '/punch-side.jpg', '/punch-rear.jpg', '/punch-interior.jpg'],
    features: ['7-inch Touchscreen', 'Automatic Climate Control', 'Dual Airbags', 'ABS with EBD'],
    offers: [ // 2. ऑफर्स का डेटा
      '₹ 10,000 Exchange Bonus',
      '₹ 5,000 Corporate Discount',
      'Free 1st Year Insurance'
    ] 
  },
  { 
    name: 'Toyota Fortuner', 
    rating: 4.7, 
    reviews: 35, 
    priceRange: '₹ 33.43 - 51.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/fortuner.jpg', '/fortuner-side.jpg', '/fortuner-rear.jpg', '/fortuner-interior.jpg'],
    features: ['Ventilated Front Seats', 'JBL 11-speaker Sound System', '7 Airbags', '4x4 Capability'],
    offers: [
      'Special Low Interest Rate @ 7.99%',
      '₹ 25,000 Accessories Free'
    ] 
  },
  { 
    name: 'Hyundai Creta', 
    rating: 4.7, 
    reviews: 88, 
    priceRange: '₹ 11.00 - 20.15 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/creta.jpg', '/creta-side.jpg', '/creta-rear.jpg', '/creta-interior.jpg'],
    features: ['Panoramic Sunroof', '10.25-inch Touchscreen', 'Ventilated Seats', 'Bose Sound System'],
    offers: [
      '₹ 15,000 Cash Discount',
      '₹ 20,000 Exchange Bonus'
    ]
  },
  { 
    name: 'Mahindra Scorpio-N', 
    rating: 4.9, 
    reviews: 150, 
    priceRange: '₹ 13.60 - 24.54 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/scorpio.jpg', '/scorpio-side.jpg', '/scorpio-rear.jpg', '/scorpio-interior.jpg'],
    features: ['AdrenoX Infotainment', 'Sunroof', '4XPLOR Terrain Mode', '6 Airbags'],
    offers: [
      'Complimentary 3rd Year Service Package',
      '₹ 10,000 Accessories Voucher'
    ]
  },
  { 
    name: 'Kia Seltos', 
    rating: 4.6, 
    reviews: 75, 
    priceRange: '₹ 10.90 - 20.35 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/seltos.jpg', '/seltos-side.jpg', '/seltos-rear.jpg', '/seltos-interior.jpg'],
    features: ['Dual 10.25-inch Screens', 'Ventilated Seats', 'ADAS Level 2', 'Bose Audio'],
    offers: [
      '₹ 25,000 Exchange Bonus',
      'Special Festive Discount'
    ]
  },
  { 
    name: 'Mahindra XUV700', 
    rating: 4.9, 
    reviews: 200, 
    priceRange: '₹ 13.99 - 26.99 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/xuv700.jpg', '/xuv700-side.jpg', '/xuv700-rear.jpg', '/xuv700-interior.jpg'],
    features: ['Dual HD Superscreen', 'ADAS Features', 'Panoramic Skyroof', 'Sony 3D Sound'],
    offers: [
      'Priority Delivery Available',
      '₹ 15,000 Accessories Kit'
    ]
  },
  { 
    name: 'Tata Harrier', 
    rating: 4.8, 
    reviews: 110, 
    priceRange: '₹ 15.49 - 26.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/harrier.jpg', '/harrier-side.jpg', '/harrier-rear.jpg', '/harrier-interior.jpg'],
    features: ['12.3-inch Touchscreen', 'ADAS', 'Panoramic Sunroof', 'JBL Sound System'],
    offers: [
      '₹ 30,000 Exchange Bonus',
      'Free 3-Year Extended Warranty'
    ]
  },
  { 
    name: 'Jeep Wrangler', 
    rating: 4.5, 
    reviews: 60, 
    priceRange: '₹ 67.14 - 78.35 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/wrangler.jpg', '/wrangler-side.jpg', '/wrangler-rear.jpg', '/wrangler-interior.jpg'],
    features: ['Legendary 4x4 Capability', 'Removable Doors & Roof', 'Uconnect Infotainment', 'Washable Interiors'],
    offers: [
      '₹ 50,000 Loyalty Bonus',
      'Exclusive Off-road Kit'
    ]
  },
  { 
    name: 'Volkswagen Virtus', 
    rating: 4.8, 
    reviews: 50, 
    priceRange: '₹ 11.56 - 19.41 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/virtus.jpg', '/virtus-side.jpg', '/virtus-rear.jpg', '/virtus-interior.jpg'],
    features: ['10-inch Touchscreen', 'Ventilated Seats', 'Sunroof', 'Wireless Charging'],
    offers: [
      '4-Year Service Package @ ₹20,000',
      '₹ 10,000 Corporate Discount'
    ]
  },
  { 
    name: 'Skoda Slavia', 
    rating: 4.7, 
    reviews: 45, 
    priceRange: '₹ 11.53 - 19.13 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/slavia.jpg', '/slavia-side.jpg', '/slavia-rear.jpg', '/slavia-interior.jpg'],
    features: ['10-inch Infotainment', 'Sunroof', 'Ventilated Front Seats', '6 Airbags'],
    offers: [
      'Complimentary 4-Year Service Package',
      '₹ 15,000 Exchange Bonus'
    ]
  },
  { 
    name: 'Hyundai Verna', 
    rating: 4.6, 
    reviews: 65, 
    priceRange: '₹ 11.00 - 17.42 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/verna.jpg', '/verna-side.jpg', '/verna-rear.jpg', '/verna-interior.jpg'],
    features: ['Dual Integrated Screens', 'ADAS Level 2', 'Ventilated & Heated Seats', 'Bose Sound System'],
    offers: [
      '₹ 10,000 Cash Discount',
      '₹ 15,000 Exchange Bonus'
    ]
  },
  { 
    name: 'Renault Kiger', 
    rating: 4.5, 
    reviews: 17, 
    priceRange: '₹ 5.76 - 10.34 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/kiger.jpg', '/kiger-side.jpg', '/kiger-rear.jpg', '/kiger-interior.jpg'],
    features: ['8-inch Touchscreen', 'Wireless Charging', 'Air Purifier', 'Digital Instrument Cluster'],
    offers: [
      '₹ 10,000 Cash Discount',
      '₹ 5,000 Loyalty Bonus'
    ]
  },
];