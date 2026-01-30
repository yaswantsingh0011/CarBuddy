"use client";
import Link from 'next/link';

export default function CarsMainPage() {
  const sections = [
    { name: 'Most Searched Cars', slug: 'most-searched', icon: '🔥' },
    { name: 'Featured Used Cars', slug: 'used-cars', icon: '⭐' }, 
    { name: 'Upcoming Cars', slug: 'upcoming-cars', icon: '📅' }, 
    // ✅ Updated slug to match your folder: electric-cars
    { name: 'Electric Cars', slug: 'electric-cars', icon: '⚡' },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-sans text-black">
      <h1 className="text-4xl font-black mb-10 text-[#0F172A]">Manage Cars Section</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((s) => (
          // ✅ This will now link to /admin/cars/electric-cars
          <Link href={`/admin/cars/${s.slug}`} key={s.slug}>
            <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer flex flex-col items-center group h-full">
              <span className="text-6xl mb-6 group-hover:scale-110 transition-transform">{s.icon}</span>
              <h2 className="text-xl font-bold text-center text-[#0F172A]">{s.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}