import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './newtask.html';

Template.newtask.events({
  'click #btn-newtask'(event) {
    event.preventDefault();

    // Set default date to today
    today = todayAsInputFormat();
    $('#newtask-startdate').val(today);
    $('#newtask-enddate').val(today);

    $('#newtask-modal').modal('show');
  },
  'submit .newtask-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    var startDateArray = target.startDate.value.split("-")
    const startDate = new Date(startDateArray[0], startDateArray[1]-1, startDateArray[2]);
    var endDateArray = target.endDate.value.split("-")
    const endDate = new Date(endDateArray[0], endDateArray[1]-1, endDateArray[2]);
    const location = target.location.value;
    const contactEmail = target.contactEmail.value;
    const contactPhone = target.contactPhone.value;
    const description = target.description.value;
 
    if (startDate > endDate) {
      $('#newtask-error').text("Start Date cannot be after End Date.");
    }
    else {
      // Insert a task into the collection
      Meteor.call('tasks.insert', title, startDate, endDate, location, contactEmail, contactPhone, description);   
      clearForm(target);
      $('#newtask-modal').modal('hide');
    }
  },
  'click #btn-cancel'(event) {
    event.preventDefault();
    $('#newtask-modal').modal('hide');
  },
  // 'change .hide-completed input'(event, instance) {
  //   instance.state.set('hideCompleted', event.target.checked);
  // },
});


function clearForm(target) {
  target.title.value = '';
  target.startDate.value = '';
  target.endDate.value = '';
  target.location.value = '';
  target.contactEmail.value = '';
  target.contactPhone.value = '';
  target.description.value = '';
}

function todayAsInputFormat() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear()+"-"+(month)+"-"+(day);
  return today;
}