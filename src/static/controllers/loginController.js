const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookie = require('cookie');

const { getClient } = require("../database/dbManager");

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

    let isLoggedIn = false;

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

      // Hashuim parola modificată utilizând bcrypt
      const saltedPassword = password + salt;

      const algorithm = 'sha256';
      const hashedPassword = crypto.createHash(algorithm).update(saltedPassword).digest('hex');   

      // verify if the passwords are the same
      const isPasswordCorrect = await bcrypt.compare(hashedPassword, DBhashedPassword);

      if (hashedPassword == DBhashedPassword) {
        // Parola este corectă
        isLoggedIn = true;
        console.log('Autentificare reușită');

        // genere token JWT 
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
        res.end(`
          <script>window.location.href = "/";</script>
       `);
        // res.writeHead(302, { 'Location': '/' });
        // res.end();
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
    

    // if (email === 'alina_duca@yahoo.com' && password === '12345678') {
    //   isLoggedIn = true;
    //   res.writeHead(302, { 'Location': '/all-users' });
    //   res.end();
    // } else {
    //   // Autentificare eșuată
    //   res.writeHead(401, { 'Content-Type': 'text/html' });
    //   res.write('<h1>Autentificare eșuată. Vă rugăm să verificați emailul și parola.</h1>');
    //   res.end();
    // }
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
