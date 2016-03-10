'use strict'
const React = require('react');
const ReactDOM = require('react-dom');
const CreateTaskForm = require('./create_task_form');
const Task = require('./task');

const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {tasks:{}}
  },
  componentDidMount:function() {
   // this is where you'll get the data from the 'db'
   $.get('/tasks').done( (data)=>{
      this.state.tasks=data;
      this.setState({tasks:this.state.tasks})
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

ReactDOM.render(<App />, document.querySelector('#container'))
