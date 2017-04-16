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
      breakOnFailure: false, // Break the build in case of test failures
      pattern: '.spec.js', // A Glob pattern to match test files ex. './test/**/+(*.spec.js|*.spec.jsx)'
      setupFile: undefined, // Module to be required before running the tests to set up the test environment
    }),
  ],
  ...
}
```