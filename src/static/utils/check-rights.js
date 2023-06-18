const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookie = require('cookie');
const { getUserType } = require('../controllers/loginController');

const getRights = (req, res) => {
    var userType = getUserType();
    if(userType !== "admin")
        userType = "user";
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(userType));
}

module.exports = getRights;
