// src/data/usedCarsData.ts

export interface UsedCar {
  id: number;
  name: string;
  price: string;
  kms: string;
  modelYear: string; // Year of Manufacture
  fuelType: string;
  owner: string;
  location: string;
  images: string[];
  image?: string;
  sellerPhone: string;
  specs?: any;
  features?: string[];
  slug?: string;

  // ✅ NEW FIELDS FOR DETAILED OVERVIEW
  registrationYear?: string;
  insurance?: string;
  seats?: string;
  rto?: string;
  engineDisplacement?: string;
  transmissionType?: string;
}

export const usedCarsData: UsedCar[] = [
  
  {
    id: 1,
    name: "Range Rover Evoque 2.0",
    slug: "range-rover-evoque-diesel-2018",
    price: "₹ 38.50 Lakh",
    kms: "78,000 KM",
    modelYear: "2018",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Jaipur",
    images: [
     "/cars/rangerover-1.jpg",
      "/cars/rangerover-2.jpg",
      "/cars/rangerover-3.jpg",
      "/cars/rangerover-4.jpg",
    ],
    image: "/cars/rangerover-1.jpg",
    sellerPhone: "9876543215",
    specs: { engine: "2.0L TD4 Diesel", power: "177 bhp", torque: "430 Nm", transmission: "9-AT", mileage: "15.6 kmpl" },
    features: ["Fixed Panoramic Roof", "Meridian Sound System", "Terrain Response System"],
    
    // ✅ Overview Data
    registrationYear: "Dec 2018",
    insurance: "Comprehensive",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1999 cc",
    transmissionType: "Automatic"
  },
  
  
   {
    id: 2,
    name: "BMW X1 sDrive20i xLine",
    slug: "bmw-x1-sdrive20i-petrol-2021",
    price: "₹ 32.50 Lakh",
    kms: "51,000 KM",
    modelYear: "2021",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: [
       "/cars/bmw-x1-1.jpg",
      "/cars/bmw-x1-2.jpg",
      "/cars/bmw-x1-3.jpg",
      "/cars/bmw-x1-4.jpg",
    ],
    image: "/cars/bmw-x1-1.jpg",
    sellerPhone: "9876543214",
    specs: { engine: "2.0L TwinPower", power: "189 bhp", torque: "280 Nm", transmission: "7-DCT", mileage: "14.8 kmpl" },
    features: ["Panoramic Sunroof", "8.8-inch Touchscreen", "Ambient Lighting", "Memory Seats"],
    
    // ✅ Overview Data
    registrationYear: "Jan 2021",
    insurance: "Zero Dep (Bumper to Bumper)",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1998 cc",
    transmissionType: "Automatic"
  },

  {
    id: 3,
    name: "MG Astor Sharp EX",
    slug: "mg-astor-sharp-ex-petrol-2022",
    price: "₹ 12.50 Lakh",
    kms: "24,790 KM",
    modelYear: "2022",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: [
       "/cars/astor-1.jpg",
      "/cars/astor-2.jpg",
      "/cars/astor-3.jpg",
      "/cars/astor-4.jpg",
    ],
    image: "/cars/astor-1.jpg",
    sellerPhone: "9876543216",
    specs: { engine: "1.5L VTi-TECH", power: "108 bhp", torque: "144 Nm", transmission: "CVT", mileage: "14.8 kmpl" },
    features: ["AI Personal Assistant", "Panoramic Sunroof", "Level 2 ADAS"],
    
    // ✅ Overview Data
    registrationYear: "July 2022",
    insurance: "Zero Dep (Valid till 2025)",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1498 cc",
    transmissionType: "Automatic"
  },

  {
    id: 4,
    name: "Tata Safari XZ+",
    slug: "tata-safari-xz-plus-diesel-2021",
    price: "₹ 19.75 Lakh",
    kms: "19,000 KM",
    modelYear: "2021",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Nagpur",
    images: [ 
     "/cars/safari-1.jpg",
      "/cars/safari-2.jpg",
      "/cars/safari-3.jpg",
      "/cars/safari-4.jpg",
    ],
    image: "/cars/safari-1.jpg",
    sellerPhone: "9876543211",
    specs: { engine: "2.0L Kryotec", power: "168 bhp", torque: "350 Nm", transmission: "6-AT", mileage: "14.0 kmpl" },
    features: ["Ventilated Seats", "JBL 9-Speaker Audio", "Captain Seats"],
    
    // ✅ Overview Data
    registrationYear: "Mar 2021",
    insurance: "Zero Dep (Valid till 2025)",
    seats: "6 Seats",
    rto: "MH40 (Nagpur)",
    engineDisplacement: "1956 cc",
    transmissionType: "Automatic"
  },

  {
    id: 5,
    name: "Ford Endeavour 2.0",
    slug: "ford-endeavour-2-0-diesel-2020",
    price: "₹ 28.00 Lakh",
    kms: "42,000 KM",
    modelYear: "2020",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Kolhapur",
    images: [ 
       "/cars/fordendeavour-1.jpg",
      "/cars/endeavour-2.jpg",
      "/cars/endeavour-3.jpg",
      "/cars/endeavour-4.jpg",
    ],
    image: "/cars/fordendeavour-1.jpg",
    sellerPhone: "9876543210",
    specs: { engine: "2.0L EcoBlue", power: "168 bhp", torque: "420 Nm", transmission: "10-AT", mileage: "12.4 kmpl" },
    features: ["Panoramic Sunroof", "Terrain Management System", "Power Fold 3rd Row"],
    
    // ✅ Overview Data
    registrationYear: "Feb 2020",
    insurance: "Comprehensive (Valid till 2026)",
    seats: "7 Seats",
    rto: "MH09 (Kolhapur)",
    engineDisplacement: "1996 cc",
    transmissionType: "Automatic"
  },

  {
    id: 6,
    name: "Maruti Swift VDi",
    slug: "maruti-swift-vdi-diesel-2018",
    price: "₹ 4.50 Lakh",
    kms: "45,000 KM",
    modelYear: "2018",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Jaipur",
    images: [ 
      "/cars/swift-1.jpg",
      "/cars/swift-2.jpg",
      "/cars/swift-3.jpg",
      "/cars/swift-4.jpg",
    ],
    image: "/cars/swift-1.jpg",
    sellerPhone: "9876543212",
    specs: { engine: "1.3L DDiS", power: "74 bhp", torque: "190 Nm", transmission: "5-MT", mileage: "28.4 kmpl" },
    features: ["ABS with EBD", "Dual Front Airbags", "Integrated Audio System"],
    
    // ✅ Overview Data
    registrationYear: "June 2018",
    insurance: "Third Party",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1248 cc",
    transmissionType: "Manual"
  },
  {
    id: 7,
    name: "Hyundai Creta SX",
    slug: "hyundai-creta-sx-petrol-2020",
    price: "₹ 12.75 Lakh",
    kms: "22,000 KM",
    modelYear: "2020",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: [ 
      "/cars/hyundaicreta-1.jpg",
      "/cars/creta-2.jpg",
      "/cars/creta-3.jpg",
      "/cars/creta-4.jpg",
    ],
    image: "/cars/hyundaicreta-1.jpg",
    sellerPhone: "9876543213",
    specs: { engine: "1.5L MPi", power: "113 bhp", torque: "144 Nm", transmission: "IVT", mileage: "16.8 kmpl" },
    features: ["Smart Panoramic Sunroof", "BlueLink Connectivity", "Wireless Phone Charger"],
    
    // ✅ Overview Data
    registrationYear: "Oct 2020",
    insurance: "Comprehensive",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1497 cc",
    transmissionType: "Automatic"
  },

  // ==========================================
  // ✅ NEW CARS UNDER 5 LAKH (ADDED BELOW)
  // ==========================================

  {
    id: 8,
    name: "Renault Kwid RXT",
    slug: "renault-kwid-rxt-petrol-2019",
    price: "₹ 3.85 Lakh",
    kms: "28,000 KM",
    modelYear: "2019",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: [ 
      "/cars/Kwid-1.jpg",
      "/cars/Kwid-2.jpg",
      "/cars/Kwid-3.jpg",
      "/cars/Kwid-4.jpg",
    ],
    image: "/cars/kwid-1.jpg",
    sellerPhone: "9876543220",
    specs: { engine: "0.8L SCe", power: "53 bhp", torque: "72 Nm", transmission: "5-MT", mileage: "22.3 kmpl" },
    features: ["Touchscreen Infotainment", "Digital Instrument Cluster", "Reverse Camera"],
    
    // Overview Data
    registrationYear: "Aug 2019",
    insurance: "Comprehensive",
    seats: "5 Seats",
    rto: "MH12 (Pune)",
    engineDisplacement: "799 cc",
    transmissionType: "Manual"
  },

  {
    id: 9,
    name: "Maruti Alto 800 LXi",
    slug: "maruti-alto-800-lxi-petrol-2020",
    price: "₹ 3.10 Lakh",
    kms: "15,500 KM",
    modelYear: "2020",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: [ 
     "/cars/Alto800-1.jpg",
      "/cars/Alto800-2.jpg",
      "/cars/Alto800-3.jpg",
      "/cars/Alto800-4.jpg",
    ],
    image: "/cars/alto-1.jpg",
    sellerPhone: "9876543221",
    specs: { engine: "0.8L F8D", power: "47 bhp", torque: "69 Nm", transmission: "5-MT", mileage: "22.05 kmpl" },
    features: ["Front Power Windows", "Power Steering", "Dual Tone Interiors"],
    
    // Overview Data
    registrationYear: "Jan 2020",
    insurance: "Third Party",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "796 cc",
    transmissionType: "Manual"
  },

  {
    id: 10,
    name: "Hyundai Grand i10 Magna",
    slug: "hyundai-grand-i10-magna-petrol-2017",
    price: "₹ 4.75 Lakh",
    kms: "42,000 KM",
    modelYear: "2017",
    fuelType: "Petrol",
    owner: "2nd Owner",
    location: "Jaipur",
    images: [ 
     "/cars/i10-1.jpg",
      "/cars/i10-2.jpg",
      "/cars/i10-3.jpg",
      "/cars/i10-4.jpg",
    ],
    image: "/cars/grandi10-1.jpg",
    sellerPhone: "9876543222",
    specs: { engine: "1.2L Kappa", power: "81 bhp", torque: "114 Nm", transmission: "5-MT", mileage: "18.9 kmpl" },
    features: ["Rear AC Vents", "Steering Mounted Controls", "Fog Lamps"],
    
    // Overview Data
    registrationYear: "May 2017",
    insurance: "Comprehensive",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1197 cc",
    transmissionType: "Manual"
  },

  {
    id: 11,
    name: "Tata Tiago XT",
    slug: "tata-tiago-xt-petrol-2018",
    price: "₹ 4.90 Lakh",
    kms: "35,000 KM",
    modelYear: "2018",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: [ 
     "/cars/tiago-1.jpg",
      "/cars/tiago-2.jpg",
      "/cars/tiago-3.jpg",
      "/cars/tiago-4.jpg",
    ],
    image: "/cars/tiago-1.jpg",
    sellerPhone: "9876543223",
    specs: { engine: "1.2L Revotron", power: "84 bhp", torque: "113 Nm", transmission: "5-MT", mileage: "23.84 kmpl" },
    features: ["Harman Sound System", "ConnectNext App", "Multi-Drive Modes"],
    
    // Overview Data
    registrationYear: "Nov 2018",
    insurance: "Third Party",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1199 cc",
    transmissionType: "Manual"
  },

  {
    id: 12,
    name: "Maruti Baleno Zeta",
    slug: "maruti-baleno-zeta-petrol-2021",
    price: "₹ 7.25 Lakh",
    kms: "32,000 KM",
    modelYear: "2021",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: ["/cars/baleno-1.jpg", "/cars/baleno-2.jpg", "/cars/baleno-3.jpg", "/cars/baleno-4.jpg"],
    image: "/cars/baleno-1.jpg",
    sellerPhone: "9876543224",
    specs: { engine: "1.2L DualJet", power: "88 bhp", torque: "113 Nm", transmission: "5-MT", mileage: "22.35 kmpl" },
    features: ["Push Button Start", "SmartPlay Studio", "LED Projector Headlamps"],
    registrationYear: "Mar 2021",
    insurance: "Zero Dep",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1197 cc",
    transmissionType: "Manual"
  },

  {
    id: 13,
    name: "Honda Amaze VX CVT",
    slug: "honda-amaze-vx-cvt-petrol-2020",
    price: "₹ 8.50 Lakh",
    kms: "28,500 KM",
    modelYear: "2020",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: ["/cars/amaze-1.jpg", "/cars/amaze-2.jpg", "/cars/amaze-3.jpg", "/cars/amaze-4.jpg"],
    image: "/cars/amaze-1.jpg",
    sellerPhone: "9876543225",
    specs: { engine: "1.2L i-VTEC", power: "89 bhp", torque: "110 Nm", transmission: "CVT", mileage: "18.3 kmpl" },
    features: ["Paddle Shifters", "Cruise Control", "Automatic Climate Control"],
    registrationYear: "Sept 2020",
    insurance: "Comprehensive",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1199 cc",
    transmissionType: "Automatic"
  },

  {
    id: 14,
    name: "Maruti Vitara Brezza ZDi",
    slug: "maruti-brezza-zdi-diesel-2019",
    price: "₹ 8.90 Lakh",
    kms: "48,000 KM",
    modelYear: "2019",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Jaipur",
    images: ["/cars/brezza-1.jpg", "/cars/brezza-2.jpg", "/cars/brezza-3.jpg", "/cars/brezza-4.jpg"],
    image: "/cars/brezza-1.jpg",
    sellerPhone: "9876543226",
    specs: { engine: "1.3L DDiS 200", power: "89 bhp", torque: "200 Nm", transmission: "5-MT", mileage: "24.3 kmpl" },
    features: ["SmartPlay Infotainment", "Cruise Control", "Mood Lights"],
    registrationYear: "June 2019",
    insurance: "Third Party",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1248 cc",
    transmissionType: "Manual"
  },

  {
    id: 15,
    name: "Hyundai Elite i20 Asta (O)",
    slug: "hyundai-i20-asta-o-petrol-2020",
    price: "₹ 9.15 Lakh",
    kms: "21,000 KM",
    modelYear: "2020",
    fuelType: "Petrol",
    owner: "1st Owner",
    location: "Jaipur",
    images: ["/cars/i20-1.jpg", "/cars/i20-2.jpg", "/cars/i20-3.jpg", "/cars/i20-4.jpg"],
    image: "/cars/i20-1.jpg",
    sellerPhone: "9876543227",
    specs: { engine: "1.2L Kappa", power: "82 bhp", torque: "115 Nm", transmission: "5-MT", mileage: "20.35 kmpl" },
    features: ["Bose Premium Sound", "Electric Sunroof", "6 Airbags"],
    registrationYear: "Dec 2020",
    insurance: "Comprehensive",
    seats: "5 Seats",
    rto: "RJ14 (Jaipur)",
    engineDisplacement: "1197 cc",
    transmissionType: "Manual"
  }
  
];

export const usedCars = usedCarsData;