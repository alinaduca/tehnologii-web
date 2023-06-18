const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookie = require('cookie');
const { getClient } = require("../database/dbManager");

function handleCheckRights(req, res) {
    //verific daca utilizatorul meu este admin sau user obisnuit
}

module.exports = { handleCheckRights };
