import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './newtask.js';
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
  // incompleteCount() {
  //   return Tasks.find({ checked: { $ne: true } }).count();
  // },
});