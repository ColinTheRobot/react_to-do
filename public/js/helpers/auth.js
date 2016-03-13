var $ = require('jquery');

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    loginRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  signup(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    signupRequest(email, pass, (res) => {
      cb()
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function signupRequest(email, pass, cb) {

  $.post('/users', { email: email, password: pass })
    .done( (data) =>(
      cb({
        status: 201,
        success: true
      })
    ))
    .fail( (data) => {
      console.log(data)
      cb({
        status: 202,
        data: data
      })
    })
}

function loginRequest(email, pass, cb) {
  $.post('users/login', { email: email, password: pass })
    .done( (data) =>(
      cb({
        authenticated: true,
        token: data.token
      })
    ))
    .fail( (data) => {
      console.log(data)
      cb({
        data: data,
        authenticated: false
      })
    })
}
