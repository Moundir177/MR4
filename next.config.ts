import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  // Return file paths rather than URLs for fonts to support variable fonts
  assetPrefix: undefined,
};

export default nextConfig; 