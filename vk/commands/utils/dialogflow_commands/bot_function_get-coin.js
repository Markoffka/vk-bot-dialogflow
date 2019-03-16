const _ = require('lodash')
module.exports = ({answer, ctx, next}) => {
  let coin = _(['орел', 'решка']).sample()
  return new Promise((res, rej)=>{
    res({coin: coin})
  })
}