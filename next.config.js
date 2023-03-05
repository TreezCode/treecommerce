/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'vercel',
      'vercel.app',
      'treecommerce',
      'treecommerce.vercel',
      'treecommerce.vercel.app',
      'treecommerce-treezcode.vercel.app',
      'treecommerce-git-main-treezcode.vercel.app',
    ],
    reactStrictMode: true,
    formats: ['image/webp'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
