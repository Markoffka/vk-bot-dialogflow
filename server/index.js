const express = require('express')
const app = express()
const expressVue = require('express-vue')
const expressVueMiddleware = expressVue.init();
app.use(expressVueMiddleware);

require('./midleware/main')(app);

async function start(opts){
  if(!opts.port) throw Error('Port is required');
  app.listen(opts.port)
  console.log(`Server listen on ${opts.ip}:${opts.port}`)
}

module.exports = {
  start: start,
  app : app,
  express : express
}