'use strict';
const React = require('react')

const CreateTaskForm = React.createClass({
  handleSubmit:function(event) {
    event.preventDefault();
    var task = {
      name : this.refs.name.value,
      completed:false,
      desc: this.refs.desc.value
    }

    // add the task to the state
    this.props.addTask(task);

    // clear the form
    this.refs.taskForm.reset();

  },
  render:function() {
    return (
      <form className="task-edit" ref="taskForm" onSubmit={this.handleSubmit}>
        <h3>Create a new task</h3>

        <div className="row">
          <div className="input-field col s4">
            <label htmlFor="task_name">Task Name</label>
            <input type="text"  id="task_name" ref="name" />
          </div>
          <div className="input-field col s8">
            <label htmlFor="task_desc">Task Description</label>
            <input type="text"  id="task_desc" ref="desc" />
          </div>
        </div>
        <div className="row">
          <button className="btn waves-effect waves-light col s6" type="submit" name="action">Add Task</button>
        </div>


      </form>
    )
  }
});

module.exports = CreateTaskForm;
