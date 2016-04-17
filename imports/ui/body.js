import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ date: { $gte: new Date()} }, { sort: { date: 1 } });
    }
    // Otherwise, return all of the tasks
    // Show newest tasks at the top
    return Tasks.find({ date: { $gte: new Date()} }, { sort: { date: 1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    var dateArray = target.date.value.split("-")
    const date = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
    const location = target.location.value;
    const description = target.description.value;
 
    // Insert a task into the collection
    Meteor.call('tasks.insert', title, date, location, description);
 
    // Clear form
    target.title.value = '';
    target.date.value = '';
    target.location.value = '';
    target.description.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});