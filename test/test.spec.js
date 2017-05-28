/* globals describe, it */
/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect;

describe('Fake test that always passes', () => {
  it('should always pass', () => {
    expect(true).to.be.true;
  });
});

describe('Fake test that always fails', () => {
  it('should always fail', () => {
    expect(false).to.be.true;
  });
});
