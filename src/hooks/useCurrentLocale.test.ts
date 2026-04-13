vi.mock('next/navigation', () => ({
	useParams: vi.fn(),
}));

import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { useParams } from 'next/navigation';

describe('useCurrentLocale Hook', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns en from useParams', () => {
		vi.mocked(useParams).mockReturnValue({ locale: 'en' });
		const locale = useCurrentLocale();
		expect(locale).toBe('en');
	});

	it('returns de from useParams', () => {
		vi.mocked(useParams).mockReturnValue({ locale: 'de' });
		const locale = useCurrentLocale();
		expect(locale).toBe('de');
	});
});
