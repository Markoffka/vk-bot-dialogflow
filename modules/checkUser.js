module.exports = {
    command: 'status',
    exec: async(ctx, next) => {
        await ctx.send('U check my status, i`ll check ur asshole... bitch');
        await next()
    }
}