"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // ★ Import zaroori hai

interface HeroProps {
  onExploreClick: () => void;
}

const heroImages = [
  "/cars/octaviars.jpg",
  "/cars/carnival.jpg",
  "/cars/tiago-ev.jpg"
];

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Slide Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[35vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">
      
      {/* Background Image Slider with Next/Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full" // div ko full size diya
        >
          {/* ★ Next/Image Implementation for Speed */}
          <Image
            src={heroImages[currentIndex] || "/cars/tiago-ev.jpg"} // Fallback image
            alt="CarBuddy Hero Car"
            fill // Ye automatic width/height adjust karega (replacement for bg-cover)
            priority={true} // ★ GAME CHANGER: Ye LCP fast karega (Preload)
            sizes="100vw" // Mobile pe choti image download hogi
            className="object-cover" // CSS object-fit: cover
            quality={85} // Thodi quality kam karke speed badhayega (optional)
          />

          {/* Dark Overlay (Image ke upar) */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/50 z-10"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-20 text-center p-4 mt-2">
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

      {/* Slider Indicators */}
      <div className="absolute bottom-2 flex space-x-2 z-30">
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