// src/components/CarDetails.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Car } from "@/types";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
  car: Car;
}

export default function CarDetails({ car }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");

  const tabs = [
    { id: "specs", label: "Key Specs" },
    { id: "features", label: "Top Features" },
    { id: "standout", label: "Stand Out Features" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Car Name + Rating */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{car.name}</h1>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) =>
              i < Math.round(car.rating) ? (
                <FaStar key={i} className="h-5 w-5" />
              ) : (
                <FaRegStar key={i} className="h-5 w-5" />
              )
            )}
            <span className="text-gray-700 ml-2">{car.rating.toFixed(1)} / 5</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-gray-700">{car.reviews} Reviews</span>
          </div>
        </div>

        {/* Image + Details Grid */}
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
          {/* Left Column: Images */}
          <div>
            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={car.imageUrls[selectedImageIndex]}
                alt={car.name}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {car.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-16 rounded-lg border-2 cursor-pointer overflow-hidden ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image src={url} alt={`${car.name} ${index}`} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tabs + Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Price */}
              <p className="text-3xl font-bold text-gray-900">{car.priceRange}</p>
              <p className="text-sm text-gray-500 mb-6">
                *Ex-showroom price in {car.location}
              </p>

              {/* Tabs */}
              <div className="flex border-b mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 py-2 font-medium ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "specs" && (
                <ul className="grid grid-cols-2 gap-3 text-gray-700">
                  {car.features?.map((item, i) => (
                    <li key={i} className="bg-gray-100 p-2 rounded-lg">{item}</li>
                  )) || <p>No key specs available.</p>}
                </ul>
              )}

              {activeTab === "features" && (
                <ul className="grid grid-cols-1 gap-2 text-gray-700">
                  {car.offers?.map((item, i) => (
                    <li key={i} className="bg-gray-100 p-2 rounded-lg">{item}</li>
                  )) || <p>No features listed.</p>}
                </ul>
              )}

              {activeTab === "standout" && (
                <p className="text-gray-600">
                  The {car.name} stands out with its bold design, premium comfort, and
                  superior driving experience. Perfect for those who want both luxury and power.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
