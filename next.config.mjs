/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
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