const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

function handleNominationsRequest(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Acces neautorizat. Tokenul lipsește.' }));
    return;
  }

  try {
    const decodedToken = jwt.verify(token, 'secret_key');
    const email = decodedToken.email;

    // Aici poți face orice operații adiționale cu adresa de email, cum ar fi salvarea într-o variabilă sau într-o bază de date

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
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Acces neautorizat. Tokenul invalid.' }));
  }
}

module.exports = { handleNominationsRequest };
