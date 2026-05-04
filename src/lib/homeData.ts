// ✅ Yeh file ab sirf server-side use hogi
// Server components aur API routes ke liye
import { createServerSupabaseClient } from "@/lib/supabaseServer";

const pickFirstImage = (row: any): string => {
  const arr = row?.image_urls || row?.images || row?.imageUrls || row?.image_url || row?.imageUrl || [];
  if (typeof arr === "string") return arr.trim() ? arr : "/cars/placeholder.jpg";
  if (Array.isArray(arr) && arr.length > 0) {
    const first = String(arr[0] ?? "").trim();
    return first ? first : "/cars/placeholder.jpg";
  }
  return "/cars/placeholder.jpg";
};

const safeText = (v: any, fallback = "") =>
  typeof v === "string" && v.trim() ? v : fallback;

export async function getElectricCars() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("electric_cars")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id, name: row.name, slug: row.slug,
      priceRange: safeText(row.price_range, "Price on Request"),
      imageUrl: pickFirstImage(row),
      images: row.image_urls || row.images || [],
      fuelType: safeText(row.fuel_type, "Electric"),
      specs: row.specs || {}, features: row.features || [],
    }));
  } catch (err) {
    console.error("getElectricCars Error:", err);
    return [];
  }
}

export async function getUpcomingCars() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("upcoming_cars")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id, name: row.name, slug: row.slug,
      priceRange: safeText(row.price_range, "Price on Request"),
      launchDate: safeText(row.location, "Expected Soon"),
      imageUrl: pickFirstImage(row),
    }));
  } catch (err) {
    console.error("getUpcomingCars Error:", err);
    return [];
  }
}

export async function getMostSearchedCars() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("most_searched_cars")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id, name: row.name, brand: row.brand, slug: row.slug || "",
      priceRange: safeText(row.price, safeText(row.price_range, "Price on Request")),
      category: row.category || "", fuelType: row.fuel_type || "",
      imageUrl: pickFirstImage(row), images: row.images || [],
      specs: row.specs || {}, features: row.features || [],
    }));
  } catch (err) {
    console.error("getMostSearchedCars Error:", err);
    return [];
  }
}

export async function getUsedCars() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("used_cars")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id, name: row.name, slug: row.slug,
      priceRange: safeText(row.price, "Price on Request"),
      brand: row.brand || "", kms: row.kms || "",
      model_year: row.model_year || "", fuel_type: row.fuel_type || "",
      owner: row.owner || "", location: row.location || "",
      imageUrl: pickFirstImage(row), images: row.images || [],
    }));
  } catch (err) {
    console.error("getUsedCars Error:", err);
    return [];
  }
}

export async function getBlogs() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_date", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("getBlogs Error:", err);
    return [];
  }
}

export async function getNews() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("published_date", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("getNews Error:", err);
    return [];
  }
}