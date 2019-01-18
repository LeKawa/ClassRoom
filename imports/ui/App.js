import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Tasks } from '../api/tasks.js';


class App extends Component {
  handleSubmit(event) {
   event.preventDefault();

   const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

   Tasks.insert({
     text,
     createdAt: new Date(),
     owner: Meteor.userId(),
     username: Meteor.user().username,
   });

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
        <div className="head">
          <h1>Liste de la classe</h1>
          <AccountsUIWrapper />
        </div>

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Entrer un nouvel élève"
              />
            </form> : ''
          }
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
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
