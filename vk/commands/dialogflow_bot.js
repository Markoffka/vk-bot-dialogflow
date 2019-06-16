const check = require('./utils/getPhoneStats');
const dialogflow = require('./utils/dialogflow')

module.exports = async (o) => {
  o.app.bot.updates.hear(/(.+)/i, async (ctx, next) => {
    let query = ''
    if (ctx.isFromUser) query = ctx.text
    else query = (/\[club159930509\|.*\](.+)/i).exec(ctx.text)
    if (query === null) return;
    else if (typeof query === 'object') query = query[1]
    query = query.trim();
    console.log(`User ${query}`);
    let answer = await dialogflow.get(query, ctx.senderId, ctx)
    dialogflow.command(answer, ctx, next, o)
    await next();
  })
}