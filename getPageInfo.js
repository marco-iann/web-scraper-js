const axios = require('axios');
const cheerio = require('cheerio');

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

  // get links
  const links = [];
  $('a').each((i, el) => {
    const link = $(el).attr('href');
    links.push(link);
  });
  $('script').each((i, el) => {
    const script = $(el).attr('src');
  });

  // check google analytics
  googleAnalytics = /www.google-analytics.com\/analytics.js/.test(
    response.data
  );

  // check if secure
  secure = response.request.res.client._httpMessage.agent.protocol === 'https:';
  return { title, links, googleAnalytics, secure };
};

module.exports = getPageInfo;
