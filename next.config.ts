import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow large media from same origin
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 390, 430, 768, 1024, 1440, 1920, 2560, 3840],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 86400,
  },
  // Transpile Three.js related packages for proper tree-shaking
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Enable experimental features for performance
  experimental: {
    optimizeCss: false, // we use CSS modules, no purge needed
  },
  // Headers for performance
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
