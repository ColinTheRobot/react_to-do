var express     = require('express');
var users       = express.Router();
var bodyParser  = require('body-parser');
var db          = require('./../db/pg');
var secret      = "my sweet secret"
var expressJWT  = require('express-jwt');
var jwt         = require('jsonwebtoken');

users.post('/', db.createUser, (req, res) => {
  res.status(201).json({data: 'success'});
})

users.post('/login', db.loginUser, (req, res) => {
  var token = jwt.sign(res.rows, secret);
  res.json({agent: res.rows, token: token})
})

module.exports = users;
