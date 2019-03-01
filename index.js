const {
  VK,
  Keyboard,
  Request
} = require("vk-io");
const vk = new VK();
const _ = require("lodash");
const port = process.env.PORT || 8080;

const chalkLog = require('./utils/chalkLog');

var http = require("http");

var server = http
  .Server((req, res) => {
    chalkLog.log("New connection on http");
    res.setHeader("Content-Type", "application/json;");
    res.end(`M4rkoffka_B0T`);
  })
  .listen(port);

const TOKEN = process.env.token || require("./config.json").token;

vk.setOptions({
  token: TOKEN,
  pollingGroupId: "159930509"
});

const {
  updates
} = vk;

// Skip outbox message and handle errors
updates.use(async (ctx, next) => {
  if (ctx.is("message") && ctx.isOutbox) {
    return;
  }
  try {
    await next();
  } catch (error) {
    console.erroctx.reply("Error:", error);
  }
});

updates.use(async (ctx, next) => {
  if (ctx.is("message")) {
    const {
      messagePayload
    } = ctx;

    ctx.state.command =
      messagePayload && messagePayload.command ? messagePayload.command : null;
  }
  await next();
});

updates.use(async (ctx, next) => {
  if (process.env.activity == "off") process.exit(0);
  next();
});

updates.hear(
  /^([a-zA-Zа-яА-Я]+)\:([a-zA-Zа-яА-Я]+)(\s[a-zA-Zа-яА-Я]+|)$/i,
  async (ctx, next) => {
    let [, c, f, a] = ctx.$match;
  }
);

async function run() {
  if (process.env.UPDATES === "webhook") {
    chalkLog.info("Bot webhook started.")
    await vk.updates.startWebhook();
  } else {
    chalkLog.info("Bot polling started.")
    await vk.updates.startPolling();
  }
}

run().catch(console.error);