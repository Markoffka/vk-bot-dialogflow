/*
const osmosis = require('osmosis')
const chalk = require('chalk')
const wrap = require('wordwrap')(75)

let SEARCH_STRING = ''
let baseUrl = 'http://gmt-max.net'

const warning = (text) => console.log(word(chalk.red(text)))
let results = []

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
  .done(() => {})
  */

module.exports = () => {
  return new Promise((res, rej) => {
    res({
      text: 'Этот текст в скрипте.'
    })
  })
}