"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 🔥 'Link' इम्पोर्ट किया
import ElectricCarCard from "./ElectricCarCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PRICE_TABS = [
  { label: "CarBuddy Used Cars", key: "all" },
  { label: "Under 5 Lakh", key: "under5" },
  { label: "5 - 10 Lakh", key: "5to10" },
  { label: "10 - 15 Lakh", key: "10to15" },
  { label: "15 - 20 Lakh", key: "15to20" },
  { label: "Above 20 Lakh", key: "above20" },
];

function parsePrice(price?: string) {
  if (!price) return 0;
  const match = price.replace(/,/g, "").match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function UsedCarsSection({ cars }: { cars: any[] }) {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("all");

  const slideLeft = () =>
    sliderRef.current?.scrollBy({ left: -320, behavior: "smooth" });

  const slideRight = () =>
    sliderRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  const handleCardClick = (slug: string) => {
    if (!slug) return;
    router.push(`/car-details/${slug}`);
  };

  const filteredCars = cars.filter((car) => {
    const price = parsePrice(car.priceRange);

    switch (activeTab) {
      case "under5":
        return price > 0 && price < 5;
      case "5to10":
        return price >= 5 && price < 10;
      case "10to15":
        return price >= 10 && price < 15;
      case "15to20":
        return price >= 15 && price < 20;
      case "above20":
        return price >= 20;
      default:
        return true;
    }
  });

  // 🔥 LOGIC: पहले टैब (all) में सिर्फ 6 कार्स दिखाओ, बाकी में सब
  const displayCars = activeTab === "all" ? filteredCars.slice(0, 6) : filteredCars;

  if (!cars || cars.length === 0) return null;

  return (
    <section className="container mx-auto px-4 pt-12 relative group">
      {/* 🔥 HEADER + VIEW ALL BUTTON */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Used Cars
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Verified pre-owned cars for you
          </p>
        </div>

        {/* View All Button: यूज़र को सीधे Used Cars फिल्टर पेज पर भेजेगा */}
        <Link 
          href={`/used-cars?budget=${activeTab}`}
          className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
        >
          View All Used Cars <FaChevronRight size={10} />
        </Link>
      </div>

      {/* PRICE TABS (Red Accent) */}
      <div className="flex gap-6 text-sm font-medium border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {PRICE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 whitespace-nowrap relative transition-colors ${
              activeTab === tab.key
                ? "text-red-600 font-bold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-red-600" />
            )}
          </button>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={slideLeft}
        className="absolute left-0 top-[65%] z-10 bg-white p-3 rounded-full shadow hidden md:flex hover:bg-gray-100 transition-all border"
      >
        <FaChevronLeft />
      </button>

      {/* SLIDER (DisplayCars used instead of filteredCars) */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth no-scrollbar"
      >
        {displayCars.map((car) => (
          <div
            key={car.id}
            className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[24%] cursor-pointer"
            onClick={() => handleCardClick(car.slug)}
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
              onDetailClick={() => handleCardClick(car.slug)}
            />
          </div>
        ))}

        {/* अगर गाड़ियाँ कम हैं तो Empty State */}
        {displayCars.length === 0 && (
          <div className="w-full text-center py-10 text-gray-400">
            No used cars found in this budget.
          </div>
        )}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={slideRight}
        className="absolute right-0 top-[65%] z-10 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition-all border"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}