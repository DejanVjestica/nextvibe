import { render, screen } from '@testing-library/react';
import { NotFoundContent } from './NotFoundContent';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

vi.mock('@/hooks/useCurrentLocale', () => ({
	useCurrentLocale: vi.fn(),
}));

describe('NotFoundContent', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders English text when pathname starts with /en', () => {
		vi.mocked(useCurrentLocale).mockReturnValue('en');

		render(<NotFoundContent />);

		expect(screen.getByText('Page Not Found')).toBeInTheDocument();
		expect(screen.getByText(/Sorry, the content you are looking for does not exist/)).toBeInTheDocument();
	});

	it('renders German text when pathname starts with /de', () => {
		vi.mocked(useCurrentLocale).mockReturnValue('de');

		render(<NotFoundContent />);

		expect(screen.getByText('Seite nicht gefunden')).toBeInTheDocument();
		expect(screen.getByText(/Entschuldigung, der gesuchte Inhalt existiert nicht/)).toBeInTheDocument();
	});
});
