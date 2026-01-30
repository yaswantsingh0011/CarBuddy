"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- COMPONENTS ---------------- */
import Hero from "@/components/Hero";
import MostSearchedSection from "@/components/MostSearchedSection";
import UsedCarsSection from "@/components/UsedCarsSection";
import BrandSection from "@/components/BrandSection";
import UpcomingCarCard from "@/components/UpcomingCarCard";
import ElectricCarCard from "@/components/ElectricCarCard";
import VisualStoriesSection from "@/components/VisualStoriesSection";
import LatestStories from "@/components/LatestStories";
import BlogSection from "@/components/BlogSection";
// 🔥 नया कम्पैरिजन सेक्शन इम्पोर्ट किया
import CarComparisonSection from "@/components/CarComparisonSection";

/* ---------------- ICONS ---------------- */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---------------- DATA ---------------- */
import {
  getElectricCars,
  getUsedCars,
  getMostSearchedCars,
  getUpcomingCars,
  getBlogs,
  getNews,
} from "@/lib/homeData";

export default function HomePage() {
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [electricCars, setElectricCars] = useState<any[]>([]);
  const [usedCars, setUsedCars] = useState<any[]>([]);
  const [mostSearchedCars, setMostSearchedCars] = useState<any[]>([]);
  const [upcomingCars, setUpcomingCars] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  /* ---------------- REFS ---------------- */
  const upcomingRef = useRef<HTMLDivElement>(null);
  const electricRef = useRef<HTMLDivElement>(null);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    getElectricCars().then(setElectricCars);
    getUsedCars().then(setUsedCars);
    getMostSearchedCars().then(setMostSearchedCars);
    getUpcomingCars().then(setUpcomingCars);
    getBlogs().then(setBlogs);
    getNews().then(setNews);
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const slideLeft = (ref: any) =>
    ref.current?.scrollBy({ left: -400, behavior: "smooth" });

  const slideRight = (ref: any) =>
    ref.current?.scrollBy({ left: 400, behavior: "smooth" });

  const scrollToMostSearched = () => {
    document
      .getElementById("most-searched")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------- JSX ---------------- */
  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <Hero onExploreClick={scrollToMostSearched} />

      {/* MOST SEARCHED SECTION */}
      <section id="most-searched" className="pt-10">
        <MostSearchedSection cars={mostSearchedCars} />
      </section>

      {/* USED CARS SECTION */}
      <UsedCarsSection cars={usedCars} />

      {/* 🔥 CAR COMPARISON SECTION: पुरानी गाड़ियों के बाद तुलना का विकल्प */}
      <CarComparisonSection />

      {/* BRANDS SECTION */}
      <BrandSection />

      {/* UPCOMING CARS SECTION */}
      {upcomingCars.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12 relative group">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Upcoming Cars
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
              Expected launches
            </p>
          </div>

          <button
            onClick={() => slideLeft(upcomingRef)}
            className="absolute left-4 top-[60%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden group-hover:block"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            ref={upcomingRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-6"
          >
            {upcomingCars.map((car) => (
              <div key={car.id} className="w-[360px] flex-shrink-0">
                <UpcomingCarCard
                  slug={car.slug}
                  name={car.name}
                  priceRange={car.priceRange}
                  launchDate={car.launchDate}
                  imageUrl={car.imageUrl}
                  onAlertClick={() =>
                    alert(`Notification set for ${car.name}`)
                  }
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => slideRight(upcomingRef)}
            className="absolute right-4 top-[60%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden group-hover:block"
          >
            <FaChevronRight size={20} />
          </button>
        </section>
      )}

      {/* ELECTRIC CARS SECTION */}
      {electricCars.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12 relative group">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Electric Cars
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
              Go electric
            </p>
          </div>

          <button
            onClick={() => slideLeft(electricRef)}
            className="absolute left-4 top-[60%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden group-hover:block"
          >
            <FaChevronLeft size={20} />
          </button>

          <div
            ref={electricRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-6"
          >
            {electricCars.map((car) => (
              <div key={car.id} className="w-[360px] flex-shrink-0">
                <ElectricCarCard
                  id={car.id}
                  name={car.name}
                  priceRange={car.priceRange}
                  imageUrl={car.imageUrl}
                  fuelType="Electric"
                  specs={car.specs}
                  features={car.features}
                  images={car.images}
                  onOfferClick={() => {}}
                  onDetailClick={() =>
                    router.push(`/car-details/${car.slug}`)
                  }
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => slideRight(electricRef)}
            className="absolute right-4 top-[60%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden group-hover:block"
          >
            <FaChevronRight size={20} />
          </button>
        </section>
      )}

      {/* VISUAL STORIES SECTION */}
      <VisualStoriesSection />

      {/* LATEST AUTO NEWS SECTION */}
      {news.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Latest Auto News
              </h2>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                Automobile updates & launches
              </p>
            </div>

            <button
              onClick={() => router.push("/news")}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              View All →
            </button>
          </div>

          <LatestStories newsData={news.slice(0, 3)} />
        </section>
      )}

      {/* BLOGS SECTION */}
      {blogs.length > 0 && <BlogSection blogs={blogs} />}
    </main>
  );
}