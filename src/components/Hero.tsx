// src/components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    // CHANGE: Height ab h-[30vh] kar di hai (Mobile par 30% screen lega)
    <div className="relative w-full h-[30vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 
                   bg-no-repeat 
                   bg-center md:bg-center
                   bg-cover" 
        style={{ backgroundImage: "url('/cars/be6e.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center p-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Fonts thode aur chote kiye taaki 30vh me fit aayein */}
        <h1 className="text-xl md:text-6xl font-extrabold mb-1 md:mb-4 drop-shadow-lg">
          Find Your Next Car
        </h1>
        <p className="text-xs md:text-2xl mb-2 md:mb-8 drop-shadow-lg text-gray-200">
          CarBuddy - Your Travel Companion
        </p>

        <button
          onClick={onExploreClick}
          className="bg-blue-600 text-white font-bold py-1.5 px-4 md:py-3 md:px-8 rounded-md md:rounded-lg text-xs md:text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Explore Cars
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;