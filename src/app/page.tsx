// src/app/page.tsx

"use client";

import React, { useState } from 'react';
import CarGridCard from '@/components/CarGridCard'; 
import BookingForm from '@/components/bookingForm';
import Hero from '@/components/hero'; 
import ImageModal from '@/components/ImageModal';

interface Car {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrls: string[];
}

// 12 कारों का पूरा डेटा
const carsData: Car[] = [
  { 
    name: 'Tata Punch', 
    rating: 4.8, 
    reviews: 42, 
    priceRange: '₹ 6.13 - 10.20 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/punch.jpg', '/punch-side.jpg', '/punch-rear.jpg', '/punch-interior.jpg'] 
  },
  { 
    name: 'Toyota Fortuner', 
    rating: 4.7, 
    reviews: 35, 
    priceRange: '₹ 33.43 - 51.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/fortuner.jpg', '/fortuner-side.jpg', '/fortuner-rear.jpg', '/fortuner-interior.jpg'] 
  },
  { 
    name: 'Hyundai Creta', 
    rating: 4.7, 
    reviews: 88, 
    priceRange: '₹ 11.00 - 20.15 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/creta.jpg', '/creta-side.jpg', '/creta-rear.jpg', '/creta-interior.jpg']
  },
  { 
    name: 'Mahindra Scorpio-N', 
    rating: 4.9, 
    reviews: 150, 
    priceRange: '₹ 13.60 - 24.54 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/scorpio.jpg', '/scorpio-side.jpg', '/scorpio-rear.jpg', '/scorpio-interior.jpg']
  },
  { 
    name: 'Kia Seltos', 
    rating: 4.6, 
    reviews: 75, 
    priceRange: '₹ 10.90 - 20.35 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/seltos.jpg', '/seltos-side.jpg', '/seltos-rear.jpg', '/seltos-interior.jpg']
  },
  { 
    name: 'Mahindra XUV700', 
    rating: 4.9, 
    reviews: 200, 
    priceRange: '₹ 13.99 - 26.99 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/xuv700.jpg', '/xuv700-side.jpg', '/xuv700-rear.jpg', '/xuv700-interior.jpg']
  },
  { 
    name: 'Tata Harrier', 
    rating: 4.8, 
    reviews: 110, 
    priceRange: '₹ 15.49 - 26.44 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/harrier.jpg', '/harrier-side.jpg', '/harrier-rear.jpg', '/harrier-interior.jpg']
  },
  { 
    name: 'Jeep Wrangler', 
    rating: 4.7, 
    reviews: 35, 
    priceRange: '₹ 45.69 - 65.41 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/wrangler.jpg', '/wrangler-side.jpg', '/wrangler-rear.jpg', '/wrangler-interior.jpg']
  },
  { 
    name: 'Volkswagen Virtus', 
    rating: 4.8, 
    reviews: 50, 
    priceRange: '₹ 11.56 - 19.41 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/virtus.jpg', '/virtus-side.jpg', '/virtus-rear.jpg', '/virtus-interior.jpg']
  },
  { 
    name: 'Skoda Slavia', 
    rating: 4.7, 
    reviews: 45, 
    priceRange: '₹ 11.53 - 19.13 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/slavia.jpg', '/slavia-side.jpg', '/slavia-rear.jpg', '/slavia-interior.jpg']
  },
  { 
    name: 'Hyundai Verna', 
    rating: 4.6, 
    reviews: 65, 
    priceRange: '₹ 11.00 - 17.42 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/verna.jpg', '/verna-side.jpg', '/verna-rear.jpg', '/verna-interior.jpg']
  },
  { 
    name: 'Renault Kiger', 
    rating: 4.5, 
    reviews: 17, 
    priceRange: '₹ 5.76 - 10.34 Lakh*', 
    location: 'Jaipur',
    imageUrls: ['/kiger.jpg', '/kiger-side.jpg', '/kiger-rear.jpg', '/kiger-interior.jpg']
  },
];

export default function HomePage() {
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [selectedCarForImages, setSelectedCarForImages] = useState<Car | null>(null);
  const [imageModalStartIndex, setImageModalStartIndex] = useState(0);

  const handleBookNowClick = (car: Car) => { setSelectedCarForBooking(car); };
  const handleCloseBookingModal = () => { setSelectedCarForBooking(null); };

  const handleImageClick = (car: Car, index: number) => {
    setSelectedCarForImages(car);
    setImageModalStartIndex(index);
  };
  const handleCloseImageModal = () => { setSelectedCarForImages(null); };

  const handleOffersClick = (car: Car) => { alert(`Checking offers for ${car.name}...`); };

  return (
    <>
      <Hero />

      <div className="bg-gray-100" id="all-cars">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Cars</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
            {carsData.map((car) => (
              <CarGridCard
                key={car.name}
                name={car.name}
                rating={car.rating}
                reviews={car.reviews}
                priceRange={car.priceRange}
                location={car.location}
                imageUrls={car.imageUrls}
                onBookNowClick={() => handleBookNowClick(car)}
                onGetOffersClick={() => handleOffersClick(car)}
                onImageClick={(index) => handleImageClick(car, index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedCarForBooking && (
        <BookingForm
          isOpen={!!selectedCarForBooking}
          onClose={handleCloseBookingModal}
          car={selectedCarForBooking} // <-- यहाँ 'carName' को 'car' कर दिया है
        />
      )}
      
      {/* Image Modal */}
      {selectedCarForImages && (
        <ImageModal
          isOpen={!!selectedCarForImages}
          onClose={handleCloseImageModal}
          imageUrls={selectedCarForImages.imageUrls}
          startIndex={imageModalStartIndex}
        />
      )}
    </>
  );
}