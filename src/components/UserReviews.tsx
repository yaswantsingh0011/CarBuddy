'use client';

import React from 'react';
import { FaStar, FaUserCircle, FaThumbsUp, FaRegStar } from 'react-icons/fa';

const dummyReviews = [
  {
    id: 1,
    user: "Amit Sharma",
    rating: 5,
    date: "12 Oct 2025",
    title: "Best in segment!",
    comment: "I have been driving this car for 2 months now. The mileage is amazing and the comfort on highways is top-notch. Highly recommended for families.",
    helpful: 12
  },
  {
    id: 2,
    user: "Priya Verma",
    rating: 4,
    date: "25 Sep 2025",
    title: "Good performance but pricey",
    comment: "The engine performance is great, very punchy. However, I feel the service cost is slightly on the higher side compared to competitors.",
    helpful: 8
  },
  {
    id: 3,
    user: "Rahul Malhotra",
    rating: 5,
    date: "10 Sep 2025",
    title: "Loved the interiors",
    comment: "The interior quality feels premium. The touchscreen is very responsive and the sound system is just wow! A complete package.",
    helpful: 5
  }
];

const UserReviews = ({ carName }: { carName: string }) => {
  return (
    <div className="animate-fadeIn">
      
      {/* --- RATING SUMMARY --- */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left: Big Rating */}
        <div className="text-center md:text-left min-w-[150px]">
            <div className="text-5xl font-extrabold text-gray-900 mb-1">4.5<span className="text-2xl text-gray-500">/5</span></div>
            <div className="flex justify-center md:justify-start text-yellow-400 text-lg mb-2">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300"/>
            </div>
            <p className="text-gray-500 text-sm">Based on 120 Reviews</p>
        </div>

        {/* Right: Progress Bars */}
        <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-600 w-6">{star} <FaStar className="inline text-[10px] mb-0.5"/></span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${star >= 4 ? 'bg-green-500' : star === 3 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{star === 5 ? '70%' : star === 4 ? '20%' : '5%'}</span>
                </div>
            ))}
        </div>

        {/* Write Review Button */}
        <div className="w-full md:w-auto">
            <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Write a Review
            </button>
        </div>

      </div>

      {/* --- REVIEWS LIST --- */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">User Reviews for {carName}</h3>
      
      <div className="space-y-4">
        {dummyReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
                            <FaUserCircle />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{review.user}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">
                        {review.rating} <FaStar />
                    </div>
                </div>

                <h4 className="font-bold text-gray-800 mb-2">{review.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {review.comment}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                    <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                        <FaThumbsUp /> Helpful ({review.helpful})
                    </button>
                    <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                        Report
                    </button>
                </div>

            </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
         <button className="text-blue-600 font-bold text-sm hover:underline">View All 120 Reviews</button>
      </div>

    </div>
  );
};

export default UserReviews;