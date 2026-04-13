import { render, screen } from '@testing-library/react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/index';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

vi.mock('next/navigation', () => ({
	usePathname: vi.fn(),
}));

vi.mock('@/hooks/useCurrentLocale', () => ({
	useCurrentLocale: vi.fn(),
}));

describe('LanguageSwitcher Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders a link to German when current locale is English', () => {
		vi.mocked(useCurrentLocale).mockReturnValue('en');
		vi.mocked(usePathname).mockReturnValue('/en/about');

		render(<LanguageSwitcher />);
		const link = screen.getByRole('link', { name: 'Zu Deutsch wechseln' });

		expect(screen.getByText('de')).toBeInTheDocument();
		expect(link).toHaveAttribute('aria-label', 'Zu Deutsch wechseln');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/about');
	});

	it('renders a link to English when current locale is German', () => {
		vi.mocked(useCurrentLocale).mockReturnValue('de');
		vi.mocked(usePathname).mockReturnValue('/about');

		render(<LanguageSwitcher />);

		const link = screen.getByRole('link', { name: 'Switch to English' });

		expect(screen.getByText('en')).toBeInTheDocument();
		expect(link).toHaveAttribute('aria-label', 'Switch to English');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/en/about');
	});
});
