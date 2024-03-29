const fs = require('fs');
const path = require('path');

function handleStatisticsRequest(req, res) {
  const filePath = path.join(__dirname, '../pages/statistics.html');

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

module.exports = { handleStatisticsRequest };
