/**
 * @type { import("next").NextConfig}
 */
const config = {
  experimental: {
    swcLoader: true,
    swcMinify: false,
    cpus: 4,

  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = config;

