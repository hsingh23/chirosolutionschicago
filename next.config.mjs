import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "apm.info"],
  },
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
})(nextConfig);
