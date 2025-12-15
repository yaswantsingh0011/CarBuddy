import { notFound } from "next/navigation";
import { mostSearchedCars } from "@/data/mostSearchedCars";

// 1. PageProps ko define karein
type PageProps = {
  // Dynamic route mein 'params' hamesha aayega agar route match hota hai
  params: {
    slug: string;
  };
  // Optional: agar aap search params bhi use karte hain
  searchParams?: { [key: string]: string | string[] | undefined };
};

// 2. Component ko 'async' banaein (Fix for the Promise Error)
export default async function Page(props: PageProps) {
  
  // Ab 'props.params' ko Next.js automatically resolve kar dega.
  // Hum '?' optional chaining hata rahe hain, kyunki dynamic route mein slug hamesha expected hota hai.
  const slug = props.params.slug.toLowerCase();

  // Agar kisi vajah se slug empty hai (rare scenario, but good practice)
  if (!slug) {
    return notFound();
  }

  // Data filtering logic
  const cars = mostSearchedCars.filter(
    car => car.category?.toLowerCase().trim() === slug
  );

  if (cars.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        {slug.toUpperCase()} Cars
      </h1>

      <ul className="space-y-2">
        {cars.map(car => (
          <li key={car.id}>{car.name}</li>
        ))}
      </ul>
    </div>
  );
}

