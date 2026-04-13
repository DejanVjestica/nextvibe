import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	staticPageGenerationTimeout: 500,
	output: 'standalone',

	images: {
		loader: 'custom',
		loaderFile: './src/lib/strapi/loader.ts',
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '1337',
				pathname: '/uploads/**',
			},
			{
				protocol: 'https',
				hostname: '**.media.strapiapp.com',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
