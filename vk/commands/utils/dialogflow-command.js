const {
  pope: format
} = require('pope')
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
  let DialogflowAnswer = answer.fulfillment.speech;
  let FormatData = {};
  let Message = "";

  GetUserName(ctx, bot).then(user_data => raw_data.user = user_data);

  try {
    let script = require(`./dialogflow_commands/${answer.action}.js`)
    script(options).then(data => {
      if (data) Object.assign(raw_data, data)
      return raw_data
    }).then(dataFromScript => {
      Object.assign(FormatData, dataFromScript);
    })
  } finally {
    Message = format(DialogflowAnswer, FormatData);
    ctx.send(Message);
  }
}