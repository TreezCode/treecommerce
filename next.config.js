/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: [
      'cdn.sanity.io',
      'treecommerce.vercel.app',
      'treecommerce-treezcode.vercel.app',
      'treecommerce-git-main-treezcode.vercel.app',
    ],
    formats: ['image/webp'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
