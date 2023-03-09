/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.treecommerce.vercel.app',
      },
    ],
    formats: ['image/webp'],
    unoptimized: true,
  },
  experimental: {
    fontLoaders: [
      { loader: 'next/font/google', options: { subsets: ['latin'] } },
    ],
  },
};

module.exports = nextConfig;
