const fs = require('fs');
const path = require('path');
const { authenticateUser } = require('./authService');

let username="";
let email="";
let userType;
let connectedEmail;
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

    authenticateUser(email, password, res)
    .then(({ token, user, userName }) => {
      res.setHeader('Content-Type', 'text/html');
      userType = userName.type;
      username = userName.username;
      if (userType === 'user') {
        res.end(`
          <script>window.location.href = "/";</script>
        `);
      } else {
        res.end(`
          <script>window.location.href = "/all-users";</script>
        `);
      }
    })
    .catch(error => {
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <script>alert('${error.message}');</script>
        <script>window.location.href = "/login";</script>
      `);
    });
  });
}


function getUserType() {
  return userType;
}

function getUsername(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(username));
}

function getEmail() {
  return email;
}

function setEmail(user) {
  email = user;
}

function setUsername(user) {
  username = user;
}

module.exports = { handleLoginRequest, handleLoginSubmission, getUserType, getUsername, setUsername, setEmail, getEmail };
