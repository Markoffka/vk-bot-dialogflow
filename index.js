const bot = require('./vk')
const server = require('./server')

server.start({
  port: process.env.PORT || 80,
  ip: process.env.IP || '0.0.0.0'
})

bot.run({
  token: process.env.TOKEN || require('./config.json').token,
  id : process.env.groupID || require('./config.json').groupId,
  mode: 'polling', // webhook or polling
  bot,
  server
})