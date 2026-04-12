import { render, screen } from '@testing-library/react';
import AboutPage from './page';
import { getAbout } from '@/services/about';
import { notFound } from 'next/navigation';
import { ParsedBlockType } from '@/utils/parse-strapi-blocks';
import { Locale } from '@/i18n-config';
import { mockImageFormats } from '@/tests/mocks/strapi-image.mock';

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
		<div data-testid="block-renderer-mock">
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
					file: {
						alternativeText: 'lorem ipsum',
						formats: mockImageFormats,
						height: 800,
						type: 'image',
						url: '/mock-image.jpg',
						width: 1200,
					},
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

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Our Story',
			}),
		).toBeInTheDocument();
		expect(screen.getByTestId('block-renderer-mock').children).toHaveLength(3);
	});

	it('triggers the Next.js notFound boundary when data is missing', async () => {
		vi.mocked(getAbout).mockResolvedValue(null);

		await expect(AboutPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');

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
					file: {
						alternativeText: 'lorem ipsum',
						formats: mockImageFormats,
						height: 800,
						type: 'image' as const,
						url: '/mock-image.jpg',
						width: 1200,
					},
				},
			],
		});

		const PageJSX = await AboutPage({ params });
		render(PageJSX);

		expect(
			screen.queryByRole('heading', {
				level: 1,
			}),
		).toBeNull();

		expect(screen.getByTestId('block-renderer-mock').children).toHaveLength(2);
	});

	it('does not render blocks if the blocks are empty array', async () => {
		vi.mocked(getAbout).mockResolvedValue({
			id: 3,
			title: 'Our Story',
			blocks: [],
		});

		const PageJSX = await AboutPage({ params });
		render(PageJSX);

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Our Story',
			}),
		).toBeInTheDocument();

		expect(screen.getByTestId('block-renderer-mock')).toBeEmptyDOMElement();
	});
});
