/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'res.cloudinary.com', 'cinevoraces_api'],
  }
}

module.exports = nextConfig
