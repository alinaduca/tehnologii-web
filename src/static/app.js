const http = require('http');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { handleStatisticsRequest } = require('./controllers/statisticsController');
const { handleNominationsRequest } = require('./controllers/nominationsController');
const { handleNewsRequest } = require('./controllers/newsController');
// const { handleIndexRequest } = require('./controllers/indexController');
const { handleLoginRequest, handleLoginSubmission } = require('./controllers/loginController');
const { handleLogoutRequest } = require('./controllers/logoutController');
const { handleCreateAccountRequest, handleCreateAccountSubmit } = require('./controllers/createAccountController');
const { handleForgotPswdRequest } = require('./controllers/forgotPswdController');
const { handleMyAccountRequest } = require('./controllers/myAccountController');
const { handleAllUsersRequest } = require('./controllers/allUsersController'); 
const getData = require('../api/allUsersAPI');
const { connectToDatabase } = require('./database/dbManager');

connectToDatabase();
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);
  const fileExtension = path.extname(filePath);
  if (req.url === '/statistics' && req.method === 'GET') {
    handleStatisticsRequest(req, res);
  } else if (req.url === '/nominations' && req.method === 'GET') {
    handleNominationsRequest(req, res); 
  } else if (req.url === '/news' && req.method === 'GET') {
    handleNewsRequest(req, res);
  } else if (req.url === '/all-users' && req.method === 'GET') {
    handleAllUsersRequest(req, res); 
  } else if (req.url === '/login' && req.method === 'GET') {
    handleLoginRequest(req, res); 
  } else if (req.url === '/logout' && req.method === 'GET') {
    handleLogoutRequest(req, res);
  } else if (req.url === '/login' && req.method === 'POST') {
    handleLoginSubmission(req, res); 
  } else if (req.url === '/create-account' && req.method === 'GET') {
    handleCreateAccountRequest(req, res);
  } else if (req.url === '/create-account' && req.method === 'POST') {
    handleCreateAccountSubmit(req, res); 
  } else if (req.url === '/my-account' && req.method === 'GET') {
    handleMyAccountRequest(req, res);
  } else if (req.url === '/forgot-password' && req.method === 'GET') {
    handleForgotPswdRequest(req, res);
  } else if (req.url === '/api/all-users' && req.method === 'GET') {
    getData(req, res);
  } else if (fileExtension === '.css') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (fileExtension === '.js') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else if(fileExtension === '.png') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
      }
    });
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  if (req.url === '/check-token' && req.method === 'GET') {
    const tokenCookie = req.headers.cookie;
    const hasToken = tokenCookie && tokenCookie.includes('token');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ hasToken }));
  }

});

const port = 3000;

server.listen(port, () => {
  console.log(`Serverul a pornit pe portul ${port}`);
});


// const terminateServer = () => {
//   server.close(() => {
//     console.log('Server closed.');

//     const expiredToken = ''; 
//     const cookieToken = cookie.serialize('token', expiredToken, {
//       maxAge: 0, // Set the maxAge to 0 to make the cookie immediately expire
//       httpOnly: true,
//     });

//     process.stdout.write('\n');
//     console.log('Server is terminating...');
//     process.exit(0);
//   });
// };

// process.on('SIGINT', terminateServer); // Capturăm semnalul SIGINT (Ctrl+C)