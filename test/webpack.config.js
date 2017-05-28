const WebpackPluginMocha = require('../dist/index.js');

module.exports = {
  entry: './test.spec.js',
  output: {
    filename: '[name].webpack.js',
  },
  plugins: [
    new WebpackPluginMocha({
      breakOnFailure: true,
      pattern: './test.spec.js',
    }),
  ],
};
