// src/components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";

// Naya interface jismein onClick handler hoga
interface HeroProps {
  onExploreClick: () => void;
}

// Hero component ab prop lega
const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    // Full-screen hero section
    <div className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/cars/be6e.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center p-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Find Your Next Car
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-lg">
          CarBuddy - Your Travel Companion
        </p>

        {/* Button ab prop ka use karega aur smooth scroll hatayega */}
        <button
          // href="#all-cars" HATA DIYA
          onClick={onExploreClick} // Naya handler yahan use hoga
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors"
        >
          Explore Cars
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;