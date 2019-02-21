module.exports = {
    command: 'start',
    exec: async (ctx, next) => {
        await ctx.send('Type /help for more help.');
        await next();
    }
}