'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const getDomainName = url => {
  const match = url.match(/^http[s]?:\/\/[^/]+/);
  return match ? match[0] : null;
};

const getPageInfo = async url => {
  let response = null;
  try {
    response = await axios.get(url);
  } catch (error) {
    return { err: 'invalid url' };
  }
  const $ = cheerio.load(response.data);

  // get title
  const title = $('title').text();

  // get links and unique domains
  let links = 0;
  const uniqueDomainsArray = [];
  $('a[href]').each((i, el) => {
    const link = $(el).attr('href');
    links++;
    const domain = getDomainName(link);
    if (domain && uniqueDomainsArray.indexOf(domain) === -1)
      uniqueDomainsArray.push(domain);
  });
  const uniqueDomains = uniqueDomainsArray.length;

  // check google analytics
  const googleAnalytics = /www.google-analytics.com\/analytics.js/.test(
    response.data
  );

  // check if secure
  const secure =
    response.request.res.client._httpMessage.agent.protocol === 'https:';

  return { title: title, links, uniqueDomains, googleAnalytics, secure };
};

module.exports = { getPageInfo, getDomainName };
