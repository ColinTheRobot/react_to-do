var pgp = require('pg-promise')({});
var cn = "postgres://generalassembly:generalassembly@localhost/tokens_test";
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var db = pgp(cn)


function loginUser(req,res,next) {
  var email = req.body.email;
  var password = req.body.password;

  // find user by email entered at log in
  db.one("SELECT * FROM users WHERE email LIKE ($1);", [email])
    .then((data) => {
      console.log(data)
      if (bcrypt.compareSync(password, data.password_digest)) {
        res.rows = data
        next()
      } else {
        res.rows = "password was incorrect"
        next()
      }
    })
    .catch(() => {
      console.error('Error finding users')
    })
}


function createSecure(email, password, callback) {
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash){
      callback(email, hash)
    })
  })

}


function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser);

  function saveUser(email, hash) {

  db.none("INSERT INTO users (email, password_digest) VALUES ($1, $2);",
    [email, hash])
    .then((data) => {
      console.log(data)
      next()
    })
    .catch(() => {
      console.log('error signing up')
    })
  }
}


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
