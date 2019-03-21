const server = require('./Server')
const vk = require('./vk')

const activity = () => {
  let a = process.env.activity || 1
  return parseInt(a)
}

if (activity == 0) return;

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