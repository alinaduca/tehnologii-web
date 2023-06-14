const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

function handleLoginRequest(req, res) {
  const filePath = path.join(__dirname, '../pages/login.html');

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

// handleLoginSubmission pentru cererea POST
function handleLoginSubmission(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const formData = new URLSearchParams(body);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Verificare și validare autentificare
    // Verificați dacă emailul și parola sunt valide
    // Poate fi adăugată validare în funcție de nevoile dvs.

    if (email === 'alina_duca@yahoo.com' && password === '12345678') {
      // Autentificare reușită
      var loginButton = document.getElementById("loginButton");
      loginButton.style.display="none";
      res.writeHead(302, { 'Location': '/' });
      // res.write('<h1>Autentificare reușită!</h1>');
      res.end();
    } else {
      // Autentificare eșuată
      res.writeHead(401, { 'Content-Type': 'text/html' });
      res.write('<h1>Autentificare eșuată. Vă rugăm să verificați emailul și parola.</h1>');
      res.end();
    }
  });
}

function handleLoginSubmit(req, res) {
  const { email, password } = req.body;

  // Verifică datele de login în baza de date sau în altă sursă de autentificare

  // Exemplu simplu de verificare
  if (email === 'user@example.com' && password === 'password123') {
    // Generare token JWT
    const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });

    res.header('Authorization', `Bearer ${token}`);

    // Returnează tokenul în răspunsul către client
    res.status(200).json({ message: 'Autentificare reușită', token });
  } else {
    res.status(401).json({ message: 'Autentificare eșuată' });
  }
}


module.exports = { handleLoginRequest, handleLoginSubmission };
