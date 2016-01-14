// Define any routing functions in this file


Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'My Title'}});
});

// Navbar pages
Router.route('/about');
Router.route('/services');
Router.route('/collaborate');
Router.route('/materials');
Router.route('/registercarroceiro');


// Login / Logout
Router.route('/login');

Router.route('/logout', function () {
  Meteor.logout();
  this.render('Home');
});


// ROUTING ELSEWHERE
Router.route('/catadorprofile');

// given a url like "/catadorprofile/<id>
Router.route('/catadorprofile/:_id', function () {
  this.render('/catadorprofile');
});
