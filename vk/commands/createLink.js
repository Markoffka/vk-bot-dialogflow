module.exports = async ({ app }) => {
  app.bot.updates.hear(/!(.+)/m, async (ctx, next) => {
    let request = app.natural.tokenizer.tokenize(ctx.$match[1]);
    
    next()
  })
}

const ex = (pat, t) => {
  return new Promise((res, rej) => {
    let result = pat.exec(t);
    if (result) {
      res(result);
    }
    rej({ code: 0, message: 'no mathes' });
  })
}
