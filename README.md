# webpack-plugin-mocha

![build_status](https://travis-ci.org/naoey/webpack-plugin-mocha.svg?branch=master)

A Webpack plugin to run mocha tests.

### Usage

Install the plugin with `npm i webpack-plugin-mocha`

In your webpack.config.js:
```js
var WebpackMochaPlugin = require('webpack-mocha-plugin');

module.exports = {
  ...
  plugins: [
    new WebpackMochaPlugin({
      emitWarn: false, // Emit warnings instead of errors on test failures
      testDir: './test/', // Root directory containing tests
      pattern: '.spec.js', // A RegExp to match test files
      setupFile: undefined, // Module to be required before running the tests to set up the test environment
    }),
  ],
  ...
}
```