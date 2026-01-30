"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Link इम्पोर्ट करें
import ElectricCarCard from "./ElectricCarCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CATEGORIES = ["SUV", "MUV", "Luxury", "Sedan", "Hatchback"];

export default function MostSearchedSection({ cars }: { cars: any[] }) {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("SUV");

  const slideLeft = () =>
    sliderRef.current?.scrollBy({ left: -320, behavior: "smooth" });

  const slideRight = () =>
    sliderRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  const handleCardClick = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.category &&
      car.category.toLowerCase() === activeCategory.toLowerCase()
  );

  // 🔥 यहाँ हमने सिर्फ पहली 6 कार्स को निकाला है
  const displayedCars = filteredCars.slice(0, 6);

  if (!cars || cars.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pt-10 relative">
      {/* HEADING AND VIEW ALL BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          The Most Searched Cars
        </h2>
        
        {/* 🔥 View All Button: ये बटन यूज़र को सारे कार्स वाले पेज पर ले जाएगा */}
        <Link 
          href={`/all-cars?category=${activeCategory}`} 
          className="text-blue-600 hover:underline text-sm font-semibold flex items-center gap-1"
        >
          View All {activeCategory} Cars <FaChevronRight size={10} />
        </Link>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex gap-6 text-sm font-medium border-b border-gray-200 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-3 relative transition-colors ${
              activeCategory === cat
                ? "text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-orange-600" />
            )}
          </button>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={slideLeft}
        className="absolute left-0 top-[60%] z-10 bg-white p-3 rounded-full shadow hidden md:flex hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>

      {/* SLIDER (DISPLAYING ONLY 6 CARS) */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth no-scrollbar"
      >
        {displayedCars.map((car) => (
          <div
            key={car.id}
            className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] cursor-pointer"
            onClick={() => handleCardClick(car.name)}
          >
            <ElectricCarCard
              id={car.id}
              name={car.name}
              priceRange={car.priceRange}
              imageUrl={car.imageUrl}
              fuelType={car.fuelType}
              specs={car.specs}
              features={car.features}
              images={car.images}
              onDetailClick={() => handleCardClick(car.name)}
            />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={slideRight}
        className="absolute right-0 top-[60%] z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}