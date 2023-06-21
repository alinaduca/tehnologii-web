const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookie = require('cookie');
const { getClient, connectToDatabase } = require("../database/dbManager");

let userType;
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
  req.on('end', async () => {
    const formData = new URLSearchParams(body);
    const email = formData.get('email');
    const password = formData.get('password');
    const client = getClient();
    const db = client.db('sagdatabase');
    const authentication = db.collection('Authentication');

    // found the user by the email adress
    const user = await authentication.findOne({ email });

    if (user) {
      // the user exists
      const salt = user.salt;
      users = db.collection('users');
      user1 = await users.findOne({ email });
      const DBhashedPassword = user1.password;

      // Hash-uim parola modificată utilizând bcrypt
      const saltedPassword = password + salt;
      const algorithm = 'sha256';
      const hashedPassword = crypto.createHash(algorithm).update(saltedPassword).digest('hex');   

      // verify if the passwords are the same
      if (hashedPassword == DBhashedPassword) {
        // Parola este corectă
        console.log('Autentificare reușită');

        // generare token JWT 
        const secretKey = 'ak1j3bk^jb4986:BKG9h%jG#I7687jhg!';
        const token = jwt.sign({ email }, secretKey);

        // adaugare token în antetul răspunsului http
        res.setHeader('Authorization', 'Bearer ' + token);

        // Setați cookie-ul în răspunsul HTTP
        const cookieToken = cookie.serialize('token', token, {
          maxAge: 3600, // durata de viață a cookie-ului în secunde
          httpOnly: true,
        });

        res.setHeader('Set-Cookie', cookieToken);

        res.setHeader('Content-Type', 'text/html');
        userType = user1.type;
        if(user1.type === "user") {
          res.end(`
            <script>window.location.href = "/";</script>
         `);
        }
        else {
          res.end(`
            <script>window.location.href = "/all-users";</script>
         `);
        }
      } else {
        // Parola este incorectă
        console.log('Parolă incorectă');
        res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('The password is incorrect!');</script>
        <script>window.location.href = "/login";</script>
      `);
      }
    } else {
      // Utilizatorul nu există în baza de date
      console.log('Utilizatorul nu există');
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('There is no account associated with this email address!');</script>
        <script>window.location.href = "/login";</script>
      `);
    }
    
  });
}

function getUserType() {
  return userType;
}

module.exports = { handleLoginRequest, handleLoginSubmission, getUserType };
