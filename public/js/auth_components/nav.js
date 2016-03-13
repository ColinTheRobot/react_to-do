'use strict';
const React = require('react');
const Link  = require('react-router').Link;

const Nav = React.createClass({
  render : function() {
    var liStyle = {display: "inline", paddingRight: "10px"}
    var ulStyle = {float: "right"}
    var signup;
    if (!this.props.loggedIn) {
      signup = <Link to="/signup"> sign up </Link>
    }

    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <Link to="/" id="logo-container" className="brand-logo">To Do App in React</Link>
          <ul style={ulStyle}>
            <li style={liStyle}>
              {this.props.loggedIn ? (
                <Link to="/logout"> Log out</Link>
              ) : (
                <Link to="/login"> Log in</Link>
              )}
          </li>
          <li style={liStyle}>
            {signup}
          </li>
          <li style={liStyle}><Link to="/about">About</Link></li>
          <li style={liStyle}><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
          </ul>
        </div>
      </nav>
    )
  }
})

module.exports = Nav;
