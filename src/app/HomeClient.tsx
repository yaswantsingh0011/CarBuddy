"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import MostSearchedSection from "@/components/MostSearchedSection";
import UsedCarsSection from "@/components/UsedCarsSection";
import BrandSection from "@/components/BrandSection";
import UpcomingCarCard from "@/components/UpcomingCarCard";
import ElectricCarCard from "@/components/ElectricCarCard";
import VisualStoriesSection from "@/components/VisualStoriesSection";
import LatestStories from "@/components/LatestStories";
import BlogSection from "@/components/BlogSection";
import CarComparisonSection from "@/components/CarComparisonSection";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  electricCars: any[];
  usedCars: any[];
  mostSearchedCars: any[];
  upcomingCars: any[];
  blogs: any[];
  news: any[];
}

export default function HomeClient({
  electricCars, usedCars, mostSearchedCars, upcomingCars, blogs, news
}: Props) {
  const router = useRouter();
  const upcomingRef = useRef<HTMLDivElement>(null);
  const electricRef = useRef<HTMLDivElement>(null);

  const slideLeft = (ref: any) => ref.current?.scrollBy({ left: -400, behavior: "smooth" });
  const slideRight = (ref: any) => ref.current?.scrollBy({ left: 400, behavior: "smooth" });

  const scrollToMostSearched = () => {
    document.getElementById("most-searched")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* HERO */}
      <Hero onExploreClick={scrollToMostSearched} />

      {/* MOST SEARCHED */}
      <section id="most-searched" className="pt-10">
        <MostSearchedSection cars={mostSearchedCars} />
      </section>

      {/* USED CARS */}
      <UsedCarsSection cars={usedCars} />

      {/* COMPARISON */}
      <CarComparisonSection />

      {/* BRANDS */}
      <BrandSection />

      {/* UPCOMING CARS */}
      {upcomingCars.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12 relative group">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Upcoming Cars</h2>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Expected launches</p>
          </div>
          <button
            onClick={() => slideLeft(upcomingRef)}
            className="absolute left-4 top-[60%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden group-hover:block"
          >
            <FaChevronLeft size={20} />
          </button>
          <div ref={upcomingRef} className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-6">
            {upcomingCars.map((car) => (
              <div key={car.id} className="w-[360px] flex-shrink-0">
                <UpcomingCarCard
                  slug={car.slug}
                  name={car.name}
                  priceRange={car.priceRange}
                  launchDate={car.launchDate}
                  imageUrl={car.imageUrl}
                  onAlertClick={() => alert(`Notification set for ${car.name}`)}
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

      {/* ELECTRIC CARS */}
      {electricCars.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12 relative group">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Electric Cars</h2>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Go electric</p>
          </div>
          <button
            onClick={() => slideLeft(electricRef)}
            className="absolute left-4 top-[60%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden group-hover:block"
          >
            <FaChevronLeft size={20} />
          </button>
          <div ref={electricRef} className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-6">
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
                  onDetailClick={() => router.push(`/car-details/${car.slug}`)}
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

      {/* VISUAL STORIES */}
      <VisualStoriesSection />

      {/* LATEST NEWS */}
      {news.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Latest Auto News</h2>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Automobile updates & launches</p>
            </div>
            <button onClick={() => router.push("/news")} className="text-sm font-semibold text-blue-600 hover:underline">
              View All →
            </button>
          </div>
          <LatestStories newsData={news.slice(0, 3)} />
        </section>
      )}

      {/* BLOGS */}
      {blogs.length > 0 && <BlogSection blogs={blogs} />}
    </main>
  );
}