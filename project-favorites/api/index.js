const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');
let data = require('./urls.json');

http.createServer((req, res) => {
  const { name, url, del } = URL.parse(req.url, true).query;

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  });

  function writeFile(cb) {
    fs.writeFile(
      path.join(__dirname, 'urls.json'),
      JSON.stringify(data, null, 2),
      err => {
        if (err) throw err;
        cb('Operação realizada com sucesso!');
      }
    );
  }

  if (!name || !url) {
    if (del) {
      data.urls = data.urls.filter(item => item.url != del);
      return writeFile(message => res.end(message));
    } else {
      return res.end(JSON.stringify(data));
    }
  }

  data.urls.push({ name, url });
  return writeFile(message => res.end(message));
}).listen(3000, () => console.log('API rodando...'));
