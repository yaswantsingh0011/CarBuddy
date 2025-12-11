"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  onExploreClick: () => void;
}

// Apni images yahan check kar lena
const heroImages = [
  "/cars/octaviars.jpg",
  "/cars/carnival.jpg",
  "/cars/harrier.jpg"
];

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 4 second ka timer taaki browser ko load hone ka time mile
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[35vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">
      
      {/* Background Images Stack - No Unmounting (Fast Performance) */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.1 // Active image normal rahegi, baaki zoom hongi
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index === currentIndex ? 1 : 0 }} // Active image sabse upar
          >
            <Image
              src={src}
              alt={`CarBuddy Hero Car ${index + 1}`}
              fill // Ye automatic full width/height lega (object-fit replacement)
              // Sirf PEHLI image ko priority denge (LCP Fast), baaki lazy load hongi
              priority={index === 0} 
              sizes="100vw"
              className="object-cover"
              quality={75} // Quality thodi optimize ki speed ke liye
            />
            {/* Dark Overlay har image ke saath */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/50" />
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center p-4 mt-2">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-6xl font-extrabold mb-2 md:mb-4 drop-shadow-lg"
        >
          Find Your Next Car
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
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

      {/* Slider Indicators (Dots at bottom) */}
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