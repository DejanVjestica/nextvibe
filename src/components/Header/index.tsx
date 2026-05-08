import { Locale } from '@/i18n-config';
import { HomeButton } from '@/components/HomeButton';
import { MainNav } from '@/components/MainNav';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

interface HeaderProps {
	locale: Locale;
}

export const Header = ({ locale }: HeaderProps) => {
	return (
		<header className="layout bg-second">
			<div className="content flex gap-1.5 [&>*:first-child]:mr-auto [&>*:first-child]:ps-0">
				<HomeButton locale={locale}></HomeButton>
				<MainNav locale={locale}></MainNav>
				<ThemeSwitcher locale={locale}></ThemeSwitcher>
			</div>
		</header>
	);
};
