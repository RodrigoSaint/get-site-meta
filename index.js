const axios = require("axios");
const cheerio = require("cheerio");

function getMetaData($, property) {
  return $(`head>meta[property="${property}"]`).attr('content');
}

function getSiteMetadata(url) {
  return axios.get(url)
  .then(result => {
    const $ = cheerio.load(result.data);
    return {
      title: getMetaData($, "og:title") || getMetaData($, "twitter:title") || $('title').contents(),
      description: getMetaData($, "og:description") || getMetaData($, "twitter:description") || getMetaData($, "description"),
      image: getMetaData($, "og:image") || getMetaData($, "twitter:image:src")
    }
  })  
}

getSiteMetadata("https://github.com/")
  .then(console.log)
