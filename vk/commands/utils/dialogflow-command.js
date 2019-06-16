const format = require('string-template')
const GetUserName = require('./getUserName');
module.exports = async (answer, ctx, next, bot) => {
  let options = {
    answer,
    ctx,
    next
  }
  let toSend = answer.fulfillment.speech;
  let raw_data = {
    bot_name: 'Auda'
  }

  GetUserName(ctx, bot).then(user_data => raw_data.user = user_data);

  try {
    let script = require(`./dialogflow_commands/${answer.action}.js`)
    script(options).then(data => {
      if (data) Object.assign(raw_data, data)
      let res = format(toSend, raw_data)
      console.log(res);
      console.log(raw_data.user.first_name);


      return res
    }).then(message => {
      console.log(ctx)
      ctx.send(message)
    })
  } catch (error) {
    ctx.send(toSend)
  }
}