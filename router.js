Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'My Title'}});
});

// NAVBAR MENU ITEMS
Router.route('/about');

Router.route('/services');

Router.route('/collaborate');

Router.route('/materials');

Router.route('/register');

Router.route('/contact');


// ROUTING ELSEWHERE
Router.route('/catadorprofile');


