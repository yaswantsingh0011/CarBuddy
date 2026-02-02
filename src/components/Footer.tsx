// Final Clean Footer (Updated Full Width)
import React from 'react';
import Link from 'next/link';
// ✅ FIXED: Naya import use kiya hai
import { supabase } from '@/lib/supabaseClient'; 
import { Award, ShoppingCart, Tag, GitCompare, MapPin, Phone, Mail } from 'lucide-react'; 
import { FaFacebookF, FaYoutube, FaInstagram, FaApple, FaGooglePlay } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 

const Footer = async () => {
  // ❌ Removed: const supabase = await createClient(); (Ab direct imported wala use hoga)
  
  // Data fetching
  const { data: settings } = await supabase.from('site_settings').select('*').single();

  const siteName = settings?.site_name || "CarBuddy";
  const contactEmail = settings?.contact_email || "support@carbuddy.com";
  const contactPhone = settings?.contact_phone || "+91 9929087876";
  const address = settings?.address || "Malviya Nagar, Jaipur";

  return (
    <footer className="bg-white border-t border-gray-100 text-gray-700">
      {/* CHANGE: max-w-[1200px] hata diya, w-full aur padding badha di */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-14">

        {/* TOP GRID */}
        {/* CHANGE: Gap badhaya gap-16 taaki items khule-khule dikhein */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">

          {/* 1. ABOUT CARBUDDY */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
              About {siteName}
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers With Us</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/corporate" className="hover:text-blue-600 transition-colors">Corporate Policies</Link></li>
              <li><Link href="/investors" className="hover:text-blue-600 transition-colors">Investors</Link></li>
              <li><Link href="/faqs" className="hover:text-blue-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* 2. CONNECT WITH US */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link href="/feedback" className="hover:text-blue-600 transition-colors">Feedback</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/advertise" className="hover:text-blue-600 transition-colors">Advertise with Us</Link></li>
              <li><Link href="/partner" className="hover:text-blue-600 transition-colors">Become Partner / Dealer</Link></li>
            </ul>
          </div>

          {/* 3–4. WHY CHOOSE CARBUDDY */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-6">
              Why Choose {siteName}
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex gap-4 items-start">
                <Award className="w-6 h-6 text-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900">India's #1</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Largest Auto Portal</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <ShoppingCart className="w-6 h-6 text-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Car Sold</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Every 4 Minutes</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Tag className="w-6 h-6 text-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Offers</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Stay Updated, Pay Less</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <GitCompare className="w-6 h-6 text-gray-300 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Compare</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Decode the Right Car</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. EXPERIENCE APP */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
              Experience {siteName} App
            </h4>
            <div className="space-y-3">
              <div className="bg-black rounded-lg p-3 flex items-center gap-3 w-[170px] cursor-pointer hover:bg-gray-800 transition-colors">
                <FaApple className="text-white text-3xl" />
                <div className="text-white text-[10px] leading-tight">
                  <p>DOWNLOAD ON THE</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </div>
              <div className="bg-black rounded-lg p-3 flex items-center gap-3 w-[170px] cursor-pointer hover:bg-gray-800 transition-colors">
                <FaGooglePlay className="text-white text-2xl" />
                <div className="text-white text-[10px] leading-tight">
                  <p>GET IT ON</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* OFFICE ADDRESS */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-5">
            Office Address
          </h4>
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-2 group cursor-default">
              <MapPin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> 
              {address}
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> 
              {contactPhone}
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-600 transition-colors">
              <Mail className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> 
              {contactEmail}
            </div>
          </div>
        </div>

        {/* SOCIAL + COPYRIGHT */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <div className="flex gap-8">
            <FaFacebookF className="text-gray-400 hover:text-blue-600 cursor-pointer text-xl transition-colors" />
            <FaXTwitter className="text-gray-400 hover:text-black cursor-pointer text-xl transition-colors" />
            <FaYoutube className="text-gray-400 hover:text-red-600 cursor-pointer text-2xl transition-colors" />
            <FaInstagram className="text-gray-400 hover:text-pink-600 cursor-pointer text-2xl transition-colors" />
          </div>
          <p className="text-xs text-gray-400 font-medium italic">
            © 2025 {siteName} Pvt. Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;