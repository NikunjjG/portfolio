/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is required to generate the static files in the /out directory
  images: {
    unoptimized: true, // Required for static exports on Netlify
  },
};

module.exports = nextConfig;