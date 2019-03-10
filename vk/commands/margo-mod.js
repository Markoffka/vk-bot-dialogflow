module.exports = async (o) => {
  o.app.bot.updates.use(async (ctx, next) => {
    if(ctx.senderId == '69784070')
    {
      ctx.send('ня')
    }
    await next();
  })
}