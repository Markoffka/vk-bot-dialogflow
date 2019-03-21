const bot = require('./vk')
const server = require('./server')

if(process.env.activity === 0) throw new Error('Activity is off');

server.start({
  port: process.env.PORT || 80,
  ip: process.env.IP || 'localhost'
})

bot.run({
  token: process.env.token || require('./config.json').token,
  id : process.env.groupID || require('./config.json').groupId,
  mode: 'polling', // webhook or polling
  bot,
  server
})