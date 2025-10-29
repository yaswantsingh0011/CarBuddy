// src/data/cars.ts

// कार के डेटा का स्ट्रक्चर
export interface Car {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrls: string[];
  features?: string[]; // फीचर्स का ऐरे (optional)
}

// सभी 12 कारों का डेटा फीचर्स के साथ
export const carsData: Car[] = [
  { 
    name: 'Tata Punch', 
    rating: 4.8, 
    reviews: 42, 
    priceRange: '₹ 6.13 - 10.20 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/punch.jpg', '/punch-side.jpg', '/punch-rear.jpg', '/punch-interior.jpg'],
    features: ['7-inch Touchscreen', 'Automatic Climate Control', 'Dual Airbags', 'ABS with EBD', 'Reverse Parking Camera'] 
  },
  { 
    name: 'Toyota Fortuner', 
    rating: 4.7, 
    reviews: 35, 
    priceRange: '₹ 33.43 - 51.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/fortuner.jpg', '/fortuner-side.jpg', '/fortuner-rear.jpg', '/fortuner-interior.jpg'],
    features: ['Ventilated Front Seats', 'JBL 11-speaker Sound System', '7 Airbags', '4x4 Capability', 'Power Tailgate'] 
  },
  { 
    name: 'Hyundai Creta', 
    rating: 4.7, 
    reviews: 88, 
    priceRange: '₹ 11.00 - 20.15 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/creta.jpg', '/creta-side.jpg', '/creta-rear.jpg', '/creta-interior.jpg'],
    features: ['Panoramic Sunroof', '10.25-inch Touchscreen', 'Ventilated Seats', 'Bose Sound System', '6 Airbags']
  },
  { 
    name: 'Mahindra Scorpio-N', 
    rating: 4.9, 
    reviews: 150, 
    priceRange: '₹ 13.60 - 24.54 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/scorpio.jpg', '/scorpio-side.jpg', '/scorpio-rear.jpg', '/scorpio-interior.jpg'],
    features: ['AdrenoX Infotainment', 'Sunroof', '4XPLOR Terrain Mode', '6 Airbags', 'Sony Sound System']
  },
  { 
    name: 'Kia Seltos', 
    rating: 4.6, 
    reviews: 75, 
    priceRange: '₹ 10.90 - 20.35 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/seltos.jpg', '/seltos-side.jpg', '/seltos-rear.jpg', '/seltos-interior.jpg'],
    features: ['Dual 10.25-inch Screens', 'Ventilated Seats', 'ADAS Level 2', 'Bose Audio', 'Smart Air Purifier']
  },
  { 
    name: 'Mahindra XUV700', 
    rating: 4.9, 
    reviews: 200, 
    priceRange: '₹ 13.99 - 26.99 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/xuv700.jpg', '/xuv700-side.jpg', '/xuv700-rear.jpg', '/xuv700-interior.jpg'],
    features: ['Dual HD Superscreen', 'ADAS Features', 'Panoramic Skyroof', 'Sony 3D Sound', '7 Airbags']
  },
  { 
    name: 'Tata Harrier', 
    rating: 4.8, 
    reviews: 110, 
    priceRange: '₹ 15.49 - 26.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/harrier.jpg', '/harrier-side.jpg', '/harrier-rear.jpg', '/harrier-interior.jpg'],
    features: ['12.3-inch Touchscreen', 'ADAS', 'Panoramic Sunroof', 'JBL Sound System', 'Ventilated Seats']
  },
  { 
    name: 'Jeep Wrangler', 
    rating: 4.7, 
    reviews: 35, 
    priceRange: '₹ 45.69 - 65.41 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/wrangler.jpg', '/wrangler-side.jpg', '/wrangler-rear.jpg', '/wrangler-interior.jpg'],
    features: ['Legendary 4x4 Capability','Removable Doors & Roof','Uconnect Infotainment with Off-road Pages','Washable Interiors','High Ground Clearance']
  },
  { 
    name: 'Volkswagen Virtus', 
    rating: 4.8, 
    reviews: 50, 
    priceRange: '₹ 11.56 - 19.41 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/virtus.jpg', '/virtus-side.jpg', '/virtus-rear.jpg', '/virtus-interior.jpg'],
    features: ['10-inch Touchscreen', 'Ventilated Seats', 'Sunroof', 'Wireless Charging', '6 Airbags']
  },
  { 
    name: 'Skoda Slavia', 
    rating: 4.7, 
    reviews: 45, 
    priceRange: '₹ 11.53 - 19.13 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/slavia.jpg', '/slavia-side.jpg', '/slavia-rear.jpg', '/slavia-interior.jpg'],
    features: ['10-inch Infotainment', 'Sunroof', 'Ventilated Front Seats', '6 Airbags', 'Wireless Apple CarPlay/Android Auto']
  },
  { 
    name: 'Hyundai Verna', 
    rating: 4.6, 
    reviews: 65, 
    priceRange: '₹ 11.00 - 17.42 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/verna.jpg', '/verna-side.jpg', '/verna-rear.jpg', '/verna-interior.jpg'],
    features: ['Dual Integrated Screens', 'ADAS Level 2', 'Ventilated & Heated Seats', 'Bose Sound System', 'Sunroof']
  },
  { 
    name: 'Renault Kiger', 
    rating: 4.5, 
    reviews: 17, 
    priceRange: '₹ 5.76 - 10.34 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/kiger.jpg', '/kiger-side.jpg', '/kiger-rear.jpg', '/kiger-interior.jpg'],
    features: ['8-inch Touchscreen', 'Wireless Charging', 'Air Purifier', 'Digital Instrument Cluster', '4 Airbags']
  },
];