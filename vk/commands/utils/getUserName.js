module.exports = (context, bot) => {
  return bot.app.bot.api.users.get({
    user_ids: context.senderId
  });
}