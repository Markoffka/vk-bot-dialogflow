const {
  VK,
  Keyboard,
  Request
} = require("vk-io");
const vk = new VK();
var http = require("http");
const _ = require("lodash");
const port = process.env.PORT || 8080;
var server = http
  .Server((req, res) => {
    res.setHeader("Content-Type", "application/json;");
    res.send(JSON.stringify({
      error: {
        message: 'Unexepted error',
        code: '-1'
      }
    }, null, 2));
  })
  .listen(port);
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

const hearCommand = (name, conditions, handle) => {
  if (typeof handle !== "function") {
    handle = conditions;
    conditions = [`/${name}`];
  }

  if (!Array.isArray(conditions)) {
    conditions = [conditions];
  }

  updates.hear(
    [(text, {
      state
    }) => state.command === name, ...conditions],
    handle
  );
};

hearCommand("start", async (ctx, next) => {
  ctx.state.command = "help";

  await next();
});

updates.hear(
  /(?<command>\w+)(?<delim>\W)(?<function>\w+)(?<arguments>.*)/gim,
  async (ctx, next) => {
    await ctx.send(JSON.stringify(ctx.$match, null, 2));
    next();
  }
);

hearCommand("get:help", async ctx => {
  /* await ctx.send({
    message: "мур",
    keyboard: Keyboard.keyboard([
      Keyboard.textButton({
        label: "Помощь",
        payload: {
          command: "help"
        }
      }),
      Keyboard.textButton({
        label: "Время",
        payload: {
          command: "time"
        }
      }),
      [
        Keyboard.textButton({
          label: "Фото",
          payload: {
            command: "cat"
          },
          color: Keyboard.PRIMARY_COLOR
        }),
        Keyboard.textButton({
          label: "Мур",
          payload: {
            command: "purr"
          },
          color: Keyboard.PRIMARY_COLOR
        })
      ],
      Keyboard.textButton({
        label: `Илон Маск`,
        payload: {
          command: "mask"
        },
        color: Keyboard.POSITIVE_COLOR
      })
    ]).oneTime()
  }); */

  ctx.reply(`
    ## Help message
    # get
      :help
      -- Get this message
      :[time, date]
      -- Get current time
      :cat
      -- Get cat photo
      :purr
      -- Get cat purr
    # do
      :reverse (text)
      -- Reverse text to txet
  `);
});
hearCommand("get:cat", async ctx => {
  await Promise.all([
    ctx.send("Гружу кота 😻"),

    ctx.sendPhoto("https://loremflickr.com/400/300/")
  ]);
});

hearCommand("time", ["get:time", "get:date"], async ctx => {
  await ctx.send(String(new Date().toLocaleTimeString()));
});

hearCommand("reverse", /^do\:reverse (.+)/i, async ctx => {
  const text = ctx.$match[1];
  const reversed = text
    .split("")
    .reverse()
    .join("");
  await ctx.send(reversed);
});

const catsPurring = [
  "http://ronsen.org/purrfectsounds/purrs/trip.mp3",
  "http://ronsen.org/purrfectsounds/purrs/maja.mp3",
  "http://ronsen.org/purrfectsounds/purrs/chicken.mp3"
];

hearCommand("purr", async ctx => {
  const link = catsPurring;

  await Promise.all([ctx.send("Мур мур"), ctx.sendAudioMessage(link)]);
});

async function run() {
  setInterval(() => {
    const request = new Request("users.get", {
      owner_id: 1
    });
    console.log(request);
  }, 1000 * 60 * 29);

  if (process.env.UPDATES === "webhook") {
    await vk.updates.startWebhook();

    console.log("Webhook server started");
  } else {
    await vk.updates.startPolling();

    console.log("Polling started");
  }
}

run().catch(console.error);