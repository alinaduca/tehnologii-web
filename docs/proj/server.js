const http = require('http');
const fs = require('fs');
const path = require('path');
const getData = require('./dataAPI');

const PORT = 1235;

const server = http.createServer((req, res) => {
  // Handle API requests
  if (req.url === '/api/data' && req.method === 'GET') {
    getData(req, res);
  }
  // Handle HTML file request
  else if (req.url === '/' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(content);
    });
  }
  // Handle other requests
  else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});