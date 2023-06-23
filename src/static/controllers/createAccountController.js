const http = require('http');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getClient } = require("../database/dbManager");
const { createAccount } = require('./createAccountService');

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

    // console.log(formData);

    createAccount(username, forgotEmail, password, confirmPassword, res);
  });
}


module.exports = { handleCreateAccountRequest, handleCreateAccountSubmit };