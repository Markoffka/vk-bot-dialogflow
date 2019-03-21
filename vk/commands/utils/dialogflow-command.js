let format = require('string-template')

module.exports = async (answer, ctx, next) => {
  let options = { answer, ctx, next }
  let toSend = answer.fulfillment.speech;
  let raw_data = {
    name: '@user',
    bot_name: 'Auda'
  }
  //FIXME: set name to user name
  try {
    let script = require(`./dialogflow_commands/${answer.action}.js`)
    script(options).then(data => {
      if (data) Object.assign(raw_data, data)
      let res = format(toSend, raw_data)
      return res
    }).then(message => {
      ctx.send(message)
    })
  } catch (error) {
    ctx.send(toSend)
  }
}