module.exports = async (o) => {
  o.app.bot.updates.hear(/^echo (.*)$/i, async (ctx) => {
    ctx.send('Echo: ' + ctx.$match[1]);
  })
}