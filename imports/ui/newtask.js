import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './newtask.html';

Template.newtask.events({
  'click #btn-newtask'(event) {
    event.preventDefault();
    $('#newtask-modal').modal('show');
  },
  'submit .newtask-form'(event) {
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
    $('#newtask-modal').modal('hide');
  },
  // 'change .hide-completed input'(event, instance) {
  //   instance.state.set('hideCompleted', event.target.checked);
  // },
});