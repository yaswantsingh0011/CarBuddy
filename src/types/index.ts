// src/types/index.ts

// --- NAYE TYPES YAHAN SHURU HOTE HAIN ---

// Key Specifications (जैसे Engine, Power, Torque)
export type KeySpec = {
  label: string; // e.g., "Engine", "Ground Clearance", "Safety Rating"
  value: string; // e.g., "1199 cc", "187 mm", "5 Star"
};

// Stand Out Features (Image Card वाले फीचर्स)
export type StandOutFeature = {
  name: string;      // e.g., "Sunroof", "Automatic climate control"
  imageUrl: string;  // e.g., "/cars/punch-ac.jpg"
};

// --- USED CAR TYPE MEIN NAYE FIELDS ADD KIYE ---
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
  
  // NAYE SPECIFICATION FIELDS
  keySpecifications: KeySpec[];
  topFeatures: string[];          // e.g., ["Rear AC Vents", "Cruise Control"]
  standOutFeatures: StandOutFeature[];
};

// --- BLOG TYPES UPDATED (No Change) ---
export type Post = {
  id: number;
  created_at: string;
  title: string;
  content: string; // Full content
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