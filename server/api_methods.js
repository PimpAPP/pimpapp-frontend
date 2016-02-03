// All methods that call Django API go here


var endpoint = 'http://104.131.46.101/api/';

Meteor.methods({
  // updates collection Carroceiros with latest data from Django database
  getCarroceiros: function() {
    var carroceiro = 'carroceiro/';
    var carroceiro_endpoint = endpoint + carroceiro;
    HTTP.get(carroceiro_endpoint, function(error, response) {
      if (error) {
        console.log(error);
      }
      else {
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
            var carroceiro = data[i];
            var exists = Carroceiros.findOne({'pk': carroceiro.pk})
            if (!exists) {
              Carroceiros.insert(carroceiro);
            }              
        }
      }
    });
  },

  // TODO: call Django API here to include catador information in Django database
  submitCatadorRegistration: function(doc) {
    console.log("registering a catador");
    console.log(doc);

    var catador = 'catador';
    var create_catador_endpoint = endpoint + catador;
    // HTTP.post(create_catador_endpoint, {'options': 'to set'}
    //   function(error, response) {


    // });
  },

  // TODO: call Django API here to update catador information in Django database
  // Careful to either 
  //    1. prefill form with existing catador information before
  //      shown to user in profile_catador.html
  //    OR
  //    2.only update the fields that are filled out in this doc form, and not insert
  //      the entire doc as is to Django database 
  // IDEAL: Don't use this form, instead customize update for each different elemnet
  updateCatadorDetails: function(doc) {
    console.log("updating catador information");
    console.log(doc);

  }

});