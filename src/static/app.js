const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleStatisticsRequest } = require('./controllers/statisticsController');
const { handleNominationsRequest } = require('./controllers/nominationsController');
const { handleNewsRequest } = require('./controllers/newsController');
const { handleIndexRequest } = require('./controllers/indexController');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);
  const fileExtension = path.extname(filePath);

  if (req.url === '' && req.method === 'GET') {
    handleIndexRequest(req, res);
  } else if (req.url === '/statistics' && req.method === 'GET') {
    handleStatisticsRequest(req, res);
  } else if (req.url === '/nominations' && req.method === 'GET') {
    handleNominationsRequest(req, res); 
  } else if (req.url === '/news' && req.method === 'GET') {
    handleNewsRequest(req, res); 
  } else if (fileExtension === '.css') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});



const port = 3000;

server.listen(port, () => {
  console.log(`Serverul a pornit pe portul ${port}`);
});