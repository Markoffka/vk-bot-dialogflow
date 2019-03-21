const cheerio = require('cheerio')
const axios = require('axios')

//FIXME: сменить cheerio на osmosis

module.exports = (phone) => {
  return axios.get('http://ss1.ru/' + phone).then(data => {
    const html = data.data;
    let $ = cheerio.load(html, {
      normalizeWhitespace: true
    })
    let info = {
      formatted: phone,
      code: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(5) > div:nth-child(1) > dl > dd:nth-child(5)').text() || 'неизвестно',
      region: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(5) > div:nth-child(1) > dl > dd:nth-child(7)').text() || 'неизвестно',
      operator: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(5) > div:nth-child(1) > dl > dd:nth-child(9)').text() || 'неизвестно',
      type: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(5) > div:nth-child(1) > dl > dd:nth-child(11)').text() || 'неизвестно',
      rate: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(5) > div:nth-child(1) > dl > span').text() || "неизвестно",
      stats : {
        unknowed : $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(1) > strong').text().split(' ')[0] || '0%',
        scam : $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(2) > strong').text().split(' ')[0] || '0%',
        promo : $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(3) > strong').text().split(' ')[0] || '0%',
        abuse : $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(4) > strong').text().split(' ')[0] || '0%',
        collector: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(5) > strong').text().split(' ')[0] || '0%',
        poll: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(6) > strong').text().split(' ')[0] || '0%',
        spam: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(7) > strong').text().split(' ')[0] || '0%',
        good: $('body > div.container > div > div.col-md-9 > div.code-index > div > div:nth-child(14) > div:nth-child(8) > strong').text().split(' ')[0] || '0%'
      }
    }
    return info
  })
}