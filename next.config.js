/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:
      [
        'master-project-bucket.s3.us-east-1.amazonaws.com',
        'master-project-bucket.s3.amazonaws.com',
        'source.unsplash.com'
      ]
  }
}

module.exports = nextConfig
