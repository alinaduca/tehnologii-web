const fs = require('fs');
const path = require('path');

function handleIndexRequest(req, res) {
    const filePath = path.join(__dirname, '../index.html');
  
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
}


module.exports = { handleIndexRequest };
