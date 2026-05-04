// ✅ SERVER COMPONENT — No "use client" — SEO perfect
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import CarDetailsClient from "./CarDetailsClient";

const TABLES = ["most_searched_cars", "used_cars", "upcoming_cars", "electric_cars"] as const;

// ✅ SEO ke liye — Google isko padhega
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/-+$/, '');

  for (const table of TABLES) {
    const { data } = await supabase.from(table).select("name, price_range, price").eq("slug", decodedSlug).limit(1);
    if (data && data.length > 0) {
      const car = data[0];
      return {
        title: `${car.name} Price, Review & Specs | CarBuddy`,
        description: `${car.name} price starts at ₹${car.price_range || car.price}. Check full specs, features, variants and expert review on CarBuddy.`,
      };
    }
  }
  return { title: "Car Details | CarBuddy" };
}

export default async function CarDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/-+$/, '');

  let car = null;
  let carTable = "";

  for (const table of TABLES) {
    const { data } = await supabase.from(table).select("*").eq("slug", decodedSlug).limit(1);
    if (data && data.length > 0) {
      car = { ...data[0], __table: table };
      carTable = table;
      break;
    }
  }

  if (!car) notFound();

  return <CarDetailsClient car={car} />;
}