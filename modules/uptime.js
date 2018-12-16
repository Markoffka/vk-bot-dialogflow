module.exports = {
    command: 'uptime',
    exec: async(ctx, next) => {
        ctx.state.command = 'help';
        ctx.send(`
        Время аптайма:
            ${process.uptime()} сек.
        `)
    }
}