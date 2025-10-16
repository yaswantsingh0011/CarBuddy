"use client";

import React, { useState } from 'react';
import CarDetailSection from '@/components/CarDetailSection';
import BookingForm from '@/components/BookingForm';

interface Car {
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  imageUrl: string;
}

const carsData: Car[] = [
  { name: 'Tata Punch', rating: 4.8, reviews: 42, priceRange: '₹ 6.13 - 10.20 Lakh*', location: 'Jaipur', imageUrl: '/punch.jpg' },
  { name: 'Toyota Fortuner', rating: 4.7, reviews: 35, priceRange: '₹ 33.43 - 51.44 Lakh*', location: 'Jaipur', imageUrl: '/fortuner.jpg' },
  { name: 'Hyundai Creta', rating: 4.7, reviews: 88, priceRange: '₹ 11.00 - 20.15 Lakh*', location: 'Jaipur', imageUrl: '/creta.jpg' },
  { name: 'Mahindra Scorpio-N', rating: 4.9, reviews: 150, priceRange: '₹ 13.60 - 24.54 Lakh*', location: 'Jaipur', imageUrl: '/scorpio.jpg' },
  { name: 'Kia Seltos', rating: 4.6, reviews: 75, priceRange: '₹ 10.90 - 20.35 Lakh*', location: 'Jaipur', imageUrl: '/seltos.jpg' },
  { name: 'Mahindra XUV700', rating: 4.9, reviews: 200, priceRange: '₹ 13.99 - 26.99 Lakh*', location: 'Jaipur', imageUrl: '/xuv700.jpg' },
  { name: 'Tata Harrier', rating: 4.8, reviews: 110, priceRange: '₹ 15.49 - 26.44 Lakh*', location: 'Jaipur', imageUrl: '/harrier.jpg' },
  { name: 'Jeep Wrangler', rating: 4.5, reviews: 60, priceRange: '₹ 67.14 - 78.35 Lakh*', location: 'Jaipur', imageUrl: '/rubicon.jpg' },
  { name: 'Volkswagen Virtus', rating: 4.8, reviews: 50, priceRange: '₹ 11.56 - 19.41 Lakh*', location: 'Jaipur', imageUrl: '/virtus.jpg' },
  { name: 'Skoda Slavia', rating: 4.7, reviews: 45, priceRange: '₹ 11.53 - 19.13 Lakh*', location: 'Jaipur', imageUrl: '/slavia.jpg' },
  { name: 'Hyundai Verna', rating: 4.6, reviews: 65, priceRange: '₹ 11.00 - 17.42 Lakh*', location: 'Jaipur', imageUrl: '/verna.jpg' },
  { name: 'Renault Kiger', rating: 4.5, reviews: 17, priceRange: '₹ 5.76 - 10.34 Lakh*', location: 'Jaipur', imageUrl: '/kiger.jpg' },
];

export default function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleBookNowClick = (car: Car) => {
    setSelectedCar(car);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedCar(null);
  };

  const handleGetOffersClick = (carName: string) => {
    alert(`Fetching current offers for ${carName}...`);
  };

  return (
    <div className="bg-gray-50 relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {carsData.map((car) => (
            <CarDetailSection
              key={car.name}
              {...car}
              onBookNowClick={() => handleBookNowClick(car)}
              onGetOffersClick={() => handleGetOffersClick(car.name)}
            />
          ))}
        </div>
      </div>

      {isFormVisible && selectedCar && (
        <BookingForm car={selectedCar} onClose={handleCloseForm} />
      )}
    </div>
  );
}
