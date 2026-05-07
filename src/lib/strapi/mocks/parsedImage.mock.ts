import { ParsedMediaImage } from '../types/parsed-media';
import { mockImageFormats } from './image.mock';

export const createMockParsedImage = (overrides: Partial<ParsedMediaImage> = {}): ParsedMediaImage => ({
	alternativeText: 'mock alt',
	formats: mockImageFormats,
	height: 1000,
	type: 'image',
	url: '/uploads/mock-image.jpg',
	width: 1000,
	...overrides,
});
