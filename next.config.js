const { i18n } = require('./next-i18next.config');
const nextConfig = {
  i18n,
  images: {
    domains: ['cdn.sanity.io','images.unsplash.com'],
    formats: ['image/avif','image/webp'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@aws-sdk/client-s3']
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
      ]
    }]
  }
}
module.exports = nextConfig
