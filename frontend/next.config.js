module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
};
