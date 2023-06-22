const http = require('http');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { handleStatisticsRequest } = require('./controllers/statisticsController');
const { handleNominationsRequest } = require('./controllers/nominationsController');
const { handleSpecificActorRequest } = require('./controllers/actorPageController');
const { handleNewsRequest } = require('./controllers/newsController');
const { handleLoginRequest, handleLoginSubmission, getUsername } = require('./controllers/loginController');
const { handleLogoutRequest } = require('./controllers/logoutController');
const { handleCreateAccountRequest, handleCreateAccountSubmit } = require('./controllers/createAccountController');
const sendResetEmail = require('./controllers/forgotPswdController');
const { handleMyAccountRequest, handleChangePasswordSubmit } = require('./controllers/myAccountController');
const { handleAllUsersRequest } = require('./controllers/allUsersController'); 
const { connectToDatabase } = require('./database/dbManager');
const { handleDeleteUserRequest } = require('../api/deleteUserAPI');
const { handleSaveFavouriteActorRequest } = require('./controllers/saveFavouriteActorController');
const { getStatisticBar, getStatisticPie, getStatisticLine } = require('./api/statisticsAPI');
const getRights = require('./utils/check-rights');
const getData = require('../api/allUsersAPI');
const { executeInitialSchema } = require('./database/sqldatabase');

executeInitialSchema();
connectToDatabase();
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);
  const fileExtension = path.extname(filePath);
  if (req.url === '/statistics' && req.method === 'GET') {
    handleStatisticsRequest(req, res);
  } else if (req.url === '/actors' && req.method === 'GET') {
    handleNominationsRequest(req, res); 
  } else if (req.url.startsWith('/actors/') && req.method === 'GET') {
    handleSpecificActorRequest(req, res);
  } else if (req.url === '/news' && req.method === 'GET') {
    handleNewsRequest(req, res);
  } else if (req.url === '/all-users' && req.method === 'GET') {
    handleAllUsersRequest(req, res); 
  } else if (req.url.startsWith('/api/delete-user/') && req.method === 'DELETE') {
    const username = req.url.substring('/api/delete-user/'.length);
    handleDeleteUserRequest(req, res, username);
  } else if (req.url === '/check-rights' && req.method === 'GET') {
    getRights(req, res);
  } else if (req.url === '/login' && req.method === 'GET') {
    handleLoginRequest(req, res); 
  } else if (req.url === '/logout' && req.method === 'GET') {
    handleLogoutRequest(req, res);
  } else if (req.url === '/login' && req.method === 'POST') {
    handleLoginSubmission(req, res); 
  } else if (req.url === '/get-username' && req.method === 'GET') {
    getUsername(req, res); 
  } else if (req.url === '/create-account' && req.method === 'GET') {
    handleCreateAccountRequest(req, res);
  } else if (req.url === '/create-account' && req.method === 'POST') {
    handleCreateAccountSubmit(req, res); 
  } else if (req.url === '/my-account' && req.method === 'GET') {
    handleMyAccountRequest(req, res);
  } else if (req.url === '/my-account/chnage-password' && req.method === 'POST') {
    handleChangePasswordSubmit(req, res);
  } else if (req.url === '/forgot-password' && req.method === 'POST') {
    const { email } = req.body;
    // Apelul funcției sendResetEmail pentru a trimite e-mailul de resetare a parolei
    sendResetEmail(email);
    // Răspuns către client, de exemplu, un mesaj de succes
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('E-mailul de resetare a parolei a fost trimis');
  } else if (req.url === '/api/all-users' && req.method === 'GET') {
    getData(req, res);
  } else if (req.url.startsWith('/piegraphql/') && req.method === 'GET') {
    const year = req.url.substring('/piegraphql/'.length);
    getStatisticPie(req, res, year);
  } else if (req.url.startsWith('/bargraphql/') && req.method === 'GET') {
    const year = req.url.substring('/bargraphql/'.length);
    getStatisticBar(req, res, year);
  } else if (req.url.startsWith('/linegraphql/') && req.method === 'GET') {
    const year = req.url.substring('/linegraphql/'.length);
    getStatisticLine(req, res, year);
  } else if (req.url.startsWith('/save-favourite/') && req.method === 'GET') {
    handleSaveFavouriteActorRequest(req, res);
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
        res.writeHead(404);handleNominationsRequest
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