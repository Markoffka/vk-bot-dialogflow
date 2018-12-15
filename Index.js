const { VK, Keyboard } = require('vk-io');
const http = require('http')
var port = process.env.PORT ||8080;
const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}
const server = http.createServer(requestHandler)
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
const vk = new VK();

vk.setOptions({
    token: process.env.token,
    pollingGroupId: '159930509'
});
const anw = {
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
const { updates } = vk;


// Skip outbox message and handle errors
updates.use(async(ctx, next) => {
    if (ctx.is('message') && ctx.isOutbox) {
        return;
    }

    try {
        await next();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Handle message payload
updates.use(async(ctx, next) => {
    if (ctx.is('message')) {
        const { messagePayload } = ctx;

        ctx.state.command = messagePayload && messagePayload.command ?
            messagePayload.command :
            null;
    }

    await next();
});

const hearCommand = (name, conditions, handle) => {
    if (typeof handle !== 'function') {
        handle = conditions;
        conditions = [`/${name}`];
    }

    if (!Array.isArray(conditions)) {
        conditions = [conditions];
    }

    updates.hear(
        [
            (text, { state }) => (
                state.command === name
            ),
            ...conditions
        ],
        handle
    );
};

hearCommand('start', async(ctx, next) => {
    ctx.state.command = 'help';

    await next();
});

hearCommand('help', async(ctx) => {
    await ctx.send({
        message: 'мур',
        keyboard: Keyboard.keyboard([
            Keyboard.textButton({
                label: 'Помощь',
                payload: {
                    command: 'help'
                }
            }),
            Keyboard.textButton({
                label: 'Время',
                payload: {
                    command: 'time'
                }
            }), [
                Keyboard.textButton({
                    label: 'Фото',
                    payload: {
                        command: 'cat'
                    },
                    color: Keyboard.PRIMARY_COLOR
                }),
                Keyboard.textButton({
                    label: 'Мур',
                    payload: {
                        command: 'purr'
                    },
                    color: Keyboard.PRIMARY_COLOR
                })
            ],
            Keyboard.textButton({
                label: 'Илон Маск',
                payload: {
                    command: 'mask'
                },
                color: Keyboard.POSITIVE_COLOR
            })
        ]).oneTime()
    });
});
hearCommand('mask', async(ctx) => {
    ctx.send({
        message: 'Илон маск хуй?',
        keyboard: Keyboard.keyboard([
            [
                Keyboard.textButton({
                    label: 'да',
                    payload: {
                        command: 'yes'
                    },
                    color: Keyboard.POSITIVE_COLOR
                }),
                Keyboard.textButton({
                    label: 'нет',
                    payload: {
                        command: 'no'
                    },
                    color: Keyboard.NEGATIVE_COLOR
                })
            ]
        ]).oneTime()
    })
})
hearCommand('cat', async(ctx) => {
    await Promise.all([
        ctx.send('Гружу кота 😻'),

        ctx.sendPhoto('https://loremflickr.com/400/300/')
    ]);
});

hearCommand('time', ['/time', '/date'], async(ctx) => {
    await ctx.send(String(new Date().toLocaleTimeString()));
});

hearCommand('reverse', /^\/reverse (.+)/i, async(ctx) => {
    const text = ctx.$match[1];
    const reversed = text.split('').reverse().join('');
    await ctx.send(reversed);
});

const catsPurring = [
    'http://ronsen.org/purrfectsounds/purrs/trip.mp3',
    'http://ronsen.org/purrfectsounds/purrs/maja.mp3',
    'http://ronsen.org/purrfectsounds/purrs/chicken.mp3'
];

hearCommand('purr', async(ctx) => {
    const link = catsPurring[Math.floor(Math.random() * catsPurring.length)];

    await Promise.all([
        ctx.send('Wait for the uploads purring 😻'),

        ctx.sendAudioMessage(link)
    ]);
});
hearCommand('yes', async(ctx) => {
    ctx.send('Я знал, что илон хуй моржовый');
});
hearCommand('no', async(ctx) => {
    ctx.send('Да ты один из этих самых.');
});
async function run() {
    if (process.env.UPDATES === 'webhook') {
        await vk.updates.startWebhook();

        console.log('Webhook server started');
    } else {
        await vk.updates.startPolling();

        console.log('Polling started');
    }
}

run().catch(console.error);
