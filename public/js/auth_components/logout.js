'use strict';
const React = require('react');
const auth  = require('./../helpers/auth');

const Logout = React.createClass({
  componentDidMount : function() {
    auth.logout()
  },

  render : function() {
    return <p>Your are now logged out</p>
  }
})

module.exports = Logout;
