const osmosis = require('osmosis')
let SEARCH_STRING = ''
const baseUrl = 'http://gmt-max.net'
let results = []
module.exports = async ({
  answer,
  ctx,
  next
}) => {
  let {
    parameters: params
  } = answer
  if (!params['game']) return {}
  SEARCH_STRING = params['game']
  console.log(SEARCH_STRING);

  return new Promise((res, rej) => {
    osmosis
      .post(baseUrl + '/index.php?do=search', {
        do: 'search',
        subaction: 'search',
        search_start: 1,
        full_search: 0,
        result_from: 1,
        story: SEARCH_STRING
      })
      .find('#dle-content > .short_news_title')
      .set({
        title: '.short_news_title_center'
      })
      .follow('a')
      .find('.torrent > .title > a@href')
      .set('url')
      .data(el => {
        el.url = baseUrl + el.url
        results.push(el)
      })
      .done(() => {
        res({
          result: toText(results)
        })
        results = []
      })
  })
}

function toText(array) {
  result = ''
  array.map((el, i, arr) => {
    if (i >= 5) {
      result += ''
    } else {
      result +=
        `
${el.title}
  ${el.url}
------------------`
    }
  })
  return result
}