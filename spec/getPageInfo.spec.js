const { expect } = require('chai');
const { getPageInfo, getDomainName } = require('../getPageInfo');

describe('getDomainName()', () => {
  it('returns null if passed a string that is not a url', () => {
    const result = getDomainName('not_a_url');
    expect(result).to.equal(null);
  });

  it('returns the domain name if passed a url', () => {
    const result = getDomainName('http://en.wikipedia.org/wiki/Phishing');
    expect(result).to.equal('http://en.wikipedia.org');
  });
});

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
    expect(pageInfo.links).to.eql(46);
  });

  it('returns amount of unique domain names found in anchor tags', async () => {
    const pageInfo = await getPageInfo('http://www.stealmylogin.com/');
    expect(pageInfo.uniqueDomains).to.equal(15);
  });

  it('returns googleAnalytics = true if google analytics is found on the page', async () => {
    const pageInfo = await getPageInfo('https://northcoders.com/');
    expect(pageInfo.googleAnalytics).to.be.true;
  });

  it('returns googleAnalytics = false if google analytics is not found', async () => {
    const pageInfo = await getPageInfo('https://duckduckgo.com/');
    expect(pageInfo.googleAnalytics).to.be.false;
  });

  it('returns secure = true if webpage is secure', async () => {
    const pageInfo = await getPageInfo('https://northcoders.com/');
    expect(pageInfo.secure).to.be.true;
  });

  it('returns secure = false if webpage is not secure', async () => {
    const pageInfo = await getPageInfo('http://www.stealmylogin.com/');
    expect(pageInfo.secure).to.be.false;
  });
});
