import { Locale } from '@/i18n-config';
import { useParams } from 'next/navigation';

export const useCurrentLocale = (): Locale => useParams().locale as Locale;
