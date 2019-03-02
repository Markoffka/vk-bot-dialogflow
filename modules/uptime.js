const path = require('path');
const cwd = process.cwd();
const path_to_utils = path.join(cwd, 'utils')
const Module = require(path.join(
  path_to_utils,
  'module',
  'Module.js'
))

const name = 'Uptime'
const alias = /(ut|upt|uptime)/i


class test extends Module {
  constructor(bot) {
    super(bot)
  }
  async init(){
    super.Init();
  }

  async command(ctx, next){
    await ctx.send(process.uptime());
    next();
  }

  async die(){
    super.Die();
  }
}


module.exports = test