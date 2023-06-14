const fs = require('fs');
const path = require('path');

function handleNominationsRequest(req, res) {
  try {
    const filePath = path.join(__dirname, '../pages/nominalizations.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('404 Not Found');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'A apărut o eroare la obținerea datelor de la TMDb' }));
  }
}

module.exports = { handleNominationsRequest };
