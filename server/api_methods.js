// All methods that call Django API go here


var endpoint = 'http://104.131.46.101/';

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

            var exists = Carroceiros.findOne({'id': carroceiro.id})
            if (!exists) {
              Carroceiros.insert(carroceiro);
            }              
        }
      }
    });
  },

  // TODO: call Django API here to include catador information in Django database
  submitCatadorRegistration: function(doc) {
    console.log(doc);

    var catador = 'catador';
    var create_catador_endpoint = endpoint + catador;
    // HTTP.post(create_catador_endpoint, {'options': 'to set'}
    //   function(error, response) {


    // });

  }

});