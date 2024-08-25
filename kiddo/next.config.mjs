/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2541-41-139-206-153.ngrok-free.app",
        port: "443",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
