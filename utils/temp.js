module.exports = {
    mask: {
        entryCount: 0
    },
    request_count: 0,
    margo: {
        isNotify: true,
        notify: '[id69784070|Ув.Мортисия] вас упомянули.'
    },
    direct: 'Напомните админу, что бы дал мне права читать сообщения...',
    owner: {
        vk: 'http://vk.com/furryanonim',
        id: '263590903',
        name: 'Markoffka',
        screen_name: 'furryanonim'
    },
    mask: {
        question: 'Илон Маск хуй?',
        yes: async(ctx) => {
            await ctx.send('Ты нормальный чел.');
        },
        no: async(ctx) => {
            await ctx.send('Ты омежка.');
        }
    }
}