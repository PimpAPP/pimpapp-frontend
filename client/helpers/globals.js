//Format datetime: dd//mm//yyyy - hh:mi:ss
Template.registerHelper("prettifyDate", function(timestamp) {
  //Months are zero based, because of this needs to sum 1 to month
  return zeroPad(timestamp.getDate()) + "/" + zeroPad((timestamp.getMonth() + 1)) + "/" + timestamp.getFullYear() + " - " + zeroPad(timestamp.getHours()) + ":" + zeroPad(timestamp.getMinutes()) + ":" + zeroPad(timestamp.getSeconds());
});

//Checks if user is administrator
Template.registerHelper("isUserAdm", function() {
    return isUserAdm(); // call function in global file
});
