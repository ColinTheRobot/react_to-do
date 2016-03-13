'use strict'
const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const Route          = ReactRouter.Router;
const Navigation     = ReactRouter.Navigation;
const Link           = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const auth           = require('./helpers/auth');


const CreateTaskForm = require('./create_task_form');
const Task = require('./task');

const Nav            = require('./auth_components/nav')
const Signup         = require('./auth_components/signup');
const Dashboard      = require('./auth_components/dashboard');
const About          = require('./auth_components/about');
const Login          = require('./auth_components/login');
const Logout          = require('./auth_components/logout');


const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {
      tasks: {},
      loggedIn : auth.loggedIn()

    }
  },

  componentDidMount:function() {
   // this is where you'll get the data from the 'db'
   $.get('/tasks').done( (data)=>{
      this.state.tasks=data;
      this.setState({tasks:this.state.tasks})
    })
  },

  componentWillMount : function() {
    // this... is some interesting function ref handling. not quite following it though
    auth.onChange = this.updateAuth
    auth.logIn
  },

  updateAuth : function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  addTask:function( newTask ) {
    // generate a new timestamp so that we have a unique id for each task
    var timestamp = (new Date()).getTime();

    // add new task to state
    this.state.tasks['task-'+ timestamp] = newTask;

    this.setState({ tasks: this.state.tasks });

  },

  toggleTask:function(key){
    this.state.tasks[key].completed = !this.state.tasks[key].completed;
    this.setState({tasks:this.state.tasks});
  },


  filterComplete:function(key){
    return this.state.tasks[key].completed
  },

  filterNotComplete:function(key){
    return !this.filterComplete(key)
  },

  renderTask:function(key){
    return (
      <Task key={key} index={key} details={this.state.tasks[key]} toggleTask={this.toggleTask} />
    )
  },

  render:function() {
    return (
      <div className="container">
      <Nav loggedIn={this.state.loggedIn} />
      {this.props.children}
        <div className="row">
          <section className="col s12">

            {/*to do unfinished tasks*/}
            <section id="todo-display" className="col s7">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Tasks</h4></li>
                {/*open tasks here*/}
                {Object.keys(this.state.tasks)
                  .filter(this.filterNotComplete)
                  .map( this.renderTask )}
              </ul>
            </section>

            {/* TO DO FORM*/}
            <section id="todo-form" className="col s5">
              <aside className="card-panel">
                <CreateTaskForm addTask={this.addTask}/>
              </aside>
            </section>

          </section>
        </div>
        <div className="row">

          {/*Complete tasks*/}
          <section id="todo-display-complete" className="col s12">
            <ul className="collection with-header">
                <li className="collection-header"><h4>Completed Tasks</h4></li>
                {/*complete tasks go here*/}
                {Object.keys(this.state.tasks)
                  .filter(this.filterComplete)
                  .map( this.renderTask )}
              </ul>

            </section>
        </div>
      </div>)
  }

});

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname : '/login',
      state : { nextPathname : nextState.location.pathname }
    })
  }
}

var NotFound = React.createClass({
  render : function() {
    return <h1>404: Not Found... sry</h1>
  }
})

var routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App} >
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
    {/* 404 error   */}
    <Route path="*" component={NotFound} />
  </Router>
)


ReactDOM.render(routes, document.getElementById('container'))
