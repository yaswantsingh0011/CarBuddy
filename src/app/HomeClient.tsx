"use client";

import { useRef, useState, useEffect } from "react";
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

// ✅ Reusable carousel — mobile arrows always visible, desktop on hover
function CarouselSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const slide = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" });
  };

  const arrowBase = "absolute top-[55%] -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed";
  const arrowClass = isMobile
    ? `${arrowBase} flex items-center justify-center`
    : `${arrowBase} hidden group-hover:flex items-center justify-center hover:bg-gray-100`;

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-12 relative group">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
        <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{subtitle}</p>
      </div>
      <button onClick={() => slide("left")} disabled={!canScrollLeft} aria-label="Scroll left" className={`${arrowClass} left-1 md:left-4`}>
        <FaChevronLeft size={18} />
      </button>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-6">
        {children}
      </div>
      <button onClick={() => slide("right")} disabled={!canScrollRight} aria-label="Scroll right" className={`${arrowClass} right-1 md:right-4`}>
        <FaChevronRight size={18} />
      </button>
    </section>
  );
}

export default function HomeClient({ electricCars, usedCars, mostSearchedCars, upcomingCars, blogs, news }: Props) {
  const router = useRouter();

  const scrollToMostSearched = () => {
    document.getElementById("most-searched")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Hero onExploreClick={scrollToMostSearched} />

      <section id="most-searched" className="pt-10">
        <MostSearchedSection cars={mostSearchedCars} />
      </section>

      <UsedCarsSection cars={usedCars} />
      <CarComparisonSection />
      <BrandSection />

      {upcomingCars.length > 0 && (
        <CarouselSection title="Upcoming Cars" subtitle="Expected launches">
          {upcomingCars.map((car) => (
            <div key={car.id} className="w-[320px] md:w-[360px] flex-shrink-0">
              <UpcomingCarCard slug={car.slug} name={car.name} priceRange={car.priceRange} launchDate={car.launchDate} imageUrl={car.imageUrl} onAlertClick={() => alert(`Notification set for ${car.name}`)} />
            </div>
          ))}
        </CarouselSection>
      )}

      {electricCars.length > 0 && (
        <CarouselSection title="Electric Cars" subtitle="Go electric">
          {electricCars.map((car) => (
            <div key={car.id} className="w-[320px] md:w-[360px] flex-shrink-0">
              <ElectricCarCard id={car.id} name={car.name} priceRange={car.priceRange} imageUrl={car.imageUrl} fuelType="Electric" specs={car.specs} features={car.features} images={car.images} onOfferClick={() => {}} onDetailClick={() => router.push(`/car-details/${car.slug}`)} />
            </div>
          ))}
        </CarouselSection>
      )}

      <VisualStoriesSection />

      {news.length > 0 && (
        <section className="w-full px-4 md:px-8 lg:px-12 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Latest Auto News</h2>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Automobile updates & launches</p>
            </div>
            <button onClick={() => router.push("/news")} className="text-sm font-semibold text-blue-600 hover:underline">View All →</button>
          </div>
          <LatestStories newsData={news.slice(0, 3)} />
        </section>
      )}

      {blogs.length > 0 && <BlogSection blogs={blogs} />}
    </main>
  );
}