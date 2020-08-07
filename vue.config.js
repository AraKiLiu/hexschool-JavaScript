module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/hexschool-JavaScript/' : '/',
  transpileDependencies: [
    /\bvue-awesome\b/,
  ],
};
