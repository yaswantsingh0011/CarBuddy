// ✅ SERVER COMPONENT — No "use client"
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import HomeClient from "./HomeClient";

async function getData() {
  const supabase = createServerSupabaseClient();

  const [electric, used, mostSearched, upcoming, blogs, news] = await Promise.all([
    supabase.from("electric_cars").select("*").order("created_at", { ascending: false }),
    supabase.from("used_cars").select("*").order("created_at", { ascending: false }),
    supabase.from("most_searched_cars").select("*").order("created_at", { ascending: false }),
    supabase.from("upcoming_cars").select("*").order("created_at", { ascending: false }),
    supabase.from("blogs").select("*").order("published_date", { ascending: false }),
    supabase.from("news").select("*").order("published_date", { ascending: false }),
  ]);

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

  return {
    electricCars: (electric.data || []).map((row: any) => ({
      id: row.id, name: row.name, slug: row.slug,
      priceRange: safeText(row.price_range, "Price on Request"),
      imageUrl: pickFirstImage(row),
      images: row.image_urls || row.images || [],
      fuelType: safeText(row.fuel_type, "Electric"),
      specs: row.specs || {}, features: row.features || [],
    })),
    usedCars: (used.data || []).map((row: any) => ({
      id: row.id, name: row.name, slug: row.slug,
      priceRange: safeText(row.price, "Price on Request"),
      brand: row.brand || "", kms: row.kms || "",
      model_year: row.model_year || "", fuel_type: row.fuel_type || "",
      owner: row.owner || "", location: row.location || "",
      imageUrl: pickFirstImage(row), images: row.images || [],
    })),
    mostSearchedCars: (mostSearched.data || []).map((row: any) => ({
      id: row.id, name: row.name, brand: row.brand, slug: row.slug || "",
      priceRange: safeText(row.price, safeText(row.price_range, "Price on Request")),
      category: row.category || "", fuelType: row.fuel_type || "",
      imageUrl: pickFirstImage(row), images: row.images || [],
      specs: row.specs || {}, features: row.features || [],
    })),
    upcomingCars: (upcoming.data || []).map((row: any) => ({
      id: row.id, name: row.name, slug: row.slug,
      priceRange: safeText(row.price_range, "Price on Request"),
      launchDate: safeText(row.location, "Expected Soon"),
      imageUrl: pickFirstImage(row),
    })),
    blogs: blogs.data || [],
    news: news.data || [],
  };
}

export const metadata = {
  title: "CarBuddy — Find Your Next Car | New, Used & Electric Cars",
  description: "India's trusted car marketplace. Compare new cars, buy used cars, explore electric vehicles. Best deals on CarBuddy.",
};

export default async function HomePage() {
  const data = await getData();
  return <HomeClient {...data} />;
}