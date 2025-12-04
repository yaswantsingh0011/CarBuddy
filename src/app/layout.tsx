import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 
import { AuthProvider } from '@/context/AuthContext';
// ✅ Google Analytics Import wapas aa gaya
import GoogleAnalytics from '@/components/GoogleAnalytics';

// ✅ Context Imports
import { LocationProvider } from '@/context/LocationContext';
import { CompareProvider } from '@/context/CompareContext';
import { ShortlistProvider } from '@/context/ShortlistContext'; 

import CompareFloatingButton from '@/components/CompareFloatingButton';

const inter = Inter({ subsets: ['latin'] }); 

export const metadata: Metadata = {
  title: 'CarBuddy - Your Travel Companion',
  description: 'Find the best new and used cars.',
  // ✅ Verification Code safe hai
  verification: {
    google: 'fgTUti8vK-lRqaXCaVl5lhXferNXww-XA6q3Azs6RFw',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-gray-900`}> 
        
        {/* ✅ Google Analytics Component laga diya */}
        {/* NOTE: Niche "G-XXXXXXXXXX" hata ke apni ID daalna */}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-99E63LJFGF" />

        {/* 1. Auth Provider */}
        <AuthProvider>
          
          {/* 2. Location Provider */}
          <LocationProvider>

            {/* 3. Shortlist Provider */}
            <ShortlistProvider>

                {/* 4. Compare Provider */}
                <CompareProvider>
                  
                  <Header />
                  
                  <main className="flex-grow">
                    {children}
                  </main>

                  {/* Floating Button */}
                  <CompareFloatingButton /> 
                  
                  <Footer /> 

                </CompareProvider>

            </ShortlistProvider>

          </LocationProvider>

        </AuthProvider>
      </body>
    </html>
  );
}