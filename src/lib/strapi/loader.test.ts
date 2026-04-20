import strapiLoader from './loader';

vi.mock('@/lib/config/strapi-media-url', () => ({
	strapiMediaUrl: vi.fn(() => 'http://test.com'),
}));

describe('strapiLoader', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should generate correct URL for small', () => {
		const url = strapiLoader({ src: '/uploads/image.jpg', width: 400, quality: 80 });
		expect(url).toContain('http://test.com/uploads/small_image.jpg?w=400&q=80');
	});

	it('should generate correct URL for thumbnail', () => {
		const url = strapiLoader({ src: '/uploads/image.jpg', width: 200, quality: 80 });
		expect(url).toContain('http://test.com/uploads/thumbnail_image.jpg?w=200&q=80');
	});

	it('should generate correct URL for medium', () => {
		const url = strapiLoader({ src: '/uploads/image.jpg', width: 600, quality: 80 });
		expect(url).toContain('http://test.com/uploads/medium_image.jpg?w=600&q=80');
	});

	it('should generate correct URL for large', () => {
		const url = strapiLoader({ src: '/uploads/image.jpg', width: 900, quality: 80 });
		expect(url).toContain('http://test.com/uploads/large_image.jpg?w=900&q=80');
	});

	it('should generate correct URL without prefix for widths greater than 1000', () => {
		const url = strapiLoader({ src: '/uploads/image.jpg', width: 1200, quality: 80 });
		expect(url).toContain('http://test.com/uploads/image.jpg?w=1200&q=80');
	});

	it('should handle absolute URLs correctly', () => {
		const url = strapiLoader({ src: 'http://test.com/uploads/image.jpg', width: 400, quality: 80 });
		expect(url).toContain('http://test.com/uploads/small_image.jpg?w=400&q=80');
	});

	it('always includes width + default quality', () => {
		const url = strapiLoader({ src: '/uploads/image.jpg', width: 777 });
		expect(url).toContain('w=777');
		expect(url).toContain('q=75');
	});
});
