import { i18nConfig, Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/i18n-utils';
import { NavLink } from '../NavLink';

interface HomeButtonProps {
	locale: Locale;
}

export const HomeButton = ({ locale }: HomeButtonProps) => {
	const { defaultLocale } = i18nConfig;
	const ariaLabel = locale === defaultLocale ? 'Zur Startseite' : 'Go to home page';

	return <NavLink href={getLocalizedPath('/', locale)} label="Nextvibe" ariaLabel={ariaLabel}></NavLink>;
};
