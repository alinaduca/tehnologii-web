const http = require('http');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookie = require('cookie');
const { getClient, connectToDatabase } = require("../database/dbManager");

function handleMyAccountRequest(req, res) {
    const filePath = path.join(__dirname, '../pages/myAccount.html');
  
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

async function handleChangePasswordSubmit(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    const formData = new URLSearchParams(body);
    const actualPassword = formData.get('actualPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');

    console.log(formData);

    // Obține token-ul din cookie
    const token = getTokenFromCookie(req);
    let email;

    if (token) {
      // Verifică și decodează token-ul
      const secretKey = 'ak1j3bk^jb4986:BKG9h%jG#I7687jhg!';
      jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
          console.log('Eroare la decodarea token-ului:', err.message);
          return;
        }
    
        // Token-ul a fost decodat cu succes
        console.log('Informații din token:', decodedToken);
        email = decodedToken.email;

        console.log('email: ' + email);
      });
    }

    const dbPassword = await databasePassword(email);

    let dbSalt;
    if(dbPassword) {
      dbSalt = await databaseSalt(email);

      if(dbSalt) {
        // Hash-uim parola modificată utilizând bcrypt
        const saltedPassword = actualPassword + dbSalt;
        const algorithm = 'sha256';
        const hashedPassword = crypto.createHash(algorithm).update(saltedPassword).digest('hex');   

        // verify if the passwords are the same
        if (hashedPassword != dbPassword) {
          res.setHeader('Content-Type', 'text/html');
          res.end(`
            <script>alert('The current password entered is not correct');</script>
            <script>window.location.href = "/my-account";</script>
          `);
          return;
        }
       } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
          <script>alert('There is no salt in db for this email address!');</script>
          <script>window.location.href = "/my-account";</script>
        `);
      return;
      }

    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('There is no user with this email address!');</script>
        <script>window.location.href = "/my-account";</script>
      `);
      return;
    }

    // daca newPassword != confirmNewPassword
    if (newPassword != confirmPassword) {
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('Newly entered passwords do not match!');</script>
        <script>window.location.href = "/my-account";</script>
      `);
      return;
    }

    // Verifică cerințele pentru parolă
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
    if (!passwordRegex.test(newPassword)) {

      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('Password must contain at least 4 characters, at least one uppercase letter, at least one lowercase letter and at least one number.');</script>
        <script>window.location.href = "/my-account";</script>
      `);
      return;
    } else {
        // Modificăm parola în "password+salt"
        const saltedNewPassword = newPassword + dbSalt;

        // Hashuim parola modificată utilizând bcrypt
        const algorithm = 'sha256';
        const hashedNewPassword = crypto.createHash(algorithm).update(saltedNewPassword).digest('hex');

        updatePassword(email, hashedNewPassword);
    }

    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <script>alert('The password has been changed successfully!');</script>
        <script>window.location.href = "/my-account";</script>
      `);
    return;
  });
}

function getTokenFromCookie(req) {
  const cookies = req.headers.cookie;
  if (cookies) {
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    return token;
  }
  return null;
}

const databasePassword = async (email) => {
  const client = getClient();
  const db = client.db('sagdatabase');
  const collection = db.collection('users');

  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    return existingUser.password; 
  } else {
    return null; 
  }
};

const databaseSalt = async (email) => {
  const client = getClient();
  const db = client.db('sagdatabase');
  const collection = db.collection('Authentication');

  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    return existingUser.salt; 
  } else {
    return null; 
  }
};

const updatePassword = async (email, newPassword) => {
  try {
    const client = getClient();
    const db = client.db('sagdatabase');
    const collection = db.collection('users');

    const filter = { email: email };

    // Actualizarea - setează noul password
    const update = { $set: { password: newPassword } };

    // Actualizează documentul
    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 1) {
      console.log('Parola a fost actualizată cu succes.');
    } else {
      console.log('Nu s-a putut actualiza parola.');
    }
  } catch (error) {
    console.error('Eroare la actualizarea parolei:', error);
  }
};


module.exports = { handleMyAccountRequest, handleChangePasswordSubmit };