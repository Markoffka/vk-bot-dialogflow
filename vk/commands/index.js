const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {Object} app 
 */
function load(app) {
  let p = __dirname;

  // files in this directory with .js ext
  // disable this file from list
  let jsFiles = fs.readdirSync(p)
  jsFiles = jsFiles.filter((e, i, arr) => {
    if (!e.startsWith('index.js') && e.endsWith('.js')) {
      return true
    } else {
      return false
    }
  })

  jsFiles.forEach((e, i) => {
    try {
      let commandPath = path.resolve(p, e)
      let command = require(commandPath)
      let subNames = e.split('.');
      subNames.pop()
      let options = {
        app: app,
        sub: subNames,
        path: commandPath
      }
      command(options)
    } catch (error) {
      console.log(`${e} error`)
    }
  })
}

module.exports = {
  load: load
}