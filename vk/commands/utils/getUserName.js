const {
  VK,
} = require("vk-io");
const vk = new VK();
const {
  api
} = vk;

module.exports = (context) => {
  console.log(api.users.get({
    user_ids: context.senderId
  }));
  return "@User";
}