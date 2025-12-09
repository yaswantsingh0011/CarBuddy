// src/app/faqs/page.tsx

import React from 'react';
import { Metadata } from 'next';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'FAQs | CarBuddy',
  description: 'Find answers to common questions about buying cars, selling cars, finance, and using the CarBuddy platform.',
};

const faqCategories = [
  {
    category: "Buying a Car",
    questions: [
      {
        q: "How can I book a test drive?",
        a: "You can book a test drive directly from any car detail page by clicking the 'Book Visit' or 'Contact Seller' button. Fill out the short form, and the dealer will contact you to schedule a time."
      },
      {
        q: "Is the price negotiable?",
        a: "Prices for new cars are generally fixed (Ex-Showroom), but you can negotiate on accessories and insurance. For used cars, the prices are set by the seller and are often negotiable based on the vehicle's condition."
      },
      {
        q: "What documents do I need to buy a car?",
        a: "You typically need proof of identity (Aadhar/PAN), proof of address, and photographs. If you are taking a loan, you will also need income proof (Salary slips/ITR) and bank statements."
      }
    ]
  },
  {
    category: "Selling a Car",
    questions: [
      {
        q: "How can I sell my car on CarBuddy?",
        a: "Currently, we work with verified dealers to list used cars. You can contact our partner dealers or use our 'Sell Car' inquiry form (coming soon) to get an evaluation."
      },
      {
        q: "How is the value of my car determined?",
        a: "The value depends on various factors including the car's age, mileage, condition, service history, and current market demand for that specific model."
      }
    ]
  },
  {
    category: "Finance & Insurance",
    questions: [
      {
        q: "Do you provide car loans?",
        a: "We connect you with our banking partners who offer competitive interest rates. You can use our EMI calculator to estimate your monthly payments and apply for a loan directly through the platform."
      },
      {
        q: "Is insurance mandatory?",
        a: "Yes, third-party motor insurance is mandatory by law in India. However, we highly recommend comprehensive insurance to cover damages to your own vehicle as well."
      }
    ]
  },
  {
    category: "General Platform",
    questions: [
      {
        q: "How reliable are the ratings?",
        a: "Our ratings are unbiased and based on a weighted average of expert reviews, real owner feedback, safety scores (Global NCAP), and overall value for money."
      },
      {
        q: "Is my personal data safe?",
        a: "Absolutely. We adhere to strict data privacy policies and only share your contact details with dealers you explicitly choose to connect with. Read our Privacy Policy for more details."
      }
    ]
  }
];

export default function FAQsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#1e293b] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers. Browse through our most common queries below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
        
        {faqCategories.map((cat, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              {cat.category}
            </h2>
            
            <div className="space-y-4">
              {cat.questions.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
                  {/* Using standard HTML details/summary for accordion functionality without extra JS state */}
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-gray-800">
                      <span className="text-lg font-semibold">{item.q}</span>
                      <span className="transition group-open:rotate-180">
                        <FaChevronDown className="text-gray-400" />
                      </span>
                    </summary>
                    <div className="text-gray-600 mt-0 px-5 pb-5 leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Support Block */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4 text-blue-600">
            <FaQuestionCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a href="/contact" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}