'use client';

// 1. 'Suspense' को react से import करें
import React, { Suspense } from 'react'; 
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { carsData, Car } from '@/data/cars';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import CompareColumn from '@/components/CompareColumn';

// 2. एक नया कंपोनेंट बनाएँ जिसमें searchParams वाला सारा लॉजिक हो
function CompareContent() {
  const searchParams = useSearchParams(); // हुक अब इस कंपोनेंट के अंदर है
  const carNamesString = searchParams.get('cars');
  const selectedCarNames = carNamesString ? carNamesString.split(',') : [];

  const carsToCompare = carsData.filter(car => selectedCarNames.includes(car.name));

  let gridColsClass = 'md:grid-cols-2';
  if (carsToCompare.length === 3) gridColsClass = 'md:grid-cols-3';
  else if (carsToCompare.length === 4) gridColsClass = 'md:grid-cols-4';

  // 3. यह कंपोनेंट आपका पुराना JSX रिटर्न करेगा
  return (
    <>
      {carsToCompare.length >= 2 ? (
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
          {carsToCompare.map((car) => (
            <CompareColumn key={car.name} car={car} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Please select 2 to 4 cars to compare from the{' '}
          <Link href="/" className="text-blue-600 underline"> homepage </Link>.
        </p>
      )}
    </>
  );
}

// 4. आपका मुख्य पेज कंपोनेंट अब बहुत सरल हो जाएगा
export default function ComparePage() {
  return (
    <div className="bg-gray-100 container mx-auto px-4 py-12 pt-28 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Compare Cars</h1>
      
      {/* 5. Suspense बाउंड्री यहाँ लगाएँ */}
      <Suspense fallback={<p className="text-center text-gray-600">Loading comparison...</p>}>
        <CompareContent />
      </Suspense>
      
    </div>
  );
}