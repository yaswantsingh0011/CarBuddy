import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { LocationProvider } from '@/context/LocationContext';
import { CompareProvider } from '@/context/CompareContext';
import { ShortlistProvider } from '@/context/ShortlistContext';
import CompareFloatingButton from '@/components/CompareFloatingButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarBuddy',
  description: 'Find the best cars in India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
  suppressHydrationWarning
  className={`${inter.className} bg-white text-gray-900`}
>

        <GoogleAnalytics GA_MEASUREMENT_ID="G-99E63LJFGF" />

        <AuthProvider>
          <LocationProvider>
            <ShortlistProvider>
              <CompareProvider>

                {/* ✅ PUBLIC HEADER */}
                <Header />

                <main className="min-h-screen">
                  {children}
                </main>

                {/* ✅ PUBLIC FOOTER */}
                <Footer />

                <CompareFloatingButton />

              </CompareProvider>
            </ShortlistProvider>
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
