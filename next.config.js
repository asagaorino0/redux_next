/**
 * @type { import("next").NextConfig}
 */
const config = {
  experimental: {
    swcLoader: true,
    swcMinify: true,
    cpus: 4,
  },
};
module.exports = config;