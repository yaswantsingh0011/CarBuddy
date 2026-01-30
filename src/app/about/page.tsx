import React from 'react';
import { Metadata } from 'next';
import { FaUsers, FaCar, FaHandshake, FaChartLine } from 'react-icons/fa6'; // ✅ Fa6 icons for better compatibility

export const metadata: Metadata = {
  title: 'About Us | CarBuddy',
  description: 'Learn more about CarBuddy, our mission, vision, and the team dedicated to revolutionizing your car buying journey.',
};

export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#0f172a] text-white py-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">About CarBuddy</h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            India's fastest-growing auto portal, simplifying your car journey through <span className="text-blue-500">technology and trust.</span>
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 max-w-6xl space-y-24">
        
        {/* 2. MISSION & VISION */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border-t-8 border-orange-500 transform hover:-translate-y-2 transition-transform">
            <h2 className="text-3xl font-black text-slate-900 mb-5 uppercase tracking-tight">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To revolutionize the automotive ecosystem by providing a transparent, efficient, and user-centric platform. We aim to remove the friction from car ownership.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border-t-8 border-blue-600 transform hover:-translate-y-2 transition-transform">
            <h2 className="text-3xl font-black text-slate-900 mb-5 uppercase tracking-tight">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To become the ultimate companion for every car owner in India. We envision a future where buying and selling is data-driven and stress-free.
            </p>
          </div>
        </div>

        {/* 3. WHO WE ARE */}
        <section className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
          <h2 className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-blue-600 w-fit pb-2 uppercase tracking-tighter">Who We Are</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
            <p>
              Founded in 2024, <strong className="text-slate-900">CarBuddy</strong> started with a simple observation: buying a car was often more confusing than exciting. Information was scattered and prices were opaque.
            </p>
            <p>
              Today, we are a team of enthusiasts and tech experts building India's most loved auto portal. Whether you are looking for a hatchback or a luxury SUV, we guide you at every turn.
            </p>
          </div>
        </section>

        {/* 4. WHY CHOOSE US */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Why Choose Us?</h2>
            <p className="text-slate-400 mt-4 font-bold uppercase text-sm tracking-widest">Driven by data, powered by trust</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FaCar />} 
              title="Inventory" 
              desc="Latest launches to verified used cars tailored to your budget." 
              color="bg-orange-50 text-orange-600"
            />
            <FeatureCard 
              icon={<FaUsers />} 
              title="Expertise" 
              desc="Unbiased, in-depth reviews from industry experts." 
              color="bg-blue-50 text-blue-600"
            />
            <FeatureCard 
              icon={<FaChartLine />} 
              title="Smart Tools" 
              desc="Advanced EMI calculators and comparison tools." 
              color="bg-green-50 text-green-600"
            />
            <FeatureCard 
              icon={<FaHandshake />} 
              title="Trust" 
              desc="Network of verified dealers for hassle-free test drives." 
              color="bg-purple-50 text-purple-600"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all text-center border border-slate-50 group">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}