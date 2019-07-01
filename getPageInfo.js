const axios = require('axios');
const cheerio = require('cheerio');

const getPageInfo = async url => {
  let result = {};
  try {
    result = await axios.get(url);
  } catch (error) {
    return { err: 'invalid url' };
  }
  const $ = cheerio.load(result.data);
  const title = $('title').text();
  const links = [];
  $('a').each((i, item) => {
    const link = $(item).attr('href');
    links.push(link);
  });
  return { title, links };
};

module.exports = getPageInfo;
