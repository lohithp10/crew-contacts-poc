module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://qa.api.aws.allegiantair.com/comms-exp-api/api/:path*`,
        // destination: 'https://6118f96a9bcfb40017168986.mockapi.io/api/:path*'
      },
    ];
  },
};
