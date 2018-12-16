const { VK, Keyboard, Request } = require('vk-io');
const vk = new VK();

const $token = process.env.token || require('./token');

var http = require('http');

const port = process.env.PORT || 8080;

var server = http.Server((req, res) => {
    res.setHeader("Content-Type", "application/json;");
    res.end(`Request count : ${temp.request_count}`);
}).listen(port);

vk.setOptions({
    token: $token,
    pollingGroupId: '159930509'
});

const temp = require('./utils/temp');
const { updates } = vk;
var modules = require('./modules');
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

updates.use(async(ctx, next) => {
    if (ctx.is('message')) {
        const { messagePayload } = ctx;

        ctx.state.command = messagePayload && messagePayload.command ?
            messagePayload.command :
            null;
    }

    await next();
});

updates.use(async(ctx, next) => {
    temp.request_count++;
    await next();
})

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

// hearCommand('start', async(ctx, next) => {
//     ctx.state.command = 'help';
//     await next();
// });
hearCommand('mask', async(ctx) => {
    temp.mask.entryCount = temp.mask.entryCount + 1;
    ctx.send({
        message: 'Илон маск хуй?',
        keyboard: Keyboard.keyboard([
            [
                Keyboard.textButton({
                    label: 'да',
                    payload: {
                        command: 'mask_yes'
                    },
                    color: Keyboard.POSITIVE_COLOR
                }),
                Keyboard.textButton({
                    label: 'нет',
                    payload: {
                        command: 'mask_no'
                    },
                    color: Keyboard.NEGATIVE_COLOR
                })
            ]
        ]).oneTime()
    })
})

hearCommand('time', ['/time', '/date'], async(ctx) => {
    await ctx.send(String(new Date().toLocaleTimeString()));
});

hearCommand('reverse', /^\/reverse (.+)/i, async(ctx) => {
    const text = ctx.$match[1];
    const reversed = text.split('').reverse().join('');
    await ctx.send(reversed);
});

hearCommand('mask_yes', temp.mask.yes);
hearCommand('mask_no', temp.mask.no);

async function run() {
    console.log($token ? 'Token ok' : 'No token');
    modules(hearCommand);
    await vk.updates.startPolling();
    console.log('Polling started');
}

run().catch(console.error);