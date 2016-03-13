'use strict';
const React = require('react');
const Link  = require('react-router').Link;
const auth  = require('./../helpers/auth');

const Login = React.createClass({
  // Nope don't know what this. Helps manage flow outside of the tree structure ?
  // https://facebook.github.io/react/docs/context.html
  contextTypes : {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return {
      error : false
    }
  },

  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) return this.setState({ error: true })

      // dunnooo some kind of es7 deconstruction?
      const { location } = this.props

      // if the user comes from a redirected place this will push them back to that location after loggin in
      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        // if the user comes from the log in Link it will send them to the App route
        this.context.router.replace('/')
      }
    })
  },

  render : function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1) <br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})
module.exports = Login;
