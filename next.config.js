/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/posts/page', // ルートのURL
        destination: '/posts/page/1', // 1ページ目のURL
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
