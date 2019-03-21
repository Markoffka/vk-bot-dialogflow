const server = require('./Server')
const vk = require('./vk')

server
  .setOptions({
    port: process.env.PORT || require(config).server.port
  })
  .start()

vk
  .setOptions({
    token: require(config).vk.token
  })
  .start()