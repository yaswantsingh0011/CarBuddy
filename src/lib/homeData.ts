import { supabase } from "@/lib/supabaseClient";

/* ---------------- HELPERS ---------------- */

const pickFirstImage = (row: any): string => {
  const arr =
    row?.image_urls ||
    row?.images ||
    row?.imageUrls ||
    row?.image_url ||
    row?.imageUrl ||
    [];

  // if it's string
  if (typeof arr === "string") {
    return arr.trim() ? arr : "/cars/placeholder.jpg";
  }

  // if array
  if (Array.isArray(arr) && arr.length > 0) {
    const first = String(arr[0] ?? "").trim();
    return first ? first : "/cars/placeholder.jpg";
  }

  return "/cars/placeholder.jpg";
};

const safeText = (v: any, fallback = "") =>
  typeof v === "string" && v.trim() ? v : fallback;

/* ---------------- ELECTRIC CARS ---------------- */
export async function getElectricCars() {
  const { data, error } = await supabase
    .from("electric_cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getElectricCars:", error.message);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    priceRange: safeText(row.price_range, "Price on Request"),
    imageUrl: pickFirstImage(row),
    images: row.image_urls || row.images || [],
    fuelType: safeText(row.fuel_type, "Electric"),
    specs: row.specs || {},
    features: row.features || [],
    pros: row.pros || [],
    cons: row.cons || [],
    expert_review: row.expert_review || null,
    variants: row.variants || [],
  }));
}

/* ---------------- UPCOMING CARS ---------------- */
export async function getUpcomingCars() {
  const { data, error } = await supabase
    .from("upcoming_cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUpcomingCars:", error.message);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    priceRange: safeText(row.price_range, "Price on Request"),
    launchDate: safeText(row.location, "Expected Soon"),
    imageUrl: pickFirstImage(row),
    images: row.image_urls || row.images || [],
    fuelType: safeText(row.fuel_type, "Upcoming"),
    category: row.category || "",
  }));
}

/* ---------------- MOST SEARCHED CARS ---------------- */
export async function getMostSearchedCars() {
  const { data, error } = await supabase
    .from("most_searched_cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getMostSearchedCars:", error.message);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    brand: row.brand,
    priceRange: safeText(row.price, safeText(row.price_range, "Price on Request")),
    category: row.category || "",
    section: row.section || "most-searched",
    fuelType: row.fuel_type || "",
    imageUrl: pickFirstImage(row),
    images: row.images || [],
    specs: row.specs || {},
    features: row.features || [],
    pros: row.pros || [],
    cons: row.cons || [],
    expert_review: row.expert_review || null,
    variants: row.variants || [],
    slug: row.slug || "",
  }));
}

/* ---------------- USED CARS ---------------- */
export async function getUsedCars() {
  const { data, error } = await supabase
    .from("used_cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUsedCars:", error.message);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    priceRange: safeText(row.price, "Price on Request"),
    brand: row.brand || "",
    kms: row.kms || "",
    model_year: row.model_year || "",
    fuel_type: row.fuel_type || "",
    owner: row.owner || "",
    location: row.location || "",
    seller_phone: row.seller_phone || "",
    registration_year: row.registration_year || "",
    insurance: row.insurance || "",
    seats: row.seats || "",
    rto: row.rto || "",
    engine_displacement: row.engine_displacement || "",
    transmission_type: row.transmission_type || "",
    imageUrl: pickFirstImage(row),
    images: row.images || [],
    specs: row.specs || {},
    features: row.features || [],
    created_at: row.created_at,
  }));
}

/* ---------------- BLOGS ---------------- */
export async function getBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) {
    console.error("getBlogs:", error.message);
    return [];
  }

  return data || [];
}

/* ---------------- NEWS ---------------- */
export async function getNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_date", { ascending: false });

  if (error) {
    console.error("getNews:", error.message);
    return [];
  }

  return data || [];
}
