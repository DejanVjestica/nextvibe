import { Locale } from '@/i18n-config';
import { HomeButton } from '../HomeButton';
import { MainNav } from '../MainNav';
import { ThemeSwitcher } from '../ThemeSwitcher';

interface HeaderProps {
	locale: Locale;
}

export const Header = ({ locale }: HeaderProps) => {
	return (
		<header className="bg-second flex justify-between px-4">
			<HomeButton locale={locale}></HomeButton>
			<div className="flex">
				<MainNav locale={locale}></MainNav>
				<ThemeSwitcher locale={locale}></ThemeSwitcher>
			</div>
		</header>
	);
};
