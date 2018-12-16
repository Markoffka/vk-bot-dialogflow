var { Keyboard } = require('vk-io');
module.exports = {
    command: 'help',
    exec: async(ctx) => {
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
                }),
                Keyboard.textButton({
                    label: 'Uptime',
                    payload: {
                        command: 'uptime'
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
                    label: `Илон Маск`,
                    payload: {
                        command: 'mask'
                    },
                    color: Keyboard.POSITIVE_COLOR
                })
            ]).oneTime()
        });
    }
}