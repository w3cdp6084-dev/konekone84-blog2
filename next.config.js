/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/posts/page',
        destination: '/posts/page/1',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig