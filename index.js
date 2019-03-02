const {
  VK,
  Keyboard,
  Request
} = require("vk-io");
const vk = new VK();
const _ = require("lodash");
const { Nuxt, Builder } = require('nuxt')
const nuxt = new Nuxt();
const express = require('express')
const app = express();
const body_parser = require('body-parser')
app.use(body_parser.json());
app.use(nuxt.render)
const port = process.env.PORT || 3000;
const chalkLog = require('./utils/chalkLog');
app.get('/', (req, res, next) => {
  res.send('Ok');
})
app.listen(port)
const TOKEN = process.env.token || require('./config.json').token
const GROUP_ID = process.env.groupId || require('./config.json').groupId
vk.setOptions({
  token: TOKEN,
  pollingGroupId: GROUP_ID
});

const {
  updates
} = vk;

const invites = {}

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
  /^бот, добавь меня$/i,
  async (ctx, next) => {
    if (_.findKey(invites, (id) => console.log
    ) > 1) {
      switch(invites[ctx.senderId].state){
        case 'new':
        await ctx.send('Вы были добавлены в очередь, ожидайте.');
        break;
        case 'success':
        await ctx.send('Вы успешно авторизованы, радуйтесь жизни.');
        break;
        case 'denied':
        await ctx.send('Отклонено.');
        break;
        case 'error':
        await ctx.send('Ошибка.');
        await ctx.send(`
        code : ${invites[ctx.senderId].error.code}
        message : ${invites[ctx.senderId].error.message}
        `)
        break;
        default:
        await ctx.send('Повторите попытку позже.');
        break;
      }
    }
    else {
      await ctx.send('Высылаю');
      console.log(ctx.senderId + ' wass addaded');
      invites[ctx.senderId] = { state : 'new' }
      setTimeout(()=>{
        inv = invites[263590903];
        inv.state = 'error'
        inv.error = {
          code : 1,
          message : 'Сервер авторизации, регистрации и всего чего только можно не отвечает, да я его и не спрашивал - его нет.'
        }
      }, 5000)
    }
    console.dir(invites)
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