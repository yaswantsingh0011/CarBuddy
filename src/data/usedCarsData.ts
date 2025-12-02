// src/data/usedCarsData.ts

export interface UsedCar {
  id: number;
  name: string;
  price: string;
  kms: string;
  modelYear: string;
  fuelType: string;
  owner: string;
  location: string;
  images: string[];
  image?: string;
  sellerPhone: string;
  // ✅ New Fields for Compare Page
  specs?: any;
  features?: string[];
}

export const usedCarsData: UsedCar[] = [
  {
    id: 1,
    name: "Ford Endeavour 2.0",
    price: "28.00 Lakh",
    kms: "42,000 KM",
    modelYear: "2020",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Jaipur",
    // ✅ Aapke Local Image Paths
    images: [ 
      "/cars/fordendeavour-1.jpg",
      "/cars/endeavour-2.jpg",
      "/cars/endeavour-3.jpg",
      "/cars/endeavour-4.jpg",
    ],
    image: "/cars/fordendeavour-1.jpg",
    sellerPhone: "9876543210",
    // ✅ Added Specs
    specs: { engine: "2.0L EcoBlue", power: "168 bhp", torque: "420 Nm", transmission: "10-AT", mileage: "12.4 kmpl" },
    features: ["Panoramic Sunroof", "Terrain Management System", "Power Fold 3rd Row"]
  },
  {
    id: 2,
    name: "Tata Safari XZ+",
    price: "19.75 Lakh",
    kms: "19,000 KM",
    modelYear: "2021",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Jaipur",
    images: [ 
      "/cars/safari-1.jpg",
      "/cars/safari-2.jpg",
      "/cars/safari-3.jpg",
      "/cars/safari-4.jpg",
    ],
    image: "/cars/safari-1.jpg",
    sellerPhone: "9876543211",
    // ✅ Added Specs
    specs: { engine: "2.0L Kryotec", power: "168 bhp", torque: "350 Nm", transmission: "6-AT", mileage: "14.0 kmpl" },
    features: ["Ventilated Seats", "JBL 9-Speaker Audio", "Captain Seats"] 
  },
  {
    id: 3,
    name: "Maruti Swift VDi",
    price: "4.50 Lakh",
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
    // ✅ Added Specs
    specs: { engine: "1.3L DDiS", power: "74 bhp", torque: "190 Nm", transmission: "5-MT", mileage: "28.4 kmpl" },
    features: ["ABS with EBD", "Dual Front Airbags", "Integrated Audio System"] 
  },
  {
    id: 4,
    name: "Hyundai Creta SX",
    price: "12.75 Lakh",
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
    // ✅ Added Specs
    specs: { engine: "1.5L MPi", power: "113 bhp", torque: "144 Nm", transmission: "IVT", mileage: "16.8 kmpl" },
    features: ["Smart Panoramic Sunroof", "BlueLink Connectivity", "Wireless Phone Charger"] 
  }
];

// Compatibility Export
export const usedCars = usedCarsData;