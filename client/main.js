import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';

Template.registerHelper("prettifyDate", function(date) {
    var monthNames = [
        "Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    var days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    var dayIndex = date.getDay();
    var dateNum = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return days[dayIndex] + ', ' + dateNum + ' ' + monthNames[monthIndex] + ' ' + year;
});