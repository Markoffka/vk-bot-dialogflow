const {
  VK,
  Keyboard,
  Request
} = require("vk-io");
const vk = new VK();
const _ = require("lodash");
const port = process.env.PORT || 8080;

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

updates.hear(
  /^(\w+)\:(\w+) (.+)$/gim,
  async (ctx, next) => {
    await ctx.send(`
      command: ${ctx.$match.command}
      function: ${ctx.$match.function}
      arguments: ${ctx.$match.arguments}
    `);
    next();
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