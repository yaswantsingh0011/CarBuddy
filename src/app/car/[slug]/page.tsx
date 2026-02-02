import { notFound } from "next/navigation";
// ✅ FIXED: Sahi file import ki hai
import { supabase } from "@/lib/supabaseClient";

// 1. PageProps definition
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 2. Component ko async rakhein taaki database fetch ho sake
export default async function Page(props: PageProps) {
  // ❌ Removed: const supabase = await createClient();
  
  // Next.js 15+ mein params ko await karna zaruri hai
  const { slug } = await props.params;
  const decodedSlug = slug.toLowerCase().trim();

  if (!decodedSlug) {
    return notFound();
  }

  // ✅ Data fetching logic from Supabase
  // Hum 'most_searched_cars' table se filter kar rahe hain jahan category slug se match ho
  const { data: cars, error } = await supabase
    .from('most_searched_cars')
    .select('*')
    .ilike('category', decodedSlug); // Case-insensitive matching

  // Error handling ya data na milne par 404
  if (error || !cars || cars.length === 0) {
    console.error("Fetch error or no cars found:", error);
    return notFound();
  }

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            {decodedSlug} Cars
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Showing {cars.length} vehicles in this category.
          </p>
        </div>

        {/* Cars List Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
            >
              {/* Image Preview */}
              <div className="h-48 w-full bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
                <img 
                  src={car.image_url || car.images?.[0] || "/cars/placeholder.jpg"} 
                  alt={car.name} 
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Car Info */}
              <h2 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h2>
              <p className="text-blue-600 font-black text-lg mb-4">{car.price_range || car.priceRange}</p>
              
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-xs font-bold text-gray-400 uppercase">{car.fuelType || "Petrol"}</span>
                <button className="text-sm font-bold text-gray-900 hover:text-blue-600">VIEW DETAILS →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}