// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
// Importing icons for the new section
import { Award, ShoppingCart, Tag, GitCompare } from 'lucide-react'; 

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

  // Data for the new Value Proposition Section
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
      <div className="container mx-auto px-4 py-10 md:py-16">
        
        {/* --- Top Section: Links + Value Props (4 Column Grid) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-10">

          {/* 1. Link Columns (Col 1 & 2) */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-3 col-span-1">
              <h4 className="text-lg font-bold text-gray-800 mb-4">{section.title}</h4> 
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-gray-600 hover:text-blue-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* --- NEW SECTION: Value Proposition/Trust Metrics (Col 3 & 4) --- */}
          <div className="col-span-2 space-y-4">
            
            <h4 className="text-lg font-bold text-gray-800 mb-6">Why Chooose CarBuddy</h4>
            
            {/* gap-x-8 gap-y-8 for generous spacing as seen in the image */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8"> 
                {valueProps.map((prop, index) => {
                    const Icon = prop.icon;
                    return (
                        <div key={index} className="flex items-start space-x-3"> {/* Removed md:items-center */}
                            <Icon className="h-6 w-6 text-gray-700 flex-shrink-0" />
                            <div>
                                <h5 className="text-base md:text-lg font-bold text-gray-800 leading-tight">
                                    {prop.title}
                                </h5>
                                <p className="text-xs text-gray-500 leading-tight">
                                    {prop.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
          {/* --- END NEW SECTION --- */}

        </div> 

        {/* --- Bottom Section: Copyright Only --- */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CarBuddy Pvt. Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;