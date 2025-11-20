// src/types/index.ts

// Key Specifications (Jaise Engine, Power, Torque)
export type KeySpec = {
  label: string;
  value: string;
};

// Stand Out Features (Image Card wale features)
export type StandOutFeature = {
  name: string;
  imageUrl: string;
};

// --- NEW CAR TYPE UPDATED ---
export type Car = {
    id: number;       // <--- 1. YE ADD KIYA (Kyuki hum data me ID use kar rahe hain)
    slug: string;     // <--- 2. YE ADD KIYA (URL routing ke liye)
    name: string;
    rating: number;
    reviews: number;
    priceRange: string;
    location: string;
    imageUrls: string[];
    features?: string[];
    offers?: string[];
    
    // SPECIFICATION FIELDS
    keySpecifications?: KeySpec[]; 
    utilitySpecs?: KeySpec[];
    standOutFeatures?: StandOutFeature[];
}


// --- USED CAR TYPE (No Change required yet) ---
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
  sellerPhone: string;
  
  keySpecifications: KeySpec[];
  topFeatures: string[];
  standOutFeatures: StandOutFeature[];
};

// --- BLOG TYPES (No Change) ---
export type Post = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  slug: string;
  featured_image_url: string; 
  excerpt: string; 
  category: string;
  date: string;
  author_name: string; 
  tags: string[];
};

// Sidebar Types
export type SidebarLatestPost = { 
  title: string; 
  date: string;
  slug: string; 
};

export type SidebarCategory = { 
  name: string; 
  count: number 
};

export type SidebarAuthor = { 
  name: string; 
  initial: string; 
  posts: number 
};