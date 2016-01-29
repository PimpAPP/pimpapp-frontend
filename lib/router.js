// Define any routing functions in this file


Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home');
});

// Navbar pages

Router.route('/about', function () {
  this.layout('ApplicationLayout');
  this.render('About');
});

Router.route('/materials', function () {
  this.layout('ApplicationLayout');
  this.render('Materials');
});

Router.route('/collaborate', function () {
  this.layout('ApplicationLayout');
  this.render('Collaborate');
});

Router.route('/registercarroceiro', function () {
  this.layout('ApplicationLayout');
  this.render('Registercarroceiro');
});


// Login / Logout

Router.route('/login', function () {
  this.layout('ApplicationLayout');
  this.render('Login');
});

Router.route('/logout', function () {
  Meteor.logout();
  this.render('Home');
});


// Routing to profile page

// given a url like "/catadorprofile/<id>
Router.route('/catadorprofile/:_id', function() {
  this.layout('ApplicationLayout');
  this.render('/catadorprofile');
});


// TODO: Reintroduce once there is support for cooperatives and 
// ponto de entregas
// given a url like "/cooperativaprofile/<id>
// Router.route('/cooperativaprofile/:_id', function () {
//   this.render('/cooperativaprofile');
// });

// // given a url like "/pevprofile/<id>
// Router.route('/pevprofile/:_id', function () {
//   this.render('/pevprofile');
// });
