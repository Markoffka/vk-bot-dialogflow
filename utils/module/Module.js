class Module {
  constructor(bot){
    this._bot = bot
  }
  Init(){
    console.log(`[${this._name}] Initialization - - - end`);
  }
  Command(ctx){
    if(ctx.text == this._name) ctx.send('U command me')
  }
  Die(){

  }
}

module.exports = Module