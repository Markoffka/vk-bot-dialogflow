module.exports = {
    command: 'start',
    exec: async(ctx, next) => {
        await ctx.send('Type /help for more help.');
        ctx.state.command = 'mask';
        await next();
    }
}