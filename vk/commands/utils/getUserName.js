module.exports = (context, bot) => {
  console.log(__dirname)
  console.log(__dirname + '/credentials.json')
  console.log(require(__dirname + '/credentials.json'))
  return bot.app.bot.api.users.get({
    user_ids: context.senderId
  }).then(user => user[0]);
}