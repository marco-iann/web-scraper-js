const axios = require('axios');
const cheerio = require('cheerio');

const getPageInfo = async url => {
  let page = null;
  try {
    page = await axios.get(url);
  } catch (error) {
    return { err: 'invalid url' };
  }
  const $ = cheerio.load(page.data);
  const title = $('title').text();
  const links = [];
  $('a').each((i, el) => {
    const link = $(el).attr('href');
    links.push(link);
  });
  $('script').each((i, el) => {
    const script = $(el).attr('src');
  });

  googleAnalytics = /GoogleAnalyticsObject/.test(page.data);

  return { title, links, googleAnalytics };
};

module.exports = getPageInfo;
