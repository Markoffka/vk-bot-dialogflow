const _ = require('lodash')
module.exports = async (params, ctx, next) => {
  ctx.send(_(['орел', 'решка']).sample())
}