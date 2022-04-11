module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.SERVER_URL}/:path*`
        // destination: 'https://6118f96a9bcfb40017168986.mockapi.io/api/:path*'
      }
    ];
  }
};
