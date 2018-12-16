var modules = [];
const fs = require('fs')
const { Keyboard } = require('vk-io');
module.exports = {
    command: 'all',
    exec: async(ctx) => {
        var mods = [];
        fs.readdirSync('./modules', (err, f) => {
            if (err) {
                console.error('[!] No such modules');
                return;
            }
            f.forEach(e => {
                console.log(e);

                try {
                    var m = require(`./${e}`);
                    mods.push(Keyboard.textButton({
                        label: e,
                        payload: {
                            command: m.command
                        }
                    }));
                } catch (error) {
                    console.log(error);
                }
            });
        });

        await ctx.send({
            message: 'Список всех коммнад.',
            keyboard: Keyboard.keyboard(mods)
        });
    }
}