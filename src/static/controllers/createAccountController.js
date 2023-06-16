const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { connectToDatabase } = require('../db');

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

    const existingEmail = await checkEmailExists(forgotEmail);
    if (existingEmail) {
      console.log('Adresa de email există deja');

      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('There is already an account associated with this email address!');</script>
        <script>window.location.href = "/create-account";</script>
      `);
      return;
    }

    // same passwords
    if (password !== confirmPassword) {
      console.log('parole diferite');

      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('Passwords do not match');</script>
        <script>window.location.href = "/create-account";</script>
      `);
    } else {
      console.log('parole identice');

      // Verifică cerințele pentru parolă
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
      if (!passwordRegex.test(password)) {
        console.log('parola neconforma');

        res.setHeader('Content-Type', 'text/html');
        res.end(`
          <script>alert('Password must contain at least 4 characters, at least one uppercase letter, at least one lowercase letter and at least one number.');</script>
          <script>window.location.href = "/create-account";</script>
        `);
      } else {
        console.log('parola conforma');

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
        const algorithm = 'sha256';
        const hashedPassword = crypto.createHash(algorithm).update(saltedPassword).digest('hex');

        console.log('\tsalt-ul generat: ' + salt + '\n\tsalted: ' + saltedPassword + '\n\tpassword: ' + hashedPassword);

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
    }
  });
}

const checkEmailExists = async (email) => {
  let db = await connectToDatabase();
  const collection = db.collection('users');

  const existingUser = await collection.findOne({ email });

  return !!existingUser; // Returnează true dacă adresa de email există deja, altfel false
};


module.exports = { handleCreateAccountRequest, handleCreateAccountSubmit };
