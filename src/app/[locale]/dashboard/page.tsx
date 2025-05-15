import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChartBarIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  CalendarIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/solid';

// This function is server-side only
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'ar' }
  ];
}

// Single default export as a server component
export default function DashboardPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Dashboard content */}
      </div>
    </main>
  );
} 