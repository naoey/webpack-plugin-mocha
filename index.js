import path from 'path';
import glob from 'glob';

import Mocha from 'mocha';

class WebpackMochaPlugin {
  constructor(options) {
    this.options = options;
    this.pattern = options.pattern ? options.pattern : './test/**/*.js';

    this.apply = this.apply.bind(this);

    this.error = null;
  }

  apply(compiler) {
    const mocha = new Mocha();

    const results = {};

    compiler.plugin('run', (c, callback) => {
      if (this.options.setupFile) {
        require(path.resolve(compiler.options.context, this.options.setupFile)); // eslint-disable-line
      }

      glob(this.pattern, (globError, files) => {
        files
        .map(file => path.resolve(compiler.options.context, file))
        .forEach(file => mocha.addFile(file));

        mocha.run()
        .on('test', (test) => { results[test.title] = null; })
        .on('pass', (test) => { results[test.title] = 'pass'; })
        .on('fail', (test, err) => {
          if (!this.errors) {
            this.errors = [];
          }

          results[test.title] = 'fail';
          this.errors.push(new Error(`test ${test.title}\n${JSON.stringify(err)}`));
        })
        .on('end', () => {
          if (this.options.breakOnFailure) {
            callback(this.errors, results);
          } else {
            callback(null, results);
          }
        });
      });
    });
  }
}

module.exports = WebpackMochaPlugin;
