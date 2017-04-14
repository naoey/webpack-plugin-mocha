import fs from 'fs';
import path from 'path';
import Mocha from 'mocha';

class WebpackMochaPlugin {
  constructor(options) {
    this.options = options;

    const testDir = options.testDir ? options.testDir : 'test';
    const pattern = new RegExp(options.pattern ? options.pattern : '.js');

    this.mocha = new Mocha();

    fs.readdirSync(testDir)
    .filter(file => pattern.test(file))
    .forEach(file => this.mocha.addFile(path.join(options.testDir, file)));

    this.apply = this.apply.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }

  handleFailure(compilation, test, err) {
    const error = new Error(`test ${test.title}\n${JSON.stringify(err)}`);
    if (this.options.emitWarn) {
      compilation.warnings.push(error);
    } else {
      compilation.errors.push(error);
    }
  }

  apply(compiler) {
    compiler.plugin('after-compile', (compilation, callback) => {
      if (this.options.setupFile) {
        require(path.resolve(compilation.options.context, this.options.setupFile)); // eslint-disable-line
      }

      this.mocha.run()
      .on('fail', (test, err) => this.handleFailure(compilation, test, err))
      .on('end', callback);
    });
  }
}

module.exports = WebpackMochaPlugin;
