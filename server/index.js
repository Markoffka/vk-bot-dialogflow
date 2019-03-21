const express = require('express')
const app = express()

require('./midleware/main')(app);

async function start(opts) {
  if (!opts.port) throw Error('Port is required');
  app.listen(opts.port)
  console.log(`Server listen on port ${opts.port}`)
}

module.exports = {
  start: start,
  app: app,
  express: express
}