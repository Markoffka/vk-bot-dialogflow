const axios = require('axios')
let BOT_ID = process.env.dialogflow_id || require('../../../config.json').dialogFlow.id

module.exports = {
  getFromCtx: (text, id, ctx) => {
    return axios.get(`https://console.dialogflow.com/api-client/demo/embedded/${BOT_ID}/demoQuery`, {
      params: {
        q: text,
        sessionId: id
      }
    }).then(({ data }) => {
      return data.result.fulfillment.speech
    }).catch(err => {
      return '(глупо смотрит на тебя)'
    })
  },
  get: (text) => {
    return axios.get(`https://console.dialogflow.com/api-client/demo/embedded/${BOT_ID}/demoQuery`, {
      params: {
        q: text,
        sessionId: 'ad341a2c-62cc-426a-8cbd-2db34d28cf5a'
      }
    }).then(({ data }) => data.result)
  },
  command: async (answer, ctx, next) => {
    if(answer.fulfillment.speech) await ctx.send(answer.fulfillment.speech)
    try {
      console.log(`Use action ${answer.action}`);
      let command = answer.action
      let file = command + '.js'
      let script = require('./dialogflow_commands/'+file)
      script(answer.parameters, ctx, next)
    } catch (error) {
        /* await ctx.send('я не смогла') */
      return;
    }
  }
}