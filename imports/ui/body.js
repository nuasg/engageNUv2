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
    // if (instance.state.get('hideCompleted')) {
    //   // If hide completed is checked, filter tasks
    //   var yesterday = new Date();
    //   yesterday.setDate(today.getDate() - 1);
    //   return Tasks.find({ endDate: { $gte: yesterday} }, { checked: { $ne: true } }, { sort: { createdAt: -1 } });
    // }
    // Otherwise, return all of the tasks
    // Show newest tasks at the top
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return Tasks.find({ endDate: { $gte: yesterday } }, { sort: { createdAt: -1 } });
  },
  // incompleteCount() {
  //   return Tasks.find({ checked: { $ne: true } }).count();
  // },
});