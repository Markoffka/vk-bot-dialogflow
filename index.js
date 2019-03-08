const bot = require('./vk')
const server = require('./server')

server.start({
  port: process.env.PORT || 80,
  ip: process.env.IP || 'localhost'
})

bot.run({
  token: process.env.TOKEN,
  id : process.env.groupID,
  mode: 'polling', // webhook or polling
  bot,
  server
})