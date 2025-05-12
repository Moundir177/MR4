import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/settings';
 
export default function Home() {
  // Use defaultLocale from settings to ensure consistency
  redirect(`/${defaultLocale}`);
} 