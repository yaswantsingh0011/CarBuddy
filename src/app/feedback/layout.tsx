// src/app/feedback/layout.tsx
// 💡 NAYI FILE: Ye file metadata ko handle karegi

import React from 'react';
import { Metadata } from 'next';

// ✅ Metadata ko yahan move kar diya hai
export const metadata: Metadata = {
  title: 'Feedback | CarBuddy',
};

// Ye layout component server par chalega
export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ye layout styling add nahi karega, bas children ko pass karega
  return <>{children}</>;
}