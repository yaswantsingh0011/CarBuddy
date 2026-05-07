"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ElectricCarCard from "./ElectricCarCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CATEGORIES = ["SUV", "MUV", "Luxury", "Sedan", "Hatchback"];

export default function MostSearchedSection({ cars = [] }: { cars?: any[] }) {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("SUV");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect touch device
  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // ✅ Track scroll position for arrow disable/enable
  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [activeCategory]);

  const safeCars = Array.isArray(cars) ? cars : [];

  const filteredCars = useMemo(() => {
    return safeCars.filter(
      (car) =>
        car?.category &&
        car.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, safeCars]);

  const displayedCars = filteredCars.slice(0, 6);

  const slideLeft = () =>
    sliderRef.current?.scrollBy({ left: -320, behavior: "smooth" });

  const slideRight = () =>
    sliderRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  const handleCardClick = (name: string) => {
    if (!name) return;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${slug}`);
  };

  if (safeCars.length === 0) return null;

  // ✅ Mobile pe arrows hamesha dikhte hain, desktop pe hover pe
  const arrowBase =
    "absolute top-[60%] z-10 bg-white p-3 rounded-full shadow transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed";
  const arrowClass = isMobile
    ? `${arrowBase} flex items-center justify-center hover:bg-gray-100`
    : `${arrowBase} hidden md:flex items-center justify-center hover:bg-gray-100`;

  return (
    <section className="container mx-auto px-4 pt-10 relative group">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          The Most Searched Cars
        </h2>
        <Link
          href={`/all-cars?category=${activeCategory}`}
          className="text-blue-600 hover:underline text-sm font-semibold flex items-center gap-1"
        >
          View All {activeCategory} Cars <FaChevronRight size={10} />
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-6 text-sm font-medium border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-3 whitespace-nowrap relative transition-colors ${
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

      {/* ✅ Left Arrow */}
      <button
        onClick={slideLeft}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`${arrowClass} left-0`}
      >
        <FaChevronLeft />
      </button>

      {/* Cards */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth no-scrollbar"
      >
        {displayedCars.length > 0 ? (
          displayedCars.map((car) => (
            <div
              key={car.id || Math.random()}
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
          ))
        ) : (
          <div className="w-full py-10 text-center text-gray-400">
            No {activeCategory} cars found.
          </div>
        )}
      </div>

      {/* ✅ Right Arrow */}
      <button
        onClick={slideRight}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`${arrowClass} right-0`}
      >
        <FaChevronRight />
      </button>
    </section>
  );
}