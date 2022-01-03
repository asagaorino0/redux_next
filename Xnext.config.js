/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.tls = false;
    }
    return config;
  },
};
// const withTM = require('next-transpile-modules')([
//   '@fullcalendar/common',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/react',
// ])
// module.exports = withTM({
//   // any other next.js settings here
// })
