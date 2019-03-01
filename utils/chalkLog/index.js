const chalk = require("chalk");
const clog = console.log;
const cprimary = chalk.black.bgBlackBright;
const cerror = chalk.red.bgBlue;
const cinfo = chalk.blue;

module.exports = {
  log: console.log,
  error: (t) => clog(cerror(t)),
  info: (t) => clog(cinfo(t))
}