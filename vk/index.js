const {
  VK,
  Keyboard,
  Request
} = require("vk-io");
const vk = new VK();
const {
  updates,
  api
} = vk;

const commands = require('./commands')

updates.use(async (ctx, next) => {
  if (ctx.is("message") && ctx.isOutbox) {
    return;
  }
  try {
    await next();
  } catch (error) {
    console.log("Error:", error);
  }
});

async function run(opts) {
  if (!opts.token) throw Error('Token is required!')
  if (!opts.id) throw Error('Group Id is required!')

  vk.setOptions({
    token: opts.token,
    pollingGroupId: opts.id
  });

  commands.load(opts)

  if (process.env.UPDATES === "webhook" || opts.mode == 'webhook') {
    console.log("Bot webhook started.")
    await vk.updates.startWebhook();
  } else {
    console.log("Bot polling started.")
    await vk.updates.startPolling();
  }
}

module.exports = {
  run: run,
  vk: vk,
  _vk: VK,
  updates,
  api
}