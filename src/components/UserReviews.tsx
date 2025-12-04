'use client';

import React, { useState } from 'react';
import { FaStar, FaUserCircle, FaThumbsUp, FaTimes, FaPen } from 'react-icons/fa';

// Initial Reviews Data
const initialReviews = [
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
  }
];

const UserReviews = ({ carName }: { carName: string }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !title || !comment || !name) {
        alert("Please fill all fields and select a rating!");
        return;
    }

    const newReview = {
        id: reviews.length + 1,
        user: name,
        rating: rating,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        title: title,
        comment: comment,
        helpful: 0
    };

    setReviews([newReview, ...reviews]); // Add new review at top
    setIsModalOpen(false); // Close modal
    
    // Reset form
    setRating(0);
    setTitle("");
    setComment("");
    setName("");
  };

  // Calculate Average Rating
  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="animate-fadeIn mt-8">
      
      {/* --- RATING SUMMARY --- */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left: Big Rating */}
        <div className="text-center md:text-left min-w-[150px]">
            <div className="text-5xl font-extrabold text-gray-900 mb-1">{avgRating}<span className="text-2xl text-gray-500">/5</span></div>
            <div className="flex justify-center md:justify-start text-yellow-400 text-lg mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                    <FaStar key={star} className={star <= Math.round(Number(avgRating)) ? "text-yellow-400" : "text-gray-300"} />
                ))}
            </div>
            <p className="text-gray-500 text-sm">Based on {reviews.length} Reviews</p>
        </div>

        {/* Right: Write Review Button */}
        <div className="w-full md:w-auto ml-auto">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center shadow-md"
            >
                <FaPen /> Write a Review
            </button>
        </div>
      </div>

      {/* --- REVIEWS LIST --- */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">User Reviews for {carName}</h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                
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
                </div>
            </div>
        ))}
      </div>

      {/* --- WRITE REVIEW MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Write a Review</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Star Rating Input */}
                    <div className="flex flex-col items-center mb-4">
                        <p className="text-sm font-bold text-gray-600 mb-2">Rate your experience</p>
                        <div className="flex gap-2 text-3xl cursor-pointer">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar 
                                    key={star}
                                    className={star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name" 
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Review Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Amazing car, Value for money" 
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Experience</label>
                        <textarea 
                            rows={4}
                            placeholder="Share the details of your experience..." 
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default UserReviews;