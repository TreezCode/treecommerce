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
};

module.exports = nextConfig;
