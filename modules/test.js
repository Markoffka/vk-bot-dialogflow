module.exports = {
  command: /(?'command'.+):(?'func'.+\b)(?'args'.+|)/i,
  exec: async (ctx, next) => {
    switch (ctx.match['command']) {
      case 'timer':
        switch (ctx.match['func']) {
          case 'on':
            ctx.reply('[test] Start timer');
            break;
          case 'off':
            ctx.reply('[test] Stop timer');
            break;
          default:
            ctx.reply(`Command ${ctx.match['command']} don\`t have function as ${ctx.match['func']}`);
            break;
        }
        break;
      case 'say':
        switch (ctx.match['func']) {
          case 'msg':
            if (ctx.match['args'].length > 0 && ctx.match['args'].trim() != '')
              ctx.send(ctx.match['args']);
            break;
          case 'audio':
            ctx.send('I can`t send audio, i have Jlanku :(');
            break;
          default:
            ctx.send(
              `:msg [text]
              -- Send [text] to channel
              :audio [Audio name] {Deprecated}
              -- Send [Audio] to channel
              
              -- Without function (:) - show this help message.
              `
            );
            break;
        }
        break;
      default:
        break;
    }
    next();
  }
}