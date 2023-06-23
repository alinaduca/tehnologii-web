const http = require('http');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { handleSaveFavouriteActorRequest,handleExistsFavouriteActorRequest, handleRemoveFavouriteActorRequest } = require('./controllers/saveFavouriteActorController');
const { handleMyAccountRequest, handleChangePasswordSubmit, getFavouritesActors } = require('./controllers/myAccountController');
const { handleCreateAccountRequest, handleCreateAccountSubmit } = require('./controllers/createAccountController');
const { handleLoginRequest, handleLoginSubmission, getUsername } = require('./controllers/loginController');
const { getStatisticBar, getStatisticPie, getStatisticLine } = require('./api/statisticsAPI');
const { handleNominationsRequest } = require('./controllers/nominationsController');
const { handleSpecificActorRequest } = require('./controllers/actorPageController');
const { handleDownload, getHistory } = require('./controllers/downloadController');
const { handleStatisticsRequest } = require('./controllers/statisticsController');
const { handleAllUsersRequest } = require('./controllers/allUsersController'); 
const { handleLogoutRequest } = require('./controllers/logoutController');
const { handleNewsRequest } = require('./controllers/newsController');
const { handleDeleteUserRequest } = require('./api/deleteUserAPI');
const { executeInitialSchema } = require('./database/sqldatabase');
const { connectToDatabase } = require('./database/dbManager');
const getRights = require('./utils/check-rights');
const getData = require('./api/allUsersAPI');

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
  } else if (req.url === '/get-favourites-actors' && req.method === 'GET') {
    getFavouritesActors(req, res); 
  } else if (req.url === '/create-account' && req.method === 'GET') {
    handleCreateAccountRequest(req, res);
  } else if (req.url === '/create-account' && req.method === 'POST') {
    handleCreateAccountSubmit(req, res); 
  } else if (req.url === '/my-account' && req.method === 'GET') {
    handleMyAccountRequest(req, res);
  } else if (req.url === '/my-account/chnage-password' && req.method === 'POST') {
    handleChangePasswordSubmit(req, res);
  } else if (req.url.startsWith('/save-graphic/') && req.method === 'GET') {
    const title = req.url.substring('/save-graphic/'.length);
    handleDownload(req, res, title);
  } else if (req.url === '/api/all-users' && req.method === 'GET') {
    getData(req, res);
  } else if (req.url === '/get-history' && req.method === 'GET') {
    getHistory(req, res);
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
  } else if ((req.url.startsWith('/exists-fav-actor/') && req.method === 'GET')) {
    handleExistsFavouriteActorRequest(req, res);
  } else if ((req.url.startsWith('/remove-fav-actors/') && req.method === 'GET')) {
    handleRemoveFavouriteActorRequest(req, res);
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
        sharp(data)
          .png({ quality: 80 })
          .toBuffer((err, compressedData) => {
            if (err) {
              res.writeHead(500);
              res.end('Error compressing image');
            } else {
              res.writeHead(200, { 'Content-Type': 'image/png' });
              res.end(compressedData);
            }
          });
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