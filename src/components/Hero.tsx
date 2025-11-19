// src/components/Hero.tsx
"use client"; // Client component zaroori hai animation ke liye

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  onExploreClick: () => void;
}

// Yahan apni images ke naam daal dena
const heroImages = [
  "/cars/be6e.jpg",       // Car 1
  "/cars/defender.jpg",   // Car 2 (Apni file ka naam likhna)
  "/cars/sierra-side.jpg"    // Car 3
];

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Slide Logic (Har 3 second mein image badlegi)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    // Height wapas 'h-[35vh]' kar di (Mobile par chota aur sleek)
    <div className="relative w-full h-[35vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">
      
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }} // Thoda zoom-in effect start me
          animate={{ opacity: 1, scale: 1 }}   // Normal scale
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // 1 second ka smooth fade
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${heroImages[currentIndex]}')`,
            // Fallback agar image load na ho to purani wali dikhe:
            backgroundImage: `url('${heroImages[currentIndex] || "/cars/be6e.jpg"}')` 
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content (Ye Text hamesha upar rahega) */}
      <div className="relative z-10 text-center p-4 mt-2">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-6xl font-extrabold mb-2 md:mb-4 drop-shadow-lg"
        >
          Find Your Next Car
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-2xl mb-4 md:mb-8 drop-shadow-lg text-gray-200"
        >
          CarBuddy - Your Travel Companion
        </motion.p>

        <motion.button
          onClick={onExploreClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white font-bold py-2 px-5 md:py-3 md:px-8 rounded-lg text-sm md:text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Explore Cars
        </motion.button>
      </div>

      {/* Slider Indicators (Chote dots niche) */}
      <div className="absolute bottom-2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <div 
            key={index}
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