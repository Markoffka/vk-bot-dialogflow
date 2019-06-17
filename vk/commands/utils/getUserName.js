module.exports = (context, bot) => {
  return bot.app.bot.api.users.get({
    user_ids: context.senderId
  }).then(user => user[0]);
}