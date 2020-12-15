const fs = require('fs');

function writeLogs(log) {
  fs.readFile('./logs.json', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const data = {
          'logs': []
        };
        data.logs.push(log);
        fs.writeFile('./logs.json', JSON.stringify(data), (err) => {
          if (err) {
            console.log(`logs wasn't written`);
          } else {
            console.log(`logs was written`);
          }
        });
      } else {
        console.log(`logs wasn't read and written`);
      }
    } else {
      const data = JSON.parse(content);
      data.logs.push(log);
      fs.writeFile('./logs.json', JSON.stringify(data), (err) => {
        if (err) {
          console.log(`logs wasn't written`);
        } else {
          console.log(`logs was written`);
        }
      });
    }
  });
}

module.exports = (req, res, next) => {
  const date = new Date();
  const method = req.method;
  const url = req.url;
  const log = {
    date,
    method,
    url
  };
  writeLogs(log);
  next();
};
