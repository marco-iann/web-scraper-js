const axios = require('axios');
const cheerio = require('cheerio');

const getDomainName = url => {
  var match = url.match(/^http[s]?:\/\/[^/]+/);
  return match ? match[0] : null;
};

const getPageInfo = async url => {
  let page = null;
  try {
    response = await axios.get(url);
  } catch (error) {
    return { err: 'invalid url' };
  }
  const $ = cheerio.load(response.data);

  // get title
  const title = $('title').text();

  // get links and unique domains
  const links = [];
  const uniqueDomainsArray = [];
  $('a[href]').each((i, el) => {
    const link = $(el).attr('href');
    const domain = getDomainName(link);
    if (domain && uniqueDomainsArray.indexOf(domain) === -1)
      uniqueDomainsArray.push(domain);
    links.push(link);
  });
  const uniqueDomains = uniqueDomainsArray.length;

  // check google analytics
  googleAnalytics = /www.google-analytics.com\/analytics.js/.test(
    response.data
  );

  // check if secure
  secure = response.request.res.client._httpMessage.agent.protocol === 'https:';

  return { title, links, uniqueDomains, googleAnalytics, secure };
};

module.exports = { getPageInfo, getDomainName };
