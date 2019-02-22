const {
  VK,
  Keyboard,
  Request
} = require("vk-io");
const vk = new VK();
const _ = require("lodash");
const port = process.env.PORT || 8080;

var http = require('http');

var server = http.Server((req, res) => {
  res.setHeader("Content-Type", "application/json;");
  res.end(`M4rkoffka_B0T`);
}).listen(port);

vk.setOptions({
  token: process.env.token,
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
    console.error("Error:", error);
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
  if (process.env.activity == 'off')
    process.exit(0);
  next();
})

updates.hear(
  /^([a-zA-Zа-яА-Я]+)\:([a-zA-Zа-яА-Я]+)(\s[a-zA-Zа-яА-Я]+|)$/i,
  async (ctx, next) => {
    let [, c, f, a] = ctx.$match

    await next();
  }
);


async function run() {
  if (process.env.UPDATES === "webhook") {
    await vk.updates.startWebhook();

    console.log("Webhook server started");
  } else {
    await vk.updates.startPolling();

    console.log("Polling started");
  }
}

run().catch(console.error);