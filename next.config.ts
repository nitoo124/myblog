/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    turbo: false // Disabling Turbopack
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optionally restrict to your Cloudinary account:
        // pathname: '/your_cloud_name/**'
      }
    ],
    // Optional performance optimizations:
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  // Other optimizations:
  compress: true,
  productionBrowserSourceMaps: false
};

module.exports = nextConfig;