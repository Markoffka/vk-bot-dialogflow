const bot = require('./vk')
const server = require('./server')

server.start({
  port: process.env.PORT || 80,
  ip: process.env.IP || '0.0.0.0'
})

bot.run({
  token: require('./config.json').token,
  id : require('./config.json').groupId,
  mode: 'polling', // webhook or polling
  bot,
  server
})