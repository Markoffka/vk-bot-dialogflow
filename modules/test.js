const path = require('path');
const cwd = process.cwd();
const path_to_utils = path.join(cwd, 'utils')
const Module = require(path.join(
  path_to_utils,
  'module',
  'Module.js'
))

const name = 'Echo'
const alias = /echo(.+)/i

class test extends Module {
  constructor(bot) {
    super(bot)
    super._name = name;
    super._alias = alias;
    super._exec = this.exec;
  }
  async init(){
    super.Init();
  }

  async command(ctx, next){
    await ctx.send(ctx.$match[1] ? 'Echo: ' + ctx.$match[1] : 'Echo');
    next();
  }

  async die(){
    super.Die();
  }
}

module.exports = test