module.exports = async (o) => {
  o.app.bot.updates.use(async (ctx, next) => {
    if(ctx.senderId == '69784070' && ctx.hasText)
    {
      if( (/ня/gim).exec(ctx.text))
        if(Math.random() * 10 == 5)
          ctx.send('ня')
    }
    await next();
  })
}