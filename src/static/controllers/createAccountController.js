const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { connectToDatabase, getAuthentication } = require('../db');

function handleCreateAccountRequest(req, res) {
  const filePath = path.join(__dirname, '../pages/createAccount.html');

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

async function handleCreateAccountSubmit(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    const formData = new URLSearchParams(body);
    const username = formData.get('username');
    const forgotEmail = formData.get('forgotEmail');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    console.log(formData);

    if (password !== confirmPassword) {
      console.log('parole diferite');
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Passwords do not match</h1><script>window.location.href = "/login";</script>');
    } else {
      console.log('parole identice');

      let db = await connectToDatabase();
      const users = db.collection('users');
      const authentication = db.collection('Authentication');

      // Generăm saltul utilizând bcrypt
      const salt = await bcrypt.genSalt(10);

      // Adăugăm saltul și emailul în colecția "Authentication"
      const authData = {
        email: forgotEmail,
        salt: salt
      };
      await authentication.insertOne(authData);

      // Modificăm parola în "password+salt"
      const saltedPassword = password + salt;

      // Hashuim parola modificată utilizând bcrypt
      const hashedPassword = await bcrypt.hash(saltedPassword, 10);

      // Creăm obiectul utilizatorului
      const newUser = {
        username: username,
        email: forgotEmail,
        password: hashedPassword,
        type: 'user'
      };

      // Inserăm utilizatorul în colecția "users"
      await users.insertOne(newUser);

      console.log('Utilizatorul a fost inserat în baza de date');

      res.writeHead(302, { 'Location': '/login' });
      res.end();
    }
  });
}

module.exports = { handleCreateAccountRequest, handleCreateAccountSubmit };
