import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { NotFoundContent } from './NotFoundContent';

vi.mock('next/navigation', () => ({
	usePathname: vi.fn(),
}));

describe('NotFoundContent', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders English text when pathname starts with /en', () => {
		vi.mocked(usePathname).mockReturnValue('/en');

		render(<NotFoundContent />);

		expect(screen.getByText('Page Not Found')).toBeInTheDocument();
		expect(screen.getByText(/Sorry, the content you are looking for does not exist/)).toBeInTheDocument();
	});

	it('renders German text when pathname starts with /', () => {
		vi.mocked(usePathname).mockReturnValue('/');

		render(<NotFoundContent />);

		expect(screen.getByText('Seite nicht gefunden')).toBeInTheDocument();
		expect(screen.getByText(/Entschuldigung, der gesuchte Inhalt existiert nicht/)).toBeInTheDocument();
	});
});
