const { expect } = require('chai');
const getPageInfo = require('../getPageInfo');

describe('getPageInfo()', () => {
  it('returns an error if passed an invalid url', async () => {
    const pageInfo = await getPageInfo('invalid_url');
    expect(pageInfo).to.eql({ err: 'invalid url' });
  });

  it('returns the page title', async () => {
    const pageInfo = await getPageInfo('https://northcoders.com/');
    expect(pageInfo.title).to.equal(
      'Northcoders | The Coding Bootcamp For The North'
    );
  });

  it('returns an array with anchor tags', async () => {
    const pageInfo = await getPageInfo('https://northcoders.com/');
    expect(pageInfo.links.length).to.eql(50);
  });
});
