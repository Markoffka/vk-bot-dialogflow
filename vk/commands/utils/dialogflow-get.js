const axios = require('axios')
let BOT_ID = process.env.dialogflow_id || require('../../../config.json').dialogFlow.id
module.exports = (text) => {
  return axios.get(`https://console.dialogflow.com/api-client/demo/embedded/${BOT_ID}/demoQuery`, {
    params: {
      q: text,
      sessionId: 'ad341a2c-62cc-426a-8cbd-2db34d28cf5a'
    }
  }).then(({ data }) => data.result)
}