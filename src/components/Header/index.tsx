import { HomeButton } from '../HomeButton';
import { MainNav } from '../MainNav';
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header = () => {
	return (
		<header className="bg-second flex justify-between px-4">
			<HomeButton></HomeButton>
			<div className="flex">
				<MainNav></MainNav>
				<ThemeSwitcher></ThemeSwitcher>
			</div>
		</header>
	);
};
