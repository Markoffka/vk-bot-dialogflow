const chalk = require('./chalkLog')
const _chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const bot_dir = process.cwd();
const path_to_modules = path.join(bot_dir, 'modules');

let paths = fs.readdirSync(path_to_modules)

const _modules = []
const modules = []

const test_ctx = {
  text : 'Auda, echo me',
  send : (text) => {
    chalk.error(text);
  }
}

let reg = /Auda, (.+)/gi

paths.forEach((
  mod_name,
  mod_ind,
  arr
) => {
  let module_path = path.join(path_to_modules, mod_name)
  chalk.log('Found module: ' + _chalk.red.bold(mod_name))
  let module = new (require(module_path))()
  let match = reg.exec(test_ctx)
  let mod_match = module._alias.exec(match);
  test_ctx['$match'] = mod_match;
  module.init(test_ctx)
  module.command(test_ctx)
})

