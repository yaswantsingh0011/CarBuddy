import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = slug.toLowerCase().trim();

  if (!decodedSlug) return notFound();

  // ✅ Server client use karo
  const supabase = createServerSupabaseClient();
  const { data: cars, error } = await supabase
    .from('most_searched_cars')
    .select('*')
    .ilike('category', decodedSlug);

  if (error || !cars || cars.length === 0) return notFound();

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:text-left border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            {decodedSlug} Cars
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Showing {cars.length} vehicles in this category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/car-details/${car.slug}`}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all group block"
            >
              {/* ✅ FIXED: Next.js Image */}
              <div className="relative h-48 w-full bg-gray-50 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={car.image_url || car.images?.[0] || "/cars/placeholder.jpg"}
                  alt={car.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h2>
              <p className="text-blue-600 font-black text-lg mb-4">{car.price_range || car.priceRange}</p>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-xs font-bold text-gray-400 uppercase">{car.fuelType || "Petrol"}</span>
                <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600">VIEW DETAILS →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}