const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    // Check the size of the body and reject if it's too large.
    if (body.length > 1e6) {
      res.writeHead(413, {'Content-Type': 'text/plain'}).end('Request Entity Too Large');
      req.connection.destroy();
      return;
    }
  });
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});