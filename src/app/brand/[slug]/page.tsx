"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import ElectricCarCard from "@/components/ElectricCarCard";
import OffersModal from "@/components/OffersModal";
import { supabase } from "@/lib/supabaseClient";

export default function BrandPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offerCar, setOfferCar] = useState<any>(null);

  if (!slug) return null;

  // slug → brand name
  const brandSearch = slug.replace(/-/g, " ").toLowerCase();
  const displayBrandName = slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);

      const tables = [
        "most_searched_cars",
        "electric_cars",
        "upcoming_cars",
        "used_cars",
      ];

      const queries = tables.map(table =>
        supabase
          .from(table)
          .select("*")
          .ilike("brand", `%${brandSearch}%`)
      );

      const results = await Promise.all(queries);

      const merged: any[] = [];

      results.forEach(res => {
        if (res.data) merged.push(...res.data);
      });

      // 🔁 Remove duplicates (same car name)
      const uniqueMap = new Map();
      merged.forEach(car => {
        if (!uniqueMap.has(car.name)) {
          uniqueMap.set(car.name, car);
        }
      });

      setCars(Array.from(uniqueMap.values()));
      setLoading(false);
    };

    fetchCars();
  }, [brandSearch]);

  /* ================= HELPERS ================= */
  const handleCardClick = (name: string) => {
    const detailSlug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/car-details/${detailSlug}`);
  };

  const getFuelType = (car: any) => {
    if (car.fuel_type) return car.fuel_type;
    if (car.category === "EV" || car.name.toLowerCase().includes("ev"))
      return "Electric";
    return "Petrol";
  };

  const getOffersList = (car: any) => {
    if (car.category === "EV")
      return ["Free Wall Charger", "Zero Processing Fee"];
    return [
      "Exchange Bonus up to ₹25,000",
      "Free Insurance",
      "Corporate Discount",
    ];
  };

  const modalCar = offerCar
    ? { ...offerCar, offers: getOffersList(offerCar) }
    : null;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">
              {displayBrandName} Cars
            </h1>
            <p className="text-gray-500 text-sm">
              {loading ? "Loading..." : `Showing ${cars.length} results`}
            </p>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <p className="text-center text-gray-500 py-20">
            Loading cars...
          </p>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map((car, index) => {
              const image =
                car.images?.[0] ||
                car.image ||
                "/cars/placeholder.jpg";

              return (
                <ElectricCarCard
                  key={car.id || index}
                  id={car.id}
                  name={car.name}
                  priceRange={car.price}
                  imageUrl={image}
                  fuelType={getFuelType(car)}
                  specs={car.specs}
                  features={car.features}
                  images={car.images}
                  onDetailClick={() => handleCardClick(car.name)}
                  onOfferClick={() => setOfferCar(car)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">
              No Cars Found for {displayBrandName}
            </h2>
            <p className="text-gray-500">
              We’re adding more cars soon.
            </p>
          </div>
        )}
      </div>

      {offerCar && (
        <OffersModal
          isOpen={!!offerCar}
          onClose={() => setOfferCar(null)}
          car={modalCar}
        />
      )}
    </div>
  );
}
