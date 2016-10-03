// Define any routing functions in this file


Router.route('/', function () {
  // render the Home template, loading map screen
  this.render('MapScreen');
});

Router.route('/map', function () {
  // render the map template with a custom data context
  this.render('MapScreen');
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

Router.route('/termsofuse', function () {
  this.layout('ApplicationLayout');
  this.render('TermsOfUse');
});

Router.route('/partners', function () {
  this.layout('ApplicationLayout');
  this.render('Partners');
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
  this.render('MapScreen');
});

// Login / Logout Adm

Router.route('/loginAdm', function () {
  this.layout('AdmApplicationLayout');
  this.render('Login');
});

Router.route('/logoutAdm', function () {
  Meteor.logout();
  this.layout('AdmApplicationLayout');
  this.render('Adm');
});

// Routing to profile page

// given a url like "/catadorprofile/<id>
Router.route('/catadorprofile/:_id', function() {
  if (!this.params.query.adm) {
    this.layout('ApplicationLayout'); //loads end user navigation menu
  } else {
    this.layout('AdmApplicationLayout'); //loads administrative navigation menu
  }
  this.render('/catadorprofile');
});

// Administrative functions

Router.route('/adm', function () {
  this.layout('AdmApplicationLayout');
  this.render('Adm');
});

Router.route('/delete', function () {
  this.layout('AdmApplicationLayout');
  this.render('deleteCatador');
});

Router.route('/undelete', function () {
  this.layout('AdmApplicationLayout');
  this.render('undeleteCatador');
});

Router.route('/moderation', function () {
  this.layout('AdmApplicationLayout');
  this.render('moderation');
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
