import React from 'react';
import { Metadata } from 'next';
import { FaUsers, FaCar, FaHandshake, FaChartLine } from 'react-icons/fa'; // Icons import kiye

export const metadata: Metadata = {
  title: 'About Us | CarBuddy',
  description: 'Learn more about CarBuddy, our mission, vision, and the team dedicated to revolutionizing your car buying journey.',
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION (Blue Banner) */}
      <div className="bg-[#1e293b] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About CarBuddy</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are India's fastest-growing auto portal, driven by a passion to simplify your car buying and selling journey through technology and trust.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-20">
        
        {/* 2. MISSION & VISION (Side-by-Side Cards) */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize the automotive ecosystem by providing a transparent, efficient, and user-centric platform. We aim to remove the friction from car ownership, making it as joyful as the drive itself.
            </p>
          </div>
          
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the ultimate companion for every car owner in India. We envision a future where buying, selling, and maintaining a car is seamless, data-driven, and completely stress-free.
            </p>
          </div>
        </section>

        {/* 3. WHO WE ARE (Story Section) */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Who We Are</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Founded in 2024, <strong>CarBuddy</strong> started with a simple observation: buying a car was often more confusing than exciting. Information was scattered, prices were opaque, and genuine advice was hard to find.
            </p>
            <p>
              We set out to change that. Today, we are a team of automotive enthusiasts, tech geeks, and customer service experts working together to build India's most loved auto portal. Whether you are a first-time buyer looking for a hatchback or an enthusiast searching for a luxury SUV, CarBuddy is here to guide you at every turn.
            </p>
            <p>
              We don't just list cars; we help you understand them. From detailed specs to ownership costs, we cover it all so you can drive home with confidence.
            </p>
          </div>
        </section>

        {/* 4. WHY CHOOSE US (Grid with Icons) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CarBuddy?</h2>
            <p className="text-gray-600 mt-3">We bring clarity to the complex world of automobiles.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaCar />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Extensive Inventory</h3>
              <p className="text-sm text-gray-600">From the latest launches to verified used cars, find thousands of options tailored to your budget.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaUsers />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Reviews</h3>
              <p className="text-sm text-gray-600">Unbiased, in-depth reviews and video content from industry experts to help you decide better.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaChartLine />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data-Driven Tools</h3>
              <p className="text-sm text-gray-600">Use our advanced EMI calculators, comparison tools, and on-road price estimators for smart planning.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <FaHandshake />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trusted Dealers</h3>
              <p className="text-sm text-gray-600">Connect directly with our network of verified dealers for the best offers and hassle-free test drives.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}