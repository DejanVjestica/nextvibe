import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/[locale]/about/page';
import { getAbout } from '@/services/about';
import { notFound } from 'next/navigation';
import { ParsedBlockType } from '@/lib/strapi/types/parsed-blocks';
import { Locale } from '@/i18n-config';
import { createMockParsedImage } from '@/lib/strapi/mocks/parsedImage.mock';

vi.mock('next/navigation', () => ({
	notFound: vi.fn(() => {
		throw new Error('NEXT_NOT_FOUND');
	}),
}));

vi.mock('@/services/about', () => ({
	getAbout: vi.fn(),
}));

vi.mock('@/components/BlockRenderer', () => ({
	BlockRenderer: ({ blocks }: { blocks: ParsedBlockType[] }) => (
		<div data-testid="renderer-mock">
			{blocks.map((block, i) => (
				<div key={i} data-testid={`block-${block.type}`}>
					{block.type}
				</div>
			))}
		</div>
	),
}));

describe('AboutPage Server Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const params = Promise.resolve({
		locale: 'en' as Locale,
	});

	it('renders the title and blocks when data is fetched successfully', async () => {
		vi.mocked(getAbout).mockResolvedValue({
			id: 2,
			title: 'Our Story',
			blocks: [
				{
					id: 1,
					type: 'rich-text',
					body: 'This is the required body content',
				},
				{
					id: 2,
					type: 'media',
					file: createMockParsedImage(),
				},
				{
					id: 2,
					type: 'media',
					file: {
						alternativeText: 'lorem ipsum',
						mime: 'video/mp4',
						type: 'video',
						url: '/mock-image.jpg',
					},
				},
			],
		});

		const PageJSX = await AboutPage({ params });

		render(PageJSX);

		expect(getAbout).toHaveBeenCalledWith('en');
		expect(getAbout).toHaveBeenCalledTimes(1);

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Our Story',
			}),
		).toBeInTheDocument();
		expect(screen.getByTestId('renderer-mock')).toBeInTheDocument();
		expect(screen.queryAllByTestId(/^block-/)).toHaveLength(3);
	});

	it('triggers the Next.js notFound boundary when data is missing', async () => {
		vi.mocked(getAbout).mockResolvedValue(null);

		await expect(AboutPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');

		expect(getAbout).toHaveBeenCalledWith('en');
		expect(getAbout).toHaveBeenCalledTimes(1);
		expect(notFound).toHaveBeenCalled();
	});

	it('does not render an h1 tag if the title is missing in the data', async () => {
		vi.mocked(getAbout).mockResolvedValue({
			id: 3,
			title: null,
			blocks: [
				{
					id: 1,
					type: 'rich-text' as const,
					body: 'This is the required body content',
				},
				{
					id: 2,
					type: 'media',
					file: createMockParsedImage(),
				},
			],
		});

		const PageJSX = await AboutPage({ params });
		render(PageJSX);

		expect(getAbout).toHaveBeenCalledWith('en');
		expect(getAbout).toHaveBeenCalledTimes(1);

		expect(
			screen.queryByRole('heading', {
				level: 1,
			}),
		).toBeNull();

		expect(screen.getByTestId('renderer-mock')).toBeInTheDocument();
		expect(screen.queryAllByTestId(/^block-/)).toHaveLength(2);
	});

	it('does not render blocks if the blocks are empty array', async () => {
		vi.mocked(getAbout).mockResolvedValue({
			id: 3,
			title: 'Our Story',
			blocks: [],
		});

		const PageJSX = await AboutPage({ params });
		render(PageJSX);

		expect(getAbout).toHaveBeenCalledWith('en');
		expect(getAbout).toHaveBeenCalledTimes(1);

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Our Story',
			}),
		).toBeInTheDocument();

		expect(screen.getByTestId('renderer-mock')).toBeInTheDocument();
		expect(screen.queryAllByTestId(/^block-/)).toHaveLength(0);
	});
});
