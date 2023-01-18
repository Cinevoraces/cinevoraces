/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_TMDB_KEY: "319bf20e26c103de9dd61d22f63c0419",
    NEXT_PUBLIC_API_BASE_URL_CSR: "http://localhost:3005",
    NEXT_PUBLIC_API_BASE_URL_SSR: "http://cinevoraces_api:3005",
    NEXT_PUBLIC_PASS_REGEXP: "^(?=.*[A-Z])(?=.*[!#$%*+=?|\-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$",
    NEXT_PUBLIC_DISCORD_INVITE_URL: "https://discord.gg/r6tK5PGyE7",
  }
}

module.exports = nextConfig
