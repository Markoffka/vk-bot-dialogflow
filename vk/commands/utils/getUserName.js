module.exports = (context, bot) => {
  /**
   * console.log(api.users.get({
     user_ids: context.senderId
   }));
   */
  /**
   * bot: {
     app: {
       token: String,
       id: Number,
       mode: String,
       bot: {
         run: function,
         vk: {
           VK,
           api
         }
       }
     }
   }
   */
  bot.app.bot.api.users.get({
    user_ids: context.senderId
  }).then(data => console.log(data));

  return "@User";
}