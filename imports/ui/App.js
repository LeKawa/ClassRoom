import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Tasks } from '../api/tasks.js';


class App extends Component {
  handleSubmit(event) {
   event.preventDefault();

   // Find the text field via the React ref
   const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

   Tasks.insert({
     text,
     createdAt: new Date(), // current time
   });

   // Clear form
   ReactDOM.findDOMNode(this.refs.textInput).value = '';
 }
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Liste de la classe</h1>
          <AccountsUIWrapper />

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="nouvel élève"
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
