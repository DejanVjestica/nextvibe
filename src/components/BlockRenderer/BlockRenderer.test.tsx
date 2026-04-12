import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ParsedBlockType } from '@/utils/parse-strapi-blocks';
import { BlockRenderer } from '@/components/BlockRenderer';

vi.mock('@/components/Media', () => ({
	Media: () => <div data-testid="mock-media">Media Component</div>,
}));

vi.mock('@/components/RichText', () => ({
	RichText: ({ body }: { body: string }) => <div data-testid="mock-richtext">{body}</div>,
}));

describe('BlockRenderer Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the RichText component when block type is rich-text', () => {
		const mockBlocks: ParsedBlockType[] = [
			{
				id: 1,
				type: 'rich-text',
				body: 'Hello World',
			},
		];

		render(<BlockRenderer blocks={mockBlocks} />);

		expect(screen.getByTestId('mock-richtext')).toBeInTheDocument();
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});

	it('renders the RichText component when block type is media', () => {
		const mockBlocks: ParsedBlockType[] = [
			{
				id: 1,
				type: 'media',
				file: {
					alternativeText: 'lorem ipsum',
					formats: {},
					height: 800,
					type: 'image',
					url: '/mock-image.jpg',
					width: 1200,
				},
			},
		];

		render(<BlockRenderer blocks={mockBlocks} />);

		expect(screen.getByTestId('mock-media')).toBeInTheDocument();
	});

	it('renders multiple blocks in the correct order', () => {
		const mockBlocks: ParsedBlockType[] = [
			{ id: 1, type: 'rich-text', body: 'First' },
			{
				id: 2,
				type: 'media',
				file: {
					alternativeText: 'lorem ipsum',
					formats: {},
					height: 800,
					type: 'image',
					url: '/mock-image.jpg',
					width: 1200,
				},
			},
		];

		render(<BlockRenderer blocks={mockBlocks} />);

		const container = screen.getByTestId('mock-richtext').parentElement;
		expect(container?.children).toHaveLength(2);
		expect(container?.children[0]).toHaveAttribute('data-testid', 'mock-richtext');
		expect(container?.children[1]).toHaveAttribute('data-testid', 'mock-media');
	});

	it('return null for unknown block types', () => {
		const mockBlocks: ParsedBlockType[] = [
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{ id: 11, type: 'unknown' as any, body: 'First' },
		];

		const { container } = render(<BlockRenderer blocks={mockBlocks} />);

		expect(container).toBeEmptyDOMElement();
	});
});
