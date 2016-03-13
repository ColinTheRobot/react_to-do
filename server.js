'use strict'
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');

const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken');
const secret = "my sweet secret"

const app       = express();
const _port     = process.argv[2]|| process.env.port||3009;

const taskRoutes     = require('./routes/tasks');
const userRoutes = require( path.join(__dirname, '/routes/users'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});


// serve static files
app.use(express.static(path.join(__dirname,'public')))

// set up some logging
app.use(logger('dev'));
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes)




// serve the index.html file statically
app.get('/',(req,res)=>{
  res.sendFile('index.html')
})

// turn me on!
app.listen(_port , ()=>
  console.log(`server here! listening on`, _port )
)
