// src/types/index.ts

export type UsedCar = {
  id: number;
  name: string;
  price: string;
  kms: string;
  modelYear: string;
  fuelType: "Petrol" | "Diesel" | "CNG" | "Electric";
  owner: string;
  location: string;
  imageUrls: string[];
  sellerPhone: string; // <-- YEH NAYI LINE ADD KAREIN
};