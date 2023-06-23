const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getClient } = require('../database/dbManager');

async function createAccount (username, forgotEmail, password, confirmPassword, res) {
    const existingEmail = await checkEmailExists(forgotEmail);
    if (existingEmail) {
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('There is already an account associated with this email address!');</script>
        <script>window.location.href = "/create-account";</script>
      `);
      return;
    }

    // same passwords
    if (password !== confirmPassword) {
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('Passwords do not match');</script>
        <script>window.location.href = "/create-account";</script>
      `);
    } else {

      // Verifică cerințele pentru parolă
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
      if (!passwordRegex.test(password)) {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
          <script>alert('Password must contain at least 4 characters, at least one uppercase letter, at least one lowercase letter and at least one number.');</script>
          <script>window.location.href = "/create-account";</script>
        `);
      } else {
        const client = getClient();
        const db = client.db('sagdatabase');
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
}

const checkEmailExists = async (email) => {
    const client = getClient();
    const db = client.db('sagdatabase');
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email });
    return !!existingUser; // Returnează true dacă adresa de email există deja, altfel false
  };

module.exports = { createAccount };