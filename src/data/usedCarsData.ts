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
  }
  
];

export const usedCars = usedCarsData;