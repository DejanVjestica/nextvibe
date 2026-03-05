import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 500,
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'tranquil-boot-edf3c61b5c.strapiapp.com',
        pathname: '/uploads/**',
      },
    ],
  }
};

export default nextConfig;
