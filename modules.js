var fs = require('fs');
module.exports = (hear) => {
    fs.readdir('./modules/', (err, f) => {
        if (err) {
            console.error('[!] No such modules');
            return;
        }
        f.forEach(e => {
            try {
                var m = require(`./modules/${e}`);
                hear(m.command, m.exec);
            } catch (error) {}
        });
    });
}