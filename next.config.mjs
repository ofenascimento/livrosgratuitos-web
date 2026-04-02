/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: 'http://147.93.67.22:9000/:path*',
      },
    ];
  },
};
export default nextConfig;
