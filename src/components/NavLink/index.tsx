import Link from 'next/link';

interface NavLinkProps {
	label: string;
	href: string;
	ariaLabel?: string;
	className?: string;
}

export const NavLink = ({ label, ariaLabel, href, className }: NavLinkProps) => {
	const styles = `${className ? className + ' ' : ''}cursor-pointer p-2 transition-colors text-foreground hover:text-primary`;

	return (
		<>
			<Link href={href} className={styles} aria-label={ariaLabel}>
				<span>{label}</span>
			</Link>
		</>
	);
};
