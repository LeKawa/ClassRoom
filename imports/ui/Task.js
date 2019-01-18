import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

export default class Task extends Component {
  toggleChecked() {

   Tasks.update(this.props.task._id, {
     $set: { checked: !this.props.task.checked },
   });
 }

 deleteThisTask() {
   Tasks.remove(this.props.task._id);
 }
  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      <li className={taskClassName}>
       <button className="delete" onClick={this.deleteThisTask.bind(this)}>
         Virer {this.props.task.text}

       </button>
       <span className="text">
          <strong>{this.props.task.username}</strong> : {this.props.task.text}
        </span>


     </li>
    );
  }
}
