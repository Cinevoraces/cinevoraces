/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'res.cloudinary.com', 'cinevoraces_api'],
  },
  env: {
    NEXT_PUBLIC_TMDB_KEY: process.env.TMDB_KEY,
    NEXT_PUBLIC_API_BASE_URL_CSR: process.env.API_BASE_URL_CSR,
    NEXT_PUBLIC_API_BASE_URL_SSR: process.env.API_BASE_URL_SSR,
    NEXT_PUBLIC_DISCORD_INVITE_URL: process.env.DISCORD_INVITE_URL,
    // For some reason .env.local doesn't accept a classic regex pattern such as in ordinary .env
    NEXT_PUBLIC_PASS_REGEXP: '^(?=.*[A-Z])(?=.*[!#$%*+=?|\-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$',
    NEXT_SHARP_PATH: '/tmp/node_modules/sharp'
  }
}

module.exports = nextConfig
