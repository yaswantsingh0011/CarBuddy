// data/usedCarsData.ts
import { UsedCar } from '../types';

export const usedCars: UsedCar[] = [
  {
    id: 1,
    name: "Ford Endeavour 2.0",
    price: "28.00 Lakh",
    kms: "42,000 KM",
    modelYear: "2020",
    fuelType: "Diesel",
    owner: "1st Owner",
    location: "Jaipur",
    imageUrls: [ 
      "/cars/endeavour-1.jpg",
      "/cars/endeavour-2.jpg",
      "/cars/endeavour-3.jpg",
      "/cars/endeavour-4.jpg",
    ],
    sellerPhone: "9876543210" // <-- YEH ADD KAREIN
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
    imageUrls: [ 
      "/cars/safari-1.jpg",
      "/cars/safari-2.jpg",
      "/cars/safari-3.jpg",
      "/cars/safari-4.jpg",
    ],
    sellerPhone: "9876543211" // <-- YEH ADD KAREIN
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
    imageUrls: [ 
      "/cars/swift-1.jpg",
      "/cars/swift-2.jpg",
      "/cars/swift-3.jpg",
      "/cars/swift-4.jpg",
    ],
    sellerPhone: "9876543212" // <-- YEH ADD KAREIN
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
    imageUrls: [ 
      "/cars/creta-1.jpg",
      "/cars/creta-2.jpg",
      "/cars/creta-3.jpg",
      "/cars/creta-4.jpg",
    ],
    sellerPhone: "9876543213" // <-- YEH ADD KAREIN
  }
];