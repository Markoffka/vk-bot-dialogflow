const path = require('path')
const fs = require('fs');
module.exports = (hear) => {
  fs.readdir(path.join('modules'), (err, f) => {
    if (err) {
      console.error(err.message);
      return;
    }
    f.forEach(e => {
      try {
        var m = require(module_path);
        console.log('Loading module');
        hear(m.command, m.exec);
      } catch (error) { }
    });
  });
}