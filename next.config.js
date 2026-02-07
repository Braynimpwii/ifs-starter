/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.supabase.co' }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compiler: {
    styledComponents: false
  },
  experimental: {
    optimizePackageImports: [
      '@hookform/resolvers',
      'class-variance-authority',
      'clsx',
      'lucide-react',
    ],
  }
  ,
  turbopack: {
    // Ensure Turbopack resolves project root correctly when multiple lockfiles exist
    root: '.'
  }
};

export default nextConfig;