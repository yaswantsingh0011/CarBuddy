import { supabase } from './supabaseClient';
// Maan lete hain tumne data yahan export kiya hai
import { mostSearchedCars } from '../data/mostSearchedCars'; 

export const seedDatabase = async () => {
  console.log("Seeding started for " + mostSearchedCars.length + " cars...");

  // Data ko Supabase ke table format mein convert karna
  const formattedData = mostSearchedCars.map(car => ({
    name: car.name,
    brand: car.name.split(' ')[0], // Name se pehla word brand nikaal lega
    price: car.price,
    category: car.category,
    section: 'most-searched', // Ye hum filter ke liye use karenge
    fuel_type: car.fuelType,
    images: car.images,
    specs: car.specs, // JSONB field
    features: car.features, // Array field
    pros: car.pros, // Array field
    cons: car.cons, // Array field
    expert_review: car.expertReview, // JSONB field
    variants: car.variants // JSONB field
  }));

  // Purana data delete karna (Optional: agar tum chahte ho duplicates na ho)
  // await supabase.from('cars').delete().eq('section', 'most-searched');

  const { data, error } = await supabase
    .from('cars')
    .insert(formattedData);

  if (error) {
    console.error("Error Seeding:", error.message);
    return { success: false, error: error.message };
  }
  
  console.log("Pura data successfully chala gaya!");
  return { success: true };
};