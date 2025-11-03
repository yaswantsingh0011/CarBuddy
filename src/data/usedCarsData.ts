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
      "/endeavour-1.jpg",
      "/endeavour-2.jpg",
      "/endeavour-3.jpg",
      "/endeavour-4.jpg",
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
      "/safari-1.jpg",
      "/safari-2.jpg",
      "/safari-3.jpg",
      "/safari-4.jpg",
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
      "/swift-1.jpg",
      "/swift-2.jpg",
      "/swift-3.jpg",
      "/swift-4.jpg",
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
      "/creta-1.jpg",
      "/creta-2.jpg",
      "/creta-3.jpg",
      "/creta-4.jpg",
    ],
    sellerPhone: "9876543213" // <-- YEH ADD KAREIN
  }
];