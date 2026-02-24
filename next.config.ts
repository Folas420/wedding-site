const withNextIntl = require('next-intl/plugin')();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};
 
module.exports = withNextIntl(nextConfig);
