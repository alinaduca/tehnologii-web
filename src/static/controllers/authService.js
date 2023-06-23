const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getClient } = require('../database/dbManager');

async function authenticateUser(email, password, res) {
    const client = getClient();
    const db = client.db('sagdatabase');
    const authentication = db.collection('Authentication');
    const users = db.collection('users');
  
    // Găsiți utilizatorul după adresa de e-mail
    const user = await authentication.findOne({ email });

    const userName = await users.findOne({ email });
  
    if (user) {
      // Utilizatorul există
      const salt = user.salt;
      const users = db.collection('users');
      const user1 = await users.findOne({ email });
      const DBhashedPassword = user1.password;
  
      // Hash-uiți parola introdusă utilizând bcrypt
      const saltedPassword = password + salt;
      const algorithm = 'sha256';
      const hashedPassword = crypto.createHash(algorithm).update(saltedPassword).digest('hex');
  
      // Verificați dacă parolele sunt identice
      if (hashedPassword === DBhashedPassword) {
        // Autentificare reușită
        console.log('Autentificare reușită');
        const secretKey = 'ak1j3bk^jb4986:BKG9h%jG#I7687jhg!';
        const token = jwt.sign({ email }, secretKey);
  
        // Adăugare token în antetul răspunsului HTTP
        res.setHeader('Authorization', 'Bearer ' + token);
  
        // Setarea cookie-ului în răspunsul HTTP
        const cookieToken = cookie.serialize('token', token, {
          maxAge: 600, // durata de viață a cookie-ului în secunde
          httpOnly: true,
        });
  
        res.setHeader('Set-Cookie', cookieToken);
  
        // Returnați token-ul și utilizatorul pentru a fi utilizate în apelurile ulterioare către alte microservicii
        return { token, user, userName: user1 };
      } else {
        // Parolă incorectă
        console.log('Parolă incorectă');
        throw new Error('Parolă incorectă');
      }
    } else {
      // Utilizatorul nu există
      console.log('Utilizatorul nu există');
      throw new Error('Utilizatorul nu există');
    }
  } 

module.exports = { authenticateUser };
