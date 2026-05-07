"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  onExploreClick: () => void;
}

const heroImages = [
  "/cars/octaviars.jpg",
  "/cars/carnival.jpg",
  "/cars/xuv700.jpg"
];

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    // ✅ FIX: h-[35vh] → h-[60vh] — mobile pe proper size
    // min-h-[300px] — bahut chote screens pe bhi theek rahega
    // baaki sab same hai
    <div className="relative w-full h-[60vh] min-h-[300px] md:h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">

      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`CarBuddy Hero Car ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              quality={75}
            />
            <div className="absolute inset-0 bg-black/40 md:bg-black/50" />
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      {/* ✅ FIX: text-2xl → text-3xl mobile pe, button bhi thoda bada */}
      <div className="relative z-20 text-center p-4 mt-2">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-extrabold mb-3 md:mb-4 drop-shadow-lg"
        >
          Find Your Next Car
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm md:text-2xl mb-5 md:mb-8 drop-shadow-lg text-gray-200"
        >
          CarBuddy - Your Travel Companion
        </motion.p>

        <motion.button
          onClick={onExploreClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white font-bold py-3 px-7 md:py-3 md:px-8 rounded-lg text-base md:text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Explore Cars
        </motion.button>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-4 flex space-x-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
