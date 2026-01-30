"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import EMICalculatorModal from "@/components/EMICalculatorModal";

const TABLE_MAP: Record<string, string> = {
  most_searched: "most_searched_cars",
  used: "used_cars",
  upcoming: "upcoming_cars",
  electric: "electric_cars",
};

export default function CarDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string;
  const from = searchParams.get("from") ?? "most_searched";
  const tableName = TABLE_MAP[from] ?? "most_searched_cars";

  const [car, setCar] = useState<any>(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // MODAL STATES
  const [showEMI, setShowEMI] = useState(false);
  const [showOnRoad, setShowOnRoad] = useState(false);
  const [showBookVisit, setShowBookVisit] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      const { data } = await supabase
        .from(tableName)
        .select("*")
        .ilike("slug", slug.trim())
        .limit(1)
        .maybeSingle();

      if (data) {
        setCar(data);
        setActiveImage(data.images?.[0]);
        setSelectedVariant(data.variants?.[0]);
      }

      setLoading(false);
    }

    fetchCar();
  }, [slug, tableName]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!car) {
    return (
      <div className="p-10 text-center text-red-500 text-xl">
        Car not found
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* ================= HERO ================= */}
        <section className="grid lg:grid-cols-2 gap-10 bg-white rounded-2xl p-8 shadow">

          {/* IMAGE GALLERY */}
          <div>
            <img
              src={activeImage}
              alt={car.name}
              className="w-full rounded-xl mb-4"
            />

            <div className="flex gap-3">
              {car.images?.map((img: string) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-14 rounded cursor-pointer border ${
                    activeImage === img
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT INFO */}
          <div>
            <h1 className="text-3xl font-bold">{car.name}</h1>
            <p className="text-gray-500">{car.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              ⭐⭐⭐⭐☆{" "}
              <span className="text-sm text-gray-500">
                4.5 / 5 | 20 Reviews
              </span>
            </div>

            {/* Variant Selector */}
            <div className="mt-4">
              <label className="text-sm font-medium">SELECT VARIANT</label>
              <select
                className="w-full border rounded-lg p-3 mt-1"
                value={selectedVariant?.name}
                onChange={(e) =>
                  setSelectedVariant(
                    car.variants.find(
                      (v: any) => v.name === e.target.value
                    )
                  )
                }
              >
                {car.variants.map((v: any) => (
                  <option key={v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold mt-4">
              {selectedVariant?.price}
            </p>

            <button
              onClick={() => setShowOnRoad(true)}
              className="text-blue-600 text-sm hover:underline"
            >
              Check On-Road Price
            </button>

            {/* EMI BOX */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
              <p className="font-semibold">Estimated EMI</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>✔ Powerful Performance</li>
                <li>✔ Premium Comfort & Safety</li>
              </ul>
              <button
                onClick={() => setShowEMI(true)}
                className="text-blue-600 mt-2 text-sm"
              >
                Check Eligibility
              </button>
            </div>

            {/* CTA */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowEMI(true)}
                className="border border-red-600 text-red-600 px-6 py-3 rounded-lg"
              >
                EMI Calculator
              </button>
              <button
                onClick={() => setShowBookVisit(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                BOOK VISIT
              </button>
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW ================= */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(car.specs).map(([key, value]) => (
              <div key={key} className="border rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="font-semibold">{String(value)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {car.features.map((f: string) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-green-600">✔</span> {f}
              </li>
            ))}
          </ul>
        </section>

        {/* ================= PROS & CONS ================= */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Pros</h3>
            <ul className="list-disc pl-5 space-y-2">
              {car.pros.map((p: string) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Cons</h3>
            <ul className="list-disc pl-5 space-y-2">
              {car.cons.map((c: string) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= EXPERT REVIEW ================= */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Expert Review</h3>
          <p className="text-gray-600">{car.expert_review?.safety}</p>
        </section>
      </div>

      {/* ================= MODALS ================= */}

      {/* EMI MODAL */}
      <EMICalculatorModal
        isOpen={showEMI}
        onClose={() => setShowEMI(false)}
        price={selectedVariant?.price}
        city="Jaipur"
      />

      {/* ON ROAD PRICE MODAL */}
      {showOnRoad && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h2 className="font-bold text-lg mb-2">On-Road Price</h2>
            <p className="text-gray-600">
              Approx on-road price for {car.name} in Jaipur
            </p>
            <p className="text-2xl font-bold mt-3">
              {(selectedVariant?.price ?? "").replace("*", "")} (approx)
            </p>
            <button
              onClick={() => setShowOnRoad(false)}
              className="mt-4 text-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BOOK VISIT MODAL */}
      {showBookVisit && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h2 className="font-bold text-lg mb-2">Book Visit</h2>
            <p className="text-gray-600 mb-3">
              {car.name} – {selectedVariant?.name}
            </p>
            <button
              onClick={() => setShowBookVisit(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Confirm Visit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
