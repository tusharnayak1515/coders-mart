/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com','cdn.pixabay.com','cdn1.vectorstock.com','images-eu.ssl-images-amazon.com'],
  },
  devIndicators: {
    buildActivity: false
  }
}

module.exports = nextConfig