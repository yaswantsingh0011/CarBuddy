import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompareFloatingButton from '@/components/CompareFloatingButton';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {children}
      </main>

      <CompareFloatingButton />
      <Footer />
    </>
  );
}
