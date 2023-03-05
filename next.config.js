/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['cdn.sanity.io', 'treecommerce.vercel.app', 'vercel.com'],
    formats: ['image/webp'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
