module.exports = {
    command: 'cat',
    exec: async(ctx) => {
        await Promise.all([
            ctx.send('Гружу кота 😻'),

            ctx.sendPhoto('https://loremflickr.com/400/300/')
        ]);
    }
}