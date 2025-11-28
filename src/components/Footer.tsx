"use client";

import React from 'react';
import Link from 'next/link';
// Importing icons
import { Award, ShoppingCart, Tag, GitCompare } from 'lucide-react'; 
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaApple, FaGooglePlay } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 

const Footer: React.FC = () => {

  const footerLinks = [
    {
      title: "ABOUT CARBUDDY",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers With Us", href: "/careers" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Corporate Policies", href: "/corporate" },
        { name: "Investors", href: "/investors" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
    {
      title: "CONNECT WITH US",
      links: [
        { name: "Feedback", href: "/feedback" },
        { name: "Contact Us", href: "/contact" },
        { name: "Advertise with Us", href: "/advertise" },
        { name: "Become Partner/Dealer", href: "/partner" },
      ],
    },
  ];

  // Value Proposition Data
  const valueProps = [
    { 
      icon: Award, 
      title: "India's #1", 
      subtitle: "Largest Auto portal" 
    },
    { 
      icon: ShoppingCart, 
      title: "Car Sold", 
      subtitle: "Every 4 minute" 
    },
    { 
      icon: Tag, 
      title: "Offers", 
      subtitle: "Stay updated pay less" 
    },
    { 
      icon: GitCompare, 
      title: "Compare", 
      subtitle: "Decode the right car" 
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="container mx-auto px-4 py-12 md:py-16">
        
        {/* --- Top Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* 1. Link Columns */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{section.title}</h4> 
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* 2. Value Proposition Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Why Choose CarBuddy</h4>
            <div className="grid grid-cols-2 gap-6"> 
                {valueProps.map((prop, index) => {
                    const Icon = prop.icon;
                    return (
                        <div key={index} className="flex items-start space-x-3">
                            <Icon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                                <h5 className="text-sm font-bold text-gray-900 leading-tight">
                                    {prop.title}
                                </h5>
                                <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                                    {prop.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>

          {/* 3. App Download Section */}
          <div className="space-y-6">
             <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Experience CarBuddy App</h4>
             <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-3 w-fit hover:bg-gray-800 transition shadow-md">
                    <FaApple size={24} />
                    <div className="text-left leading-none">
                        <span className="text-[10px] uppercase">Download on the</span><br/>
                        <span className="font-bold text-sm">App Store</span>
                    </div>
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-3 w-fit hover:bg-gray-800 transition shadow-md">
                    <FaGooglePlay size={22} />
                    <div className="text-left leading-none">
                        <span className="text-[10px] uppercase">Get it on</span><br/>
                        <span className="font-bold text-sm">Google Play</span>
                    </div>
                </button>
             </div>
          </div>

        </div> 

        {/* --- Divider --- */}
        <div className="border-t border-gray-100 my-8"></div>

        {/* --- Bottom Section: Copyright & Socials --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 order-2 md:order-1">
            © {new Date().getFullYear()} CarBuddy Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <span className="text-gray-900 font-bold text-md hidden md:block">Connect:</span>
            <div className="flex items-center gap-5">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-lg"><FaFacebookF /></a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-lg"><FaXTwitter /></a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors text-xl"><FaYoutube /></a>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-xl"><FaInstagram /></a>
                <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors text-xl"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;