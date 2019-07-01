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
  return { title };
};

module.exports = getPageInfo;
