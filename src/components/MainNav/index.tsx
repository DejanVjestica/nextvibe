import { getLocalizedPath } from '@/lib/i18n/get-localized-path';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { NavLink } from '@/components/NavLink';
import { Locale } from '@/i18n-config';

interface MainNavProps {
	locale: Locale;
}

export const MainNav = ({ locale }: MainNavProps) => {
	return (
		<nav className="flex items-center gap-2 justify-self-center">
			<ul className="contents">
				<li>
					<NavLink href={getLocalizedPath('/about', locale)} label="about"></NavLink>
				</li>
				<li>
					<LanguageSwitcher></LanguageSwitcher>
				</li>
			</ul>
		</nav>
	);
};
